import React, { Component } from 'react';
import {
  View,
  Text,
  Image, 
  Dimensions, 
  StyleSheet,
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView
} from 'react-native';
var {height, width} = Dimensions.get('window');
import CheckBox from 'react-native-checkbox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default class PickFile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }
    
    mutateMyState=(data)=>{
        this.props.MutateParentState(data)
    }
    
    render(){
        return (
            <View style={{position:"absolute",width:width,height:height,backgroundColor:"#075e54",marginLeft:0,justifyContent:"center",alignItems:"center"}}>
               
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