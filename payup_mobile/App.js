/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import stripe from 'tipsi-stripe'
import React, {Component} from 'react';
import {AsyncStorage, Platform, StyleSheet, Text, View, Button} from 'react-native';

stripe.setOptions({
  publishableKey: 'pk_test_Pm7dJuo3TQ6MrS0e8lEmFgbv',
//  merchantId: 'MERCHANT_ID', // Optional
  androidPayMode: 'test', // Android only
})

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    constructor(props){
	super(props)
	this.handlerPayment=this.handlerPayment.bind(this)
	this.requestPayment=this.requestPayment.bind(this)
	this.makeAccount=this.makeAccount.bind(this)
	this.saveData=this.saveData.bind(this)
    };

    async saveData(token){
	try {
	    await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
	} catch (error) {
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
	    
	}).then(this.saveData)
    };
    async handlerPayment(token){

	fetch("https://api.stripe.com/v1/charges", {
	    body: "amount=999&currency=usd&description=Examplewithtoken&source=" + token.tokenId,
	    headers: {
		Authorization: "Basic c2tfdGVzdF83TDE5MUJ6ZjMxc2NtYldydUFSM2xjeng6",
		"Content-Type": "application/x-www-form-urlencoded"
	    },
	    method: "POST"
	}).then().catch(error => { console.warn('handler failed', { error });})
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
      return (<View style={styles.container}>
	      <View style={styles.container}>
              <Button
          title="Make a payment"
          onPress={this.requestPayment}
//          disabled={this.state.isPaymentPending}
              />
	      </View>
	      
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to hama Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
	      </View>
	      </View>
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
