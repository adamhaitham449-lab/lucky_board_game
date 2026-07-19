import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { 
    getAuth,
    GoogleAuthProvider,
    FacebookAuthProvider 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


const firebaseConfig = {

    apiKey: "AIzaSyCnrAVVVmRGYO1dtyJACJ0R_ZRhMyYaj9U",

    authDomain: "lucky-board--game.firebaseapp.com",

    projectId: "lucky-board--game",

    storageBucket: "lucky-board--game.firebasestorage.app",

    messagingSenderId: "300071859594",

    appId: "1:300071859594:web:1903f3395dcd8564ed0473"

};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);


const googleProvider = new GoogleAuthProvider();


const facebookProvider = new FacebookAuthProvider();


export {
    auth,
    googleProvider,
    facebookProvider
};