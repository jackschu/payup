import React, { Component } from 'react';
import { AppRegistry, View, Modal} from 'react-native';
import {Alert, Text, TextInput, Button} from 'react-native';


export default class Profile extends Component {

 constructor(props) {
    super(props);
    this.state = {modalVisible: false, first : "", last : ""};
  }

  render() {
    return (
	<View style={{padding: 10}}>
	<Text>
	Name:
	{'\n'}
		{this.state.first} {this.state.last}
	</Text>
	<Modal style={modalStyle.parent} animated={true} visible={this.state.modalVisible} onRequestClose={() => this.setState({ modalVisible: false })}>
	<TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(first) => this.setState({first})}
	placeholder={'First name'}
      />
	  <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(last) => this.setState({last})}
	placeholder={'Last name'}
      />
	<Button onPress={() => this.setState({modalVisible: false})} title="Update"/>
	</Modal>
	<Button
  onPress={() => this.setState({modalVisible: true})}
  title="Edit information"
	/></View>
   ); 
  }
}


const modalStyle = {
	parent: {
		backgroundColor: 'rgba(256, 256, 256, 0.5)', 
		height: "100%"
	},
	title: {
		color: "black",
		margin: 10,
		fontSize: 20,
		fontWeight: "bold"
	},
	goalTitleLabel: {
		margin: 10
	},
	goalTitleInput: {
		marginTop: 5,
		marginLeft: 40,
		marginRight: 10,
		marginBottom: 5,
	},
	chipStyle: {
		width: 100,
		margin: 3,
		marginLeft: 20
	}
}

