import React from 'react';
import { StyleSheet, 
        View, 
        
         
        Dimensions, 
        Image, 
        TouchableOpacity,
        TouchableHighlight, 
        ScrollView,
        AsyncStorage, 
        Keyboard } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LoginService } from './service/loginService';
import SpinnerMine from './Spinner.js';
import { Surface, Text, TextInput ,Button, Snackbar} from 'react-native-paper';

var _width = Dimensions.get('window').width;
var _height = Dimensions.get('window').height;

export default class LoginAll extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loginType:true,
      signupType:false,
      mainType:false,
      imageUrl:"",
      mobile:"",
      password:"",
      imageUrl:"https://www.thelinkedface.com/a.jpg",
      mobIcon:require('./img/ic_phone_white_24dp.png'),
      mobIconBack:"https://www.thelinkedface.com/humbrella/ic_phone_white_24dp.png",
      passwordIcon:require('./img/ic_lock_outline_white_24dp.png'),
      passwordIconBack:"https://www.thelinkedface.com/humbrella/ic_lock_outline_white_24dp.png",
      backIcLoc:"https://www.thelinkedface.com/humbrella/ic_lock_open_white_24dp.png",
      passwordVisible:true,
      firstCallHappen:false,
      loginBtMargin:-40,
      _is_mounted:false,
      mobileIcon:this.props.MobileIcon,
      passwordOpenIcon:this.props.PasswordOpenIcon,
      passwordCloseIcon:this.props.PasswordCloseIcon,
      shouldNextVisible:true,
      mobileShouldVisible:true,
      shouldPasswordVisible:true,
      loaderDisplay:false,
      toggleSpinnerVisibility:false,
      isMobileEmpty:false
    };
    this._take_me_to_the_dashbord=this._take_me_to_the_dashbord.bind(this);
    this._mobile_change=this._mobile_change.bind(this);
    this._password_change=this._password_change.bind(this);
    this._handel_password_unlock=this._handel_password_unlock.bind(this);
    this.componentDidMount=this.componentDidMount.bind(this);
    this._handel_password_focus=this._handel_password_focus.bind(this);
    this._handel_password_blur=this._handel_password_blur.bind(this);
    this._keyboardDidHide=this._keyboardDidHide.bind(this);
    this._keyboardDidShow=this._keyboardDidShow.bind(this);
    this._register_link_touched=this._register_link_touched.bind(this);
    this._onPressButton=this._onPressButton.bind(this);
    this._mutate_my_state=this._mutate_my_state.bind(this);
    this.componentWillUnmount=this.componentWillUnmount.bind(this);
  }
  fetchStatusHandler=(response) => {
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(response.statusText);
    }
  }
  componentWillUnmount(){
    this.setState({
        _is_mounted:false
    })
    //this.keyboardDidShowListener.remove();
    //this.keyboardDidHideListener.remove();
  }
  _mutate_my_state(data){
      this.props.mutateState(data);
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
  async _onPressButton(evt){
      var that=this;
      Keyboard.dismiss();
      //alert(LoginService)
      this.setState({loaderDisplay:true,toggleSpinnerVisibility:true})
      let logSerData=new LoginService({LoginHash:this.state.mobile,PasswordHash:this.state.password});
      //alert(logSerData.loginApiRequest);
      
      let url="http://www.thelinkedface.com/loginMeToApp";
      let method="POST";
      let contentType="application/json";
      let accept="application/json";
      logSerData.loginApiRequest(url,method,contentType,accept)
      .then(this.fetchStatusHandler)
      .then(res=>res.json())
      .then(async (response) =>{
        //alert(JSON.stringify(response))
        let dd=await that._storeData(response.Dp,"globalAppDp")
        let dd1=await that._storeData(response.Latitude,"globalAppLatitude")
        let dd2=await that._storeData(response.Longitude,"globalAppLongitude")
        let dd3=await that._storeData(response.Mobile,"globalAppMobile")
        let dd4=await that._storeData(response.Me.toString(),"globalAppMe")
        let dd5=await that._storeData(response.Partner.toString(),"globalAppPartner")
        let dd6=await that._storeData(response.Name.toString(),"globalAppName")
        let ddmm=await that._retrieveData("globalAppName")
        //alert(ddmm)
        global.MainIotClient.subscribe(ddmm)
        that.setState({toggleSpinnerVisibility:false,loaderDisplay:false})
        that._mutate_my_state({loginType:false,signupType:false,appAuthorize:true})
      })
      .catch((error) => {
        that.setState({toggleSpinnerVisibility:false,loaderDisplay:false})
        alert(error);
      });
      
      //alert(JSON.stringify(loginAjax))
      //loginAjax(url,method,contentType,accept);
  }
  _register_link_touched(evt){
    
  }
  _keyboardDidShow(){
      if(this.state._is_mounted){
        this.setState({
            loginBtMargin:0
        })
      }
  }
  _keyboardDidHide(){
    if(this.state._is_mounted){
        this.setState({
            loginBtMargin:-40
        })
      }
  }
  _handel_password_blur(evt){
  }
  _handel_password_focus(evt){
      
  }
  componentDidMount(){
    this.setState({_is_mounted:true})
    //this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    //this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
  }
  _handel_password_unlock(evt){
      if(!this.state.firstCallHappen){
        this.setState({
            firstCallHappen:true,
            passwordVisible:true
        })
      }
      console.log(this.state.firstCallHappen)
      if(this.state.passwordVisible && this.state.firstCallHappen){
        this.setState({
            passwordIcon:require('./img/ic_lock_open_white_24dp.png'),
            passwordVisible:false
        })
      }else if(this.state.firstCallHappen && !this.state.passwordVisible){
        this.setState({
            passwordIcon:require('./img/ic_lock_outline_white_24dp.png'),
            passwordVisible:true
        })
      }else{
        this.setState({
            passwordIcon:require('./img/ic_lock_open_white_24dp.png'),
            passwordVisible:true
        }) 
      }
  }
  _mobile_change(mobile){
      this.setState({mobile:mobile});
  }
  _password_change(password){
    this.setState({password:password});
  }
  _take_me_to_the_dashbord(evt){

  }
  render() {
    return (
      <View style={{borderColor:"red",borderWidth:0,flex:1,flexDirection:"column",backgroundColor:"rgba(0,0,0,0.8)"}}>
          <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
          
          <View  style={{flex:1,justifyContent:"center",alignItems:"center"}}  >
        <Surface style={{width:_width-40,height:120,marginTop:_height/2 -150 ,elevation:4}} >
            <View style={{flex:2,flexDirection:"row"}} >
            <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}>
                <Image source={require('./img/logo_um.jpg')} style={{width:50,height:50,borderRadius:25}} />
            </View>
            <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}>
                <Text style={{paddingLeft:15,fontSize:20}} >gappe
                </Text>
            </View>
            </View>
            <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                <Text>It's just a timepass tool
                </Text>
            </View>
        </Surface>
          <Surface style={{width:_width-40,height:120,marginTop:20,elevation:4}}>
          <TextInput
        label='Mobile number' error={false}
        onChangeText={mobile => this.setState({ mobile })} style={{height:60,backgroundColor:"white"}}
      />
      <TextInput
        label='Secret key'
        value={this.state.text}
        onChangeText={secret => this.setState({ secret })} style={{height:60,backgroundColor:"white"}}
      />
            </Surface>
            <Button mode="contained" onPress={() =>{
                    this.setState({isMobileEmpty:true})
                }} style=
                {{width:_width-40,marginTop:10}} >
                Login
            </Button>
            <Surface style={{width:_width-40,elevation:4,justifyContent:"center",alignItems:"center",backgroundColor:"transparent"}} >
                <Text>Or
                </Text>
            </Surface>
            <Button mode="contained" onPress={() => console.log('Pressed')} style=
                {{width:_width-40}} >
                Sign up
            </Button>
            <Surface style={{width:_width-40,elevation:4,justifyContent:"center",alignItems:"center",backgroundColor:"transparent"}} >
                
            </Surface>
          </View>
          {
            (this.state.loaderDisplay)?(
              <SpinnerMine size="large" Visible={this.state.toggleSpinnerVisibility} />
            ):false
          }
          </KeyboardAwareScrollView>
      </View>
    );
  }
}
const resizeMode = 'center'; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection:'column',
  },
  mobileInputStyle:{
    height: 40,
    borderLeftWidth: 0,
    borderRightWidth:0,
    borderTopWidth: 0, 
    borderColor:'grey',
    borderWidth: 2,
    marginBottom:15,
    width:_width-105,
    paddingLeft:10,
    color:'white',
  },
  passwordInputStyle:{
    height: 40,
    borderLeftWidth: 0,
    borderRightWidth:0,
    borderTopWidth: 0, 
    borderColor:'grey',
    borderWidth: 2,
    marginBottom:15,
    width:_width-220,
    paddingLeft:10,
    color:'white',
  },
  loginButtonStyle:{
      height:30,
      backgroundColor:"red",
      color:"black"
  },
  imageMobileStyle:{
      width:30,
      height:30,
      borderRadius:10,
      backgroundColor:"transparent",
      borderRadius:15,
      marginTop:10
  },
  imagePasswordStyle:{
    width:30,
    height:30,
    borderRadius:10,
    backgroundColor:"transparent",
    marginTop:10
  },
  textboxfieldd_style:{
      fontFamily:"sans-serif-light"
  }
});