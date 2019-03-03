import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { Button } from 'react-native';
import {Alert, Text, TextInput} from 'react-native';


export default class LoginPage extends Component {
 constructor(props) {
    super(props);
    this.state = { text: 'Username' };
  }
  
  render() {
    return (
	<View style={{padding: 10}}>

        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
      
	  
	  <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={'Password'}
      />
	  
	  	<Button
  onPress={() => {
    Alert.alert('You tapped the button!');
  }}
  title="Login"
	/>
	    </View>
   ); 
  }
}

