/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
//tenor  --  DVH8AWZWUGCW

// pub-nub publish Key - pub-c-b25b3185-8410-4138-a3c5-24b195819f22
//pub-nub subscribe key - sub-c-43d7b3da-6a66-11e8-9499-26ede0a09d22
//pub-nub secret key - sec-c-ZjgxNDhiNjctMTg5Yy00YjRmLWJlMWYtYjdjNWU4ZGQwOThl

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
  ImageBackground,
  AsyncStorage 
} from 'react-native';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import geolib from 'geolib';
import EventEmitter from "react-native-eventemitter";

import SpinnerMine from './Loader/Spinner.js';
import MenuScreen from './menu/menuScreen.js';
import MenuHead from './menu/menuHead.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import MobileValidator from './Validation/mobileValidation.js';
import NameValidatior from './Validation/nameValidation.js';
import EmailValidator from './Validation/emailValidation.js';
import PasswordValidator from './Validation/passwordValidation.js';

import LoginBodyHead from './Login/loginBodyHead.js';
import LoginBodyBody from './Login/loginBodyBody.js';
import LoginBodyFoot from './Login/loginBodyFoot.js';
import LoginAll from './Login/loginAll.js';

import SignupBodyFoot from './SignUp/signupFoot.js';
import SignupBodyHead from './SignUp/signupHead.js';
import SignupBodyBody from './SignUp/signupBody.js';

import SuggestionsOfChatOnMapPage from './Suggestion/suggestionVisibleOnMapPage.js';
import MyProfile from './Profile/myProfile.js';
import TodaysDate from './Date/todaysDate.js';

import MapScreen from './Map/mapScreen.js';
import TimepassScreenHead from './TimepassScreen/timepassScreenHead.js';
import ChangeMyAbout from './Popup/changeMyAboutPopup.js';
import RequestDating from './Popup/requestDatePopup.js'

import InCallManager from 'react-native-incall-manager';
import InvertibleScrollView from 'react-native-invertible-scroll-view';

//import EmojiPanel from 'react-native-emoji-panel';
//import EmojiSelector from 'react-native-emoji-selector'
import EmojiInput from 'react-native-emoji-input';
//import * as firebase from 'firebase';
//import PubNub from 'pubnub';
//import PubNubReact from 'pubnub-react';
/*var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://broker.mqttdashboard.com',{
  protocolId: 'MQIsdp',
  protocolVersion: 3
});*/
//var Paho=require('paho-mqtt');
//var client = new Paho.MQTT.Client("iot.eclipse.org", Number(1883), "clientId");
//import { RNCamera } from 'react-native-camera';
import { Client, Message } from 'react-native-paho-mqtt';
import io from 'socket.io-client/';


import FCM,{FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType, NotificationActionType, NotificationActionOption, NotificationCategoryOption} from "react-native-fcm";

//import UUIDGenerator from 'react-native-uuid-generator';
const socket = io.connect('https://pratibha-rtc.herokuapp.com/', {transports: ['websocket'], pingTimeout: 30000 });
//global.MainPortSocket=socket;


const myStorage = {
  setItem: (key, item) => {
    myStorage[key] = item;
  },
  getItem: (key) => myStorage[key],
  removeItem: (key) => {
    delete myStorage[key];
  },
};




var timeConverterOf= (UNIX_timestamp)=>{
  let no=new Date();
  let a = new Date(UNIX_timestamp);
  let diff=no.getDate()-a.getDate();
  if (Math.abs(diff)<=1) {
    if (no.getHours()-a.getHours()<1) {
      let all="";
      let talk=no.getMinutes()-a.getMinutes();
      let talk2=no.getSeconds()-a.getSeconds();
      all=talk+" m "+talk2+" s";
      return all;
    }else if (no.getHours()-a.getHours()==1 && ((60-a.getMinutes())+no.getMinutes())<60) {
      let all="";
      let talk=(60-a.getMinutes())+no.getMinutes()
      let talk2=(no.getSeconds()-a.getSeconds())>0?no.getSeconds()-a.getSeconds():a.getSeconds()-no.getSeconds();
      all=talk+" m "+talk2+" s";
      return all;
    }else if (no.getHours()-a.getHours()>1 && no.getHours()-a.getHours()<24) {
      let all="";
      let talk=no.getHours()-a.getHours();
      let talk2=no.getMinutes()>a.getMinutes()?no.getMinutes()-a.getMinutes():a.getMinutes()-no.getMinutes();
      all=talk+" h "+talk2+" m"
      return all;
    }else if (no.getHours()-a.getHours()>24 && no.getHours()-a.getHours()<24*7) {
      let all="";
      let talk=parseInt((no.getHours()-a.getHours())/24);
      all=talk+" d"
      return all;
    }else {
      let all="";
      let x=a.toLocaleDateString();
      let hours = a.getHours() > 12 ? a.getHours() - 12 : a.getHours();
      let am_pm = a.getHours() >= 12 ? "PM" : "AM";
      hours = hours < 10 ? "0" + hours : hours;
      let minutes = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
      let seconds = a.getSeconds() < 10 ? "0" + a.getSeconds() : a.getSeconds();
      let time = hours + ":" + minutes + ":" + seconds + " " + am_pm;
      all=x+" "+time
      return all;
    }
  }else if (Math.abs(diff)>1 && Math.abs(diff)<=7) {
    let all="";
    let mcv=no.getDate()-a.getDate();
    let talk=parseInt(Math.abs(mcv));
    all=talk+" d before"
    return all;
  }else {
    let all="";
    let x=a.toLocaleDateString();
    let hours = a.getHours() > 12 ? a.getHours() - 12 : a.getHours();
    let am_pm = a.getHours() >= 12 ? "PM" : "AM";
    hours = hours < 10 ? "0" + hours : hours;
    let minutes = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
    let seconds = a.getSeconds() < 10 ? "0" + a.getSeconds() : a.getSeconds();
    let time = hours + ":" + minutes + ":" + seconds + " " + am_pm;
    all=x+" "+time
    return all;
  }

}



//let client;


const uuidv4 = require('uuid/v4');
/*UUIDGenerator.getRandomUUID().then((uuid) => {
  //alert(uuid)
  v1_uuid=uuid
  client = new Client({ uri: 'ws://iot.eclipse.org:80/ws', clientId: v1_uuid, storage: myStorage });
});*/

let v1_uuid=uuidv4();
// Create a client instance
let client = new Client({ uri: 'ws://iot.eclipse.org:80/ws', clientId: v1_uuid, storage: myStorage });


global.MainIotClient=client;







//socket.emit('preserveSocketId',"9831296420")
//global.MainPortSocket=socket;






var {height, width} = Dimensions.get('window');
var Contacts = require('react-native-contacts')



const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

//import { Client, Message } from 'react-native-paho-mqtt';

/*const firebaseConfig = {
  apiKey: "<your-api-key>",
  authDomain: "<your-auth-domain>",
  databaseURL: "<your-database-url>",
  storageBucket: "<your-storage-bucket>",
};*/
//const firebaseApp = firebase.initializeApp(firebaseConfig);

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


//var container;

import RV from './Video/videoPlayerLogic.js';
import RA from './Audio/audioPlayerLogic.js';
import PostsView from './Posts/postsView.js';
import ProfilePage from './Profile/myProfile.js';
import SettingScreen from './Settings/settingScreen.js';
import Partner from './SignUp/Partner/partner.js';

