
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Dimensions, 
  ScrollView, 
  Image, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  BackHandler, 
  FlatList, 
  KeyboardAvoidingView, 
  StatusBar, 
  TouchableHighlight, 
  Animated, 
  Easing, 
  Keyboard, 
  ImageBackground
} from 'react-native';
var WebRTC = require('react-native-webrtc');
var {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  getUserMedia,
} = WebRTC;

//import Video from 'react-native-af-video-player'

const socket = io.connect('https://pratibha-rtc.herokuapp.com/', {transports: ['websocket'], pingTimeout: 30000 });

import io from 'socket.io-client/';
import InCallManager from 'react-native-incall-manager';
import Draggable from 'react-native-draggable';
import EventEmitter from "react-native-eventemitter";

//const socket = io.connect('https://localhost:5000', {transports: ['websocket']});

var {height, width} = Dimensions.get('window');

String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

const configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};

const pcPeers = {};
let localStream;
var remoteStream;

function getLocalStream(isFront, callback) {

  let videoSourceId;

  // on android, you don't have to specify sourceId manually, just use facingMode
  // uncomment it if you want to specify
  if (Platform.OS === 'ios') {
    MediaStreamTrack.getSources(sourceInfos => {
      console.log("sourceInfos: ", sourceInfos);

      for (const i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if(sourceInfo.kind == "video" && sourceInfo.facing == (isFront ? "front" : "back")) {
          videoSourceId = sourceInfo.id;
        }
      }
    });
  }
  getUserMedia({
    audio: true,
    video: false
  }, function (stream) {
    console.log('getUserMedia success', stream);
    callback(stream);
  }, logError);
}

function join(roomID) {
  //alert(roomID)
  socket.emit('join', roomID, function(socketIds){
    //alert('join', socketIds);
    for (const i in socketIds) {
      const socketId = socketIds[i];
      //alert(""+socketIds)
      createPC(socketId, true);
    }
  });
}

function createPC(socketId, isOffer) {
  const pc = new RTCPeerConnection(configuration);
  pcPeers[socketId] = pc;

  pc.onicecandidate = function (event) {
    //alert('onicecandidate', event.candidate);
    if (event.candidate) {
      socket.emit('exchange', {'to': socketId, 'candidate': event.candidate });
    }
  };

  function createOffer() {
    pc.createOffer(function(desc) {
     //alert('createOffer', desc);
      pc.setLocalDescription(desc, function () {
        console.log('setLocalDescription', pc.localDescription);
        socket.emit('exchange', {'to': socketId, 'sdp': pc.localDescription });
      }, logError);
    }, logError);
  }

  pc.onnegotiationneeded = function () {
    //alert('onnegotiationneeded');
    if (isOffer) {
      createOffer();
    }
  }

  pc.oniceconnectionstatechange = function(event) {
    console.log('oniceconnectionstatechange', event.target.iceConnectionState);
    if (event.target.iceConnectionState === 'completed') {
      setTimeout(() => {
        getStats();
      }, 1000);
    }
    if (event.target.iceConnectionState === 'connected') {
      createDataChannel();
    }
  };
  pc.onsignalingstatechange = function(event) {
    console.log('onsignalingstatechange', event.target.signalingState);
  };

  pc.onaddstream = function (event) {
    console.log('onaddstream', event.stream);
    container.setState({info: 'One peer join!'});
    //alert("stream added")
    const remoteList = container.state.remoteList;
    remoteStream = event.stream.toURL();
    //let rs=remoteStream;
    //let ls=localStream;
    //localStream=rs;
    //remoteStream=ls;

    container.setState({ remoteList: remoteList ,calling:false});
  };
  pc.onremovestream = function (event) {
    console.log('onremovestream', event.stream);
  };

  pc.addStream(localStream);
  function createDataChannel() {
    if (pc.textDataChannel) {
      return;
    }
    const dataChannel = pc.createDataChannel("text");

    dataChannel.onerror = function (error) {
      console.log("dataChannel.onerror", error);
    };

    dataChannel.onmessage = function (event) {
      console.log("dataChannel.onmessage:", event.data);
      container.receiveTextData({user: socketId, message: event.data});
    };

    dataChannel.onopen = function () {
      console.log('dataChannel.onopen');
      container.setState({textRoomConnected: true});
    };

    dataChannel.onclose = function () {
      console.log("dataChannel.onclose");
    };

    pc.textDataChannel = dataChannel;
  }
  return pc;
}

