import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCgScQpUlMT9QO1CtLtYfeCzynjfNXJjKo",
    authDomain: "reactnative-dd442.firebaseapp.com",
    databaseURL: "https://reactnative-dd442-default-rtdb.firebaseio.com",
    projectId: "reactnative-dd442",
    storageBucket: "reactnative-dd442.appspot.com",
    messagingSenderId: "505094558446",
    appId: "1:505094558446:web:e2eb59ea50b69d384659ff",
    measurementId: "G-BT01EXNDW6"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };