/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {AsyncStorage, Platform, StyleSheet, Text, View, Button} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';  

import AddFriend from './src/screens/AddFriend';
import Home from './src/screens/Home';
import LoginPage from './src/screens/LoginPage';
import GoalsPage from './src/screens/GoalsPage';
import FriendsList from './src/screens/FriendsList';
import Profile from './src/screens/Profile';
import stripe from 'tipsi-stripe';
//import List from './src/screens/List';
const AppNavigator = createStackNavigator(
 {
     Home,
     AddFriend,
     LoginPage,
	 GoalsPage,
     Profile,
     FriendsList,
  },
  {
    initialRouteName: 'Home'
  }
);

const AppContainer = createAppContainer(AppNavigator);
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

    render() {

	return <AppContainer />;
    
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