function exchange(data) {
    //alert(JSON.stringify(data))
  const fromId = data.from;
  let pc;
  if (fromId in pcPeers) {
    pc = pcPeers[fromId];
  } else {
    pc = createPC(fromId, false);
  }
  //alert(JSON.stringify(data))
  if (data.sdp) {
    console.log('exchange sdp', data);
    
    pc.setRemoteDescription(new RTCSessionDescription(data.sdp), function () {
      if (pc.remoteDescription.type == "offer")
        pc.createAnswer(function(desc) {
          console.log('createAnswer', desc);
          pc.setLocalDescription(desc, function () {
            console.log('setLocalDescription', pc.localDescription);
            socket.emit('exchange', {'to': fromId, 'sdp': pc.localDescription });
          }, logError);
        }, logError);
    }, logError);
  } else {
    console.log('exchange candidate', data);
    pc.addIceCandidate(new RTCIceCandidate(data.candidate));
  }
}

function leave(socketId) {
  console.log('leave', socketId);
  const pc = pcPeers[socketId];
  //const viewIndex = pc.viewIndex;
  pc.close();
  delete pcPeers[socketId];

  const remoteList = container.state.remoteList;
  delete remoteList[socketId]
  container.setState({ remoteList: remoteList });
  container.setState({info: 'One peer leave!'});
}

socket.on('exchange', function(data){
  exchange(data);
});
socket.on('leave', function(socketId){
  //leave(socketId);
});

socket.on('connect', function(data) {
  //alert('connect');
  getLocalStream(true, function(stream) {
    localStream = stream;
    container.setState({selfViewSrc: stream.toURL()});
    container.setState({status: 'ready', info: 'Please enter or create room ID'});
  });
  let userId="9831296420"
  socket.emit('preserveSocketId',userId)
});

function logError(error) {
  console.log("logError", error);
}

function mapHash(hash, func) {
  const array = [];
  for (const key in hash) {
    const obj = hash[key];
    array.push(func(obj, key));
  }
  return array;
}

function getStats() {
  const pc = pcPeers[Object.keys(pcPeers)[0]];
  if (pc.getRemoteStreams()[0] && pc.getRemoteStreams()[0].getAudioTracks()[0]) {
    const track = pc.getRemoteStreams()[0].getAudioTracks()[0];
    console.log('track', track);
    pc.getStats(track, function(report) {
      console.log('getStats report', report);
    }, logError);
  }
}



let container;

