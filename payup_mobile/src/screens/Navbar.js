import React, { Component } from 'react';
import { AppRegistry, View, Modal} from 'react-native';
import {Alert, Text, TextInput, Button, StyleSheet} from 'react-native';
import {AsyncStorage, Platform} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';  
//import List from './src/screens/List';

class Navbar extends Component {

constructor(props) {
 super(props)
 }
 
render() {
 return (
 <View style={styles.b1}>
			<View>
				<Button title="Profile" onPress={()=>this.props.navigation.navigate('Profile')}/>
			</View>
	
			<View>
				<Button title="My Goals" onPress={()=>this.props.navigation.navigate('GoalsPage')}/>
			</View>
			
			<View>
				<Button title="Add a Friend" onPress={()=>this.props.navigation.navigate('AddFriend')}/>
			</View>
			
			<View>
				<Button title="Login" onPress={()=>this.props.navigation.navigate('LoginPage')}/>
			</View>
		</View>
 )
 }
}


const styles = StyleSheet.create({
    b1: {
		position: 'absolute',
		bottom:0,
		flex: 1,
		width: "100%",
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'stretch',
	}
});

export default Navbar