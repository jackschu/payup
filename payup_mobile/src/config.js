
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'


let config = {
    apiKey: "AIzaSyB21-8EjVpwPdfNOtX3B9W8mv9S2zuGvRQ",
    authDomain: "payup-77032.firebaseapp.com",
    databaseURL: "https://payup-77032.firebaseio.com",
    projectId: "payup-77032",
    storageBucket: "payup-77032.appspot.com",
    messagingSenderId: "603784507143"
};

let app = firebase.initializeApp(config);
console.warn(app);
export const db = app.database();  
