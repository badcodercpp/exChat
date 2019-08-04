import React from 'react';
import { StyleSheet, 
  View, 
  Text, 
  Dimensions, 
  TouchableOpacity,Image,Timers, AsyncStorage } from 'react-native';

var _width = Dimensions.get('window').width;
var _height = Dimensions.get('window').height;

export default class MenuHead extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            _img_width:70,
            _img_height:70,
            _img_rad:35,
            img:this.props.Img,
            personName:""
        }
    }
    _storeData = async (data,name) => {
        try {
          await AsyncStorage.setItem(name, data);
          return true;
        } catch (error) {
          // Error saving data
          return false;
        }
    }
    _retrieveData = async (name) => {
        try {
          let value = await AsyncStorage.getItem(name);
          if (value !== null) {
            // We have data!!
            //console.log(value);
            return value;
          }
        } catch (error) {
           // Error retrieving data
           return error;
        }
    }
    
    async componentWillMount(){

        let that=this;
        let name=await that._retrieveData("globalAppName")
        let image=await that._retrieveData("globalAppDp")
        that.setState({personName:name,img:image})
        /*this.state._inter=setInterval(()=>{ 
            if(that.state._img_width>30){
                that.setState({
                    _img_width:that.state._img_width-1,
                    _img_height:that.state._img_height-1,
                    _img_rad:that.state._img_rad-0.5
                })
            }else{
                that.setState({
                    _img_width:that.state._img_width+70,
                    _img_height:that.state._img_height+70,
                    _img_rad:that.state._img_rad+35
                })
            }
         }, 100);*/
    }
    componentWillUnmount(){
        //clearInterval(this.state._inter);
    }
    render(){
        return (
            <View style={{flex:1,backgroundColor:"transparent",borderLeftWidth:2,borderLeftColor:"#128c7e",borderRightWidth:2,borderRightColor:"#128c7e",borderTopWidth:2,borderTopColor:"#128c7e",borderBottomWidth:2,borderBottomColor:"#128c7e"}} >
                <View style={{flex:1,flexDirection:"row"}}>
                    <View style={{flex:5,flexDirection:"column",backgroundColor:"transparent",justifyContent:"center",alignItems:"flex-end"}}>
                        
                        <Image
                        style={{borderRadius:this.state._img_rad,width:this.state._img_width,height:this.state._img_height,opacity:0.6}}
                            source={{uri:`data:image/png;base64,${this.state.img}`}}
                            />
                    </View>
                    <View style={{flex:5,flexDirection:"column",backgroundColor:"transparent",justifyContent:"center",alignItems:"flex-start"}}>
                        <Text style={{fontFamily:"sans-serif-light",fontSize:25,color:"white",fontWeight:"bold"}}>
                            {this.state.personName}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}