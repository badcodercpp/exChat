import React, { Component } from 'react';
import {
  View,
  Text,
  Image, 
  Dimensions, 
  StyleSheet,
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView, 
  ScrollView, 
  Picker, 
  ToastAndroid,
  AsyncStorage 
} from 'react-native';
var {height, width} = Dimensions.get('window');
import CheckBox from 'react-native-checkbox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import SpinnerMine from './Spinner.js';

export default class Partner extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text:"",
            closeIcon:this.props.closeIcon,
            requestArray:[
                {
                    label:"Request location",
                    checked:true
                },
                {
                    label:"Request contact",
                    checked:true
                },
                {
                    label:"Request timepass",
                    checked:true
                },
                {
                    label:"Request dating",
                    checked:true
                }
            ],
            toggleSpinnerVisibility:false,
            loaderDisplay:false
        };
        this._change_my_about=this._change_my_about.bind(this);
        this.handelAboutText=this.handelAboutText.bind(this);
        this._ok_update_my_status=this._ok_update_my_status.bind(this);
        this._go_back_to_timepassChat=this._go_back_to_timepassChat.bind(this);
        this._handel_request_option=this._handel_request_option.bind(this);
    }
    fetchStatusHandler=(response) => {
        if (response.status === 200) {
          return response;
        } else {
          throw new Error(response.statusText);
        }
      }
    _goHomePage=async ()=>{
        let that=this;
        this.setState({loaderDisplay:true,toggleSpinnerVisibility:true})
        let ar=[];
        let par=[];
        ar.push(this.state.myHeight)
        ar.push(this.state.myWeight)
        ar.push(this.state.mySkinColor)
        ar.push(this.state.myEyeColor)
        ar.push(this.state.myHairColor)
        ar.push(this.state.amIintrovert)

        par.push(this.state.myHeight_p)
        par.push(this.state.myWeight_p)
        par.push(this.state.mySkinColor_p)
        par.push(this.state.myEyeColor_p)
        par.push(this.state.myHairColor_p)
        par.push(this.state.amIintrovert_p)

        let pusher={
            Me:ar,
            Partner:par
        }
        //alert(JSON.stringify(pusher))
        if (this.state.myHeight && this.state.myHeight_p && this.state.myWeight && this.state.myWeight_p && this.state.mySkinColor && this.state.mySkinColor_p && this.state.myEyeColor && this.state.myEyeColor_p && this.state.myHairColor && this.state.myHairColor_p && this.state.amIintrovert && this.state.amIintrovert_p) {
           
        } else {
            ToastAndroid.show('Ohho .. ! you can provide all this .', ToastAndroid.SHORT);
            
        }
        let nmp= await this._retrieveData('nmp')
        let dp=await this._retrieveData('dp')
        let dpI={
            dp:dp
        }
        navigator.geolocation.getCurrentPosition((data)=>{
            //alert(JSON.stringify(data));
            //this.setState()
            let coordd={latitude:data.coords.latitude,longitude:data.coords.longitude}
            let nmp1=JSON.parse(nmp)
            let ob=Object.assign(nmp1,pusher,coordd,dpI)
            //alert(JSON.stringify(ob))
            fetch('http://www.thelinkedface.com/signupApp', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(ob),
              })
              .then(that.fetchStatusHandler)
              .then(res=>res.json())
              .then((data)=>{
                //alert(JSON.stringify(data))
                that.setState({toggleSpinnerVisibility:false,loaderDisplay:false})
                that.mutateMyState({signupType:false,appAuthorize:true})
              })
              .catch((err)=>{
                  alert(JSON.stringify(err))
                  that.setState({toggleSpinnerVisibility:false,loaderDisplay:false})
              })
          })
        
        //fetch()
        //alert(JSON.stringify(ob))
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
    _handel_request_option(data,checked){
        //alert(data+checked)
        let temp=this.state.requestArray;
        // let overAllArray=[];
        // for(let datax of temp){
        //     if(!datax.checked){
        //         let x={
        //             label:datax.label,
        //             checked:true
        //         }
        //         overAllArray.push(x);
        //     }else{
        //         overAllArray.push(datax)
        //     }
        // }
        let newArray=[];
        for(let data1 of temp){
            if(data1.label==data){
                let x={
                    label:data1.label,
                    checked:!data1.checked
                }
                newArray.push(x);
            }else{
                newArray.push(data1)
            }
        }
        this.setState({requestArray:newArray})
        //alert(JSON.stringify(newArray))
    }
    _go_back_to_timepassChat(){
        this.mutateMyState({showRequestDatingPopup:false})
    }
    _ok_update_my_status(evt){
        //alert(this.state.text)
    }
    handelAboutText(text){
        this.setState({text:text})
    }
    _change_my_about(){

    }
    mutateMyState(data){
        this.props.mutateState(data)
    }
    _keyExtractor = (item, index) => item.label;
    
    render(){
        return (
            <View style={{position:"absolute",width:width,height:height,backgroundColor:"rgba(0,0,0,0.8)"}}>
                
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <KeyboardAwareScrollView >
                    <View style={{width:2.6*width/3,height:height-100,backgroundColor:"white",borderRadius:20,marginTop:20}}>
                        <View style={{flex:1,flexDirection:"column"}} >
                            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                                <View style={{flex:3,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                    <Text style={{fontFamily:"sans-serif-light",fontSize:18,color:"black"}} >
                                        Profile prefrences
                                    </Text>
                                </View>
                            </View>
                            <View style={{flex:7,flexDirection:"row"}} >
                                <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                       <ScrollView>
                                       <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center",marginBottom:5}} >
                                        <Picker
                                            selectedValue={this.state.myHeight}
                                            style={{ height: 30, width: 300 }}
                                            mode = "dialog"
                                            onValueChange={(itemValue, itemIndex) => {
                                                if (itemValue!=="ns") {
                                                    this.setState({myHeight: itemValue});
                                                }else{
                                                    ToastAndroid.show('Ohho .. ! you gona need to provide this .', ToastAndroid.SHORT);
                                                }
                                            }}>
                                            <Picker.Item label="Your height" value="ns" />
                                            <Picker.Item label="< 3 ft" value="< 3 ft" />
                                            <Picker.Item label="3 ft" value="3 ft" />
                                            <Picker.Item label="3 - 3.5 ft" value="3 - 3.5 ft" />
                                            <Picker.Item label="3.5 - 4 ft" value="3.5 - 4 ft" />
                                            <Picker.Item label="4 - 4.5 ft" value="4 - 4.5 ft" />
                                            <Picker.Item label="4.5 - 5 ft" value="4.5 - 5 ft" />
                                            <Picker.Item label="5 - 5.5 ft" value="5 - 5.5 ft" />
                                            <Picker.Item label="5.5 - 6 ft" value="5.5 - 6 ft" />
                                            <Picker.Item label="6 - 6.5 ft" value="6 - 6.5 ft" />
                                            <Picker.Item label="6.5 - 7 ft" value="6.5 - 7 ft" />
                                            <Picker.Item label="> 7 ft" value="> 7 ft" />
                                            </Picker>
                                        </View>
                                        <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center",marginBottom:5}} >
                                            <Picker
                                            selectedValue={this.state.myWeight}
                                            style={{ height: 30, width: 300 }}
                                            mode = "dialog"
                                            onValueChange={(itemValue, itemIndex) => {
                                                if (itemValue!=="ns") {
                                                    this.setState({myWeight: itemValue})
                                                } else {
                                                    ToastAndroid.show('Ohho .. ! you gona need to provide this .', ToastAndroid.SHORT);
                                                }
                                            }}>
                                            <Picker.Item label="Your weight" value="ns" />
                                            <Picker.Item label="< 30 Kg" value="< 30 Kg" />
                                            <Picker.Item label="30 - 40 Kg" value="30 - 40 Kg" />
                                            <Picker.Item label="40 - 50 Kg" value="40 - 50 Kg" />
                                            <Picker.Item label="50 - 60 Kg" value="50 - 60 Kg" />
                                            <Picker.Item label="60 - 70 Kg" value="60 - 70 Kg" />
                                            <Picker.Item label="70 - 80 Kg" value="70 - 80 Kg" />
                                            <Picker.Item label="80 - 90 Kg" value="80 - 90 Kg" />
                                            <Picker.Item label="90 - 100 Kg" value="90 - 100 Kg" />
                                            <Picker.Item label="> 100 Kg" value="> 100 Kg" />
                                            </Picker>
                                        </View>
                                        <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center",marginBottom:5}} >
                                            <Picker
                                            selectedValue={this.state.mySkinColor}
                                            style={{ height: 30, width: 300 }}
                                            mode = "dialog"
                                            onValueChange={(itemValue, itemIndex) => {
                                                if (itemValue!=="ns") {
                                                    this.setState({mySkinColor: itemValue})
                                                } else {
                                                    ToastAndroid.show('Ohho .. ! you gona need to provide this .', ToastAndroid.SHORT);
                                                }
                                            }}>
                                            <Picker.Item label="Your skin colour" value="ns" />
                                            <Picker.Item label="Fair" value="Fair" />
                                            <Picker.Item label="Little Fair" value="Little Fair" />
                                            <Picker.Item label="Extreme Fair" value="Extreme Fair" />
                                            <Picker.Item label="Dark" value="Dark" />
                                            <Picker.Item label="Little Dark" value="Little Dark" />
                                            <Picker.Item label="Extreme Dark" value="Extreme Dark" />
                                            </Picker>
                                        </View>
                                        <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center",marginBottom:5}} >
                                            <Picker
                                            selectedValue={this.state.myEyeColor}
                                            style={{ height: 30, width: 300 }}
                                            mode = "dialog"
                                            onValueChange={(itemValue, itemIndex) => {
                                                if (itemValue!=="ns") {
                                                    this.setState({myEyeColor: itemValue})
                                                } else {
                                                    ToastAndroid.show('Ohho .. ! you gona need to provide this .', ToastAndroid.SHORT);
                                                }
                                            }}>
                                            <Picker.Item label="Your eye colour" value="ns" />
                                            <Picker.Item label="Black" value="Black" />
                                            <Picker.Item label="Brown" value="Brown" />
                                            <Picker.Item label="Blue" value="Blue" />
                                            <Picker.Item label="Red" value="Red" />
                                            </Picker>
                                        </View>
                                        <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center",marginBottom:5}} >
                                            <Picker
                                            selectedValue={this.state.myHairColor}
                                            style={{ height: 30, width: 300 }}
                                            mode = "dialog"
                                            onValueChange={(itemValue, itemIndex) => {
                                                if (itemValue!=="ns") {
                                                    this.setState({myHairColor: itemValue})
                                                } else {
                                                    ToastAndroid.show('Ohho .. ! you gona need to provide this .', ToastAndroid.SHORT);
                                                }
                                            }}>
                                            <Picker.Item label="Your hair colour" value="ns" />
                                            <Picker.Item label="Black" value="Black" />
                                            <Picker.Item label="Brown" value="Brown" />
                                            <Picker.Item label="Blue" value="Blue" />
                                            <Picker.Item label="Red" value="Red" />
                                            </Picker>
                                        </View>
                                        <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center",marginBottom:20}} >
                                            <Picker
                                            selectedValue={this.state.amIintrovert}
                                            style={{ height: 30, width: 300 }}
                                            mode = "dialog"
                                            onValueChange={(itemValue, itemIndex) => {
                                                if (itemValue!=="ns") {
                                                    this.setState({amIintrovert: itemValue})
                                                } else {
                                                    ToastAndroid.show('Ohho .. ! you gona need to provide this .', ToastAndroid.SHORT);
                                                }
                                            }}>
                                            <Picker.Item label="Are you an introvert?" value="ns" />
                                            <Picker.Item label="Yes" value="Yes" />
                                            <Picker.Item label="No" value="No" />
                                            <Picker.Item label="Highly" value="Highly" />
                                            </Picker>
                                        </View>
                                        <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center",marginBottom:20}} >
                                            <Text style={{color:"black",paddingTop:10,paddingBottom:10,fontFamily:"sans-serif-light",fontSize:17}} >
                                                Let us know about your partner's choice
                                            </Text>
                                        </View>
                                        <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center",marginBottom:5}} >
                                        <Picker
                                            selectedValue={this.state.myHeight_p}
                                            style={{ height: 30, width: 300 }}
                                            mode = "dialog"
                                            onValueChange={(itemValue, itemIndex) => {
                                                if (itemValue!=="ns") {
                                                    this.setState({myHeight_p: itemValue})
                                                } else {
                                                    ToastAndroid.show('Ohho .. ! you gona need to provide this .', ToastAndroid.SHORT);
                                                }
                                            }}>
                                            <Picker.Item label="Prefered height" value="ns" />
                                            <Picker.Item label="< 3 ft" value="< 3 ft" />
                                            <Picker.Item label="3 ft" value="3 ft" />
                                            <Picker.Item label="3 - 3.5 ft" value="3 - 3.5 ft" />
                                            <Picker.Item label="3.5 - 4 ft" value="3.5 - 4 ft" />
                                            <Picker.Item label="4 - 4.5 ft" value="4 - 4.5 ft" />
                                            <Picker.Item label="4.5 - 5 ft" value="4.5 - 5 ft" />
                                            <Picker.Item label="5 - 5.5 ft" value="5 - 5.5 ft" />
                                            <Picker.Item label="5.5 - 6 ft" value="5.5 - 6 ft" />
                                            <Picker.Item label="6 - 6.5 ft" value="6 - 6.5 ft" />
                                            <Picker.Item label="6.5 - 7 ft" value="6.5 - 7 ft" />
                                            <Picker.Item label="> 7 ft" value="> 7 ft" />
                                            </Picker>
                                        </View>
                                        <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center",marginBottom:5}} >
                                            <Picker
                                            selectedValue={this.state.myWeight_p}
                                            style={{ height: 30, width: 300 }}
                                            mode = "dialog"
                                            onValueChange={(itemValue, itemIndex) => {
                                                if (itemValue!=="ns") {
                                                    this.setState({myWeight_p: itemValue})
                                                } else {
                                                    ToastAndroid.show('Ohho .. ! you gona need to provide this .', ToastAndroid.SHORT);
                                                }
                                            }}>
                                            <Picker.Item label="Prefered weight" value="ns" />
                                            <Picker.Item label="< 30 Kg" value="< 30 Kg" />
                                            <Picker.Item label="30 - 40 Kg" value="30 - 40 Kg" />
                                            <Picker.Item label="40 - 50 Kg" value="40 - 50 Kg" />
                                            <Picker.Item label="50 - 60 Kg" value="50 - 60 Kg" />
                                            <Picker.Item label="60 - 70 Kg" value="60 - 70 Kg" />
                                            <Picker.Item label="70 - 80 Kg" value="70 - 80 Kg" />
                                            <Picker.Item label="80 - 90 Kg" value="80 - 90 Kg" />
                                            <Picker.Item label="90 - 100 Kg" value="90 - 100 Kg" />
                                            <Picker.Item label="> 100 Kg" value="> 100 Kg" />
                                            </Picker>
                                        </View>
                                        <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center",marginBottom:5}} >
                                            <Picker
                                            selectedValue={this.state.mySkinColor_p}
                                            style={{ height: 30, width: 300 }}
                                            mode = "dialog"
                                            onValueChange={(itemValue, itemIndex) => {
                                                if (itemValue!=="ns") {
                                                    this.setState({mySkinColor_p: itemValue})
                                                } else {
                                                    ToastAndroid.show('Ohho .. ! you gona need to provide this .', ToastAndroid.SHORT);
                                                }
                                            }}>
                                            <Picker.Item label="Prefered skin colour" value="ns" />
                                            <Picker.Item label="Fair" value="Fair" />
                                            <Picker.Item label="Little Fair" value="Little Fair" />
                                            <Picker.Item label="Extreme Fair" value="Extreme Fair" />
                                            <Picker.Item label="Dark" value="Dark" />
                                            <Picker.Item label="Little Dark" value="Little Dark" />
                                            <Picker.Item label="Extreme Dark" value="Extreme Dark" />
                                            </Picker>
                                        </View>
                                        <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center",marginBottom:5}} >
                                            <Picker
                                            selectedValue={this.state.myEyeColor_p}
                                            style={{ height: 30, width: 300 }}
                                            mode = "dialog"
                                            onValueChange={(itemValue, itemIndex) => {
                                                if (itemValue!=="ns") {
                                                    this.setState({myEyeColor_p: itemValue})
                                                } else {
                                                    ToastAndroid.show('Ohho .. ! you gona need to provide this .', ToastAndroid.SHORT);
                                                }
                                            }}>
                                            <Picker.Item label="Prefered eye colour" value="ns" />
                                            <Picker.Item label="Black" value="Black" />
                                            <Picker.Item label="Brown" value="Brown" />
                                            <Picker.Item label="Blue" value="Blue" />
                                            <Picker.Item label="Red" value="Red" />
                                            </Picker>
                                        </View>
                                        <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center",marginBottom:5}} >
                                            <Picker
                                            selectedValue={this.state.myHairColor_p}
                                            style={{ height: 30, width: 300 }}
                                            mode = "dialog"
                                            onValueChange={(itemValue, itemIndex) => {
                                                if (itemValue!=="ns") {
                                                    this.setState({myHairColor_p: itemValue})
                                                } else {
                                                    ToastAndroid.show('Ohho .. ! you gona need to provide this .', ToastAndroid.SHORT);
                                                }
                                            }}>
                                            <Picker.Item label="Prefered hair colour" value="ns" />
                                            <Picker.Item label="Black" value="Black" />
                                            <Picker.Item label="Brown" value="Brown" />
                                            <Picker.Item label="Blue" value="Blue" />
                                            <Picker.Item label="Red" value="Red" />
                                            </Picker>
                                        </View>
                                        <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center",marginBottom:20}} >
                                            <Picker
                                            selectedValue={this.state.amIintrovert_p}
                                            style={{ height: 30, width: 300 }}
                                            mode = "dialog"
                                            onValueChange={(itemValue, itemIndex) => {
                                                if (itemValue!=="ns") {
                                                    this.setState({amIintrovert_p: itemValue})
                                                } else {
                                                    ToastAndroid.show('Ohho .. ! you gona need to provide this .', ToastAndroid.SHORT);
                                                }
                                            }}>
                                            <Picker.Item label="Need to be an introvert?" value="ns" />
                                            <Picker.Item label="Yes" value="Yes" />
                                            <Picker.Item label="No" value="No" />
                                            <Picker.Item label="I Don't Care" value="I Don't Care" />
                                            </Picker>
                                        </View>
                                        </ScrollView>
                                    </View>
                                </View>
                            </View>
                            
                        </View>
                        {
                            (this.state.loaderDisplay)?(
                                <SpinnerMine size="large" Visible={this.state.toggleSpinnerVisibility} />
                            ):false
                        }
                    </KeyboardAwareScrollView>
                        <View style={{flex:1,flexDirection:"row",marginBottom:20}}>
                            <View style={{flex:1,flexDirection:"column",justifyContent:"center"}}>
                                <TouchableOpacity onPress={this._goHomePage} activeOpacity={0.2} underlayColor="transparent" style={{height:40,backgroundColor:"grey",borderRadius:25}}>
                                    <Text style={{color:"white",textAlign:"center",fontWeight:"bold",fontSize:20,fontFamily:"sans-serif-light",paddingTop:5}}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#075e54'
    },
    item_1:{
        fontFamily:"sans-serif-light",
        color:"white",
        fontSize:15,
        fontWeight:"bold"
    },
    item_2:{
        fontFamily:"sans-serif-light",
        color:"black",
        fontSize:15,
        fontWeight:"bold"
    }
});