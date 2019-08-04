import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Dimensions, 
    ScrollView, 
    Image, 
    Text, 
    TouchableOpacity, 
    TextInput, 
    BackHandler, 
    FlatList, 
    KeyboardAvoidingView, 
    StatusBar, 
    TouchableHighlight, 
    Animated, 
    Easing, 
    Keyboard 
  } from 'react-native';
  
export default class TimePassChat extends React.Component {
    constructor(props){
        super(props);
        this.state= {

        }
    }
    render(){
        return (
            <View style={{position:"absolute",width:width,height:height,backgroundColor:"#ece5dd",marginLeft:0}} ref={(elem)=>{
                
                                }}>
                              
            <View style={{flex:1}}>
            <KeyboardAvoidingView style={{flex:1}} behavior="padding" enabled keyboardVerticalOffset={25}>
            <ScrollView >
            <View style={{flex:1,flexDirection:"row",backgroundColor:"#075e54"}} >
                <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"flex-end"}} >
                <Image source={this.state.fakeIconImage} style={{width:70,height:70,borderRadius:35,}} />
                </View>
                <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                <Image source={this.state.deep_timepass_logo} style={{width:70,height:70}} />
                </View>
                <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"flex-start"}} >
                <Image source={this.state.fakeIconImage} style={{width:70,height:70,borderRadius:35}} />
                </View>
            </View>
            <View style={{flex:1,flexDirection:"row",backgroundColor:"#075e54"}} >
                <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                <Text style={{fontFamily:"sans-serif-light",fontSize:20,color:"white",fontWeight:"bold"}} >You
                </Text>
                </View>
                <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                
                </View>
                <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                <Text style={{fontFamily:"sans-serif-light",fontSize:20,color:"white",fontWeight:"bold"}} >{this.state.mainChatOpponent.split(' ')[0]}
                </Text>
                </View>
            </View>
            </ScrollView>
            
            <View style={{flex:7,flexDirection:"row",marginTop:this.state.persistentMarginTop}} >
                <ScrollView >
                
                    
                    {
                    this.state.mappableMessage.map( (a,b)=>{
                        if (!a.isReactions) {
                        if(a.name=="You"){
                            return (
                            <View key={b}>
                            <View style={{backgroundColor:"#dcf8c6",width:3*width/4,borderColor:"grey",borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1,borderBottomWidth:1,borderRadius:30,marginLeft:15,marginTop:25}} 
                            onPress={this._pressing_message_for_datetime} >
                                <View style={{flex:1,flexDirection:"column"}}>
                                <View style={{flex:1,flexDirection:"column",justifyContent:"center"}}>
                                    <Text style={{paddingLeft:30,paddingBottom:30,paddingTop:30,paddingRight:30}}>
                                    {a.message}
                                    </Text>
                                    </View>
                                </View>
                                <View style={{flex:1,flexDirection:"row",justifyContent:"center"}}>
                                    <Text style={{textAlign:"center",fontFamily:"sans-serif-light",fontSize:20,color:"grey",fontWeight:"bold"}}>{a.name}
                                    </Text>
                                </View>
                                <View style={{flex:1,flexDirection:"row",justifyContent:"center"}}>
                                    <Text style={{textAlign:"center",fontFamily:"sans-serif-light",fontSize:20,color:"grey",fontWeight:"bold"}}>{a.name}
                                    </Text>
                                </View>
                            </View>
                            {
                                (this.state.anyChatPressed)?(
                                <View style={{justifyContent:"center",alignItems:"center"}}> 
                                    <Text style={styles.item}>
                                    
                                    </Text>
                                </View>
                                ):false
                            }
                            </View>
                        )
                        }else{
                            return (
                            <View key={b}>
                            <View style={{backgroundColor:"white",width:3*width/4,borderColor:"grey",borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1,borderBottomWidth:1,borderRadius:30,marginLeft:width/4-15,marginTop:25}} >
                            <View style={{flex:1,flexDirection:"column"}}>
                                <View style={{flex:1,flexDirection:"column",justifyContent:"center"}}>
                                    <Text style={{paddingLeft:30,paddingBottom:30,paddingTop:30,paddingRight:30}}>1
                                    {a.message}
                                    </Text>
                                </View>
                                </View>
                                <View style={{flex:1,flexDirection:"row",justifyContent:"center"}}>
                                <Text style={{textAlign:"center",fontFamily:"sans-serif-light",fontSize:20,color:"grey",fontWeight:"bold"}}>{a.name}
                                </Text>
                                </View>
                                <View style={{flex:1,flexDirection:"row",justifyContent:"center"}}>
                                <Text style={{textAlign:"center",fontFamily:"sans-serif-light",fontSize:20,color:"grey",fontWeight:"bold"}}>{a.name}
                                </Text>
                                </View>
                            </View>
                            {
                                (this.state.anyChatPressed)?(
                                <View style={{justifyContent:"center",alignItems:"center"}}>
                                    <Text style={styles.item}>
                                    
                                    </Text>
                                </View>
                                ):false
                            }
                            </View>
                        )
                        }
                        }else{
                        if(a.name=="You"){
                            return (
                            <View key={b}>
                            <View style={{backgroundColor:"#dcf8c6",width:3*width/4,borderColor:"grey",borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1,borderBottomWidth:1,borderRadius:30,marginLeft:15,marginTop:25,paddingTop:40}} >
                            <View style={{flex:1,flexDirection:"column"}}>
                                <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                                <Image 
                                source={{uri: a.message}} 
                                style={{width:140,height:140,flex:1,position:"relative",paddingTop:40}}
                                />
                                </View>
                                </View>
                                <View style={{flex:1,flexDirection:"row",justifyContent:"center"}}>
                                <Text style={{textAlign:"center",fontFamily:"sans-serif-light",fontSize:20,color:"grey",fontWeight:"bold"}}>{a.name}
                                </Text>
                                </View>
                                <View style={{flex:1,flexDirection:"row",justifyContent:"center"}}>
                                <Text style={{textAlign:"center",fontFamily:"sans-serif-light",fontSize:20,color:"grey",fontWeight:"bold"}}>{a.name}
                                </Text>
                                </View>
                            </View>
                            {
                                (this.state.anyChatPressed)?(
                                <View style={{justifyContent:"center",alignItems:"center"}}>
                                    <Text style={styles.item}>
                                    
                                    </Text>
                                </View>
                                ):false
                            }
                            </View>
                        )
                        }else{
                            return (
                            <View key={b}>
                            <View style={{backgroundColor:"white",width:3*width/4,borderColor:"grey",borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1,borderBottomWidth:1,borderRadius:30,marginLeft:width/4-15,marginTop:25,paddingTop:40}} >
                            <View style={{flex:1,flexDirection:"column"}}>
                                <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                                <Image 
                                source={{uri: a.message}} 
                                style={{width:140,height:140,flex:1,position:"relative",paddingTop:40}}
                                />
                                </View>
                                </View>
                                <View style={{flex:1,flexDirection:"row",justifyContent:"center"}}>
                                <Text style={{textAlign:"center",fontFamily:"sans-serif-light",fontSize:20,color:"grey",fontWeight:"bold"}}>{a.name}
                                </Text>
                                </View>
                                <View style={{flex:1,flexDirection:"row",justifyContent:"center"}}>
                                <Text style={{textAlign:"center",fontFamily:"sans-serif-light",fontSize:20,color:"grey",fontWeight:"bold"}}>{a.name}
                                </Text>
                                </View>
                            </View>
                            {
                                (this.state.anyChatPressed)?(
                                <View style={{justifyContent:"center",alignItems:"center"}}>
                                    <Text style={styles.item}>
                                    
                                    </Text>
                                </View>
                                ):false
                            }
                            </View>
                        )
                        }
                        }
                    } )
                    }
                
                </ScrollView>
            </View>
            
            <View style={{flex:2,flexDirection:"row",alignItems:"center"}} >
                
                <View style={{flex:1,flexDirection:"row"}} >
                <View style={{flex:1,flexDirection:"column",backgroundColor:"#075e54",justifyContent:"center",alignItems:"center"}} >
                    
                    <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                    <TouchableOpacity onPress={this._show_my_reactions}>
                        <Image
                        style={{width:40,height:40,borderRadius:20 }}
                        source={this.state.smileyIconImage} />
                        </TouchableOpacity>
                    </View>
                    
                </View>
                <View style={{flex:4,flexDirection:"column",backgroundColor:"#075e54",justifyContent:"center",alignItems:"center"}} >
                    <TextInput 
                    editable = {true} 
                    multiline={true} 
                    numberOfLines={2} 
                    style={{width:width/2,borderBottomColor:"#128c7e",borderBottomWidth:2,fontSize:15,color:"white",borderTopColor:"#128c7e",borderTopWidth:2}} 
                    placeholder="type message" 
                    placeholderTextColor="white" 
                    returnKeyLabel="search" 
                    underlineColorAndroid="transparent" 
                    value={this.state.currentGlobalMessage}
                    onChangeText={(text) => this.changeGlobalMessage({text})}
                    />
                </View>
                <View style={{flex:1,flexDirection:"column",backgroundColor:"#075e54",justifyContent:"center",alignItems:"center"}} >
                    <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                    <TouchableOpacity onPress={this.sendMqttMessage}>
                        <Image source={this.state.sendIconImage} style={{width:40,height:40,borderRadius:20}} />
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex:1,flexDirection:"column",backgroundColor:"#075e54",justifyContent:"center",alignItems:"center"}} >
                    <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                    <Image source={this.state.speakIconImage} style={{width:40,height:40,borderRadius:20}} />
                    </View>
                </View>
                <View style={{flex:1,flexDirection:"column",backgroundColor:"#075e54",justifyContent:"center",alignItems:"center"}} >
                    <TouchableOpacity onPress={this._show_my_icon}>
                    <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
                        <Image source={this.state.smileyIconImage} style={{width:40,height:40,borderRadius:20}} />
                    </View>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            
            </KeyboardAvoidingView>
            {
                (this.state.picEmoji)?(
                <View style={{height:250,width:width,backgroundColor:"white",marginBottom:10}}>
                <EmojiInput
                onEmojiSelected={(emoji) => {
                    this._add_emoji_to_input(emoji)
                }} 
                enableSearch={false} 
                categoryLabelTextStyle={{fontSize: 17}} 
                emojiFontSize={30} 
                numColumns={8} 
                numFrequentlyUsedEmoji={24} 
                categoryLabelHeight={40} 
                categoryHighlightColor="darkgrey"
                />
                </View>
                ):false
            }

            {
                (this.state.picReactions)?(
                <View style={{height:250,width:width,backgroundColor:"white",marginBottom:10}}>
                <ScrollView contentContainerStyle ={{alignSelf:"stretch"}} >
                    
                    <View style={{alignSelf:"stretch",flexDirection:"row",flex:5,flexWrap:"wrap"}}>
                    {
                    this.state.reactions.map( (a,b)=>{
                        return (
                        <View key={b} style={{alignSelf:"stretch",flexDirection:"column",paddingLeft:5,paddingRight:5,paddingBottom:5,paddingTop:5}} >
                            <TouchableOpacity onPress={()=>{
                                this._reactions_touched_individually(a)
                            }}>
                            <Image 
                            source={{uri: a}} 
                            style={{width:80,height:80,flex:1,position:"relative"}}
                            />
                            </TouchableOpacity>
                        </View>
                        )
                    } )
                    }
                    </View>
                </ScrollView>
                <View style={{height:40,width:width,backgroundColor:"white",marginBottom:10}}>
                    <View style={{flex:1,flexDirection:"row"}}>
                    <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                        <Text>
                        hello
                        </Text>
                    </View>
                    <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                        <Text>
                        hello
                        </Text>
                    </View>
                    <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                        <Text>
                        hello
                        </Text>
                    </View>
                    <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                        <Text>
                        hello
                        </Text>
                    </View>
                    <View style={{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                        <Text>
                        hello
                        </Text>
                    </View>
                    </View>
                </View>
                </View>
                ):false
            }

            </View>
            
            </View>
        )
    }
}