import React from 'react';
import { View, Text } from 'react-native';
import { Bars } from 'react-native-loader';

export default class SpinnerMine extends React.Component {

 constructor(props) {
   super(props);
   this.state = {
     visible: this.props.Visible
   };
 }

 /* eslint react/no-did-mount-set-state: 0 */
 componentDidMount() {
   
 }

 render() {
   return (
     <View style={{ flex: 1 }}>
       <Bars size={15} color="white" />
     </View>
   );
 }
}