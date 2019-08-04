import React, { Component } from 'react';
import {
  View,
  Text, 
  StatusBar, 
  StyleSheet, 
  CameraRoll,
  TouchableOpacity, 
  Dimensions,
  Image, 
  ScrollView, 
  AsyncStorage,
  ToastAndroid
} from 'react-native';

import DatePickerCal from './datePicker.js';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import GridView from 'react-native-gridview';
import FRP from './File/fileReader.js';

export default class FilePicker extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        showCameraRoll:false,
        myCameraRoll:[],
        selectedImage:"",
        cam:[],
        backImg:require('./img/baseline_arrow_back_black_48dp.png'),
        dpSelected:false
      }
  }
  _retrieveData = async (name) => {
    try {
      const value = await AsyncStorage.getItem(name);
      if (value !== null) {
        // We have data!!
        //console.log(value);
        return value;
      }
     } catch (error) {
       // Error retrieving data
       return "Bad data";
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
  mutateMyState=(data)=>{
      this.props.mutateState(data);
  }
  componentWillMount(){
      let that=this;
      CameraRoll.getPhotos({first:200,assetType:"Photos"})
      .then((data)=>{
          //alert(JSON.stringify(data))
          let imgCam=[];
          for(let d of data.edges){
            imgCam.push(d.node.image.uri)
          }
          //
          const dataSource = new GridView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
          }).cloneWithRows(imgCam);

          that.setState({myCameraRoll:dataSource,cam:imgCam})
      })
  }
  selectImage=(name)=>{
      this.setState({selectedImage:name,dpSelected:true,showCameraRoll:false})
      this.mutateMyState({my_profile_pic_p:name,dpSelected:true,showCameraRoll:false})
  }
  go_back=()=>{
      this.setState({showCameraRoll:false})
  }
  _goProfilePrefrences=async ()=>{
      //alert(JSON.stringify())
      let that=this;
      //this.mutateMyState({goDpChange:false,goProfilePreference:true})
      let frp=new FRP(this.state.selectedImage);
      
      /*let x=await this._storeData(ret,"dp")
      if(x){
        let dm=await this._retrieveData("dp");
        alert(dm)
      }else{
          alert(ret)
      }*/
      //alert(JSON.stringify(datax))
      frp.readAsString().then(async (data) => {
        //alert(JSON.stringify(data))
        let x=await this._storeData(data,"dp")
        if(x){
          //let dm=await this._retrieveData("dp");
          //alert(dm)
          let that=this;
          that.mutateMyState({goDpChange:false,goProfilePreference:true})
        }else{
            //alert(ret)
            ToastAndroid.show('You have to provide a picture', ToastAndroid.SHORT);
        }
        //return data;
      })
      .catch((err)=>{
          alert(err)
      })
  }
  render(){
      return (
        <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor: 'rgba(0,0,0,0.8)'}} >
            <View style={{flex:6,flexDirection:"row",justifyContent:"flex-end",alignItems:"flex-end",paddingBottom:10}} >
                {/**
                 * <DatePickerCal closeIcon={this.state.closeIcon} />
                 */}
                
            </View>
            <View style={{flex:0.4,flexDirection:"row",justifyContent:"center",alignItems:"center"}} >
                <View  >
                    <TouchableOpacity onPress={()=>{
                            this.setState({showCameraRoll:true})
                        }} >
                        <Text style={{color:"white",fontFamily:"sans-serif-light",fontSize:17}} >
                            Choose dp
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {
                (this.state.showCameraRoll)?(
                    <View style={{width:width,height:height,backgroundColor:"#075e54",position:"absolute"}} >
                        <View style={{flex:1}} >
                        <View style={{width:width,height:50,backgroundColor:"white"}} >
                            <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}} >
                                <TouchableOpacity onPress={this.go_back} >
                                    <Image style={{width:40,height:40,borderRadius:20}} source={this.state.backImg} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView>
                        <GridView
                            data={this.state.cam}
                            itemsPerRow={3}
                            renderItem={(item, sectionID, rowID, itemIndex, itemID) => {
                            return (
                                <TouchableOpacity onPress={()=>{
                                        this.selectImage(item)
                                    }} >
                                    <Image source={{uri:item}} style={{width:100,height:100,marginLeft:10,marginRight:10,marginBottom:10,marginTop:10}} />
                                </TouchableOpacity>
                                );
                            }}
                        />
                        </ScrollView>
                        </View>
                    </View>
                ):false
            }
            {
                (this.state.dpSelected)?(
                    <View>
                        <Image source={{uri:this.state.selectedImage}} style={{width:100,height:100,marginLeft:10,marginRight:10,marginBottom:10,marginTop:10}} />
                    </View>
                ):false
            }
            {
                (!this.state.showCameraRoll)?(
                    <View style={{flex:1,flexDirection:"row"}}>
                        <View style={{flex:0.93,flexDirection:"column",justifyContent:"center"}}>
                            <TouchableOpacity onPress={this._goProfilePrefrences} activeOpacity={0.2} underlayColor="transparent" style={{height:40,backgroundColor:"grey",borderRadius:25}}>
                                <Text style={{color:"white",textAlign:"center",fontWeight:"bold",fontSize:20,fontFamily:"sans-serif-light",paddingTop:5}}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ):false
            }
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
  },
  map: {
  }
});