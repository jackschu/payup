import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import { Button } from 'react-native';

import React, { Component } from 'react';  
import {  
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
//  Alert
} from 'react-native';
import { db } from '../config';
import Navbar from './Navbar'


let addFriend = email => {
    var fireemail = email.replace('.',',')
    var uid  = firebase.auth().currentUser.uid;
    var uid_friend;
    db.ref("emailToUid/").once('value').then(function(snapshot) {
	uid_friend = snapshot.val()[fireemail]['uid']
//	console.warn('snapuid',fireemail, uid_friend);

//	console.warn('uid',uid_friend);
	friend_dict = {};
	friend_dict[uid_friend] = true;
//	console.warn(friend_dict);
	db.ref('/users/' + uid + '/friends/').update(friend_dict);
    }).catch(function(error){console.warn('save failed, is the account valid ', error)});

};

export default class AddFriend extends Component {  
  state = {
    name: ''
  };

  handleChange = e => {
    this.setState({
      name: e.nativeEvent.text
    });
  };
  handleSubmit = () => {
      addFriend(this.state.name);

      console.warn('Item saved successfully');
      var user = firebase.auth().currentUser;
      this.props.handler(user.uid)
      this.setState({
	  name: ''
      });
  };

    render() {

    return (
      <View style={styles.main}>

            <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChange={this.handleChange}
	placeholder={"friend's email"}
	    />

	    	  
	  	<Button
	onPress={this.handleSubmit}
	  
  title="Add Friend"
	/>

		
		<Navbar navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({  

});
