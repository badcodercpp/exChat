import React, { Component } from 'react';
import {
  View,
  Text, 
  StatusBar, 
  StyleSheet
} from 'react-native';

import DatePicker from 'react-native-datepicker'


export default class DatePickerCal extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        dob:""
      }
  }
  render(){
      return (
        <View >
            <DatePicker
                style={{width: 200}}
                date={new Date()}
                mode="date"
                placeholder="Your birth date"
                format="YYYY-MM-DD"
                minDate="1970-01-01"
                maxDate="2000-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36,
                    marginRight:36
                }
                // ... You can check the source to find the other keys.
                }}
                customStyles={{placeholderText:{color:"white"},dateText:{color:"white"},dateIcon:{marginLeft:10}}}
                onDateChange={(date) => {this.setState({date: date})}}
            />
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