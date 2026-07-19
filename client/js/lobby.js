const socket = io();
socket.emit("rejoinRoom", {

    roomCode,

    playerName

});

const roomCode = localStorage.getItem("roomCode");
const playerName = localStorage.getItem("playerName");

document.getElementById("roomCode").textContent = roomCode;

// نسخ الكود
document.getElementById("copyBtn").onclick = () => {

    navigator.clipboard.writeText(roomCode);

    alert("تم نسخ كود الغرفة ✅");

};

// إرسال رسالة
document.getElementById("sendBtn").onclick = sendMessage;

document.getElementById("chatInput").addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        sendMessage();

    }

});

function sendMessage(){

    const input=document.getElementById("chatInput");

    const message=input.value.trim();

    if(message==="") return;

    socket.emit("sendMessage",{

        roomCode,

        playerName,

        message

    });

    input.value="";

}

// استقبال الرسائل
socket.on("newMessage",(data)=>{

    const messages=document.getElementById("messages");

    messages.innerHTML+=`

    <div class="message">

        <b>${data.playerName}</b>

        <br>

        ${data.message}

        <br>

        <small>${data.time}</small>

    </div>

    `;

    messages.scrollTop=messages.scrollHeight;

});

// تحديث اللاعبين
socket.on("playerList", (players) => {

    const list = document.getElementById("playerList");

    list.innerHTML = "";

    players.forEach((player, index) => {

        const li = document.createElement("li");

        li.className = "player";

        li.innerHTML = `

            <div class="playerCard">

                <span>

                    ${index === 0 ? "👑" : "👤"}

                    ${player.name}

                </span>

            </div>

        `;

        list.appendChild(li);

    });

});

// بدء اللعبة
document.getElementById("startBtn").onclick=()=>{

    socket.emit("startGame",roomCode);

};

socket.on("gameStarted",()=>{

    window.location.href="/game.html";

});