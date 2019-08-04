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
export default class ProfilePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          mappable_post:[
            {creator:"ajay",text:"hello there test 1",time:"1",isLiked:true,totalLike:20,totalShare:5},
            {creator:"jha",text:"hello there test 2",time:"1",isLiked:false,totalLike:20,totalShare:5},
            {creator:"me",text:"hello there test 3",time:"1",isLiked:true,totalLike:20,totalShare:5},
            {creator:"my",text:"hello there test 4",time:"1",isLiked:false,totalLike:20,totalShare:5}
          ],
          name:"Ajay jha",
          gender:"Male",
          age:25,
          relationShip:"Single",
          dp:this.props.DP
        };
        this.mutateMyState=this.mutateMyState.bind(this);
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
                        {
                          this.state.mappable_post.map( (a,b)=>{
                              return (
                                  <View key={b} >
                                      <View style={{backgroundColor:"#dcf8c6",width:width-40,borderColor:"grey",borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1,borderBottomWidth:1,borderRadius:30,marginLeft:20,marginTop:25,paddingTop:40}} >
                                          <View style={{flex:1,flexDirection:"column"}}>
                                              <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                                                  <Text>
                                                      {
                                                          a.text
                                                      }
                                                  </Text>
                                              </View>
                                          </View>
                                          <View style={{flex:1,flexDirection:"row",justifyContent:"center"}}>
                                              <Text style={{textAlign:"center",fontFamily:"sans-serif-light",fontSize:20,color:"grey",fontWeight:"bold"}}>{a.creator}
                                              </Text>
                                          </View>
                                          <View style={{flex:1,flexDirection:"row",justifyContent:"center"}}>
                                              <Text style={{textAlign:"center",fontFamily:"sans-serif-light",fontSize:20,color:"grey",fontWeight:"bold"}}>{a.time}
                                              </Text>
                                          </View>
                                      </View>
                                      <View style={{width:width-40,height:40,marginLeft:20}} >
                                          <View style={{flex:1,flexDirection:"column"}} >
                                              <View style={{flex:1,flexDirection:"row"}} >
                                                  <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                                      {
                                                          (a.isLiked)?(
                                                                  <Image source={require('./img/like.png')} style={{width:40,height:40,borderRadius:20}} />
                                                          ):(
                                                              <Image source={require('./img/liked.png')} style={{width:40,height:40,borderRadius:20}} />
                                                          )
                                                      }
                                                  </View>
                                                  <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                                      <View style={{flex:1,flexDirection:"row"}} >
                                                          <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}} >
                                                              
                                                              <Image source={require('./img/liked.png')} style={{width:20,height:20,borderRadius:10}} />
                                                          </View>
                                                          <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingLeft:5}} >
                                                              <Text style={{color:"white"}}>{a.totalLike}</Text>
                                                          </View>
                                                      </View>
                                                  </View>
                                                  <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                                      <View style={{flex:1,flexDirection:"row"}} >
                                                          <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end",alignItems:"center",paddingRight:5}} >
                                                              <Text style={{color:"white"}}>{a.totalShare}</Text>
                                                              
                                                          </View>
                                                          <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}} >
                                                              <Image source={require('./img/shared.png')} style={{width:20,height:20,borderRadius:10}} />
                                                          </View>
                                                      </View>
                                                  </View>
                                                  <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                                      <View style={{flex:1,flexDirection:"row"}} >
                                                          <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}} >
                                                              
                                                              <Image source={require('./img/shared.png')} style={{width:40,height:40,borderRadius:20}} />
                                                          </View>
                                                          <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}} >
                                                              <Text style={{color:"white"}}></Text>
                                                          </View>
                                                      </View>
                                                      
                                                  </View>
                                              </View>
                                          </View>
                                      </View>
                                  </View>
                              )
                          } )
                        }
                        </ScrollView >
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
    },
    item_1:{
        fontFamily:"sans-serif-light",
        color:"white",
        fontSize:15,
        fontWeight:"bold"
      }
});