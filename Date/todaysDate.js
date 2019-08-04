import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar, 
  Dimensions, 
  StyleSheet
} from 'react-native';
var {height, width} = Dimensions.get('window');
export default class TodaysDate extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }
    render(){
        return (
            <View style={{position:"absolute",width:width,height:height,backgroundColor:"#075e54",marginLeft:0}}>
                <StatusBar hidden={false}
                backgroundColor="#075e54"
                barStyle="light-content"
                />
                <View  style={{width:"100%",height:"100%"}} >
                <View style={styles.container}>
                <Text>
                    hello
                    </Text>
                </View>
                <View style={styles.container}>
                    <Text>
                    hi
                    </Text>
    
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
    }
});