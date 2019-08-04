import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class SignupBodyFoot extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loginType:true,
      signupType:false,
      mainType:false,
      imageUrl:"",
      footText:""
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{textAlign:"center",fontSize:20,color:"white"}}>
            {this.state.footText}
        </Text> 
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
  }
});