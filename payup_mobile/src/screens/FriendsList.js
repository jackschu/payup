import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import { db } from '../config';
import React, {Component} from 'react';
import {  View, } from 'react-native';
import AddFriend from './AddFriend';
import { List} from 'react-native-paper';
export default class GoalsPage extends Component {
    constructor(props) {
	super(props)
	this.state = {
	    expanded: true,
	    friends: [""],
	    selectedFriends: []
	};
	this.get_friends=this.get_friends.bind(this)
	this.populate_email=this.populate_email.bind(this)	    
	this.get_email=this.get_email.bind(this)

    }
    _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });
    componentDidMount(){
	var user = firebase.auth().currentUser;
	var friendslist;
//	console.warn('goal uid',user.uid)
	this.populate_email(user.uid)


    }
    async get_email(uid){
	var snapshot = await db.ref("users/"  + uid).once('value')
//	console.warn('get email',snapshot.val())
	return snapshot.val()['first_name']+" "+snapshot.val()['last_name']
    }
    async get_friends(uid){
	var firendslist
	var snapshot = await db.ref("users/"  + uid+"/friends/").once('value')
	var val = snapshot.val()
//	console.warn('get friends',val)
	try{
	    friendslist = Object.keys(val)
	}catch(e){
	    console.warn("no friends")
	}
	var emaillist = await Promise.all(friendslist.map(async (uid) => {
	    const contents = await this.get_email(uid)
	    return contents
	}));
//	console.warn('email list', emaillist)
	return emaillist
//	    then(function(snapshot)
    }

    async populate_email(uid){
	var emaillist =  await this.get_friends(uid)
//	console.warn(emaillist)
	this.setState({
	    friends:emaillist
	})
    }

    render() {
	return (
		<View>
		<List.Section title="Friends Management">

		<List.Accordion
            title="All Friends"

            expanded={this.state.expanded}
            onPress={this._handlePress}
		>
		{
		    this.state.friends.map((name)=> (<List.Item title={name} />))
		}

		</List.Accordion>
		</List.Section>
		<AddFriend handler={this.populate_email}/>
		</View>
	);
    }
}
