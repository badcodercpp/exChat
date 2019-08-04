import React from 'react';
import { StyleSheet, 
        View, 
        TextInput, 
        Button, 
        Dimensions, 
        Image, 
        TouchableOpacity,
        TouchableHighlight, 
        Text, 
        KeyboardAvoidingView, 
        Keyboard,
        ToastAndroid,
        AsyncStorage } from 'react-native';
//import {Select, Option} from "react-native-chooser";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { EmailCheckService } from './service/emailCheckService.js';
import { MobileCheckService } from './service/mobileCheckService.js';
import SmsListener from 'react-native-android-sms-listener';
import { SignupThisUser } from './service/signUpService.js';
import { PushUserDetails } from './service/pushUserDetailsService';
import { EmailOtpSendAndGetService } from './Otp/emailSendAndGetOtp.js';
import { MobileOtpSendAndGetService } from './Otp/mobileSendAndGetOtpService.js';
import { VerifyMobileOtp } from './Otp/verifyMobileOtpService.js';
import { VerifyEmailOtpService } from './Otp/verifyEmailOtpService.js';
import SpinnerMine from './Spinner.js';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import jwt from 'react-native-pure-jwt';
var CryptoJS = require("crypto-js");
var base64 = require('base-64');




var _width = Dimensions.get('window').width;
var _height = Dimensions.get('window').height;

