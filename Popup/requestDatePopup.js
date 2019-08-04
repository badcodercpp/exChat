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
  ImageBackground,
  StatusBar, 
  AsyncStorage, 
  Keyboard
} from 'react-native';
var {height, width} = Dimensions.get('window');
import CheckBox from 'react-native-checkbox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SpinnerMine from './Spinner.js';
export default class RequestDating extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            account_logo:this.props.account_logo,
            text:"",
            closeIcon:this.props.closeIcon,
            requestArray:[
                {
                    label:"Request location",
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
            name:this.props.Id.name,
            id:this.props.Id.id,
            isRequestHappen:false,
            isSpinnerVisible:false
        };
        this._change_my_about=this._change_my_about.bind(this);
        this.handelAboutText=this.handelAboutText.bind(this);
        this._ok_update_my_status=this._ok_update_my_status.bind(this);
        this._go_back_to_timepassChat=this._go_back_to_timepassChat.bind(this);
        this._handel_request_option=this._handel_request_option.bind(this);
    }
    _keyboardDidShow () {
        
    }
    
    _keyboardDidHide () {
        StatusBar.setHidden(true);
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
    _post_my_date_request=(payload)=>{
        /*fetch('https://facebook.github.io/react-native/movies.json',{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: payload,
          })
        .then((response) => response.json())
        .then((responseJson) => {
          //return responseJson.movies;
        })
        .catch((error) => {
          console.error(error);
        });*/
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
    async _ok_update_my_status(evt){
        //alert(JSON.stringify(evt))
        let that=this;
        this.setState({isRequestHappen:true,isSpinnerVisible:true})
        let from=await this._retrieveData("globalAppMobile");
        //alert("hi"+from)
        let to=this.state.id;
        let tempMess=this.state.text;
        let rL=false;
        let rT=false;
        let rD=false;
        for(let m of this.state.requestArray){
            if (m.label=="Request location") {
                rL=m.checked;
            } else if (m.label=="Request timepass") {
                rT=m.checked;
            } else if (m.label=="Request dating") {
                rD=m.checked;
            } 
        }
        let payload={Loc:rL,Timepass:rT,Dating:rD,To:to,From:from,Message:tempMess,Approved:false};
        //alert(JSON.stringify(payload))
        fetch('http://www.thelinkedface.com/saveMyDatingRequestPlease',{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          })
        .then((response) => response.json())
        .then((responseJson) => {
          //return responseJson.movies;
          //alert(JSON.stringify(responseJson))
          that.setState({isRequestHappen:false,isSpinnerVisible:false});
          that.mutateMyState({showRequestDatingPopup:false});
        })
        .catch((error) => {
          console.error(error);
        });
    }
    handelAboutText(text){
        this.setState({text:text})
    }
    _change_my_about(){

    }
    mutateMyState(data){
        this.props.MutateParentState(data)
    }
    _keyExtractor = (item, index) => item.label;
    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
      }
    componentDidMount(){
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    render(){
        return (
            <View style={{position:"absolute",width:width,height:height,backgroundColor:"#075e54",marginLeft:0,justifyContent:"center",alignItems:"center"}}>
                <StatusBar hidden={true}
                backgroundColor="transparent"
                barStyle="light-content"
                />
                <ImageBackground imageStyle={styles.imageStyle} style={{width:"100%",height:"100%"}} 
                source={require('./img/umbrella.jpg')}>
                <View style={styles.signupHeadContainer}>
                <KeyboardAwareScrollView contentContainerStyle={{flex:1,justifyContent:"center",alignItems:"center"}} enableOnAndroid={true}>
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <View style={{width:2.6*width/3,height:350,backgroundColor:"white",borderRadius:20}}>
                        {
                            (!this.state.isRequestHappen)?(
                            <View style={{flex:1,flexDirection:"column"}} >
                            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                                <TouchableOpacity onPress={this._go_back_to_timepassChat}>
                                    <Image source={this.state.closeIcon} style={{width:40,height:40,paddingRight:30}} />
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                                    <Text style={styles.item_2} >{`Send request to ${this.state.name}`}</Text>
                                </View>
                            <View style={{flex:6,flexDirection:"row"}} >
                                
                                <View style={{flex:1,flexDirection:"column"}} >
                                    <View style={{flex:8,flexDirection:"column",paddingLeft:30,paddingRight:20}}>
                                    {
                                        this.state.requestArray.map( (item, index)=>{
                                            return (
                                                <View key={index} style={{flex:1,flexDirection:"row"}} >
                                                    <CheckBox
                                                        label={item.label}
                                                        checked={item.checked}
                                                        onChange={(data)=>{
                                                            this._handel_request_option(item.label,data)
                                                        }}
                                                        labelBefore={false}
                                                    />
                                                </View>
                                            )
                                        } )
                                    }
                                    </View>
                                    <View style={{flex:2,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                                    <TextInput 
                                        multiline = {true}
                                        numberOfLines = {4}
                                        onChangeText={(text) => this.handelAboutText(text)}
                                        value={this.state.text}
                                        editable = {true}
                                        maxLength = {100}
                                        style={{borderBottomColor: '#000000',borderBottomWidth: 1,borderTopColor: '#000000',borderTopWidth: 1,width:2*width/3}}
                                        placeholder="Request reason"
                                    />
                                    </View>
                                    <View style={{flex:2,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                                        <TouchableOpacity onPress={this._ok_update_my_status}>
                                            <View style={{width:2*width/3,height:35,backgroundColor:"#075e54",justifyContent:"center",alignItems:"center",borderRadius:20}}>
                                                <Text style={styles.item_1}>Request</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        ):false
                        }
                        {
                            (this.state.isRequestHappen)?(
                                <SpinnerMine visible={this.state.isSpinnerVisible} />
                            ):false
                        }
                    </View>
                </View>
                
                </KeyboardAwareScrollView>
                </View>
                </ImageBackground>
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
    },
    imageStyle:{
        flex:1,
        resizeMode:"cover"
    },
    signupHeadContainer:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
    }
});