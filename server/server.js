const Player = require("./game/player");
const board = require("./game/board");

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3001;

// =============================
// إعدادات الموقع
// =============================

app.use(express.static(path.join(__dirname, "../client")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/login.html"));
});
// =============================
// جميع الغرف
// =============================

const rooms = {};

// =============================
// اتصال لاعب
// =============================

io.on("connection", (socket) => {
    socket.on("rejoinRoom", ({ roomCode, playerName }) => {

    if (!rooms[roomCode]) {

        socket.emit("errorMessage", "الغرفة غير موجودة");

        return;

    }

    // لو اللاعب موجود بالفعل، حدث الـ socket.id بتاعه
    let player = rooms[roomCode].players.find(
        p => p.name === playerName
    );

    if (player) {

        player.id = socket.id;

    } else {

        player = new Player(socket.id, playerName);

        rooms[roomCode].players.push(player);

    }

    socket.join(roomCode);

    socket.emit("joinedRoom", roomCode);

    io.to(roomCode).emit(
        "playerList",
        rooms[roomCode].players
    );

});

    console.log("✅ Player Connected:", socket.id);

    // =============================
    // الشات
    // =============================

    socket.on("sendMessage", ({ roomCode, playerName, message }) => {

        if (!rooms[roomCode]) return;

        io.to(roomCode).emit("newMessage", {

            playerName,

            message,

            time: new Date().toLocaleTimeString("ar-EG", {

                hour: "2-digit",

                minute: "2-digit"

            })

        });

    });

    // =============================
    // إنشاء غرفة
    // =============================

    socket.on("createRoom", (playerName) => {

        let roomCode;

        do {

            roomCode = Math.floor(

                100000 + Math.random() * 900000

            ).toString();

        } while (rooms[roomCode]);

        rooms[roomCode] = {

            host: socket.id,

            currentTurn: 0,

            gameStarted: false,

            players: [

                new Player(

                    socket.id,

                    playerName

                )

            ]

        };

        socket.join(roomCode);

        socket.emit("roomCreated", roomCode);

        io.to(roomCode).emit(

            "playerList",

            rooms[roomCode].players

        );

        console.log("🎮 Room Created:", roomCode);

    });

    // =============================
    // الانضمام لغرفة
    // =============================

    socket.on("joinRoom", ({ roomCode, playerName }) => {

    console.log("Join Request:", roomCode);
console.log("Rooms:", Object.keys(rooms));
    console.log("Available Rooms:", Object.keys(rooms));

    if (!rooms[roomCode]) {

        console.log("Room Not Found!");

        socket.emit(
            "errorMessage",
            "الغرفة غير موجودة"
        );

        return;
    }

    console.log("Room Found!");

    rooms[roomCode].players.push(
        new Player(socket.id, playerName)
    );

    socket.join(roomCode);

    socket.emit("joinedRoom", roomCode);

    io.to(roomCode).emit(
        "playerList",
        rooms[roomCode].players
    );

});
    // بدء اللعبة
       socket.on("startGame", (roomCode) => {

        if (!rooms[roomCode]) return;

        const room = rooms[roomCode];

        if (room.host !== socket.id) return;

        room.gameStarted = true;

        io.to(roomCode).emit("gameStarted");

        io.to(roomCode).emit(
            "playerTurn",
            room.players[0].id
        );

        console.log("🎮 Game Started:", roomCode);

    });

    // =============================
    // رمي النرد
    // =============================

    socket.on("rollDice", (roomCode) => {

        if (!rooms[roomCode]) return;

        const room = rooms[roomCode];

        const player = room.players[room.currentTurn];

        if (player.id !== socket.id) return;

        const dice = Math.floor(Math.random() * 6) + 1;

        player.position += dice;

        if (player.position >= board.length) {

            player.position %= board.length;

            player.money += 200;

        }

        const tile = board[player.position];

        io.to(roomCode).emit("diceRolled", {

            playerId: player.id,

            dice,

            player,

            tile

        });

        room.currentTurn++;

        if (room.currentTurn >= room.players.length) {

            room.currentTurn = 0;

        }

        io.to(roomCode).emit(
            "playerTurn",
            room.players[room.currentTurn].id
        );

    });

    // =============================
    // خروج لاعب
    // =============================

   socket.on("disconnect", () => {

    for (const roomCode in rooms) {

        rooms[roomCode].players =
            rooms[roomCode].players.filter(
                player => player.id !== socket.id
            );

        if (rooms[roomCode].players.length === 0) {

            delete rooms[roomCode];

        } else {

            if (rooms[roomCode].host === socket.id) {

                rooms[roomCode].host =
                    rooms[roomCode].players[0].id;

            }

            io.to(roomCode).emit(
                "playerList",
                rooms[roomCode].players
            );

        }

    }

    console.log("❌ Player Disconnected:", socket.id);

});

// ← ده قفل io.on
});

// =============================
// تشغيل السيرفر
// =============================


server.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 LuckyBoard Running on port ${PORT}`);
});