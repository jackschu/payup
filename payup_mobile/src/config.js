console.warn('run')
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import * as REACT_APP_API_KEY from '../key'
console.warn(REACT_APP_API_KEY)
let config = {

    apiKey: REACT_APP_API_KEY['G_KEY'],
//    apiKey:"AIzaSyB21-8EjVpwPdfNOtX3B9W8mv9S2zuGvRQ",
    authDomain: "payup-77032.firebaseapp.com",
    databaseURL: "https://payup-77032.firebaseio.com",
    projectId: "payup-77032",
    storageBucket: "payup-77032.appspot.com",
    messagingSenderId: "603784507143"
};

let app = firebase.initializeApp(config);

export const db = app.database();  
