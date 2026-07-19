import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
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

const provider = new GoogleAuthProvider();

const googleBtn = document.getElementById("googleBtn");

const guestBtn = document.getElementById("guestBtn");

const playerName = document.getElementById("playerName");

googleBtn.onclick = async () => {

    try{

        const result = await signInWithPopup(auth,provider);

        const user = result.user;

        localStorage.setItem("playerName",user.displayName);

        localStorage.setItem("playerPhoto",user.photoURL);

        localStorage.setItem("playerEmail",user.email);
        
        localStorage.setItem("playerCoins", 1000);

        window.location.href="/home.html";

    }

    catch(err){

        alert(err.message);

        console.log(err);

    }

};

guestBtn.onclick=()=>{

    if(playerName.value.trim()===""){

        alert("اكتب اسمك");

        return;

    }

    localStorage.setItem(

        "playerName",

        playerName.value.trim()

    );

    localStorage.setItem(

        "playerPhoto",

        "https://ui-avatars.com/api/?name="+playerName.value

    );

    window.location.href="/home.html";

};