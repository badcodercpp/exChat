import React, { Component } from 'react';
import {
  View,
  Text, 
  StatusBar, 
  StyleSheet
} from 'react-native';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';


export default class MapScreen extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        title:"",
        markerImage:this.props.markerImage,
        latitude:0.00,
        longitude:0.00,
    };
    this._map_touched=this._map_touched.bind(this);
    this.markerClick=this.markerClick.bind(this);
  }
  markerClick(){
    alert(this.state.title)
  }
  mutateMyState(data){
    this.props.MutateMyState(data);
  }
  _map_touched(evt){
    //this.setState({
      //menuVisible:false
    //})
    //alert("hi")
    this.mutateMyState({menuVisible:false})
  }
  render(){
      return (
        <View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});