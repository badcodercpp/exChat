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
import PostOptionPopup from './popup/postOptionPopup.js'
var {height, width} = Dimensions.get('window');
export default class ProfilePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          mappable_post:[
            {threadOpen:true,id:"123",creator:"ajay",text:"hello there test 1 fgsgfhgsgfhgsgf hfgjhsf fgsfgsb fgsgygefg fgysefuygs fgseygfsg",time:"1",isLiked:true,totalLike:20,totalShare:5,openedThread:[]},
            {threadOpen:true,id:"124",creator:"jha",text:"hello there test 2",time:"1",isLiked:false,totalLike:20,totalShare:5,openedThread:[]},
            {threadOpen:true,id:"125",creator:"me",text:"hello there test 3",time:"1",isLiked:true,totalLike:20,totalShare:5,openedThread:[]},
            {threadOpen:true,id:"126",creator:"my",text:"hello there test 4",time:"1",isLiked:false,totalLike:20,totalShare:5,
            openedThread:[
                {
                    id:"111",
                    creator:"ajay jha",
                    time:"1",
                    totalLike:5,
                    totalShare:6,
                    totalThreadOpened:6,
                    text:"this is demo comment",
                    isLiked:true
                },
                {
                    id:"112",
                    creator:"ajay kumar jha",
                    time:"1",
                    totalLike:5,
                    totalShare:7,
                    totalThreadOpened:6,
                    text:"this is second demo comment",
                    isLiked:false
                }
            ]}
        ],
          name:"Ajay jha",
          gender:"Male",
          age:25,
          relationShip:"Single",
          interest:"Female",
          dp:this.props.DP,
          getCurrentMoreOptionId:"",
          getCurrentCommentId:"",
          show_delete_post_popup:false,
          show_hide_post_popup:false,
          show_manage_privacy_post_popup:false
        };
        this.mutateMyState=this.mutateMyState.bind(this);
    }
    
    mutateMyState(data){
        this.props.MutateParentState(data)
    }
    receiveStateFromChild=(data)=>{
        this.setState(data)
    }
    render(){
        return (
            <View style={{flex:1,flexDirection:"column"}}>
                <View style={{flex:2,flexDirection:"row",paddingBottom:10,paddingTop:10}}>
                    
                    <View style={{flex:1,flexDirection:"column"}} >
                      <View style={{flex:1,justifyContent:"center",alignItems:"center"}} >
                        <Image source={this.state.dp} style={{width:120,height:120,borderRadius:60}} />
                      </View>
                    </View>
                    <View style={{flex:1,flexDirection:"column"}} >
                      <View style={{flex:1,flexDirection:"row"}} >
                        <Text style={{color:"black"}} >{this.state.name}
                        </Text>
                      </View>
                      <View style={{flex:1,flexDirection:"row"}} >
                        <Text style={{color:"black"}}>{this.state.gender}
                        </Text>
                      </View>
                      <View style={{flex:1,flexDirection:"row"}} >
                        <Text style={{color:"black"}}>{this.state.relationShip}
                        </Text>
                      </View>
                      <View style={{flex:1,flexDirection:"row"}} >
                        <Text style={{color:"black"}}>Interested in - {this.state.interest}
                        </Text>
                      </View>
                      
                    </View>
                </View>
                <View style={{flex:7,flexDirection:"row"}}>
                    
                    <View style={{flex:1,flexDirection:"column",paddingBottom:50}}>
                        <ScrollView>
                            {
                                this.state.mappable_post.map( (a,b)=>{
                                    return (
                                        <View key={b} style={{backgroundColor:"#ece5dd",marginBottom:25}} >
                                                <View style={{maxWidth:width,marginLeft:15,marginTop:15}} >
                                                    <View style ={{flex:1,flexDirection:"row"}} >
                                                        <View style ={{flex:1,justifyContent:"center",alignItems:"center"}} >
                                                            <Text style={{color:"black"}} >{a.creator}</Text>
                                                        </View>
                                                        <View style ={{flex:1,justifyContent:"center",alignItems:"center"}} >
                                                            <Text style={{color:"black"}} >created this thread</Text>
                                                        </View>
                                                    </View>
                                                </View >
                                                <View style={{maxWidth:width,marginLeft:15}} >
                                                    <View style ={{flex:1,flexDirection:"row"}} >
                                                        
                                                        <View style ={{flex:1,justifyContent:"center",alignItems:"center"}} >
                                                            <Text style={{color:"black"}} >{a.time}</Text>
                                                        </View>
                                                        <View style ={{flex:1,justifyContent:"center",alignItems:"center"}} >

                                                            
                                                            {
                                                                (a.id===this.state.getCurrentMoreOptionId)?(
                                                                    <View style={{position:"absolute",width:150,height:90,backgroundColor:"white",borderRadius:20,justifyContent:"center",alignItems:"flex-start",zIndex:5,top:10}} >
                                                                        <View style={{flex:1,justifyContent:"center",alignItems:"flex-end",right:0,position:"absolute"}}>
                                                                            <TouchableOpacity onPress={()=>{
                                                                                    this.setState({getCurrentMoreOptionId:""})
                                                                                }} >
                                                                                <Image source={require('./img/close.png')} style={{width:40,height:40,borderRadius:20}} />
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                        <View style={{flex:1,paddingLeft:15}} >
                                                                            <TouchableOpacity onPress={()=>{
                                                                                    this.setState({show_delete_post_popup:true,currentAccessiblePostData:a})
                                                                                }} >
                                                                                <Text style={{textDecorationLine:"underline",textDecorationStyle:"solid",color:"black"}} >close thread</Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                        <View style={{flex:1,paddingLeft:15}} >
                                                                            <TouchableOpacity onPress={()=>{
                                                                                    this.setState({show_hide_post_popup:true,currentAccessiblePostData:a})
                                                                                }} >
                                                                                <Text style={{textDecorationLine:"underline",textDecorationStyle:"solid",color:"black"}} >hide thread</Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                        <View style={{flex:1,paddingLeft:15}} >
                                                                            <TouchableOpacity onPress={()=>{
                                                                                    this.setState({show_manage_privacy_post_popup:true,currentAccessiblePostData:a})
                                                                                }} >
                                                                                <Text style={{textDecorationLine:"underline",textDecorationStyle:"solid",color:"black"}} >manage privacy</Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    </View>
                                                                ):(
                                                                    <TouchableOpacity onPress={()=>{
                                                                            this.setState({getCurrentMoreOptionId:a.id})
                                                                        }}>
                                                                        <Image source={require('./img/hor_more.png')} style={{width:40,height:40,borderRadius:20}} />
                                                                    </TouchableOpacity>
                                                                )
                                                            }
                                                        </View>
                                                    </View>
                                                </View >
                                                <View style={{maxWidth:width,marginLeft:15,marginRight:15,marginTop:15}} >
                                                    
                                                <View >
                                                <View style={{justifyContent:"center",alignItems:"center"}} >
                                                <View style={{backgroundColor:"#dcf8c6",alignSelf:"flex-start",borderColor:"grey",borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1,borderBottomWidth:1,borderRadius:30}}>
                                                    <Text style={{paddingLeft:30,paddingBottom:5,paddingTop:0,paddingRight:30,textAlign:"center",fontFamily:"sans-serif-light",fontSize:15,color:"black"}}>
                                                    {a.text}
                                                    </Text>
                                                    </View>
                                                </View>
                                                </View>
                                                <View style={{width:width,height:40,}} >
                                                <View style={{flex:1,flexDirection:"column"}} >
                                                    <View style={{flex:1,flexDirection:"row"}} >
                                                        <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                                            <TouchableOpacity>
                                                            {
                                                                (a.isLiked)?(
                                                                        <Image source={require('./img/like.png')} style={{width:30,height:30,borderRadius:15}} />
                                                                ):(
                                                                    <Image source={require('./img/liked.png')} style={{width:30,height:30,borderRadius:15}} />
                                                                )
                                                            }
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                                            <View style={{flex:1,flexDirection:"row"}} >
                                                                <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}} >
                                                                    
                                                                    <Image source={require('./img/like.png')} style={{width:15,height:15,borderRadius:7.5}} />
                                                                </View>
                                                                <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingLeft:5}} >
                                                                    <Text style={{color:"black"}}>{a.totalLike}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                                            <View style={{flex:1,flexDirection:"row"}} >
                                                                <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end",alignItems:"center",paddingRight:5}} >
                                                                    <Text style={{color:"black"}}>{a.totalShare}</Text>
                                                                   
                                                                </View>
                                                                <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}} >
                                                                    <Image source={require('./img/comment.png')} style={{width:15,height:15,borderRadius:7.5}} />
                                                                </View>
                                                            </View>
                                                        </View>
                                                        <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                                            <View style={{flex:1,flexDirection:"row"}} >
                                                                <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}} >
                                                                    
                                                                    <TouchableOpacity onPress={()=>{
                                                                            this.setState({getCurrentCommentId:a.id})
                                                                        }} >
                                                                        <Image source={require('./img/comment.png')} style={{width:30,height:30,borderRadius:15}} />
                                                                    </TouchableOpacity>
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
                                            
                                                <View style={{maxWidth:width,marginLeft:15,marginTop:15}} >
                                                    {
                                                        (this.state.getCurrentCommentId === a.id)?(
                                                            <View style ={{flex:1,justifyContent:"center",alignItems:"center"}} >
                                                                <TextInput
                                                                        style={{ borderTopWidth: 1,borderBottomWidth:1, width:width-40,borderBottomColor:"grey",borderTopColor:"grey"}}
                                                                        onChangeText={(threadText) => this.setState({threadText})}
                                                                        value={this.state.threadText}
                                                                        placeholder="Comment this thread .."
                                                                        multiline = {false}
                                                                        numberOfLines = {1} 
                                                                        placeholderTextColor="black"
                                                                />
                                                            </View>
                                                        ):false
                                                    }
                                                    {
                                                        (a.openedThread.length>0)?(
                                                            <View style={{justifyContent:"center",alignItems:"center"}} >
                                                                <Text style={{color:"black"}} >
                                                                    Related thread
                                                                </Text>
                                                            </View>
                                                        ):(
                                                            <View style={{justifyContent:"center",alignItems:"center"}} >
                                                                <Text style={{color:"black"}} >
                                                                    There is no related thread for this thread
                                                                </Text>
                                                            </View>
                                                        )
                                                    }
                                                    <View style={{justifyContent:"center",alignItems:"center"}} >
                                                        {
                                                            a.openedThread.map( (m,n)=>{
                                                                return (
                                                                    <View style={{width:width,marginTop:10,marginBottom:10}} key={n} >
                                                                        <View style={{backgroundColor:"#dcf8c6",alignSelf:"flex-start",borderColor:"grey",borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1,borderBottomWidth:1,borderRadius:30}}>
                                                                            <Text style={{paddingLeft:30,paddingBottom:5,paddingTop:0,paddingRight:30,textAlign:"center",fontFamily:"sans-serif-light",fontSize:15,color:"black"}}>
                                                                                {m.text}
                                                                            </Text>
                                                                        </View>
                                                                        <View style={{width:width}} >
                                                                            <View style={{flex:1,flexDirection:"column"}} >
                                                                                <View style={{flex:1,flexDirection:"row"}} >
                                                                                    <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                                                                        {
                                                                                            (m.isLiked)?(
                                                                                                    <Image source={require('./img/like.png')} style={{width:30,height:30,borderRadius:15}} />
                                                                                            ):(
                                                                                                <Image source={require('./img/liked.png')} style={{width:30,height:30,borderRadius:15}} />
                                                                                            )
                                                                                        }
                                                                                    </View>
                                                                                    <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                                                                        <View style={{flex:1,flexDirection:"row"}} >
                                                                                            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}} >
                                                                                                
                                                                                                <Image source={require('./img/like.png')} style={{width:15,height:15,borderRadius:7.5}} />
                                                                                            </View>
                                                                                            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingLeft:5}} >
                                                                                                <Text style={{color:"black"}}>{m.totalLike}</Text>
                                                                                            </View>
                                                                                        </View>
                                                                                    </View>
                                                                                    <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                                                                        <View style={{flex:1,flexDirection:"row"}} >
                                                                                            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end",alignItems:"center",paddingRight:5}} >
                                                                                                <Text style={{color:"black"}}>{m.totalShare}</Text>
                                                                                            
                                                                                            </View>
                                                                                            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}} >
                                                                                                <Image source={require('./img/comment.png')} style={{width:15,height:15,borderRadius:7.5}} />
                                                                                            </View>
                                                                                        </View>
                                                                                    </View>
                                                                                    <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                                                                                        <View style={{flex:1,flexDirection:"row"}} >
                                                                                            <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}} >
                                                                                                
                                                                                                <TouchableOpacity onPress = {()=>{
                                                                                                        this.setState({getCurrentCommentId:m.id})
                                                                                                    }} >
                                                                                                    <Image source={require('./img/comment.png')} style={{width:30,height:30,borderRadius:15}} />
                                                                                                </TouchableOpacity>
                                                                                            </View>
                                                                                            <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}} >
                                                                                                <Text style={{color:"white"}}></Text>
                                                                                            </View>
                                                                                        </View>
                                                                                        
                                                                                    </View>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                        {
                                                                            (this.state.getCurrentCommentId === m.id)?(
                                                                                <View style ={{flex:1,justifyContent:"center",alignItems:"center"}} >
                                                                                    <TextInput
                                                                                            style={{ borderTopWidth: 1,borderBottomWidth:1, width:width-40,borderBottomColor:"grey",borderTopColor:"grey"}}
                                                                                            onChangeText={(threadSubText) => this.setState({threadSubText})}
                                                                                            value={this.state.threadSubText}
                                                                                            placeholder="Comment this thread .."
                                                                                            multiline = {false}
                                                                                            numberOfLines = {1} 
                                                                                            placeholderTextColor="black"
                                                                                    />
                                                                                </View>
                                                                            ):false
                                                                        }
                                                                    </View>
                                                                )
                                                            } )
                                                        }
                                                    </View>
                                                </View >
                                        </View>
                                    )
                                } )
                            }
                        </ScrollView >
                    </View>
                </View>
                {
                    (this.state.show_delete_post_popup || this.state.show_hide_post_popup || this.state.show_manage_privacy_post_popup) ? (
                        <PostOptionPopup postData={[this.state.currentAccessiblePostData]} type={
                            (this.state.show_delete_post_popup?"delete":((this.state.show_hide_post_popup)?"hide":"manage_privacy"))
                        } MutateParentState={this.receiveStateFromChild} />
                    ):false
                }
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