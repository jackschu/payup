import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import { db } from '../config';
import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { Button } from 'react-native';
import {Alert, Text, TextInput} from 'react-native';

handleSignUp = (email, password) => {
//    console.warn('creating user', email, password);
    firebase.auth().createUserWithEmailAndPassword(email, password)
	.then(()=>{
	    var user = firebase.auth().currentUser;
	    var fireemail = email.replace('.',',')
	    db.ref('/emailToUid/'+fireemail).set({
		uid:user.uid
	    })
	    console.warn('loggedin', user.uid)
	      db.ref('users/' + user.uid).set({
		  email: fireemail
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
		   db.ref('users/' + firebase.auth().currentUser.uid).set({
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
	<View style={{padding: 10}}>

        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(user) => this.setState({user})}
	placeholder={'Username'}
      />
      
	  
	  <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(pass) => this.setState({pass})}
        placeholder={'Password'}
      />
	  
	  	<Button
	onPress={()=>handleSignUp(this.state.user, this.state.pass)}
	  
  title="Login"
	/>
	    </View>
   ); 
  }
}

