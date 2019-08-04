
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

import io from 'socket.io-client/';
import InCallManager from 'react-native-incall-manager';

//const socket = io.connect('https://localhost:5000', {transports: ['websocket']});

var {height, width} = Dimensions.get('window');



export default class RV extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        videoURL: null,
        canOpenPlayer:false
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
    createOffer=()=>{
      this.pc.createOffer(function(desc) {
        console.log('createOffer', desc);
        pc.setLocalDescription(desc, function () {
          console.log('setLocalDescription', pc.localDescription);
          socket.emit('exchange', {'to': socketId, 'sdp': pc.localDescription });
        }, logError);
      }, logError);
    }
    getLocalStream=(callback)=>{
        let that=this;
      let isFront = true;
      var configuration = {"iceServers": [{ 'url': 'stun:stun.l.google.com:19302' }]};
      var pc = new RTCPeerConnection(configuration);
      
      MediaStreamTrack.getSources(sourceInfos => {
        //console.log(sourceInfos);
        let that=this;
        let videoSourceId;
        for (let i = 0; i < sourceInfos.length; i++) {
          const sourceInfo = sourceInfos[i];
          if(sourceInfo.kind == "video" && sourceInfo.facing == (isFront ? "front" : "back")) {
            videoSourceId = sourceInfo.id;
          }
        }
        getUserMedia({
          audio: true,
          video: {
            mandatory: {
                minWidth: 500, // Provide your own width, height and frame rate here
                minHeight: 300,
                minFrameRate: 30,
              },
            facingMode: (isFront ? "user" : "environment"),
            optional: (videoSourceId ? [{sourceId: videoSourceId}] : [])
          }
        }, function (stream) {
          //console.log('dddd', stream);
          //alert(JSON.stringify(stream));
          pc.addStream(stream);
          callback(stream)
          //that.setState({videoURL: stream.toURL(),canOpenPlayer:true});
        }, function(err){
          alert("stream error"+JSON.stringify(err))
        });
      });
      

      /*this.pc.createOffer().then((offer)=>{
        return this.pc.setLocalDescription(offer);
      }).then(()=>{
        this.socket.emit('exchange', {'to': fromId, 'sdp': this.pc.localDescription });
      }).catch((err)=>{
        alert(JSON.stringify(err))
      })*/
      //alert(JSON.stringify(pc.createOffer))
      pc.createOffer(function(desc) {
        pc.setLocalDescription(desc, function () {
          // Send pc.localDescription to peer
          //alert(JSON.stringify(pc.localDescription))
          //that.socket.emit('start_chat', {'to': "pratibha", 'sdp': pc.localDescription });
          socket.emit('exchange', {'to': socketId, 'candidate': event.candidate });
          //that.socket.emit('start_chat', "hi");
        }, function(e) {
          alert("at inner"+JSON.stringify(e))
        });
      }, function(e) {
        alert("at outer"+JSON.stringify(e))
      });

      pc.onicecandidate = function (event) {
        // send event.candidate to peer
        //alert(JSON.stringify(event))
        if (event.candidate) {
          //that.socket.emit('start_chat', JSON.stringify({to: "ajay", sdp: event.candidate }));
          //that.socket.emit('ice_candidate', {'to': "ajay", 'candidate': event.candidate });
          socket.emit('exchange', {'to': socketId, 'candidate': event.candidate });
        }
      };
      
      that.socket.on('chatting',(data)=>{
        alert(JSON.stringify(data))
        if(data.sdp){
          //InCallManager.startRingtone('_DEFAULT_');
          if(InCallManager.recordPermission == 'granted' && InCallManager.cameraPermission == 'granted'){
            //InCallManager.startRingtone('_DEFAULT_');
          }
          pc.setRemoteDescription(new RTCSessionDescription(data.sdp), function () {
            if (pc.remoteDescription.type == "offer")
              pc.createAnswer(function(desc) {
                //console.log('createAnswer', desc);
                pc.setLocalDescription(desc, function () {
                  //console.log('setLocalDescription', pc.localDescription);
                  //socket.emit('exchange', {'to': fromId, 'sdp': pc.localDescription });
                  //that.socket.emit('start_chat', {'to': "pratibha", 'sdp': pc.localDescription });
                  socket.emit('exchange', {'to': socketId, 'candidate': event.candidate });
                }, (e)=>{
  
                });
              }, (ee)=>{
  
              });
          }, (eee)=>{
  
          });
        }else {
          //console.log('exchange candidate', data);
          pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
      })
      that.socket.on('isIceCandidate',(data)=>{
        pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      })
    }
    componentWillReceiveProps(newProps){
        //this.setState({videoURL:newProps.videoURL})
    }
    componentWillMount(){
        //this.getLocalStream(this.streamCallBack)
        let that=this;
        this.socket.on('connect',()=>{
          //alert("connected")
          that.socket.emit('join_room',JSON.stringify({me:"ajay"}))
        })
        
        this.socket.on('test',(data)=>{
          alert(data)
        })
    }
    componentDidMount() {
      //container = this;
      //alert("hello")
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
      this.getLocalStream(this.streamCallBack)
    }
    render(){
      return (
        <View>
                <RTCView streamURL={this.state.videoURL} style={{backgroundColor:'transparent',flex:1,width:width,height:height}} />
                <View style={{position:"absolute",width:100,height:100,backgroundColor:"white",top:0,right:0,marginTop:50,borderRadius:50,justifyContent:"center",alignItems:"center"}}>
                  <RTCView>
                  </RTCView>
                </View>
                <View style={{position:"absolute",width:width,height:300,backgroundColor:"transparent",bottom:0,justifyContent:"center",alignItems:"center"}}>
                  <View style={{flex:1,flexDirection:"column"}}>
                    <View style={{flex:1,flexDirection:"row"}}>
                    <Text>
                      hello
                    </Text>
                    </View>
                    <View style={{flex:1,flexDirection:"row"}}>
                    <Text>
                      hello
                    </Text>
                    </View>
                    <View style={{flex:1,flexDirection:"row"}}>
                    <Text>
                      hello
                    </Text>
                    </View>
                  </View>
                </View>
        </View>
      );
    }
  }