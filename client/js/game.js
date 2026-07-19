const socket = io();

const gameBoard = document.getElementById("gameBoard");

document.getElementById("roomCode").innerHTML =
localStorage.getItem("roomCode");

// رسم اللوحة
board.forEach(cell=>{

const div=document.createElement("div");

div.className="cell";

div.innerHTML=cell.name;

gameBoard.appendChild(div);

});

// النرد
document.getElementById("rollDice").onclick=()=>{

const dice=Math.floor(Math.random()*6)+1;

document.getElementById("dice").innerHTML=dice;

};