import React from 'react';
import { View, Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

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
       <Spinner visible={this.state.visible} />
     </View>
   );
 }
}