import FilePicker from './SignUp/Picker/filePicker.js';
import Direction from './Map/direction.js';

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    /*this.pubnub = new PubNub({
      subscribeKey: "sub-c-43d7b3da-6a66-11e8-9499-26ede0a09d22",
      publishKey: "pub-c-b25b3185-8410-4138-a3c5-24b195819f22",
      secretKey: "sec-c-ZjgxNDhiNjctMTg5Yy00YjRmLWJlMWYtYjdjNWU4ZGQwOThl",
      ssl: true
    });*/
    //this.pubnub = new PubNubReact({ publishKey: 'pub-c-b25b3185-8410-4138-a3c5-24b195819f22', subscribeKey: 'sub-c-43d7b3da-6a66-11e8-9499-26ede0a09d22' });
    //this.pubnub.init(this)
    /*

          {coord:{latitude:0.00,longitude:0.00,latitudeDelta:0.05},title:"You",id:"9831296420"},
          {coord:{latitude:0.00,longitude:0.00,latitudeDelta:0.05},title:"kumar",id:"9831296421"},
          {coord:{latitude:0.00,longitude:0.00,latitudeDelta:0.05},title:"jha",id:"9831296422"},
          {coord:{latitude:0.00,longitude:0.00,latitudeDelta:0.05},title:"hehe",id:"9831296423"},
          {coord:{latitude:0.00,longitude:0.00,latitudeDelta:0.05},title:"hohohoh",id:"9831296424"},
          {coord:{latitude:0.00,longitude:0.00,latitudeDelta:0.05},title:"llalaal",id:"9831296425"},
          {coord:{latitude:0.00,longitude:0.00,latitudeDelta:0.05},title:"mmamamma",id:"9831296426"},
          {coord:{latitude:0.00,longitude:0.00,latitudeDelta:0.05},title:"nannanan",id:"9831296427"},
          {coord:{latitude:0.00,longitude:0.00,latitudeDelta:0.05},title:"oooohhhh",id:"9831296428"}
    */
    
    this.state = {
      latitude:0.00,
      longitude:0.00,
      melat:0.00,
      melong:0.00,
      markerList:[
      ],
      title:"",
      markerImage:require('./image/Map-Marker-Marker-Outside-Pink-icon.png'),
      text:"",
      menuVisible:false,
      suggestionVisible:false,
      suggestionContentLoaded:true,
      account_logo:require('./image/contacts_fall_image.jpg'),
      deep_timepass_logo:require('./image/ic_compare_arrows_white_48dp.png'),
      botNeedOnPage:false,
      timepassChatNeeded:false,
      profileVisible:false,
      deep_timepass_with_chat:false,
      suggestionVisibleTimepassSearch:false,
      suggestionContentLoadedTimepassSearch:false,
      smileyIconImage:require('./image/ic_tag_faces_white_48dp.png'),
      attach_file_icon:require('./image/ic_attach_file_white_48dp.png'),
      speak_message_mic_icon:require('./image/ic_mic_white_48dp.png'),
      camera_icon:require('./image/ic_photo_camera_white_48dp.png'),
      sendIconImage:require('./image/outline_send_white_48dp.png'),
      speakIconImage:require('./image/outline_keyboard_voice_white_48dp.png'),
      fakeIconImage:require('./image/ic_account_circle_white_24dp.png'),
      backArrow:require('./image/baseline_keyboard_backspace_white_48dp.png'),
      setting_logo:require('./image/baseline_more_vert_white_48dp.png'),
      popupCloseIcon:require('./image/baseline_close_black_48dp.png'),
      mappableMessage:[
        
      ],
      picEmoji:false,
      showEmoticons:true,
      picReactions:false,
      reactions:[],
      persistentMarginTop:-50,
      reactionsCollection:[],
      currentGlobalMessage:"",
      _setting_needed_on_contact:true,
      myContacts:[],
      anyChatPressed:true,
      mobileiCon:require('./image/ic_phone_white_24dp.png'),
      passwordOpenIcon:require('./image/ic_lock_open_white_24dp.png'),
      passwordCloseIcon:require('./image/ic_lock_outline_white_24dp.png'),
      emailIcon:require('./image/ic_email_white_24dp.png'),
      personIcon:require('./image/ic_person_outline_white_24dp.png'),
      loginType:false,
      appAuthorize:false,
      signupType:true,
      tdVisible:false,
      showChangeMyAboutPopup:false,
      showRequestDatingPopup:false,
      age:"23",
      gender:"male",
      debugFlagTrue:false,
      debugFlagTrueAudio:false,
      showPostsView:false,
      showMyProfilePage:false,
      showSettings:false,
      goProfilePreference:false,
      closeIcon:require('./image/baseline_close_black_48dp.png'),
      goDpChange:false,
      my_profile_pic_p:"",
      drawDirection:false,
      _global_search_sugg:[
        {key: 'badcoder',image:'https://facebook.github.io/react-native/docs/assets/favicon.png'},
        {key: 'Pratibha sharma',image:'https://facebook.github.io/react-native/docs/assets/favicon.png'},
        {key: 'Kriti nainwal',image:'https://facebook.github.io/react-native/docs/assets/favicon.png'},
        {key: '1',image:'https://facebook.github.io/react-native/docs/assets/favicon.png'},
        {key: '2',image:'https://facebook.github.io/react-native/docs/assets/favicon.png'},
        {key: '3',image:'https://facebook.github.io/react-native/docs/assets/favicon.png'},
        {key: '4',image:'https://facebook.github.io/react-native/docs/assets/favicon.png'},
        {key: '5',image:'https://facebook.github.io/react-native/docs/assets/favicon.png'},
        {key: '6',image:'https://facebook.github.io/react-native/docs/assets/favicon.png'},
        {key: '7',image:'https://facebook.github.io/react-native/docs/assets/favicon.png'},
        {key: '8',image:'https://facebook.github.io/react-native/docs/assets/favicon.png'},
      ],
      _message_long_pressed_g:false,
      _right_seng_included_message_user:false,
      _left_include_message_touched:false,
      _allPushMessageCandidate:[]
    }
    this.componentWillMount=this.componentWillMount.bind(this);
    
    this._clicking_change_location=this._clicking_change_location.bind(this);
    
    this._ask_pratibha_for_assistance=this._ask_pratibha_for_assistance.bind(this);
    this.move_to_deep_chat=this.move_to_deep_chat.bind(this);
    //this.handlePick=this.handlePick.bind(this);
    this._show_my_icon=this._show_my_icon.bind(this);
    this._show_my_reactions=this._show_my_reactions.bind(this);
    
    this.sendMqttMessage=this.sendMqttMessage.bind(this);
    this.changeGlobalMessage=this.changeGlobalMessage.bind(this);
    this._reactions_touched_individually=this._reactions_touched_individually.bind(this);
    this.isUrlValid=this.isUrlValid.bind(this);
    this._add_emoji_to_input=this._add_emoji_to_input.bind(this);
    this._get_back_to_map_screen=this._get_back_to_map_screen.bind(this);
    this._pressing_message_for_datetime=this._pressing_message_for_datetime.bind(this)
    this.mutateApplicationState=this.mutateApplicationState.bind(this);
    this._map_touched=this._map_touched.bind(this);
    this.markerClick=this.markerClick.bind(this);
    this.componentDidMount=this.componentDidMount.bind(this);
  // Second interpolate beginning and end values (in this case 0 and 1)
  
  }

  safe=()=>{
    try{
      let mm=this.state.markerList[0].title;
      return mm
    }catch(err) {
      return 'nil';
    }
  }
  _keyboardDidHide=()=>{
    this.setState({persistentMarginTop:-50})
  }
  componentDidMount(){
    //var configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
    //var pc = new RTCPeerConnection(configuration);
    let that=this;
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    
      socket.emit('preserveSocketId',"9836648105")

    socket.on('invite_video_p',(data)=>{
      alert(data)
      InCallManager.startRingtone('_DEFAULT_');
      that.setState({isAnswerable:true,roomNo:data,debugFlagTrue:true})
    })


    EventEmitter.on("getAllPeopleForMe", async (value)=>{
     
      let gthfr=await that._retrieveData('globalAppMobile');
      let ddmm_nm=await that._retrieveData("globalAppName")
      fetch(`http://www.thelinkedface.com/getAllSuggestion/${value}`, {
        method: 'GET',
      })
      .then(res=>res.json())
      .then((data)=>{
        //alert(JSON.stringify(data))
        //that.setState({toggleSpinnerVisibility:false,loaderDisplay:false})
        //that.mutateMyState({signupType:false,appAuthorize:true})
        let ar=[];
        let ii=1;
        
        let arxx=[];
        for(let x of data){
          let ab={coord:{latitude:(x.Latitude)+ii,longitude:(x.Longitude)+ii},title:x.Name[0],id:x.Mobile,image:x.Dp,gender:x.Gender}
          ar.push(ab)
  
          let amm={
            name:x.Name[0],
            mobile:x.Mobile,
            image:x.Dp
          }
          arxx.push(amm)
  
          ii=ii+1;
        }
        that.setState({markerList:ar,myContactsZip:arxx,myContacts:arxx,__private_data_mob:gthfr,g_app_name:ddmm_nm})
        arxx.map( (y,z)=>{
          let tp=Number(y.mobile)+Number(value);
          global.MainIotClient.subscribe(tp.toString())
        } )
      })
      .catch((err)=>{
          alert(JSON.stringify(err))
          //that.setState({toggleSpinnerVisibility:false,loaderDisplay:false})
          
  
      })


    });




     let sf=this.safe();
    this.setState({title:sf});
    navigator.geolocation.getCurrentPosition((data)=>{
      //alert(JSON.stringify(data));
      this.setState({melat:data.coords.latitude,melong:data.coords.longitude})
      
    })

  
  }
  _markerClick=()=>{
    alert("this is your profile later it will take you to the your profile")
    //this.setState({showRequestDatingPopup:true})
  }
  markerClick(){
    //alert(this.state.title)
    this.setState({showRequestDatingPopup:true})
  }
  _map_touched(evt){
    this.setState({
      menuVisible:false
    })
    this._marker.hideCallout();
    this.__marker.hideCallout();
    //alert(navigator.getUserMedia)
    //alert("hi")
    //this.mutateMyState({menuVisible:false})
  }
  mutateApplicationState(data){
    this.setState(data)
  }
  _pressing_message_for_datetime(){

  }
  _get_back_to_map_screen(evt){
    this.setState({timepassChatNeeded:false,suggestionVisible:false})
  }
  _add_emoji_to_input(data){
    let gMessage=this.state.currentGlobalMessage;
    let char=data.char;
    let newMessage=gMessage+char;
    //alert(newMessage)
    this.setState({
      currentGlobalMessage:newMessage
    })
  }
  isUrlValid(str) {
    regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str))
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  _reactions_touched_individually=async (data)=>{
    //alert(data)
    let that=this;
    let mm=data;
    let val=that.isUrlValid(mm.toString())
    let dam=that.state.mappableMessage;
    //dam.
    
    //that.se
    //let dam=that.state.mappableMessage;
    //alert()
      
      let ddmm=await that._retrieveData("globalAppMobile");

      let dat={name:"Other",message:mm,isReactions:val,showMore:false,messageId:uuidv4(),to:this.state.mainChatOpponentNumber,from:ddmm,wh:Date.now()};
      //alert(ddmm)
      const message = new Message(JSON.stringify(dat));
      let tttaa=Number(this.state.mainChatOpponentNumber)+Number(ddmm);
      //alert(tttaa)
      //message.destinationName = this.state.mainChatOpponentNumber;
      message.destinationName=tttaa.toString();
      client.send(message);
  }
  changeGlobalMessage(data){
    //alert(JSON.stringify(data))
    this.setState({currentGlobalMessage:data.text})
  }
  async sendMqttMessage(mess){
    let that=this;
    let mm=this.state.currentGlobalMessage;
    let val=that.isUrlValid(mm.toString())
    let dam=that.state.mappableMessage;
    //dam.
    /*dam.sort(function(x, y){
      return x.wh - y.wh;
    })*/
    //dam.reverse();
    //that.se
    //let dam=that.state.mappableMessage;
    //alert()
      
      let ddmm=await that._retrieveData("globalAppMobile");

      let dat={name:"Other",message:mm,isReactions:val,showMore:false,messageId:uuidv4(),to:this.state.mainChatOpponentNumber,from:ddmm,wh:Date.now()};
      //alert(ddmm)
      const message = new Message(JSON.stringify(dat));
      let tttaa=Number(this.state.mainChatOpponentNumber)+Number(ddmm);
      //alert(tttaa)
      //message.destinationName = this.state.mainChatOpponentNumber;
      message.destinationName=tttaa.toString();
      client.send(message);
    that.setState({currentGlobalMessage:""})
  }
  
  _show_my_reactions(){
    Keyboard.dismiss();
    if (this.state.picReactions) {
      this.setState({
        picReactions:!this.state.picReactions,
        persistentMarginTop:-50,
        picEmoji:false
      })
    }else{
      this.setState({
        picReactions:!this.state.picReactions,
        persistentMarginTop:-20,
        picEmoji:false
      })
    }
    
  }
  _show_my_icon(){
    Keyboard.dismiss();
    if (this.state.picEmoji) {
      this.setState({
        picEmoji:!this.state.picEmoji,
        persistentMarginTop:-50,
        picReactions:false
      })
    } else {
      this.setState({
        picEmoji:!this.state.picEmoji,
        persistentMarginTop:-20,
        picReactions:false
      })
    }
    
    /*this.pubnub.publish(
      {
          message: {
              such: 'object'
          },
          channel: 'my_channel',
          sendByPost: false, // true to send via post
          storeInHistory: false, //override default storage options
          meta: {
              "cool": "meta"
          } // publish extra meta with the request
      },
      function (status, response) {
          // handle status, response
      }
  );*/
  //client.publish('presence', 'hello world')
  }
  _onEmoticonPress(){

  }
  _onBackspacePress(){

  }
  handlePick(emoji){

  }
  async move_to_deep_chat(evt){
    //let dd=await this._retrieveData("globalAppMobile")
    let nn=evt.mobile
    let dd=await this._retrieveData("globalAppDp")
    this.setState({
      deep_timepass_with_chat:true,
      mainChatOpponent:evt.name,
      mainChatOpponentNumber:evt.mobile,
      globalAppDp:dd,
      mainChatOpponentImage:evt.image
    })
    /**
     * let all_pushedCandidate=this.state._allPushMessageCandidate;
    let tampPushMess=[];
    let allPushMessFlag=false;
    for(l of all_pushedCandidate){
      if (l.toString()==nn.toString()) {
        allPushMessFlag=true;
        break;
      }
    }
    if (!allPushMessFlag) {
      tampPushMess.push(nn)
    }
     */
    //alert(nn)
    //client.subscribe(nn,{timeout:6000});
  }
  _ask_pratibha_for_assistance(evt){
    //alert("will need bot here")
  }
  decode= (t,e)=>{for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})}
  _clicking_change_location(data){
    let that=this;
    this.setState({
      latitude:parseFloat(data.coord.latitude),
      longitude:parseFloat(data.coord.longitude),
      title:data.title,
      id:data.id,
      menuVisible:false,
      touchedImage:data.image
    })
    //this._marker.hideCallout();
    //
    // demo
    let dir=new Direction(`${that.state.melat},${that.state.melong}`,`${that.state.latitude},${that.state.longitude}`,"driving");
    //let dir=new Direction({latitude:that.state.melat,longitude:that.state.melong},{latitude:that.state.latitude,longitude:that.state.longitude},"driving");
    dir.getDirection().then(response => response.json())
    .then(responseJson => {
        if (responseJson.routes.length) {
          //alert(JSON.stringify(responseJson))
            /*this.setState({
                coords: this.decode(responseJson.routes[0].overview_polyline.points) // definition below
            });*/
            let mm=this.decode(responseJson.routes[0].overview_polyline.points);

            that.setState({
                coordsDir: mm ,
                drawDirection:true
            });
            //alert(JSON.stringify(mm))
        }else{
            //alert(JSON.stringify(responseJson))
        }
    }).catch(e => {alert(e)});
    //alert(JSON.stringify(drr))
  }
 mutateMyState(data){
  this.setState(data);
 }
  componentWillUnmount(){
    this.keyboardDidHideListener.remove();
    BackHandler.removeEventListener('hardwareBackPress',()=>{

    })
    
    /*this.pubnub.unsubscribe({
      channels: ['channel1']
    });*/
  }
  fetchStatusHandler=(response) => {
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(response.statusText);
    }
  }
  sendRemote=(notif) => {
    //alert(JSON.stringify())
    let p=JSON.parse(notif.custom_notification)
    FCM.presentLocalNotification({
      title: p.title,
      body: p.body,
      show_in_foreground: true,
      local: true,
      sound:p.sound
    });
  }
  async componentWillMount(){
    let that=this;

    //alert(socket)
    

    /*socket.on('calling',(data)=>{

    })*/
    let checkAppLoginExist=await that._retrieveData("globalAppLoginExistFlag");

    let ddmm=await that._retrieveData("globalAppMobile");
    let gg=await that._retrieveData("globalAppDp");
    that.setState({globalMainMyDp:gg})

    EventEmitter.emit("getAllPeopleForMe", ddmm);

    //global.MainIotClient.subscribe(ddmm)


    if(checkAppLoginExist=="true"){
      that.setState({signupType:false,appAuthorize:true})
    }
    FCM.requestPermissions();
    FCM.getFCMToken().then(token => {
      //console.log("TOKEN (getFCMToken)", token);
      that.setState({_pTok:token})
    });

    FCM.on(FCMEvent.Notification, async (notif) => {
      //alert(JSON.stringify(notif))
      //that.sendRemote(notif);
      //await FCM.requestPermissions({ badge: false, sound: true, alert: true })
      if (notif.local_notification) {
        return
        }
      that.sendRemote(notif);
    });

    setTimeout(()=>{

      fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=AAAA2C0vvRY:APA91bE0cQ7nNB3nFvYhZJx8w26H-CQfw4yAGQbqje3-ResPdMlh5JYHwatk0zZU5p_5doJflOlQY6ZfqkCl9DJcHUxqDl0wrc2HE6Z0ATaqCBqeLgRwbNJJuktguHyI7lZJH1BoHD_L'
        },
        body: JSON.stringify({
            "to":that.state._pTok,
            "data": {
              "custom_notification": {
              "body": "test body",
              "title": "test title",
              "color":"#00ACD4",
              "priority":"high",
              "icon":"ic_notif",
              "group": "GROUP",
              "sound": "default",
              "show_in_foreground": true
              }
          }
        })
    }).then((data)=>{
      //alert(JSON.stringify(data))
    }).catch((err)=>{
      //JSON.stringify(err)
    })
    },5000)

    //this.pubnub.init(this);
    navigator.geolocation.getCurrentPosition((data)=>{
      //alert(JSON.stringify(data))
      let newMarkerList=[];
      let i=0;
      for(let a of that.state.markerList){
        a.coord.latitude=(parseFloat(data.coords.latitude)-0.01*i).toFixed(7),
        a.coord.longitude=(parseFloat(data.coords.longitude)-0.01*i).toFixed(7)
        newMarkerList.push(a);
        i=i+1;
      }
      //alert(JSON.stringify(newMarkerList))
      that.setState({
        latitude:parseFloat(data.coords.latitude),
        longitude:parseFloat(data.coords.longitude),
        markerList:newMarkerList
      })
    },(err)=>{
      alert(err)
    });
    
    BackHandler.addEventListener('hardwareBackPress', ()=> {
      // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
      // Typically you would use the navigator here to go to the last state.
      //alert("back ")
      if (that.state.menuVisible) {
        that.setState({menuVisible:false})
        return true;
      }
      if (that.state.suggestionVisible && that.state.text=="") {
        that.setState({suggestionVisible:false})
        //alert("hi")
        return true;
      }
      if(that.state.botNeedOnPage){
        that.setState({botNeedOnPage:false})
        return true;
      }
      if(that.state.showPostsView){
        that.setState({showPostsView:false,menuVisible:true})
        return true
      }
      if(that.state.showMyProfilePage){
        that.setState({showMyProfilePage:false,menuVisible:true})
        return true
      }
      if(that.state.showSettings){
        that.setState({showSettings:false,menuVisible:true})
        return true
      }
      if(that.state.suggestionVisibleTimepassSearch){
        that.setState({suggestionVisibleTimepassSearch:false})
        return true;
      }
      if(that.state.showTransparentImageOverScreen){
        that.setState({showTransparentImageOverScreen:false,suggestionVisible:true})
        return true;
      }
      if(that.state.picReactions){
        that.setState({picReactions:false})
        return true;
      }
      if(that.state.picEmoji){
        that.setState({picEmoji:false})
        return true;
      }
      if(that.state._left_include_message_touched){
        that.setState({_left_include_message_touched:false})
      }
      if(that.state._right_seng_included_message_user){
        that.setState({_right_seng_included_message_user:false});
        return true;
      }
      if(that.state._message_long_pressed_g){
        that.setState({_message_long_pressed_g:false})
        return true;
      }
      if(that.state.deep_timepass_with_chat){
        that.setState({deep_timepass_with_chat:false})
        //client.unsubscribe(that.state.mainChatOpponentNumber);
        return true;
      }
      
      if(that.state.timepassChatNeeded){
        that.setState({timepassChatNeeded:false,menuVisible:true})
        return true;
      }
      return true;
    });
    Contacts.getAll((err, contacts) => {
      if(err === 'denied'){
        // error
      } else {
        // contacts returned in []
        let ct=new Set(contacts);
        let arct=Array.from(ct)
        //alert(JSON.stringify(arct))
        /*that.setState({
          myContacts:arct
        })*/
        //alert(JSON.stringify(contacts))
      }
     })
      /*that.pubnub.subscribe({
      channels: ['channel1'],
      withPresence: true
      });

      that.pubnub.getMessage('channel1', (msg) => {
          alert(msg);
      });*/

      //client.subscribe('presence');
      
     /*client.on('message', function (topic, message) {
       // message is Buffer
       alert(message.toString());
       client.end();
     });*/





     /*const myStorage = {
      setItem: (key, item) => {
        myStorage[key] = item;
      },
      getItem: (key) => myStorage[key],
      removeItem: (key) => {
        delete myStorage[key];
      },
    };*/
     
    // Create a client instance
   


    client.on('connectionLost', (responseObject) => {
      alert('onConnectionLost Mqtt '+responseObject.errorMessage);
        
        let v1_uuid_1=uuidv4();
        // Create a client instance
        let client_1 = new Client({ uri: 'ws://iot.eclipse.org:80/ws', clientId: v1_uuid_1, storage: myStorage });
        client=undefined;
        client=client_1;
        
        global.MainIotClient=client_1;
    });
    client.on('messageReceived', (message) => {
      //alert(message)
      let gst=JSON.parse(message.payloadString);
      //alert(message.payloadString)
      //alert(JSON.parse(message.payloadString).message);
      //let arm=[]
      //arm.push(message.payloadString)
      //that.setState({tamppp:arm})
      //alert(that.state.tamppp);
      //client.disconnect();
      //let val=that.isUrlValid(gs)
      //let dat={name:"You",message:message.payloadString,isReactions:val,showMore:false,messageId:uuidv4()};
      let dam=that.state.mappableMessage;
      dam.unshift(gst)
      //dam.
      
      that.setState({mappableMessage:dam})
    });
     
    // connect the client
    client.connect({reconnect:true})
      .then(() => {
        // Once a connection has been made, make a subscription and send a message.
        //alert('onConnect');
        //return client.subscribe('World');
        that.setState({isMessageChannelEnabled:true})
      })
      .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
          alert('onConnectionLost:' + responseObject.errorMessage);
        }
      });






     fetch('https://api.tenor.com/v1/search?q=love&key=DVH8AWZWUGCW&limit=50&anon_id=3a76e56901d740da9e59ffb22b988242')
     .then((response) => response.json())
     .then((responseJson) => {
       //return responseJson.movies;
       //alert(JSON.stringify(responseJson))
       let arrm = [];
       let arm_1 = [];
      responseJson.results.map( (a,b)=>{
        arrm.push(a.media[0].gif.url)
      } )
      
      let arx={Love:arrm};
      arm_1.push(arx);
      that.setState({
        reactions:arrm,
        reactionsCollection:arm_1
      });
     })
     .catch((error) => {
       alert(error);
     });



     fetch('https://api.tenor.com/v1/search?q=excited&key=DVH8AWZWUGCW&limit=50&anon_id=3a76e56901d740da9e59ffb22b988242')
     .then((response) => response.json())
     .then((responseJson) => {
       //return responseJson.movies;
       //alert(JSON.stringify(responseJson))
       let arrm = [];
       let arm_1 = that.state.reactionsCollection;
      responseJson.results.map( (a,b)=>{
        arrm.push(a.media[0].gif.url)
      } )
      
      let arx={Excited:arrm};
      arm_1.push(arx);
      that.setState({
        reactions:arrm,
        reactionsCollection:arm_1
      });
     })
     .catch((error) => {
       alert(error);
     });




     fetch('https://api.tenor.com/v1/search?q=angry&key=DVH8AWZWUGCW&limit=50&anon_id=3a76e56901d740da9e59ffb22b988242')
     .then((response) => response.json())
     .then((responseJson) => {
       //return responseJson.movies;
       //alert(JSON.stringify(responseJson))
       let arrm = [];
       let arm_1 = that.state.reactionsCollection;
      responseJson.results.map( (a,b)=>{
        arrm.push(a.media[0].gif.url)
      } )
      
      let arx={Angry:arrm};
      arm_1.push(arx);
      that.setState({
        reactions:arrm,
        reactionsCollection:arm_1
      });
     })
     .catch((error) => {
       alert(error);
     });
  }
  _retrieveData = async (name) => {
    try {
      let value = await AsyncStorage.getItem(name);
      if (value !== null) {
        // We have data!!
        //console.log(value);
        return value;
      }
    } catch (error) {
       // Error retrieving data
       return error;
    }
}
_storeData = async (data,name) => {
    try {
      await AsyncStorage.setItem(name, data);
      return true;
    } catch (error) {
      // Error saving data
      return false;
    }
}
  updateState (data) {
    this.setState(data);
  }
  _start_audio_call=()=>{
    this.setState({timepassChatNeeded:false,deep_timepass_with_chat:false,debugFlagTrue:false,debugFlagTrueAudio:true})
  }
  _start_video_call=()=>{
    this.setState({timepassChatNeeded:false,deep_timepass_with_chat:false,debugFlagTrue:true,debugFlagTrueAudio:false})
  }

  __populate_my_notification=(evt)=>{
    //ajax poll
  }

  convertMtoKM=(meter)=>{
    return Math.round(meter/1000)
  }

  render() {
    let globalMainMobInRender=this.state.__private_data_mob;
    let __global_main_dp=this.state.globalAppDp;
    if(this.state.appAuthorize){
      return (
        <View style={styles.container} ref={(elem)=>{
          StatusBar.setHidden(false)
          }} >
          <StatusBar
          backgroundColor="#075e54"
          barStyle="light-content"
          />
          {/*<View style={styles.map}>
          <MapScreen MutateMyState={this.mutateMyState} />
          </View>*/}
            <MapView
              style={styles.map}
              region={{
                latitude: parseFloat(this.state.latitude),
                longitude: parseFloat(this.state.longitude),
                latitudeDelta: 0.1,
                longitudeDelta: 0.05,
              }} 
              onPress={this._map_touched}
              onRegionChangeComplete={() => {
                
              }
                
              }
              onMapReady={()=>{
              }}
              showsTraffic={true}
            >
              {/**
              * <Marker 
              image={this.state.markerImage} 
              coordinate={{latitude:this.state.latitude,longitude:this.state.longitude}} 
              title={this.state.title} flat={true} />
              */}
              <MapView.Marker 
                coordinate={{latitude:this.state.latitude,longitude:this.state.longitude}}
                 image={this.state.markerImage} 
                onCalloutPress={this.markerClick} 
                key={"hello"}
                
                ref={_marker => {this._marker = _marker}} 
                onPress={(e)=>{
                  //alert("press")
                  this._marker.showCallout();
                }} 
                >
                <MapView.Callout tooltip style={{width:200,height:100,backgroundColor:"#ece5dd",borderRadius:10}} >
                    {
                      (this.state.title!="")?(
                        <View style={{width:200,height:100,justifyContent:"center",alignItems:"center",borderRadius:10}} >
                            <View style={{flex:1,flexDirection:"row"}} >
                              <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                <Image source={{uri:`data:image/png;base64,${this.state.touchedImage }`}} style={{width:60,height:60,borderRadius:30}} />
                              </View>
                              <View style={{flex:2,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                              <Text>{this.state.title}{"\n"}{`${this.state.gender} \n${this.convertMtoKM(geolib.getDistance({latitude: this.state.melat, longitude: this.state.melong},{latitude: this.state.latitude, longitude: this.state.longitude}))} km away`}</Text>
                              </View>
                            </View>
                        </View>
                      ):(
                        <View style={{width:200,height:100,justifyContent:"center",alignItems:"center"}} >
                            <Text>Touch people listed below to make request</Text>
                        </View>
                      )
                    }
                </MapView.Callout>
              </MapView.Marker>
              <MapView.Marker 
                coordinate={{latitude:this.state.melat,longitude:this.state.melong}}
                 image={this.state.markerImage} 
                onCalloutPress={this._markerClick} 
                key={"hi"}
                
                ref={__marker => {this.__marker = __marker}} 
                onPress={(e)=>{
                  this.__marker.showCallout();
                }} 
                >
                <MapView.Callout tooltip style={{width:200,height:100,backgroundColor:"#ece5dd"}} >
                    {
                      (this.state.title!="")?(
                        <View style={{width:200,height:100,justifyContent:"center",alignItems:"center",borderRadius:10}} >
                            <View style={{flex:1,flexDirection:"row"}} >
                              <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                <Image source={{uri:`data:image/png;base64,${this.state.globalMainMyDp}`}} style={{width:60,height:60,borderRadius:30}} />
                              </View>
                              <View style={{flex:2,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                              <Text>Hey there it's you !! </Text>
                              </View>
                            </View>
                        </View>
                      ):(
                        <View style={{width:200,height:100,justifyContent:"center",alignItems:"center"}} >
                            <Text>Touch people listed below to make request</Text>
                        </View>
                      )
                    }
                </MapView.Callout>
              </MapView.Marker>
              {
                (this.state.drawDirection)?(
                  <MapView.Polyline
                      coordinates={[
                          {latitude: this.state.melat, longitude: this.state.melong}, // optional
                          ...this.state.coordsDir,
                          {latitude: this.state.latitude, longitude: this.state.longitude}, // optional
                      ]}
                      strokeWidth={4}
                      strokeColor="#1a66ff"
                  />
                ):false
              }
              <MapView.Circle 
                center = { {latitude:this.state.melat,longitude:this.state.melong} }
                radius = { 2000 }
                strokeWidth = { 1 }
                strokeColor = { '#1a66ff' }
                fillColor = { 'rgba(230,238,255,0.5)' }
              />
              <MapView.Circle 
                center = { {latitude:this.state.latitude,longitude:this.state.longitude} }
                radius = { 2000 }
                strokeWidth = { 1 }
                strokeColor = { '#1a66ff' }
                fillColor = { 'rgba(230,238,255,0.5)' }
              />
              {/*
                this.state.markerList.map( (f,g)=>{
                  return (
                    <MapView.Marker
                      key={g}
                      coordinate={{latitude:Number(f.coord.latitude),longitude:Number(f.coord.longitude)}}
                      title={f.title}
                      description={this.state.title} image={this.state.markerImage} 
                      onCalloutPress={this.markerClick} 
                      ref={_marker => {this._marker = _marker}} >
                      <MapView.Callout tooltip style={{width:200,height:50,backgroundColor:"#ece5dd"}} >
                          {
                            (this.state.title!="")?(
                              <View style={{width:200,height:50,justifyContent:"center",alignItems:"center"}} >
                                  <Text>{this.state.title}{"\n"}{`${this.state.gender},${this.state.age} year's old`}</Text>
                              </View>
                            ):(
                              <View style={{width:200,height:50,justifyContent:"center",alignItems:"center"}} >
                                  <Text>Touch people listed below to make request</Text>
                              </View>
                            )
                          }
                      </MapView.Callout>
                    </MapView.Marker>
                  )
                } )
                */
              }
    
          </MapView>
          <View style={{position:"absolute",width:width,height:50,backgroundColor:"#ece5dd",marginBottom:height-50}}>
            
          </View>
          <View style={{position:"absolute",width:50,height:200,backgroundColor:"#075e54",right:1,top:50,borderRadius:15}}>
            <View style={{flex:1}} >
              <View style={{flex:1,flexDirection:"column"}} >
                <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center",borderBottomWidth:2,borderBottomColor:"#ece5dd"}} >
                  <TouchableOpacity onPress={()=>{
                      this.setState({
                        timepassChatNeeded:true,
                        suggestionVisible:false
                      })
                    }} >
                    <Image source={require('./image/baseline_message_white_48dp.png')} style={{width:40,height:40,borderRadius:20}} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center",borderBottomWidth:2,borderBottomColor:"#ece5dd"}} >
                  <TouchableOpacity onPress={()=>{this.__populate_my_notification}} >
                    <Image source={require('./image/baseline_notification_important_white_48dp.png')} style={{width:40,height:40,borderRadius:20}} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center",borderBottomWidth:2,borderBottomColor:"#ece5dd"}} >
                  <TouchableOpacity onPress={()=>{alert("pressed shortcut")}} >
                    <Image source={require('./image/baseline_create_white_48dp.png')} style={{width:40,height:40,borderRadius:20}} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center",borderBottomWidth:2,borderBottomColor:"#ece5dd"}} >
                  <TouchableOpacity onPress={()=>{alert("pressed shortcut")}} >
                    <Image source={require('./image/ic_account_circle_white_24dp.1.png')} style={{width:40,height:40,borderRadius:20}} />
                  </TouchableOpacity>
                </View>
                <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                  <TouchableOpacity onPress={()=>{alert("pressed shortcut")}} >
                    <Image source={require('./image/baseline_supervised_user_circle_white_48dp.png')} style={{width:40,height:40,borderRadius:20}} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={{position:"absolute",width:width,height:180,backgroundColor:"transparent"}}>
            <ScrollView horizontal={true}>
              {
                this.state.markerList.map( (a,b)=>{
                  return (
                    <View key={b} style={{width:150,height:150,borderRightColor:"grey",borderRightWidth:2,borderBottomColor:"grey",borderBottomWidth:2,borderTopColor:"grey",borderTopWidth:2,borderLeftColor:"grey",borderLeftWidth:2,marginRight:10,marginLeft:10,backgroundColor:"#ece5dd",borderRadius:15}}>
                      <TouchableOpacity onPress={()=>{
                        this._clicking_change_location(a)}} >
                        <View style={{width:150,height:75,justifyContent:"center",alignItems:"center"}} >
                          <Image style={{width:60,height:60,borderRadius:30}} source={{uri: `data:image/png;base64,${a.image}`}} />
                        </View>
                        <View style={{width:150,height:75,justifyContent:"center",alignItems:"center"}} >
                          <Text style={{fontSize:20,fontFamily:"sans-serif-light",color:"black"}} >
                            {a.title}
                          </Text>
                          <Text style={{fontSize:20,fontFamily:"sans-serif-light",color:"black"}} >
                            {a.gender}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )
                } )
              }
            </ScrollView>
          </View>
          <View style={{flex:1,width:width,height:40,backgroundColor:"#075e54",marginBottom:height-40}}>
            <View style={{flexDirection:"row",flex:1}}>
              <View style={{flexDirection:"column",flex:1,justifyContent:"center",alignItems:"center"}} >
                <TouchableOpacity onPress={()=>{
                    this.setState({
                      menuVisible:true,
                      suggestionVisible:false
                    })
                  }} >
                 <Image style={{width:35,height:35}} source={require('./image/ic_menu_white_24dp.png')} />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:"column",flex:5,justifyContent:"center",alignItems:"center"}} >
                <TextInput
                  style={{height: 30,color:"white", borderBottomColor: 'white', borderBottomWidth: 1,width:width/1.5,padding:0}}
                  onChangeText={(text) => {
                    if (text!="") {
                      this.setState({text:text,suggestionVisible:true})
                    }else{
                      
                      this.setState({text:text,suggestionVisible:false})
                      Keyboard.dismiss();
                    }
                    
                  }}
                  value={this.state.text} 
                  placeholder="Search people around" 
                  underlineColorAndroid="transparent" 
                  placeholderTextColor="white"
                />
              </View>
              <View style={{flexDirection:"column",flex:1,justifyContent:"center",alignItems:"center"}} >
                <TouchableOpacity onPress={()=>{
                  this.setState({
                    botNeedOnPage:true
                  })
                  }} >
                  <Image source={require('./image/rsz_gossip.png')} style={{width:35,height:35,borderRadius:5}} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {
            (this.state.debugFlagTrue)?(
              <View style={{backgroundColor:"#075e54",}}>
                <RV roomNo={this.state.roomNo} isAnswerable={this.state.isAnswerable} mutateMyState={this.mutateApplicationState} />
              </View>
            ):false
          }
          {
            (this.state.showTransparentImageOverScreen)?(
              <View style={{backgroundColor:"rgba(0,0,0,0.8)",position:"absolute",width:width,height:height,justifyContent:"center",alignItems:"center"}}>
                <Image source={{uri:this.state._global_transparent_image}} style={{width:200,height:200,borderRadius:100}}  />
              </View>
            ):false
          }
          {
            (this.state.debugFlagTrueAudio)?(
              <View style={{backgroundColor:"#075e54",width:width,height:height}}>
                <RA />
              </View>
            ):false
          }
          {
            (this.state.showPostsView)?(
              <View style={{backgroundColor:"#075e54",width:width,height:height}}>
                <PostsView MutateParentState={this.mutateApplicationState} />
              </View>
            ):false
          }
          {
            (this.state.showMyProfilePage)?(
              <View style={{backgroundColor:"white",width:width,height:height}}>
                <ProfilePage MutateParentState={this.mutateApplicationState} DP={require('./image/umbrella.jpg')} />
              </View>
            ):false
          }
          {
            (this.state.showSettings)?(
              <View style={{backgroundColor:"#075e54",width:width,height:height}}>
                <SettingScreen MutateParentState={this.mutateApplicationState} DP={require('./image/umbrella.jpg')} />
              </View>
            ):false
          }
          {
            (this.state.menuVisible)?(
              <View style={{position:"absolute",width:width/1.2,height:height,backgroundColor:"#075e54",marginLeft:0}}>
                <MenuHead Img={this.state.account_logo} />
                <MenuScreen updateParentState={this.updateState.bind(this)} />
              </View>
            ):false
          }
          {
            (this.state.showChangeMyAboutPopup)?(
              <ChangeMyAbout MutateParentState={this.mutateApplicationState} closeIcon={this.state.popupCloseIcon} />
            ):false
          }
          {
            (this.state.showRequestDatingPopup)?(
              <RequestDating MutateParentState={this.mutateApplicationState} closeIcon={this.state.popupCloseIcon} Id={{name:this.state.title,id:this.state.id}} />
            ):false
          }
          
          {
            (this.state.suggestionVisible)?(
              <View style={{position:"absolute",flex:1,width:width/1.4,height:height/2,backgroundColor:"#ece5dd",marginLeft:50,top:41,justifyContent:"center",alignItems:"center"}}>
                {
                  (!this.state.suggestionContentLoaded)?(
                    <SpinnerMine />
                  ):(
                    <View style={{flex:1,flexDirection:"row",backgroundColor:"#ece5dd"}} >
                      <FlatList
                        data={this.state._global_search_sugg}
                        renderItem={({item}) => 
                            {
                              return (
                                <View style={{flex:1,flexDirection:"row",backgroundColor:"white",height:50,marginBottom:5,borderBottomColor:"black",borderBottomWidth:1,borderTopColor:"black",borderTopWidth:1}}>
                                    <View style={{flex:1.5,flexDirection:"column",justifyContent:"center",alignItems:"flex-end"}}>
                                      <TouchableOpacity onPress={(evt)=>{
                                        alert(JSON.stringify(item))
                                          this.setState({showTransparentImageOverScreen:true,_global_transparent_image:item.image,suggestionVisible:false})
                                        }} >
                                      <Image source={{uri:item.image}} style={{width:40,height:40,borderRadius:20,opacity:1}} />
                                      </TouchableOpacity>
                                    </View>
                                    <View style={{flex:5,flexDirection:"column",justifyContent:"center",alignItems:"flex-start",paddingLeft:5}}>
                                      <TouchableOpacity >
                                        <Text style={styles.item}>{item.key}</Text>
                                      </TouchableOpacity>
                                    </View>
                                </View>
                              )
                            }
                        }
                      />
                    </View>
                  )
                }
              </View>
            ):false
          }
          
          {
            (this.state.botNeedOnPage)?(
              <View style={{position:"absolute",width:width,height:height,backgroundColor:"#ece5dd",marginLeft:0,justifyContent:"center",alignItems:"center"}}>
                <TouchableOpacity onPress={this._ask_pratibha_for_assistance} >
                  <Text style={styles.item} >
                    click for assistance
                  </Text>
                </TouchableOpacity>
              </View>
            ):false
          }
          
          {
            (this.state.timepassChatNeeded)?(
              <View style={{position:"absolute",width:width,height:height,backgroundColor:"#ece5dd",marginLeft:0,justifyContent:"center",alignItems:"center"}}>
              {
                (this.state._setting_needed_on_contact)?(
                  <TimepassScreenHead account_logo={this.state.account_logo} MutateParentState={this.mutateApplicationState}  />
                ):false
              }
              <View style={{width:width,height:40,backgroundColor:"#075e54"}} >
                <View style={{flex:1,flexDirection:"row"}} >
                  <TouchableOpacity onPress={this._get_back_to_map_screen} >
                    <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                      <Image source={this.state.backArrow} style={{width:40,height:40,borderRadius:20}} />
                    </View>
                  </TouchableOpacity >
                  <View style={{flex:5,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                    <TextInput 
                    editable = {true}
                    multiline={false} 
                    style={{width:width/1.5,height:40,borderBottomColor:"#075e54",borderBottomWidth:2,fontSize:15,color:"white"}} 
                    placeholder="search contacts" 
                    placeholderTextColor="white" 
                    returnKeyLabel="search" 
                    underlineColorAndroid="transparent"
                    onChangeText={(text)=>{
                      //alert(JSON.stringify(this.state.myContacts))
                      if (text=="") {
                        this.setState({myContacts:this.state.myContactsZip})
                      } else {
                        let tempCont=Array.from(this.state.myContacts)
                        let f=tempCont.filter(elem=>{return elem.name.toUpperCase().includes(text.toUpperCase())})
                        this.setState({myContacts:f})
                      }
                    }}
                    />
                  </View>
                  <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                    {/*<Image source={this.state.setting_logo} style={{width:30,height:30,borderRadius:15}} />*/}
                  </View>
                  
                </View>
              </View>
              
                <View style={{flex:9,flexDirection:"row",paddingLeft:10,paddingRight:10}} >
                
                    <FlatList keyExtractor={(item, index) => item.mobile}
                        data={this.state.myContacts}
                        renderItem={({item}) => 
                            {
                              //let i=0;
                              //alert(JSON.stringify(item))
                              //var base64Icon = `data:image/png;base64,${item.image}`
                              if(item.mobile!=""){
                                //alert(JSON.stringify(item))
                                return (
                                <View style={{flex:1}}>
                                
                                <View  style={{flex:1,flexDirection:"row",backgroundColor:"#ece5dd",height:60,borderBottomColor:"#075e54",borderBottomWidth:2}}>
                                
                                    <View style={{flex:1.2,flexDirection:"column",justifyContent:"center",alignItems:"flex-end"}}>
                                      <Image source={{uri:`data:image/png;base64,${item.image}`}} style={{width:50,height:50,borderRadius:25}} />
                                    </View>
                                    <View style={{flex:6,flexDirection:"column",justifyContent:"center",alignItems:"flex-start",paddingLeft:5}}>
                                      <TouchableOpacity onPress={this.move_to_deep_chat.bind(this,item)}>
                                        <Text style={styles.item}>{
                                            item.name
                                          }</Text>
                                      </TouchableOpacity>
                                    </View>
                                </View>
                                </View>
                              )
                              }
                            }
                        }
                      />
                </View>
              </View>
            ):false
          }
          {
            (this.state.deep_timepass_with_chat)?(
                <View style={{position:"absolute",width:width,height:height,backgroundColor:"#ece5dd",marginLeft:0}} ref={(elem)=>{
  
                  }}>
                
                  <View style={{flex:1}}>
                  <KeyboardAvoidingView style={{flex:1}} behavior="padding" enabled keyboardVerticalOffset={25}>
                  {
                    (!this.state._message_long_pressed_g)?(
                      <ScrollView >
                        <View style={{flex:1,flexDirection:"row",backgroundColor:"#075e54"}} >
                          <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"flex-end"}} >
                            <Image source={{uri:`data:image/png;base64,${__global_main_dp}`}} style={{width:70,height:70,borderRadius:35,}} />
                          </View>
                          <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                            <Image source={this.state.deep_timepass_logo} style={{width:70,height:70}} />
                          </View>
                          <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"flex-start"}} >
                            <Image source={{uri:`data:image/png;base64,${this.state.mainChatOpponentImage}`}} style={{width:70,height:70,borderRadius:35}} />
                          </View>
                        </View>
                        <View style={{flex:1,flexDirection:"row",backgroundColor:"#075e54"}} >
                          <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"flex-end"}} >
                            <Text style={{fontFamily:"sans-serif-light",fontSize:20,color:"white",fontWeight:"bold"}} numberOfLines={1} >{this.state.g_app_name.split(',')[0]}
                            </Text>
                          </View>
                          <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                            <TouchableOpacity onPress={this._start_audio_call} >
                              <Image source={require('./image/baseline_call_white_48dp.png')} style={{width:40,height:40,borderRadius:20}} />
                            </TouchableOpacity>
                          </View>
                          <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                            <TouchableOpacity onPress={this._start_video_call} >
                              <Image source={require('./image/baseline_duo_white_48dp.png')} style={{width:40,height:40,borderRadius:20}} />
                            </TouchableOpacity>
                          </View>
                          <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"flex-start"}} >
                            <Text style={{fontFamily:"sans-serif-light",fontSize:20,color:"white",fontWeight:"bold"}} numberOfLines={1} >{this.state.mainChatOpponent.split(' ')[0]}
                            </Text>
                          </View>
                        </View>
                      </ScrollView>
                    ):false
                  }
                  {
                    (this.state._message_long_pressed_g)?(
                      <ScrollView >
                          <View style={{flex:1,flexDirection:"row",backgroundColor:"#075e54"}} >
                            <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"flex-end"}} >
                              <TouchableOpacity onPress={()=>{
                                this.setState({_left_include_message_touched:true})
                                }} >
                                <Image source={require('./image/baseline_undo_white_48dp.png')} style={{width:30,height:30,borderRadius:15,}} />
                              </TouchableOpacity>
                            </View>
                            <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                              <TouchableOpacity onPress={()=>{
                                
                                }} >
                                <Image source={require('./image/twotone_delete_white_48dp.png')} style={{width:30,height:30,borderRadius:15}} />
                              </TouchableOpacity>
                            </View>
                            <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"flex-start"}} >
                              <TouchableOpacity onPress={()=>{
                                  this.setState({_right_seng_included_message_user:true})
                                }} >
                                <Image source={require('./image/baseline_redo_white_48dp.png')} style={{width:30,height:30,borderRadius:15}} />
                              </TouchableOpacity>
                            </View>
                          </View>
                      </ScrollView>
                    ):false
                  }
                  
                  <View style={{flex:7,flexDirection:"row",marginTop:this.state.persistentMarginTop}} >
                    <InvertibleScrollView inverted >
                      
                        
                        {
                          this.state.mappableMessage.map( (a,b)=>{
                            //alert((a.to.toString()==globalMainMobInRender.toString() && a.from.toString()==this.state.mainChatOpponentNumber.toString() || a.from.toString()==globalMainMobInRender.toString() && a.to.toString()==this.state.mainChatOpponentNumber.toString()))

                            if (a.to.toString()==globalMainMobInRender.toString() && a.from.toString()==this.state.mainChatOpponentNumber.toString() || a.from.toString()==globalMainMobInRender.toString() && a.to.toString()==this.state.mainChatOpponentNumber.toString()) {
                              if (!a.isReactions) {
                              if(a.from.toString()==globalMainMobInRender.toString()){
                                return (
                                <View key={b} style={{alignSelf:"flex-start"}} >
                                  <TouchableOpacity onPress={()=>{
                                    //alert(JSON.stringify(a))
                                      //if(a.showMore){
                                        //a.showMore=!a.showMore;
                                        let ar=[];
                                        for(let x of this.state.mappableMessage){
                                          if (x.messageId==a.messageId) {
                                            x.showMore=!x.showMore
                                          }
                                          ar.push(x);

                                        }
                                        this.setState({mappableMessage:ar})
                                        //this.setState
                                      //}
                                    }} onLongPress={()=>{
                                      let arb=[];
                                      arb.push(a);
                                      this.setState({_message_long_pressed_g:true,_g_message_included:arb})
                                    }} >
                                  <View style={{maxWidth:3*width/4,marginLeft:15,marginTop:5}} 
                                  onPress={this._pressing_message_for_datetime} >
                                    <View >
                                      <View style={{backgroundColor:"#dcf8c6",alignSelf:"flex-start",borderColor:"grey",borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1,borderBottomWidth:1,borderRadius:30}}>
                                          <Text style={{paddingLeft:30,paddingBottom:5,paddingTop:0,paddingRight:30,textAlign:"center",fontFamily:"sans-serif-light",fontSize:15,color:"black"}}>
                                          {a.message}
                                          </Text>
                                        </View>
                                      </View>
                                      
                                  </View>
                                  </TouchableOpacity>
                                  {
                                    (a.showMore)?(
                                      <View style={{flex:1,flexDirection:"row",maxWidth:3*width/4}} >
                                  
                                      <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                                        <Image source={require('./image/right_tick_tr.png')} style={{width:15,height:15,borderRadius:7.5}} />
                                      </View>
                                      <View style={{flex:2,flexDirection:"column",justifyContent:"center",alignItems:"flex-start"}}>
                                        <Text style={{textAlign:"center",fontFamily:"sans-serif-light",fontSize:12,color:"black"}} numberOfLines={1} >{timeConverterOf(parseInt(a.wh))}
                                        </Text>
                                      </View>
                                  </View>
                                    ):false
                                  }
                                  {
                                    (this.state.anyChatPressed)?(
                                      <View style={{justifyContent:"center",alignItems:"center"}}> 
                                        <Text style={styles.item}>
                                         
                                        </Text>
                                      </View>
                                    ):false
                                  }
                                </View>
                              )
                              }else{
                                return (
                                <View key={b} style={{alignSelf:"flex-end"}} >
                                <TouchableOpacity onPress={()=>{
                                    //alert(JSON.stringify(a))
                                      //if(a.showMore){
                                        //a.showMore=!a.showMore;
                                        let ar=[];
                                        for(let x of this.state.mappableMessage){
                                          if (x.messageId==a.messageId) {
                                            x.showMore=!x.showMore
                                          }
                                          ar.push(x);

                                        }
                                        this.setState({mappableMessage:ar})
                                        //this.setState
                                      //}
                                    }} onLongPress={()=>{
                                      let arb=[];
                                      arb.push(a);
                                      this.setState({_message_long_pressed_g:true,_g_message_included:arb})
                                    }} >
                                  <View style={{maxWidth:3*width/4,marginTop:5,right:0}} 
                                  onPress={this._pressing_message_for_datetime} >
                                    <View >
                                      <View style={{backgroundColor:"#dcf8c6",alignSelf:"flex-end",borderColor:"grey",borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1,borderBottomWidth:1,borderRadius:30}}>
                                          <Text style={{paddingLeft:30,paddingBottom:5,paddingTop:0,paddingRight:30,textAlign:"center",fontFamily:"sans-serif-light",fontSize:15,color:"black"}}>
                                          {a.message}
                                          </Text>
                                        </View>
                                      </View>
                                      
                                  </View>
                                  </TouchableOpacity>
                                  {
                                    (a.showMore)?(
                                      <View style={{flex:1,flexDirection:"row",maxWidth:3*width/4}} >
                                  
                                      <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                                        <Image source={require('./image/right_tick_tr.png')} style={{width:15,height:15,borderRadius:7.5}} />
                                      </View>
                                      <View style={{flex:2,flexDirection:"column",justifyContent:"center",alignItems:"flex-start"}}>
                                        <Text numberOfLines={1} style={{textAlign:"center",fontFamily:"sans-serif-light",fontSize:12,color:"black"}}>{timeConverterOf(parseInt(a.wh))}
                                        </Text>
                                      </View>
                                  </View>
                                    ):false
                                  }
                                {
                                    (this.state.anyChatPressed)?(
                                      <View style={{justifyContent:"center",alignItems:"center"}}>
                                        <Text style={styles.item}>
                                          
                                        </Text>
                                      </View>
                                    ):false
                                  }
                                </View>
                              )
                              }
                            }else{
                              if(a.from.toString()==globalMainMobInRender.toString()){
                                return (
                                <View key={b}   >
                                





                                <TouchableOpacity onPress={()=>{
                                    //alert(JSON.stringify(a))
                                      //if(a.showMore){
                                        //a.showMore=!a.showMore;
                                        let ar=[];
                                        for(let x of this.state.mappableMessage){
                                          if (x.messageId==a.messageId) {
                                            x.showMore=!x.showMore
                                          }
                                          ar.push(x);

                                        }
                                        this.setState({mappableMessage:ar})
                                        //this.setState
                                      //}
                                    }} onLongPress={()=>{
                                      let arb=[];
                                      arb.push(a);
                                      this.setState({_message_long_pressed_g:true,_g_message_included:arb})
                                    }} >
                                  <View style={{maxWidth:3*width/4,marginLeft:15,marginTop:5}} 
                                  onPress={this._pressing_message_for_datetime} >
                                    <View >
                                      <View style={{flex:1,backgroundColor:"#dcf8c6",alignSelf:"flex-start",borderColor:"grey",borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1,borderBottomWidth:1,borderRadius:30}}>
                                      <Image 
                                      source={{uri: a.message}} 
                                      style={{width:140,height:140,alignSelf:"stretch",flex:1,position:"relative",paddingTop:40,borderRadius:30}}
                                      />
                                        </View>
                                      </View>
                                      
                                  </View>
                                  </TouchableOpacity>
                                  {
                                    (a.showMore)?(
                                      <View style={{flex:1,flexDirection:"row",maxWidth:3*width/4}} >
                                  
                                      <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                                        <Image source={require('./image/right_tick_tr.png')} style={{width:15,height:15,borderRadius:7.5}} />
                                      </View>
                                      <View style={{flex:2,flexDirection:"column",justifyContent:"center",alignItems:"flex-start"}}>
                                        <Text numberOfLines={1} style={{textAlign:"center",fontFamily:"sans-serif-light",fontSize:12,color:"black"}}>{timeConverterOf(parseInt(a.wh))}
                                        </Text>
                                      </View>
                                  </View>
                                    ):false
                                  }
                                {
                                    (this.state.anyChatPressed)?(
                                      <View style={{justifyContent:"center",alignItems:"center"}}>
                                        <Text style={styles.item}>
                                          
                                        </Text>
                                      </View>
                                    ):false
                                  }
                                </View>
                              )
                              }else{
                                return (
                                <View key={b}  >









                                <TouchableOpacity onPress={()=>{
                                    //alert(JSON.stringify(a))
                                      //if(a.showMore){
                                        //a.showMore=!a.showMore;
                                        let ar=[];
                                        for(let x of this.state.mappableMessage){
                                          if (x.messageId==a.messageId) {
                                            x.showMore=!x.showMore
                                          }
                                          ar.push(x);

                                        }
                                        this.setState({mappableMessage:ar})
                                        //this.setState
                                      //}
                                    }} onLongPress={()=>{
                                      let arb=[];
                                      arb.push(a);
                                      this.setState({_message_long_pressed_g:true,_g_message_included:arb})
                                    }} >
                                  <View style={{maxWidth:3*width/4,marginLeft:15,marginTop:5}} 
                                  onPress={this._pressing_message_for_datetime} >
                                    <View >
                                      <View style={{alignSelf:"flex-end",backgroundColor:"#dcf8c6",borderColor:"grey",borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1,borderBottomWidth:1,borderRadius:30}}>
                                      <Image 
                                      source={{uri: a.message}} 
                                      style={{width:140,height:140,flex:1,position:"relative",paddingTop:40,borderRadius:30}}
                                      />
                                        </View>
                                      </View>
                                      
                                  </View>
                                  </TouchableOpacity>
                                  {
                                    (a.showMore)?(
                                      <View style={{backgroundColor:"red",flex:1,flexDirection:"row",maxWidth:3*width/4}} >
                                  
                                      <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                                        <Image source={require('./image/right_tick_tr.png')} style={{width:15,height:15,borderRadius:7.5}} />
                                      </View>
                                      <View style={{flex:2,flexDirection:"column",justifyContent:"center",alignItems:"flex-start"}}>
                                        <Text numberOfLines={1} style={{textAlign:"center",fontFamily:"sans-serif-light",fontSize:12,color:"black"}}>{timeConverterOf(parseInt(a.wh))}
                                        </Text>
                                      </View>
                                  </View>
                                    ):false
                                  }
                                {
                                    (this.state.anyChatPressed)?(
                                      <View style={{justifyContent:"center",alignItems:"center"}}>
                                        <Text style={styles.item}>
                                          
                                        </Text>
                                      </View>
                                    ):false
                                  }
                                </View>
                              )
                              }
                            }
                            }




                          } )
                        }
                      
                    </InvertibleScrollView>
                  </View>
                  

                  {
                    (this.state._left_include_message_touched)?(
                      <View style={{flex:4,flexDirection:"column",alignItems:"center",backgroundColor:"#075e54"}} >
                        <View style={{flex:1.5,flexDirection:"row"}}>
                          <View style={{flex:5,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                            <ScrollView  >
                            <View style={{maxWidth:3*width/4,marginLeft:15,marginTop:5}} 
                                  onPress={this._pressing_message_for_datetime} >
                                    <View >
                                      <View style={{backgroundColor:"#dcf8c6",alignSelf:"flex-start",borderColor:"grey",borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1,borderBottomWidth:1,borderRadius:30}}>
                                          <Text style={{paddingLeft:30,paddingBottom:5,paddingTop:0,paddingRight:30,textAlign:"center",fontFamily:"sans-serif-light",fontSize:15,color:"black"}}>
                                          {this.state._g_message_included[0].message}
                                          </Text>
                                        </View>
                                      </View>
                                      
                                  </View>
                            </ScrollView>
                          </View>
                          <View style={{flex:1,flexDirection:"column"}}>
                            <TouchableOpacity onPress={()=>{
                                this.setState({_left_include_message_touched:false,_message_long_pressed_g:false})
                              }} >
                              <Image source={require('./image/baseline_clear_white_48dp.png')} style={{width:30,height:30,borderRadius:15}} />
                            </TouchableOpacity>
                          </View>
                        </View>
                        <View style={{flex:2,flexDirection:"row"}} >
                          <View style={{flex:1,flexDirection:"column",backgroundColor:"#075e54",justifyContent:"center",alignItems:"center"}} >
                            
                              <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                              <TouchableOpacity onPress={this._show_my_reactions}>
                                <Image
                                  style={{width:40,height:40,borderRadius:20 }}
                                  source={this.state.smileyIconImage} />
                                  </TouchableOpacity>
                              </View>
                            
                          </View>
                          <View style={{flex:4,flexDirection:"column",backgroundColor:"#075e54",justifyContent:"center",alignItems:"center"}} >
                            <TextInput 
                            editable = {true} 
                            multiline={true} 
                            numberOfLines={2} 
                            style={{width:width/2,borderBottomColor:"#128c7e",borderBottomWidth:2,fontSize:15,color:"white",borderTopColor:"#128c7e",borderTopWidth:2}} 
                            placeholder="type message" 
                            placeholderTextColor="white" 
                            returnKeyLabel="search" 
                            underlineColorAndroid="transparent" 
                            value={this.state.currentGlobalMessage} 
                            onChangeText={(text) => this.changeGlobalMessage({text})} 
                            onFocus={()=>{
                              this.setState({persistentMarginTop:-20})
                            }} 
                            onBlur={()=>{
                              this.setState({persistentMarginTop:-50})
                            }}
                            />
                          </View>
                          <View style={{flex:1,flexDirection:"column",backgroundColor:"#075e54",justifyContent:"center",alignItems:"center"}} >
                            <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                              <TouchableOpacity onPress={this.sendMqttMessage}>
                                <Image source={this.state.sendIconImage} style={{width:40,height:40,borderRadius:20}} />
                              </TouchableOpacity>
                            </View>
                          </View>
                          <View style={{flex:1,flexDirection:"column",backgroundColor:"#075e54",justifyContent:"center",alignItems:"center"}} >
                            <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                              <Image source={this.state.speakIconImage} style={{width:40,height:40,borderRadius:20}} />
                            </View>
                          </View>
                          <View style={{flex:1,flexDirection:"column",backgroundColor:"#075e54",justifyContent:"center",alignItems:"center"}} >
                            <TouchableOpacity onPress={this._show_my_icon}>
                              <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                <Image source={this.state.smileyIconImage} style={{width:40,height:40,borderRadius:20}} />
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ):false
                  }


                  {
                    (!this.state._left_include_message_touched)?(
                      <View style={{flex:2,flexDirection:"row",alignItems:"center"}} >
                   
                        <View style={{flex:1,flexDirection:"row"}} >
                          <View style={{flex:1,flexDirection:"column",backgroundColor:"#075e54",justifyContent:"center",alignItems:"center"}} >
                            
                              <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                              <TouchableOpacity onPress={this._show_my_reactions}>
                                <Image
                                  style={{width:40,height:40,borderRadius:20 }}
                                  source={this.state.smileyIconImage} />
                                  </TouchableOpacity>
                              </View>
                            
                          </View>
                          <View style={{flex:4,flexDirection:"column",backgroundColor:"#075e54",justifyContent:"center",alignItems:"center"}} >
                            <TextInput 
                            editable = {true} 
                            multiline={true} 
                            numberOfLines={2} 
                            style={{width:width/2,borderBottomColor:"#128c7e",borderBottomWidth:2,fontSize:15,color:"white",borderTopColor:"#128c7e",borderTopWidth:2}} 
                            placeholder="type message" 
                            placeholderTextColor="white" 
                            returnKeyLabel="search" 
                            underlineColorAndroid="transparent" 
                            value={this.state.currentGlobalMessage}
                            onChangeText={(text) => this.changeGlobalMessage({text})} 
                            onFocus={()=>{
                              this.setState({persistentMarginTop:-20})
                            }} 
                            onBlur={()=>{
                              this.setState({persistentMarginTop:-50})
                            }}
                            />
                          </View>
                          <View style={{flex:1,flexDirection:"column",backgroundColor:"#075e54",justifyContent:"center",alignItems:"center"}} >
                            <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                              <TouchableOpacity onPress={this.sendMqttMessage}>
                                <Image source={this.state.sendIconImage} style={{width:40,height:40,borderRadius:20}} />
                              </TouchableOpacity>
                            </View>
                          </View>
                          <View style={{flex:1,flexDirection:"column",backgroundColor:"#075e54",justifyContent:"center",alignItems:"center"}} >
                            <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                              <Image source={this.state.speakIconImage} style={{width:40,height:40,borderRadius:20}} />
                            </View>
                          </View>
                          <View style={{flex:1,flexDirection:"column",backgroundColor:"#075e54",justifyContent:"center",alignItems:"center"}} >
                            <TouchableOpacity onPress={this._show_my_icon}>
                              <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                <Image source={this.state.smileyIconImage} style={{width:40,height:40,borderRadius:20}} />
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ):false
                  }
                  
                  
                  </KeyboardAvoidingView>
                  {
                    (this.state.picEmoji)?(
                      <View style={{height:250,width:width,backgroundColor:"white",marginBottom:10}}>
                      <EmojiInput
                      onEmojiSelected={(emoji) => {
                        this._add_emoji_to_input(emoji)
                      }} 
                      enableSearch={false} 
                      categoryLabelTextStyle={{fontSize: 17}} 
                      emojiFontSize={30} 
                      numColumns={8} 
                      numFrequentlyUsedEmoji={24} 
                      categoryLabelHeight={40} 
                      categoryHighlightColor="darkgrey"
                      />
                      </View>
                    ):false
                  }
  
                  {
                    (this.state.picReactions)?(
                      <View style={{height:250,width:width,backgroundColor:"white",marginBottom:10}}>
                      <ScrollView contentContainerStyle ={{alignSelf:"stretch"}} >
                        
                        <View style={{alignSelf:"stretch",flexDirection:"row",flex:5,flexWrap:"wrap"}}>
                        {
                          this.state.reactions.map( (a,b)=>{
                            return (
                              <View key={b} style={{alignSelf:"stretch",flexDirection:"column",paddingLeft:5,paddingRight:5,paddingBottom:5,paddingTop:5}} >
                                <TouchableOpacity onPress={()=>{
                                    this._reactions_touched_individually(a)
                                  }}>
                                  <Image 
                                  source={{uri: a}} 
                                  style={{width:80,height:80,flex:1,position:"relative"}}
                                  />
                                </TouchableOpacity>
                              </View>
                            )
                          } )
                        }
                        </View>
                      </ScrollView>
                      <View style={{height:40,width:width,backgroundColor:"white",marginBottom:10}}>
                        <View style={{flex:1,flexDirection:"row"}}>
                          <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                            <Text>
                              hello
                            </Text>
                          </View>
                          <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                            <Text>
                              hello
                            </Text>
                          </View>
                          <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                            <Text>
                              hello
                            </Text>
                          </View>
                          <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                            <Text>
                              hello
                            </Text>
                          </View>
                          <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                            <Text>
                              hello
                            </Text>
                          </View>
                        </View>
                      </View>
                      </View>
                    ):false
                  }
  
                  </View>
                  
                </View>
            ):false
          }
  
          {
            (this.state._right_seng_included_message_user)?(
              <View style={{position:"absolute",width:width,height:height,backgroundColor:"#ece5dd",marginLeft:0,justifyContent:"center",alignItems:"center"}}>
              
              <View style={{width:width,height:40,backgroundColor:"#075e54"}} >
                <View style={{flex:1,flexDirection:"row"}} >
                  
                  <View style={{flex:5,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                    <TextInput 
                    editable = {true}
                    multiline={false} 
                    style={{width:width/1.5,height:40,borderBottomColor:"#075e54",borderBottomWidth:2,fontSize:15,color:"white"}} 
                    placeholder="search contacts" 
                    placeholderTextColor="white" 
                    returnKeyLabel="search" 
                    underlineColorAndroid="transparent"
                    />
                  </View>
                  <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                    {/*<Image source={this.state.setting_logo} style={{width:30,height:30,borderRadius:15}} />*/}
                  </View>
                  
                </View>
              </View>
              
                <View style={{flex:9,flexDirection:"row",paddingLeft:10,paddingRight:10}} >
                
                    <FlatList keyExtractor={(item, index) => item.mobile}
                        data={this.state.myContacts}
                        renderItem={({item}) => 
                            {
                              //let i=0;
                              //alert(JSON.stringify(item))
                              //var base64Icon = `data:image/png;base64,${item.image}`
                              if(item.mobile!=""){
                                //alert(JSON.stringify(item))
                                return (
                                <View style={{flex:1}}>
                                
                                <View  style={{flex:1,flexDirection:"row",backgroundColor:"#ece5dd",height:60,borderBottomColor:"#075e54",borderBottomWidth:2}}>
                                
                                    <View style={{flex:1.2,flexDirection:"column",justifyContent:"center",alignItems:"flex-end"}}>
                                      <Image source={{uri:`data:image/png;base64,${item.image}`}} style={{width:50,height:50,borderRadius:25}} />
                                    </View>
                                    <View style={{flex:6,flexDirection:"column",justifyContent:"center",alignItems:"flex-start",paddingLeft:5}}>
                                      <TouchableOpacity onPress={()=>{
                                        alert("will send to one touched user")
                                        this.setState({_right_seng_included_message_user:false,_message_long_pressed_g:false})
                                        }}>
                                        <Text style={styles.item}>{
                                            item.name
                                          }</Text>
                                      </TouchableOpacity>
                                    </View>
                                </View>
                                </View>
                              )
                              }
                            }
                        }
                      />
                </View>
              </View>
            ):false
          }

          {
            (this.state.suggestionVisibleTimepassSearch)?(
              <View style={{position:"absolute",flex:1,width:width/1.4,height:height/2,backgroundColor:"dimgrey",marginLeft:50,top:41,justifyContent:"center",alignItems:"center"}}>
                {
                  (!this.state.suggestionContentLoadedTimepassSearch)?(
                    <SpinnerMine />
                  ):(
                    <SuggestionsOfChatOnMapPage />
                  )
                }
              </View>
            ):false
          }
          {
            (this.state.profileVisible)?(
              <MyProfile /> 
            ):false
          }
          {
            (this.state.tdVisible)?(
              <TodaysDate />
            ):false
          }
        </View>
      );
    }else{
      if(this.state.loginType){
        return(
          <View style={{position:"absolute",width:width,height:height,backgroundColor:"#075e54",marginLeft:0}}>
            <StatusBar hidden={true}
            backgroundColor="transparent"
            barStyle="light-content"
            />
            <ImageBackground imageStyle={styles.imageStyle} style={{width:"100%",height:"100%"}} 
              source={require('./image/umbrella.jpg')}>
              <View style={styles.loginHeadContainer}>
                
              </View>
              <View style={styles.loginBodyContainer}>
                <LoginBodyBody mutateState={this.mutateApplicationState.bind(this)} MobileIcon={this.state.mobileiCon} PasswordOpenIcon={this.state.passwordOpenIcon} PasswordCloseIcon ={this.state.passwordCloseIcon} EmailValidator={EmailValidator} PasswordValidator={PasswordValidator} />
  
              </View>
            </ImageBackground>

            {/*<ImageBackground imageStyle={styles.imageStyle} style={{width:"100%",height:"100%"}} 
              source={require('./image/umbrella.jpg')}>
              <LoginAll mutateState={this.mutateApplicationState.bind(this)} MobileIcon={this.state.mobileiCon} PasswordOpenIcon={this.state.passwordOpenIcon} PasswordCloseIcon ={this.state.passwordCloseIcon} EmailValidator={EmailValidator} PasswordValidator={PasswordValidator} />
            </ImageBackground>*/}
            
            
          </View>
        )
      }else if(this.state.signupType){
        return(
          <View style={styles.containerLogin}>
            <StatusBar hidden={true}
            backgroundColor="transparent"
            barStyle="light-content"
            />
              <ImageBackground imageStyle={styles.imageStyle} style={{width:"100%",height:"100%"}} 
                source={require('./image/umbrella.jpg')}>
                
                
                <View style={styles.signupHeadContainer}>
                  
                </View>
                <View style={styles.signupBodyContainer}>
                <KeyboardAvoidingView style={{flex:1,flexDirection:"row"}} >
                  <SignupBodyBody mutateState={this.mutateApplicationState.bind(this)} 
                  mobIcon={this.state.mobileiCon} 
                  emailIcon={this.state.emailIcon} 
                  passwordOpenIcon={this.state.passwordOpenIcon} 
                  passwordCloseIcon={this.state.passwordCloseIcon} 
                  personIcon={this.state.personIcon} 
                  EmailValidator={EmailValidator} 
                  PasswordValidator={PasswordValidator} 
                  MobileValidator={MobileValidator}
                  NameValidatior={NameValidatior} 
                  SelectedProfilePicture={this.state.my_profile_pic_p} />
                  </KeyboardAvoidingView>
                </View>
                <View style={styles.signupFootContainer}>
                  <SignupBodyFoot />
                </View>
                {
                  (this.state.goProfilePreference)?(
                    <View style={{width:width,height:height,backgroundColor:"transparent"}} >
                      <ImageBackground imageStyle={styles.imageStyle} style={{width:"100%",height:"100%"}} 
                        source={require('./image/umbrella.jpg')}>
                        <Partner closeIcon={this.state.closeIcon} mutateState={this.mutateApplicationState.bind(this)} />
                      </ImageBackground>
                      </View>
                      
                  ):false
                }
                {
                  (this.state.goDpChange)?(
                      <View style={{width:width,height:height,backgroundColor:"transparent"}} >
                      <ImageBackground imageStyle={styles.imageStyle} style={{width:"100%",height:"100%"}} 
                        source={require('./image/umbrella.jpg')}>
                        <FilePicker closeIcon={this.state.closeIcon} mutateState={this.mutateApplicationState.bind(this)} />
                      </ImageBackground>
                      </View>
                  ):false
                }
              </ImageBackground>
            </View>
        )
      }else{
        return false
      }
    }
  }
}


