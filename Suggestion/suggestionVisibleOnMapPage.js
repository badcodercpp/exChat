import React, { Component } from 'react';
import {
  View,
  Text, 
  FlatList,
  Image,
  TouchableOpacity 
} from 'react-native';



export default class SuggestionsOfChatOnMapPage extends React.Component {
  constructor(props){
      super(props);
      this.state = {

      };
      this.searchpeople_touch_active=this.searchpeople_touch_active.bind(this);
  }
  searchpeople_touch_active(evt){
    alert(JSON.stringify(evt))
  }
  render(){
      return (
        <View style={{flex:1,flexDirection:"row"}} >
            <FlatList
            data={[
                {key: 'badcoder',image:'https://facebook.github.io/react-native/docs/assets/favicon.png'},
                {key: 'Pratibha sharma',image:'https://facebook.github.io/react-native/docs/assets/favicon.png'},
                {key: 'Kriti nainwal',image:'https://facebook.github.io/react-native/docs/assets/favicon.png'},
                {key: 'Ishwar singh',image:'https://facebook.github.io/react-native/docs/assets/favicon.png'},
            ]}
            renderItem={({item}) => 
                {
                    return (
                    <View style={{flex:1,flexDirection:"row",backgroundColor:"dimgrey",height:50}}>
                        <View style={{flex:1.5,flexDirection:"column",justifyContent:"center",alignItems:"flex-end"}}>
                            <Image source={{uri:item.image}} style={{width:40,height:40,borderRadius:20,opacity:0.5}} />
                        </View>
                        <View style={{flex:5,flexDirection:"column",justifyContent:"center",alignItems:"flex-start",paddingLeft:5}}>
                            <TouchableOpacity onPress={this.searchpeople_touch_active.bind(this,item)}>
                            <Text style={styles.item}>{item.key}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    )
                }
            }
            />
        </View>
      )
  }
}