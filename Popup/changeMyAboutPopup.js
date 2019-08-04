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
  StatusBar
} from 'react-native';
var {height, width} = Dimensions.get('window');
export default class ChangeMyAbout extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            account_logo:this.props.account_logo,
            text:"",
            closeIcon:this.props.closeIcon
        };
        this._change_my_about=this._change_my_about.bind(this);
        this.handelAboutText=this.handelAboutText.bind(this);
        this._ok_update_my_status=this._ok_update_my_status.bind(this);
        this._go_back_to_timepassChat=this._go_back_to_timepassChat.bind(this);
    }
    _go_back_to_timepassChat(){
        this.mutateMyState({showChangeMyAboutPopup:false,timepassChatNeeded:true})
    }
    _ok_update_my_status(evt){
        alert(this.state.text)
    }
    handelAboutText(text){
        this.setState({text:text})
    }
    _change_my_about(){

    }
    mutateMyState(data){
        this.props.MutateParentState(data)
    }
    render(){
        return (
            <View style={{position:"absolute",width:width,height:height,backgroundColor:"#075e54",marginLeft:0}}>
                <StatusBar hidden={true}
                backgroundColor="transparent"
                barStyle="light-content"
                />
                <ImageBackground imageStyle={styles.imageStyle} style={{width:"100%",height:"100%"}} 
                source={require('./img/umbrella.jpg')}>
                <View style={styles.signupHeadContainer}>
                <KeyboardAvoidingView style={{flex:1}} behavior="padding" enabled keyboardVerticalOffset={25}>
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <View style={{width:2.6*width/3,height:height/2,backgroundColor:"white",borderRadius:20}}>
                        <View style={{flex:1,flexDirection:"column"}} >
                            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                                <TouchableOpacity onPress={this._go_back_to_timepassChat}>
                                    <Image source={this.state.closeIcon} style={{width:40,height:40,paddingRight:30}} />
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:6,flexDirection:"row"}} >
                                <View style={{flex:1,flexDirection:"column"}} >
                                    <View style={{flex:2,flexDirection:"row",justifyContent:"center",alignItems:"center",paddingLeft:30,paddingRight:20}}>
                                        <Text style={styles.item_2} >Can you write your about in just 100 charecters ? Do it ,it's a challenge !!</Text>
                                    </View>
                                    <View style={{flex:4,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                                    <TextInput 
                                        multiline = {true}
                                        numberOfLines = {4}
                                        onChangeText={(text) => this.handelAboutText(text)}
                                        value={this.state.text}
                                        editable = {true}
                                        maxLength = {100}
                                        style={{borderBottomColor: '#000000',borderBottomWidth: 1,borderTopColor: '#000000',borderTopWidth: 1,width:2*width/3}}
                                        placeholder="your about"
                                    />
                                    </View>
                                    <View style={{flex:2,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                                        <TouchableOpacity onPress={this._ok_update_my_status}>
                                            <View style={{width:2*width/3,height:35,backgroundColor:"#075e54",justifyContent:"center",alignItems:"center",borderRadius:20}}>
                                                <Text style={styles.item_1}>Update</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                </KeyboardAvoidingView>
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
    signupHeadContainer:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
    }
});