/**
 * 
 * 
 * 
         {
          (this.state.loginType)?(
            <View style={{position:"absolute",width:width,height:height,backgroundColor:"#075e54",marginLeft:0}}>
              <ImageBackground imageStyle={styles.imageStyle} style={{width:"100%",height:"100%"}} 
                source={require('./image/umbrella.jpg')}>
                <View style={styles.loginHeadContainer}>
                  <LoginBodyHead />
                </View>
                <View style={styles.loginBodyContainer}>
                  <LoginBodyBody mutateState={this.mutateApplicationState.bind(this)} MobileIcon={this.state.mobileiCon} PasswordOpenIcon={this.state.passwordOpenIcon} PasswordCloseIcon ={this.state.passwordCloseIcon} EmailValidator={EmailValidator} PasswordValidator={PasswordValidator} />
                </View>
                <View style={styles.loginFootContainer}>
                  <LoginBodyFoot />
                </View>
              </ImageBackground>
            </View>
          ):false
        }
 */

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex:1,
    height: height,
    width: width,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  item:{
    fontFamily:"sans-serif-light",
    color:"black",
    fontSize:20,
    fontWeight:"bold"
  },
  item_1:{
    fontFamily:"sans-serif-light",
    color:"white",
    fontSize:15,
    fontWeight:"bold"
  },
  containerLogin: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection:"column",
  },
  loginBodyContainer:{
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  loginHeadContainer:{
    flex: 4,
    alignItems: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  loginFootContainer:{
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  imageStyle:{
    flex:1,
    resizeMode:"cover"
  },
  signupBodyContainer:{
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  signupHeadContainer:{
    flex: 4,
    alignItems: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  signupFootContainer:{
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  profileBodyContainer:{
    flex: 9,
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  profileHeadContainer:{
    flex: 1,
    backgroundColor: '#075e54',
  }
});
