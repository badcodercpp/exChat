import React, { Component } from 'react';
import {
  View,
  Text,
  Image, 
  Dimensions, 
  StyleSheet,
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView, 
  ImageBackground,
  StatusBar
} from 'react-native';
var {height, width} = Dimensions.get('window');
export default class PostOptionPopup extends Component {
    constructor(props){
        super(props);
        this.state = {
            account_logo:this.props.account_logo,
            text:"",
            closeIcon:this.props.closeIcon,
            mappable_post:this.props.postData,
            getCurrentMoreOptionId:"",
            getCurrentCommentId:""
        };
        this._change_my_about=this._change_my_about.bind(this);
        this.handelAboutText=this.handelAboutText.bind(this);
        this._ok_update_my_status=this._ok_update_my_status.bind(this);
        this._go_back_to_timepassChat=this._go_back_to_timepassChat.bind(this);
    }
    _go_back_to_timepassChat(){
        this.mutateMyState({showChangeMyAboutPopup:false,timepassChatNeeded:true})
    }
    _ok_update_my_status(evt){
        alert(this.state.text)
    }
    handelAboutText(text){
        this.setState({text:text})
    }
    _change_my_about(){

    }
    mutateMyState(data){
        this.props.MutateParentState(data)
    }
    render(){
        if (this.props.type==="delete") {
            return (
                <View style={{position:"absolute",width:width,height:height,backgroundColor:"#075e54",marginLeft:0,zIndex:1000}}>
                    <StatusBar hidden={true}
                    backgroundColor="transparent"
                    barStyle="light-content"
                    />
                    <ImageBackground imageStyle={styles.imageStyle} style={{width:"100%",height:"100%"}} 
                    source={require('./img/umbrella.jpg')}>
                            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end",alignItems:"flex-end"}}>
                                <TouchableOpacity onPress={()=>{
                                        if (this.props.type==="delete") {
                                            this.mutateMyState({show_delete_post_popup:false,show_hide_post_popup:false,show_manage_privacy_post_popup:false})
                                        } else if (this.props.type==="hide") {
                                            this.mutateMyState({show_delete_post_popup:false,show_hide_post_popup:false,show_manage_privacy_post_popup:false})
                                        } else {
                                            this.mutateMyState({show_delete_post_popup:false,show_hide_post_popup:false,show_manage_privacy_post_popup:false})
                                        }
                                    }}>
                                    <Image source={require('./img/close.png')} style={{width:40,height:40,paddingRight:30}} />
                                </TouchableOpacity>
                            </View>


                    {
                                this.state.mappable_post.map( (a,b)=>{
                                    return (
                                        <View key={b} style={{backgroundColor:"#ece5dd",marginBottom:25,borderRadius:25}} >
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
                                                
                                        </View>
                                    )
                                } )
                            }
                            <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"flex-start"}}>
                                <TouchableOpacity onPress={this._change_my_about} >
                                    <View style={{width:width-40,height:30,borderBottomLeftRadius:15,borderBottomRightRadius:15,borderTopLeftRadius:15,borderTopRightRadius:15,backgroundColor:"lightgrey",justifyContent:"center",alignItems:"center"}} >
                                        <Text>
                                            Delete thread
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>


                    </ImageBackground>
                </View>
            )
        } else if (this.props.type==="hide") {
            return (
                <View style={{position:"absolute",width:width,height:height,backgroundColor:"#075e54",marginLeft:0}}>
                    <StatusBar hidden={true}
                    backgroundColor="transparent"
                    barStyle="light-content"
                    />
                    <ImageBackground imageStyle={styles.imageStyle} style={{width:"100%",height:"100%"}} 
                    source={require('./img/umbrella.jpg')}>
                    


                            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end",alignItems:"flex-end"}}>
                                <TouchableOpacity onPress={()=>{
                                        if (this.props.type==="delete") {
                                            this.mutateMyState({show_delete_post_popup:false,show_hide_post_popup:false,show_manage_privacy_post_popup:false})
                                        } else if (this.props.type==="hide") {
                                            this.mutateMyState({show_delete_post_popup:false,show_hide_post_popup:false,show_manage_privacy_post_popup:false})
                                        } else {
                                            this.mutateMyState({show_delete_post_popup:false,show_hide_post_popup:false,show_manage_privacy_post_popup:false})
                                        }
                                    }}>
                                    <Image source={require('./img/close.png')} style={{width:40,height:40,paddingRight:30}} />
                                </TouchableOpacity>
                            </View>



                    {
                                this.state.mappable_post.map( (a,b)=>{
                                    return (
                                        <View key={b} style={{backgroundColor:"#ece5dd",marginBottom:25,borderRadius:25}} >
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
                                                
                                        </View>
                                    )
                                } )
                            }

                            <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"flex-start"}}>
                                <TouchableOpacity onPress={this._change_my_about} >
                                    <View style={{width:width-40,height:30,borderBottomLeftRadius:15,borderBottomRightRadius:15,borderTopLeftRadius:15,borderTopRightRadius:15,backgroundColor:"lightgrey",justifyContent:"center",alignItems:"center"}} >
                                        <Text>
                                            Hide thread
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>



                    </ImageBackground>
                </View>
            )
        } else {
            return (
                <View style={{position:"absolute",width:width,height:height,backgroundColor:"#075e54",marginLeft:0}}>
                    <StatusBar hidden={true}
                    backgroundColor="transparent"
                    barStyle="light-content"
                    />
                    <ImageBackground imageStyle={styles.imageStyle} style={{width:"100%",height:"100%"}} 
                    source={require('./img/umbrella.jpg')}>




                            <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end",alignItems:"flex-end"}}>
                                <TouchableOpacity onPress={()=>{
                                        if (this.props.type==="delete") {
                                            this.mutateMyState({show_delete_post_popup:false,show_hide_post_popup:false,show_manage_privacy_post_popup:false})
                                        } else if (this.props.type==="hide") {
                                            this.mutateMyState({show_delete_post_popup:false,show_hide_post_popup:false,show_manage_privacy_post_popup:false})
                                        } else {
                                            this.mutateMyState({show_delete_post_popup:false,show_hide_post_popup:false,show_manage_privacy_post_popup:false})
                                        }
                                    }}>
                                    <Image source={require('./img/close.png')} style={{width:40,height:40,paddingRight:30}} />
                                </TouchableOpacity>
                            </View>



                    {
                                this.state.mappable_post.map( (a,b)=>{
                                    return (
                                        <View key={b} style={{backgroundColor:"#ece5dd",marginBottom:25,borderRadius:25}} >
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
                                                
                                        </View>
                                    )
                                } )
                            }


                            <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"flex-start"}}>
                                <TouchableOpacity onPress={this._change_my_about} >
                                    <View style={{width:width-40,height:30,borderBottomLeftRadius:15,borderBottomRightRadius:15,borderTopLeftRadius:15,borderTopRightRadius:15,backgroundColor:"lightgrey",justifyContent:"center",alignItems:"center"}} >
                                        <Text>
                                            Update privacy
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>



                    </ImageBackground>
                </View>
            )
        } 
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
    },
    signupHeadContainer:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
    }
});