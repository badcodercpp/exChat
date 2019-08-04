import React, { Component } from 'react';
import {
  View,
  Text,
  Image, 
  Dimensions, 
  StyleSheet,
  TouchableOpacity, 
  TextInput ,
  ScrollView
} from 'react-native';
var {height, width} = Dimensions.get('window');
export default class SettingScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          name:"Ajay jha",
          gender:"Male",
          age:25,
          relationShip:"Single",
          dp:this.props.DP,
          name_edit:false
        };
        this.mutateMyState=this.mutateMyState.bind(this);
    }
    save_setting=()=>{

    }
    mutateMyState(data){
        this.props.MutateParentState(data)
    }
    render(){
        return (
            <View style={{flex:1,flexDirection:"column"}}>
                <View style={{flex:2,flexDirection:"row",paddingBottom:10,paddingTop:10}}>
                    
                    <View style={{flex:1,flexDirection:"column"}} >
                      <View style={{flex:1,justifyContent:"center",alignItems:"center"}} >
                        <Image source={this.state.dp} style={{width:100,height:100,borderRadius:50}} />
                      </View>
                    </View>
                    <View style={{flex:1,flexDirection:"column"}} >
                      <View style={{flex:1,flexDirection:"row"}} >
                        <Text style={{color:"white"}} >{this.state.name}
                        </Text>
                      </View>
                      <View style={{flex:1,flexDirection:"row"}} >
                        <Text style={{color:"white"}}>{this.state.gender}
                        </Text>
                      </View>
                      <View style={{flex:1,flexDirection:"row"}} >
                        <Text style={{color:"white"}}>{`${this.state.age} year old`}
                        </Text>
                      </View>
                      <View style={{flex:1,flexDirection:"row"}} >
                        <Text style={{color:"white"}}>{this.state.relationShip}
                        </Text>
                      </View>
                      
                    </View>
                </View>
                <View style={{flex:7,flexDirection:"row"}}>
                    
                    <View style={{flex:1,flexDirection:"column",paddingBottom:50}}>
                        <ScrollView >
                            <View style={{width:width-40,height:50,flex:1,flexDirection:"column",borderBottomColor:"grey",borderBottomWidth:1,borderTopColor:"grey",borderTopWidth:1,marginLeft:20,marginBottom:20}} >
                                <View style={{flex:1,flexDirection:"row"}}>
                                    <View style={{flex:4,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                        <TextInput
                                            style={{height: 40,width:2*width/3,color:"white"}}
                                            onChangeText={(text) => this.setState({text})}
                                            value={this.state.name} 
                                            editable={this.state.name_edit}
                                            
                                        />
                                    </View>
                                    <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                        <TouchableOpacity >
                                            <Image source={require('./img/settings.png')} style={{width:50,height:50,borderRadius:25}} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{width:width-40,height:50,flex:1,flexDirection:"column",borderBottomColor:"grey",borderBottomWidth:1,borderTopColor:"grey",borderTopWidth:1,marginLeft:20,marginBottom:20}} >
                                <View style={{flex:1,flexDirection:"row"}}>
                                    <View style={{flex:4,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                        <TextInput
                                            style={{height: 40,width:2*width/3,color:"white"}}
                                            onChangeText={(text) => this.setState({text})}
                                            value={this.state.name} 
                                            editable={this.state.name_edit}
                                            
                                        />
                                    </View>
                                    <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                        <TouchableOpacity >
                                            <Image source={require('./img/settings.png')} style={{width:50,height:50,borderRadius:25}} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{width:width-40,height:50,flex:1,flexDirection:"column",borderBottomColor:"grey",borderBottomWidth:1,borderTopColor:"grey",borderTopWidth:1,marginLeft:20,marginBottom:20}} >
                                <View style={{flex:1,flexDirection:"row"}}>
                                    <View style={{flex:4,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                        <TextInput
                                            style={{height: 40,width:2*width/3,color:"white"}}
                                            onChangeText={(text) => this.setState({text})}
                                            value={this.state.name} 
                                            editable={this.state.name_edit}
                                            
                                        />
                                    </View>
                                    <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                        <TouchableOpacity >
                                            <Image source={require('./img/settings.png')} style={{width:50,height:50,borderRadius:25}} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{width:width-40,height:50,flex:1,flexDirection:"column",borderBottomColor:"grey",borderBottomWidth:1,borderTopColor:"grey",borderTopWidth:1,marginLeft:20,marginBottom:20}} >
                                <View style={{flex:1,flexDirection:"row"}}>
                                    <View style={{flex:4,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                        <TextInput
                                            style={{height: 40,width:2*width/3,color:"white"}}
                                            onChangeText={(text) => this.setState({text})}
                                            value={this.state.name} 
                                            editable={this.state.name_edit}
                                            
                                        />
                                    </View>
                                    <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                        <TouchableOpacity >
                                            <Image source={require('./img/settings.png')} style={{width:50,height:50,borderRadius:25}} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ScrollView >
                    </View>
                </View>
                <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center",paddingBottom:20}}>
                    <TouchableOpacity onPress={this.save_setting} >
                        <View style={{width:width-40,height:40,borderBottomLeftRadius:15,borderBottomRightRadius:15,borderTopLeftRadius:15,borderTopRightRadius:15,backgroundColor:"lightgrey",justifyContent:"center",alignItems:"center"}} >
                            <Text>
                                Save
                            </Text>
                        </View>
                    </TouchableOpacity>
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
      }
});