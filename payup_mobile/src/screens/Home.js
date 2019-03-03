import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import { db } from '../config';
import stripe from 'tipsi-stripe'
import React, { Component } from 'react';  
import {AsyncStorage, Platform, StyleSheet, Text, View, Button} from 'react-native';

export default class Home extends Component {
    constructor(props){
	super(props)
	this.handlerPayment=this.handlerPayment.bind(this)
	this.requestPayment=this.requestPayment.bind(this)
	this.makeAccount=this.makeAccount.bind(this)
	this.saveData=this.saveData.bind(this)
    };

    async saveData(customer){

	try {
	    var user = firebase.auth().currentUser;
	    console.warn('user loaded',user);
	    db.ref('/users/'+ user.uid).update({
		stripe_customer:customer.id
	    })
//	    await AsyncStorage.setItem('@MySuperStore:customerid', customer.id);
	} catch (error) {
	    console.warn("error saving", error);
	    // Error saving data
	}
    };
    async makeAccount(token){
	fetch("https://api.stripe.com/v1/customers", {
	    body: "source="+token.tokenId+"&email=paying.user@example.com",
	    headers: {
		Authorization: "Basic c2tfdGVzdF83TDE5MUJ6ZjMxc2NtYldydUFSM2xjeng6",
		"Content-Type": "application/x-www-form-urlencoded"
	    },
	    method: "POST"
	    
	}).then(function(response){return response.json()}).then(this.saveData);
    };
    async handlerPayment(){
	var value = null;
	try {
	    var user = firebase.auth().currentUser;

	    db.ref("users/"  + user.uid).once('value').then(function(snapshot){
//		console.warn('value',snapshot.val())
		customer = snapshot.val()['stripe_customer']
		console.warn('stripe boi',customer)
		fetch("https://api.stripe.com/v1/charges", {
		    body: "amount=999&currency=usd&description=chargewithcustomer&customer=" + customer,
		    headers: {
			Authorization: "Basic c2tfdGVzdF83TDE5MUJ6ZjMxc2NtYldydUFSM2xjeng6",
			"Content-Type": "application/x-www-form-urlencoded"
		    },
		    method: "POST"
		}).catch(error => { console.warn('handler failed', { error });})
	    });
	    //value = await AsyncStorage.getItem('customerid');

	    
	} catch (error) {
	    console.warn('couldnt get id');
	    // Error retrieving data
	}


    } 


    async requestPayment() {
	return stripe
	    .paymentRequestWithCardForm()
	    .then(this.makeAccount)
	    .catch(error => {
		console.warn('Payment failed', { error });
	    });
    };
  render() {
      return (
	  <View style={styles.container}>
	      <View style={styles.container}>
              <Button
          title="Make Customer ID"
          onPress={this.requestPayment}
//          disabled={this.state.isPaymentPending}
              />	      
	      <Button title="Charge my card"
	      onPress={this.handlerPayment}
	      />
	      <Button title="Add a friend"
	  onPress={()=>this.props.navigation.navigate('AddFriend')}
	      />
	      <Button title="Login"
	  onPress={()=>this.props.navigation.navigate('LoginPage')}
	      />
	      </View>
	      
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to hama Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>

	      </View>
	      </View>
/*      <View>
        <Text>Home Screen</Text>
        <Button
          title="Add an Item"
          onPress={() => this.props.navigation.navigate('AddItem')}
        />
        <Button
          title="List of Items"
          color="green"
          onPress={() => this.props.navigation.navigate('List')}
        />
      </View>*/
    );
  }
    
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
