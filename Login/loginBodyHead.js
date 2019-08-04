import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default class LoginBodyHead extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loginType:true,
      signupType:false,
      mainType:false,
      imageUrl:"https://www.thelinkedface.com/humbrella/logo_um.jpg",
      message:""
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView style={{flex:1,flexDirection:"row"}} keyboardShouldPersistTaps="never">
        <View style={{flex:1,alignSelf:"stretch",flexDirection:"column",justifyContent:"flex-end"}}>
        <Image
        style={styles.imageStyle}
        source={require('./img/logo_um.jpg')} >
            
        </Image>
        <Text style={{fontFamily:"sans-serif-light",fontSize:20,color:"white"}}>
          {this.state.message}
        </Text>
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:"stretch"
  },
  imageStyle:{
    width:100,
    height:100,
    borderRadius: 15,
  }
});