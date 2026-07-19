
const socket = io();

// بيانات اللاعب
const playerName = localStorage.getItem("playerName");
const playerPhoto = localStorage.getItem("playerPhoto");
const playerCoins = localStorage.getItem("playerCoins") || 1000;


// الاسم
document.getElementById("playerName").innerText =
playerName || "لاعب";


// الصورة
const photoElement = document.getElementById("playerPhoto");

if(photoElement){

    photoElement.src = playerPhoto || "images/default.png";

}else{

    console.log("الصورة غير موجودة في HTML");

}


// العملات
document.getElementById("coins").innerText =
playerCoins;

if (!playerName) {
    window.location.href = "/login.html";
}

document.getElementById("welcome").innerHTML =
`مرحباً ${playerName} 👋`;

// عناصر الصفحة
const createModal = document.getElementById("createModal");
const joinModal = document.getElementById("joinModal");

document.getElementById("createRoomBtn").onclick = () => {
    createModal.style.display = "flex";
};

document.getElementById("joinRoomBtn").onclick = () => {
    joinModal.style.display = "flex";
};

// إنشاء غرفة
document.getElementById("createGame").onclick = () => {

    socket.emit("createRoom", playerName);

};

// انضمام لغرفة
document.getElementById("joinGame").onclick = () => {

    const roomCode =
    document.getElementById("roomCode").value.trim();

    if(roomCode.length!==6){

        alert("كود الغرفة يجب أن يكون 6 أرقام");

        return;

    }

    socket.emit("joinRoom",{

        roomCode,

        playerName

    });

};

// تم إنشاء الغرفة
socket.on("roomCreated",(roomCode)=>{

    localStorage.setItem("roomCode",roomCode);

    window.location.href="/lobby.html";

});

// تم الانضمام
socket.on("joinedRoom",(roomCode)=>{

    localStorage.setItem("roomCode",roomCode);

    window.location.href="/lobby.html";

});

// خطأ
socket.on("errorMessage",(msg)=>{

    alert(msg);

});

// إغلاق الـ Modal عند الضغط خارجها
window.onclick = (e)=>{

    if(e.target===createModal){

        createModal.style.display="none";

    }

    if(e.target===joinModal){

        joinModal.style.display="none";

    }

};

// Settings

const settingsModal =
document.getElementById("settingsModal");


document.getElementById("settingsBtn").onclick = ()=>{


    settingsModal.style.display="flex";


    document.getElementById("settingsPhoto").src =
    localStorage.getItem("playerPhoto");


    document.getElementById("settingsName").innerText =
    localStorage.getItem("playerName");


    document.getElementById("settingsEmail").innerText =
    localStorage.getItem("playerEmail");


};



document.getElementById("closeSettings").onclick = ()=>{

    settingsModal.style.display="none";

};



document.getElementById("logoutBtn").onclick = ()=>{


    localStorage.clear();


    window.location.href="/login.html";


};