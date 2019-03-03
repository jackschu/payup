import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'

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
	db.ref('/users/' + uid + '/friends/').set(friend_dict);
    }).catch(function(error){console.warn('save failed, is the account valid ',error)});

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
  };

    render() {

    return (
      <View style={styles.main}>
        <Text style={styles.title}>Add Item</Text>
        <TextInput style={styles.itemInput} onChange={this.handleChange} />
        <TouchableHighlight
          style={styles.button}
          underlayColor="white"
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({  
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#6565fc'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
