import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import { db } from '../config';
import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { Button } from 'react-native';
import {Alert, Text, TextInput} from 'react-native';
import Navbar from './Navbar'

handleSignUp = (email, password) => {
//    console.warn('creating user', email, password);
    firebase.auth().createUserWithEmailAndPassword(email, password)
	.then(()=>{
	    var user = firebase.auth().currentUser;
	    var fireemail = email.replace('.',',')
	    db.ref('/emailToUid/'+fireemail).update({
		uid:user.uid
	    })
	    console.warn('loggedin', user.uid)
	      db.ref('users/' + user.uid).update({
		  email: email
	      })
	})    
	.catch(function(error) {
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
	console.warn("error creating user", errorMessage)
    });
    firebase.auth().signInWithEmailAndPassword(email, password)
	.then(()=>{console.warn('signed in user', firebase.auth().currentUser)
		   db.ref('users/' + firebase.auth().currentUser.uid).update({
		       email: email
		   })
		  })
	.catch(function(error) {
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
	console.warn("error signign user", errorMessage)
	});


}

export default class LoginPage extends Component {
 constructor(props) {
    super(props);
     this.state = { user: '' , pass : ''};
     
  }
  
  render() {
    return (
	<View style={{height: "100%"}}>

        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(user) => this.setState({user})}
	placeholder={'Username'}
//        value={this.state.text}
      />
      
	  
	  <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(pass) => this.setState({pass})}
        placeholder={'Password'}
	secureTextEntry={true}
      />
	  
	  	<Button
	onPress={()=>handleSignUp(this.state.user, this.state.pass)}
	  
  title="Login"
	/>
	<Navbar navigation={this.props.navigation} />
	    </View>
   ); 
  }
}

