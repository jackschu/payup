import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import { db } from '../config';
import React, {Component} from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, FAB, Portal, Text, TextInput, Chip} from 'react-native-paper';

function getUser(currentID, currentValue) {
    return firebase.database().ref('/users/' + currentID).once('value').then(function(child) {
        console.log("The current ID is: "+currentID+" and the current value is: "+currentValue);
    });
}

export default class GoalsPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			modalVisible: false,
			friends: ["Hunter", "Spencer", "Jack"],
			selectedFriends: []
		};
	    this.get_friends=this.get_friends.bind(this)
	    this.populate_email=this.populate_email.bind(this)	    
	    this.get_email=this.get_email.bind(this)

		// this.setState(modalVisible(false))
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
    
    componentDidMount(){
	var user = firebase.auth().currentUser;
	var friendslist;
//	console.warn('goal uid',user.uid)
	this.populate_email(user.uid)


    }
    
    render() {
		return (
			<View style={{flex: 1}}>
				  <FAB
					style={fabStyles.fab}
					icon="add"
					onPress={() => this.setState({modalVisible: true})}
					/>
				<Card style={cardStyle.cardStyle}>
					<Card.Title title="Jane Doe" subtitle="Charity" left={(props) => <Avatar.Icon {...props} icon="account-circle" />} />
					<Card.Content>
						<Title> Make Gains </Title>
						<Paragraph> Go to the gym every fucking day... no days off bitch</Paragraph>
						<Paragraph> $5 to John Doe for each day missed </Paragraph>
					</Card.Content>
					<Card.Actions>
					<Button>Edit</Button>
					</Card.Actions>
				</Card>
				<Modal style={modalStyle.parent} animated={true} visible={this.state.modalVisible} onRequestClose={() => this.setState({ modalVisible: false })}>
					<Text style={modalStyle.title}> New Goal </Text>
					<Text style={modalStyle.goalTitleLabel}> Goal Title </Text>
					<TextInput
						style={modalStyle.goalTitleInput}
						label='Enter Goal Title'
						value={this.state.text}
						onChangeText={text => this.setState({ text })}
					/>
					<Text style={modalStyle.goalTitleLabel}> Description </Text>
					<TextInput
						style={modalStyle.goalTitleInput}
						label='Enter Description'
						value={this.state.desc}
						multiline={true}
						numberOfLines={3}
						onChangeText={desc => this.setState({ desc })}
					/>

					<Text style={modalStyle.goalTitleLabel}> Friends to Pay </Text>
					<View style={modalStyle.chipViewer}>
						{this.state.friends.map((friend)=>(
							<Chip icon="account-circle" selected={this.state.selectedFriends.includes(friend)} style={modalStyle.chipStyle} onPress={() => {
								var boy = this.state.selectedFriends;
								if (!this.state.selectedFriends.includes(friend)) {
									boy.push(friend);
								}
								else {
									boy = boy.filter(function(value, index, arr){

										return value !== friend;
									
									});
								}
							    this.setState({selectedFriends: boy});
							}
							}> {friend} </Chip>
						))}
					</View>
					<Text style={modalStyle.goalTitleLabel}> Payment per Friend </Text>
					<TextInput
						style={modalStyle.goalTitleInput}
						label='payment amount (dollars)'
						value={this.state.desc}
						onChangeText={desc => this.setState({ desc })}
					/>

					<Button icon="add-a-photo" mode="contained" onPress={() => this.setState({modalVisible: false})}>
						Press me
					</Button>
				</Modal>
			</View>
		);
    }
}

const cardStyle = {
	cardStyle: {
		margin: 10,
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

const fabStyles = StyleSheet.create({
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
	},
})
