import React from 'react';
import { StyleSheet, 
  View, 
  Text, 
  Dimensions, 
  TouchableOpacity, 
  FlatList, 
  Image } from 'react-native';

var _width = Dimensions.get('window').width;
var _height = Dimensions.get('window').height;

export default class MenuScreen extends React.Component {
    constructor(props){
        super(props);
        this._menu_navigation=this._menu_navigation.bind(this);
    }
    updateParentState(data) {
      this.props.updateParentState(data);
    }
    _menu_navigation(evt){
      if(evt.key=="Timepass chat"){
        this.updateParentState({menuVisible:false,timepassChatNeeded:true,suggestionVisible:false})
      }else if(evt.key=="Posts"){
        this.updateParentState({menuVisible:false,showPostsView:true})
      }else if(evt.key=="Profile"){
        this.updateParentState({menuVisible:false,showMyProfilePage:true})
      }else if(evt.key=="Settings"){
        this.updateParentState({menuVisible:false,showSettings:true})
      }else{
        alert(JSON.stringify(evt))
      }
      
    }
    render(){
        return (
            <View style={{flex:8,backgroundColor:"transparent"}} >
                <View style={{flex:1,paddingTop:30}}>
                <FlatList
                  data={[
                    {key: 'Timepass chat',image:require('./img/baseline_message_white_48dp.png')},
                    {key: 'Date history',image:require('./img/baseline_folder_special_white_48dp.png')},
                    {key: 'Profile',image:require('./img/ic_account_circle_white_24dp.png')},
                    {key: 'Posts',image:require('./img/baseline_create_white_48dp.png')},
                    {key: 'Settings',image:require('./img/baseline_settings_white_48dp.png')},
                    {key: 'Logout',image:require('./img/baseline_link_off_white_48dp.png')},
                  ]}
                  renderItem={({item}) => 
                      {
                        return (
                          <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center",backgroundColor:"#075e54"}}>
                            <View style={{flex:1.5,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                              <Image source={item.image} style={{width:40,height:40,borderRadius:20,opacity:0.5}} />
                            </View>
                            <View style={{flex:5,flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingLeft:5}}>
                              <TouchableOpacity onPress={this._menu_navigation.bind(this,item)} >
                                <Text style={styles.item}>{item.key}</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        )
                      }
                  }
                />
              </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
    item: {
      padding: 7,
      fontSize: 17,
      fontWeight:'bold',
      height: 40,
      color:"lightgrey",
      fontFamily:"sans-serif-light"
    },
  })