export default class SignupBodyBody extends React.Component {
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
      mobIcon:this.props.mobIcon,
      mobIconBack:"https://www.thelinkedface.com/humbrella/ic_phone_white_24dp.png",
      passwordOpeIcon:this.props.passwordOpenIcon,
      passwordCloseIcon:this.props.passwordCloseIcon,
      emailIcon:this.props.emailIcon,
      personIcon:this.props.personIcon,
      backIcLoc:"https://www.thelinkedface.com/humbrella/ic_lock_open_white_24dp.png",
      passwordVisible:false,
      firstCallHappen:false,
      loginBtMargin:-20,
      email:"",
      otpText:"",
      domainMargin:112,
      clickDomain:"@domain",
      emailOtp:false,
      emailVisible:false,
      mobileBoxVisible:true,
      mobileOtpBoxVisible:false,
      nextButtonVisible:true,
      passwordBoxVisible:false,
      passwordOtpBoxVisible:false,
      fNameBoxVisible:false,
      lnameBoxVisible:false,
      mobileVal:"",
      mobileOtpVal:"",
      defaultDomainLabel:"@domain",
      emailOtpVal:"",
      passwordVal:"",
      passwordOtpVal:"",
      _password_secure:true,
      _is_email_verified:false,
      _is_mobile_verified:false,
      emailOtpVerified:true,
      isMobileOtpVerified:true,
      f_name:"",
      l_name:"",
      me_gender:"",
      me_sec_email:"",
      defaultGenderLabel:"select gender",
      loaderDisplay:false,
      toggleSpinnerVisibility:false,
      genderList:[
        {label: 'Male', value: 0 },
        {label: 'Female', value: 1 },
        {label: 'Other', value: 2 }
      ],
      selectedGenderIndex:0,
      closeIcon:require('./img/baseline_close_black_48dp.png'),
      isMobileAreadyRegistered:false,
      mobileValidator:this.props.MobileValidator,
      my_profile_pic_p:this.props.SelectedProfilePicture
    };
  }
  _retrieveData = async (name) => {
        try {
        const value = await AsyncStorage.getItem(name);
        if (value !== null) {
            // We have data!!
            //console.log(value);
            return value;
        }
        } catch (error) {
        // Error retrieving data
        return "Bad data";
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
  fetchStatusHandler=(response) => {
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(response.statusText);
    }
  }
  _mobile_box_change=(text)=>{
    this.setState({mobileVal:text})
  }
  _mobile_box_otp_change=(text)=>{
    this.setState({mobileOtpVal:text})
  }
  validateMobileP=(data)=>{
        let re = /^(\+\d{1,3}[- ]?)?\d{10}$/;  
        return re.test(data);      
    }
  _onPressButton_mobile=()=>{
      let that=this;
    
    
    if(!this.state.mobileOtpBoxVisible){
        if (this.state.mobileVal!="") {
            if (this.validateMobileP(this.state.mobileVal)) {
                jwt
                .sign({
                  iss: this.state.mobileVal,
                  exp: new Date().getTime() + (3600 * 1000000), // expiration date, required, in ms, absolute to 1/1/1970
                  additional: 'payload',
                }, // body
                'beautiful girl pratibha', // secret
                {
                  alg: 'hs256' // required, only algorithm by now
                })
                .then((hash)=>{
                    var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');
                    //console.log("encrypted text", ciphertext.toString());
                    //var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
                    //var plaintext = bytes.toString(CryptoJS.enc.Utf8);
                    //console.log("decrypted text", plaintext);
                    //alert(ciphertext.toString()+plaintext)
                    //alert(hash);
                    that.setState({toggleSpinnerVisibility:true,loaderDisplay:true})
                    fetch(`http://www.thelinkedface.com/verifyHash/${this.state.mobileVal}`)
                    .then(that.fetchStatusHandler)
                    .then(res=>res.json())
                    .then((responseJson) => {
                      //alert(JSON.stringify(responseJson))
                      if(responseJson.Hash==""){
                        that.setState({mobileOtpBoxVisible:true,mobileBoxVisible:true,toggleSpinnerVisibility:false,hashedMobileVal:this.state.mobileVal,loaderDisplay:false})
                      }else{
                        ToastAndroid.show('Mobile no is not available its already registered', ToastAndroid.SHORT);
                        that.setState({toggleSpinnerVisibility:false,loaderDisplay:false})
                      }
                    })
                    .catch((error) => {
                      //console.error(error);
                      ToastAndroid.show('Mobile no is not available its already registered', ToastAndroid.SHORT);
                      that.setState({toggleSpinnerVisibility:false,loaderDisplay:false})
                    }); 
                    //that.setState({hashedMobileVal:hash,mobileOtpBoxVisible:true,mobileBoxVisible:true})
                    /*var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');
                    //console.log("encrypted text", ciphertext.toString());
                    var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
                    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
                    //console.log("decrypted text", plaintext);
                    alert(ciphertext.toString()+plaintext)*/
                })
                //this.setState({mobileOtpBoxVisible:true,mobileBoxVisible:true})
            } else {
                ToastAndroid.show('Invalid mobile number', ToastAndroid.SHORT);
            }
        } else {
            ToastAndroid.show('Ohho .. ! you gona need to provide all this .', ToastAndroid.SHORT);
        }
        /*if(this.state.mobileVal!=""){
            this.setState({toggleSpinnerVisibility:true})
            jwt
            .sign({
              iss: 'badcoder@kitchat.com',
              exp: new Date().getTime() + (3600 * 1000000), // expiration date, required, in ms, absolute to 1/1/1970
              additional: 'payload',
            }, // body
            'beautiful girl pratibha', // secret
            {
              alg: 'hs256' // required, only algorithm by now
            })
            .then((hash)=>{
                alert(hash)
                fetch(`http://192.168.1.4:5000/verifyHash/${hash}`)
                .then(this.fetchStatusHandler)
                .then(res=>res.json())
                .then((responseJson) => {
                  //alert(JSON.stringify(responseJson))
                  if(responseJson.Hash==""){
                    that.setState({mobileOtpBoxVisible:true,mobileBoxVisible:true,toggleSpinnerVisibility:false})
                  }
                })
                .catch((error) => {
                  //console.error(error);
                  ToastAndroid.show('Mobile no is not available its already registered', ToastAndroid.SHORT);
                  that.setState({isMobileAreadyRegistered:true,toggleSpinnerVisibility:false})
                });
            }) // token as the only argument
            .catch((err)=>{
                alert(JSON.stringify(err))
            }) // possible errors
        }else{
            ToastAndroid.show('Please enter a valid mobile', ToastAndroid.SHORT);
        }*/
    }else{
        if (this.state.mobileOtpVal!="") {
            this.setState({passwordBoxVisible:true,passwordOtpBoxVisible:true,mobileBoxVisible:false,mobileOtpBoxVisible:false})
        } else {
            ToastAndroid.show('please enter 4 digit otp', ToastAndroid.SHORT);
        }
    }
  }
  _mutate_my_state=(data)=>{
    this.props.mutateState(data);
  }
  _password_box_change=(text)=>{
    this.setState({passwordVal:text})
  }
  _password_otp_change=(text)=>{
    this.setState({passwordOtpVal:text})
  }
  _f_name_change=(text)=>{
    this.setState({f_name:text})
  }
  _l_name_change=(text)=>{
    this.setState({l_name:text})
  }
  _onPressButton_password=()=>{
      if (this.state.passwordVal!="" && this.state.passwordOtpVal!="") {
          if (this.state.passwordVal === this.state.passwordOtpVal) {
            this.setState({fNameBoxVisible:true,lnameBoxVisible:true,passwordBoxVisible:false,passwordOtpBoxVisible:false})
          } else {
            ToastAndroid.show('password don\'t match', ToastAndroid.SHORT);
          }
      } else {
        ToastAndroid.show('password cannot be null', ToastAndroid.SHORT);
      }
    
  }
  _onPressButton_signup=async ()=>{
      if (this.state.f_name!="" && this.state.l_name!="") {
        let gender;
        for(let l of this.state.genderList){
            if(Number(l.value)==Number(this.state.selectedGenderIndex)){
                gender=l.label;
                break;
            }
        }
        let data={
            name:[
              this.state.f_name,this.state.l_name
            ],
            mobile:this.state.hashedMobileVal,
            password:this.state.passwordVal,
            gender:gender
        }
        await this._storeData(JSON.stringify(data),'nmp')
          this._mutate_my_state({goDpChange:true})
      } else {
        ToastAndroid.show('Ohho you need to provide all this .', ToastAndroid.SHORT);
      }
  }
  render() {
    return (
        <View style={{borderColor:"red",borderWidth:0,flex:1,flexDirection:"column",alignSelf:"stretch"}}>
           
            <KeyboardAwareScrollView style={{flex:1}} keyboardShouldPersistTaps="always">
                
            {
                (this.state.mobileBoxVisible)?(
                    <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{flex:0.8,flexDirection:'column',paddingLeft:15}}>
                        <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-end"}}>
                            <Image style={styles.imageMobileStyle}
                                source={this.state.mobIcon } />
                            <TextInput
                            style={styles.mobileInputStyle} placeholderStyle={styles.textboxfieldd_style} 
                            onChangeText={this._mobile_box_change} keyboardType="numeric" 
                            keyboardAppearance={"light"} maxLength={10} multiline={false} blurOnSubmit={false} 
                            value={this.state.mobileVal} underlineColorAndroid='transparent' placeholderTextColor="white" placeholder="mobile no" />
                        </View>
                        {
                            (this.state.isMobileAreadyRegistered)?(
                                <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-end"}} >
                                    <Text>
                                        {
                                            `${this.state.mobileVal} is already registered`
                                        }
                                    </Text>
                                </View>
                            ):false
                        }
                    </View>
                </View>
                ):false
            }
            {
                (this.state.mobileOtpBoxVisible)?(
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:0.8,flexDirection:'column',paddingLeft:15}}>
                            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-end"}}>
                                <Image style={styles.imageMobileStyle}
                                    source={this.state.passwordCloseIcon } />
                                <TextInput maxLength={4} multiline={false} 
                                style={styles.mobileInputStyle} placeholderStyle={styles.textboxfieldd_style} 
                                onChangeText={this._mobile_box_otp_change} keyboardType="numeric" 
                                value={this.state.mobileOtpVal} underlineColorAndroid='transparent' placeholderTextColor="white" placeholder="Otp" />
                            </View>
                        </View>
                    </View>
                ):false
            }
            {
                (this.state.nextButtonVisible && this.state.mobileBoxVisible)?(
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:0.93,flexDirection:"column"}} >
                            <View style={{flex:1,flexDirection:"row"}}>
                                <View style={{flex:1,flexDirection:"column",justifyContent:"center"}}>
                                    <TouchableHighlight onPress={this._onPressButton_mobile} activeOpacity={0.2} underlayColor="transparent" style={{height:40,backgroundColor:"grey",borderRadius:25,marginLeft:20}}>
                                        <Text style={{color:"white",textAlign:"center",fontWeight:"bold",fontSize:20,fontFamily:"sans-serif-light",paddingTop:5}}>Next</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <View style={{marginTop:20,flex:0.9}}>
                                <View style={{flex:0.9,flexDirection:"row",justifyContent:"center"}}>
                                    <TouchableOpacity onPress={()=>{this._mutate_my_state({loginType:true,signupType:false})}}>
                                        <Text style={{color:"white",textAlign:"center",fontSize:20,fontFamily:"sans-serif-light"}}>
                                        Existing User ? Login
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                ):false
            }

            {/**
             * password screen
             */}

             {
                (this.state.passwordBoxVisible)?(
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:0.8,flexDirection:'column',paddingLeft:15}}>
                            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-end"}}>
                                <Image style={styles.imageMobileStyle}
                                    source={this.state.passwordCloseIcon } />
                                <TextInput
                                style={styles.mobileInputStyle} placeholderStyle={styles.textboxfieldd_style} 
                                onChangeText={this._password_box_change}  
                                value={this.state.passwordVal} underlineColorAndroid='transparent' placeholderTextColor="white" secureTextEntry={this.state._password_secure}  placeholder="password" />
                            </View>
                        </View>
                    </View>
                ):false
            }
            {
                (this.state.passwordOtpBoxVisible)?(
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:0.8,flexDirection:'column',paddingLeft:15}}>
                            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-end"}}>
                                <Image style={styles.imageMobileStyle}
                                    source={this.state.passwordCloseIcon } />
                                <TextInput
                                style={styles.mobileInputStyle} placeholderStyle={styles.textboxfieldd_style} 
                                onChangeText={this._password_otp_change}  secureTextEntry={true} 
                                value={this.state.passwordOtpVal} secureTextEntry={this.state._password_secure} underlineColorAndroid='transparent' placeholderTextColor="white" placeholder="confirm password" />
                            </View>
                        </View>
                    </View>
                ):false
            }

            {
                (this.state.nextButtonVisible && this.state.passwordBoxVisible)?(
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:0.93,flexDirection:"column"}} >
                            <View style={{flex:1,flexDirection:"row"}}>
                                <View style={{flex:1,flexDirection:"column",justifyContent:"center"}}>
                                    <TouchableHighlight onPress={this._onPressButton_password} activeOpacity={0.2} underlayColor="transparent" style={{height:40,backgroundColor:"grey",borderRadius:25,marginLeft:20}}>
                                        <Text style={{color:"white",textAlign:"center",fontWeight:"bold",fontSize:20,fontFamily:"sans-serif-light",paddingTop:5}}>Next</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <View style={{marginTop:20,flex:0.9}}>
                                <View style={{flex:0.9,flexDirection:"row",justifyContent:"center"}}>
                                    <TouchableOpacity onPress={()=>{this._mutate_my_state({loginType:true,signupType:false})}}>
                                        <Text style={{color:"white",textAlign:"center",fontSize:20,fontFamily:"sans-serif-light"}}>
                                        Existing User ? Login
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                ):false
            }



            {
                /**
                 * name screen
                 */
            }

            {
                (this.state.fNameBoxVisible)?(
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:0.8,flexDirection:'column',paddingLeft:15}}>
                            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-end"}}>
                                <Image style={styles.imageMobileStyle}
                                    source={this.state.personIcon } />
                                <TextInput
                                style={styles.mobileInputStyle} placeholderStyle={styles.textboxfieldd_style} 
                                onChangeText={this._f_name_change} keyboardType="email-address"
                                value={this.state.f_name} underlineColorAndroid='transparent' placeholderTextColor="white" placeholder="First name" />
                            </View>
                        </View>
                    </View>
                ):false
            }
            {
                (this.state.lnameBoxVisible)?(
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:0.8,flexDirection:'column',paddingLeft:15}}>
                            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"flex-end"}}>
                                <Image style={styles.imageMobileStyle}
                                    source={this.state.personIcon } />
                                <TextInput
                                style={styles.mobileInputStyle} placeholderStyle={styles.textboxfieldd_style} 
                                onChangeText={this._l_name_change} keyboardType="email-address"
                                value={this.state.l_name} underlineColorAndroid='transparent' placeholderTextColor="white" placeholder="Last name" />
                            </View>
                        </View>
                    </View>
                ):false
            }

            {/*
                gender
            */}

            {
                (this.state.lnameBoxVisible)?(
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:0.9,flexDirection:'row',paddingLeft:15,justifyContent:"flex-start",alignItems:"center"}}>
                        <Image style={styles.imageMobileStyle}
                                    source={this.state.personIcon } />
                            
                                    <RadioForm
                                    formHorizontal={true}
                                    animation={true}
                                    initial={0}
                                  >
                                    {/* To create radio buttons, loop through your array of options */}
                                    {this.state.genderList.map((obj, i) => {
                                      return(
                                        <RadioButton labelHorizontal={true} key={i} >
                                        {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                        <RadioButtonInput
                                          obj={obj}
                                          index={i}
                                          isSelected={this.state.selectedGenderIndex===i}
                                          onPress={(value)=>{
                                              this.setState({selectedGenderIndex:value})
                                          }}
                                          borderWidth={1}
                                          buttonInnerColor={'white'}
                                          buttonOuterColor={'white'}
                                          buttonSize={15}
                                          buttonOuterSize={20}
                                          buttonWrapStyle={{marginLeft: 10}}
                                        />
                                        <RadioButtonLabel
                                          obj={obj}
                                          index={i}
                                          labelHorizontal={true}
                                          onPress={(value)=>{
                                            this.setState({selectedGenderIndex:value})
                                          }}
                                          labelStyle={{fontSize: 16, color: 'white'}}
                                        />
                                        </RadioButton>
                                      )
                                    })}
                                    
                                  </RadioForm>
                        </View>
                    </View>
                ):false
            }

            

            {
                (this.state.nextButtonVisible && this.state.fNameBoxVisible)?(
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:0.93,flexDirection:"column"}} >
                            <View style={{flex:1,flexDirection:"row"}}>
                                <View style={{flex:1,flexDirection:"column",justifyContent:"center"}}>
                                    <TouchableHighlight onPress={this._onPressButton_signup} activeOpacity={0.2} underlayColor="transparent" style={{height:40,backgroundColor:"grey",borderRadius:25,marginLeft:20}}>
                                        <Text style={{color:"white",textAlign:"center",fontWeight:"bold",fontSize:20,fontFamily:"sans-serif-light",paddingTop:5}}>Next</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <View style={{marginTop:20,flex:0.9}}>
                                <View style={{flex:0.9,flexDirection:"row",justifyContent:"center"}}>
                                    <TouchableOpacity onPress={()=>{this._mutate_my_state({loginType:true,signupType:false})}}>
                                        <Text style={{color:"white",textAlign:"center",fontSize:20,fontFamily:"sans-serif-light"}}>
                                        Existing User ? Login
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                ):false
            }


            


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
    borderTopWidth: 0, 
    borderColor:'grey',
    borderWidth: 2,
    marginBottom:15,
    width:_width-75,
    paddingLeft:10,
    color:'white',
    borderRightWidth:0, 
  },
  passwordInputStyle:{
    height: 40,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth:0, 
    borderColor:'grey',
    borderWidth: 2,
    marginBottom:15,
    width:_width-50,
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
      marginBottom:15,
      borderRadius:10,
      backgroundColor:"transparent",
      borderRadius:15
  },
  imagePasswordStyle:{
    width:30,
    height:30,
    borderRadius:10,
    backgroundColor:"transparent",
    marginBottom:15
  }
});