export default class RA extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        videoURL: null,
        canOpenPlayer:false,
        info: 'Initializing',
        status: 'init',
        roomID: '11111',
        isFront: true,
        selfViewSrc: null,
        remoteList: {},
        textRoomConnected: false,
        textRoomData: [],
        textRoomValue: '',
        calling:true,
        isAnswerable:false,
        isAnswerComplete:false,
        greenImage:require('./img/call.png'),
        nameOfUser:"ajay"
      }
      this.configuration={"iceServers": [{ 'url': 'stun:stun.l.google.com:19302' }]};
      this.pc= new RTCPeerConnection(this.configuration);
      this.socket = io.connect('https://pratibha-rtc.herokuapp.com/', {transports: ['websocket']});
      this.componentWillReceiveProps=this.componentWillReceiveProps.bind(this);
      this.componentWillMount=this.componentWillMount.bind(this);
      this.componentDidMount=this.componentDidMount.bind(this);
    }
    streamCallBack=(stream)=>{
        this.setState({videoURL: stream.toURL(),canOpenPlayer:true,stream:stream})
        //alert(JSON.stringify(stream.toURL()))
        /*stream.getTracks().forEach(function(track) {
          this.pc.addTrack(track, stream);
        });*/



    }
   clearIntervalD=(interval)=>{
    clearInterval(interval);
   }
    componentWillReceiveProps(newProps){
        //this.setState({videoURL:newProps.videoURL})
    }
    componentWillMount(){
      let that=this;
      if (InCallManager.recordPermission !== 'granted') {
        InCallManager.requestRecordPermission()
        .then((requestedRecordPermissionResult) => {
            console.log("InCallManager.requestRecordPermission() requestedRecordPermissionResult: ", requestedRecordPermissionResult);
        })
        .catch((err) => {
            console.log("InCallManager.requestRecordPermission() catch: ", err);
        });
      }
      if (InCallManager.cameraPermission !== 'granted') {
        InCallManager.requestCameraPermission()
        .then((requestedCameraPermissionResult) => {
            console.log("InCallManager.requestRecordPermission() requestedRecordPermissionResult: ", requestedRecordPermissionResult);
        })
        .catch((err) => {
            console.log("InCallManager.requestRecordPermission() catch: ", err);
        });
      }
      socket.on('invite_video',(data)=>{
        //alert(data)
        InCallManager.startRingtone('_DEFAULT_');
        that.setState({isAnswerable:true,roomNo:data})
      })
      EventEmitter.on("answerCall", (value)=>{
          //console.log("foo", value);
          alert(value)
          InCallManager.stopRingtone();
          InCallManager.setKeepScreenOn(true);
          InCallManager.setSpeakerphoneOn(true)
          socket.emit('answer',"9836648105")
          join(value);
          that.setState({isAnswerComplete:true,elapsed:0})
          that._timerVideo=setInterval(()=>{
            that.setState({elapsed:that.state.elapsed+1})
          },1000)
      });
    }
    componentWillUnmount(){
      
     EventEmitter.removeListener("answerCall")
    }
    componentDidMount() {
      //container = this;
      //alert("hello")
      
      container = this;
      
      /*if(this.state.isAnswerComplete){
        
      }*/
    }
    dragAnswerRejact=()=>{
      if(this.state.isAnswerComplete){
        this.clearIntervalD(this._timerVideo);
        alert("cancel call")
      }else{
        alert("reject call")
      }
    }
    getStringElapsed=(elapsed)=>{
      let str="";
      let hr;
      let min;
      let sec;
      if(elapsed>3600){
        let temph=elapsed%3600;
        let hhr=Math.floor(elapsed/3600);
        hr=hhr;
        let tempm=temph%60
        let mmin=Math.floor(temph/60);
        min=mmin;
        sec=tempm;
        return `${hr} h :${min} m : ${sec} s`;
      }else if(elapsed>60 && elapsed<=3600){
        let tmin=elapsed%60
        let m=Math.floor(elapsed/60);
        
        min=m;
        sec=tmin;
        return `${min} m : ${sec} s`;
      }else{
        sec=elapsed;
        return `${sec} s`;
      }
    }
    dragAnswer=()=>{
      /*if (this.state.isAnswerable) {
        this.setState({isAnswerComplete:true})
      }*/
      EventEmitter.emit("answerCall", this.state.roomNo);
    }
    render(){
      return (
        <View>
               
                
                
                
                
                    <View style={{width:width,height:300,backgroundColor:"transparent",top:0,justifyContent:"center",alignItems:"center"}}>
                      <View style={{flex:1,flexDirection:"column"}}>
                        <View style={{flex:1,flexDirection:"row"}}>
                        </View>
                        <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                          <Image source={require('./img/muted.png')} style={{width:80,height:80,borderRadius:40}} />
                        </View>
                        <View style={{flex:1,flexDirection:"column",justifyContent:"flex-start",alignItems:"center",paddingTop:5}}>
                          <Text style={{color:"white",fontSize:25,fontFamily:"sans-serif-light"}} >
                            {this.state.nameOfUser.capitalize()}
                          </Text>
                          <Text style={{color:"white",fontSize:25,fontFamily:"sans-serif-light"}} >
                            Ringing
                          </Text>
                        </View>
                        <View style={{flex:1,flexDirection:"row"}}>
                        </View>
                      </View>
                    </View>
                  
                <View style={{width:width,height:300,backgroundColor:"transparent",bottom:0,justifyContent:"center",alignItems:"center",}}>
                
                  <View style={{flex:1,flexDirection:"row"}}>
                    <View style={{flex:1,flexDirection:"row"}}>
                    <View style={{flex:1,flexDirection:"column"}}>
                      
                      {
                        (!this.state.isAnswerComplete)?(
                          
                          <Draggable renderShape='image' imageSource={require('./img/call.png')} renderSize={50} offsetY={-70} offsetX={-100} pressDragRelease={this.dragAnswer}  />
                        ):(
                          <Draggable renderShape='image' imageSource={require('./img/muted.png')} renderSize={50} offsetY={-70} offsetX={-100} pressDragRelease={this.dragAnswer}  />
                        )
                      }
                      
                      
                      
                     
                    </View>
                    <View style={{flex:1,flexDirection:"column"}}>
                    
                      
                    {/*<Draggable renderSize={30} renderColor='red' offsetX={width/2-90} offsetY={-100} renderText='R' pressDragRelease={()=>alert("Cancel call")} ref={(elem)=>{this.elem=elem}} /> */}
                    <Draggable renderShape='image' imageSource={require('./img/reject.png')} renderSize={50} offsetY={-70} offsetX={100} pressDragRelease={this.dragAnswerRejact}  />
                    {
                      (this.state.isAnswerComplete)?(
                        <Draggable renderSize={40} offsetX={-width/2+120} renderText={this.getStringElapsed(this.state.elapsed)} renderColor='transparent' offsetY={-100} renderShape={"square"}   />
                      ):false
                    }
                    </View>
                    </View>
                    <View style={{flex:1,flexDirection:"row"}}>
                    
                    </View>
                    <View style={{flex:1,flexDirection:"row"}}>
                    
                    </View>
                  </View>
                </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    remoteView: {
        width: 100,
        height: 100,
        borderRadius:50
    },
});