import {
    auth,
    googleProvider,
    facebookProvider
} from "./firebase.js";


import {
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


const googleBtn = document.getElementById("googleBtn");


googleBtn.onclick = async()=>{

    try{

        const result = await signInWithPopup(
    auth,
    googleProvider
);


        const user = result.user;


        localStorage.setItem(
            "playerName",
            user.displayName
        );


        localStorage.setItem(
            "playerPhoto",
            user.photoURL
        );


        localStorage.setItem(
            "playerEmail",
            user.email
        );


        window.location.href="/home.html";


    }catch(error){

        console.log(error);

        alert(error.message);

    }

};
const guestBtn = document.getElementById("guestBtn");


guestBtn.onclick = ()=>{

    const name =
    document.getElementById("playerName").value.trim();


    if(!name){

        alert("اكتب اسمك الأول");

        return;

    }


    localStorage.setItem(
        "playerName",
        name
    );


    localStorage.setItem(
        "playerPhoto",
        "images/default.png"
    );


    localStorage.setItem(
        "playerEmail",
        "Guest"
    );


    window.location.href="/home.html";

};