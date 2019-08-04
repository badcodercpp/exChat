import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
export default class SignupBodyHead extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loginType:true,
      signupType:false,
      mainType:false,
      imageUrl:this.props.Logo
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
        style={styles.imageStyle}
        source={this.state.imageUrl} >
            
        </Image>
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
    justifyContent: 'flex-end',
  },
  imageStyle:{
    width:100,
    height:100,
    borderRadius: 15,
  }
});