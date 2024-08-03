const { Server } = require("socket.io");
const { SOCKET } = require("../constants");
require('dotenv').config()

// STORE ID OF SOCKET.
const socketPairs = new Map(); // Map to store socket pairs
const matchPairs = new Map(); // Map to store

// Example usage within a socket disconnect event:

function findMatch(socket, data) {
    let foundMatch = false;
    console.log(data.gameName);
    // Iterate through the map to find an available match
    socketPairs.forEach((value, key) => {
        // If a match is found and it's not the same socket
        if (!foundMatch &&
            value.available &&
            key !== socket.id &&
            value.gameName == data.gameName
        ) {
            const gameRoom = `game_${socket.id}_${key}`;
            // Join the sockets to the same game room

            socket.join(gameRoom);
            value.socket.join(gameRoom);

            // Set availability to false as they are now in a game
            socketPairs.set(socket.id, {
                socket: socket,
                available: false,
                gameName: data.gameName,
                assetsOpponent: data.assets,
                hpOpponent: data.hp,
                atkOpponent: data.atk,
                elementOpponent: data.element,
            });
            socketPairs.set(key, {
                socket: value.socket,
                available: false,
                gameName: value.gameName,
                assetsOpponent: value.assetsOpponent,
                hpOpponent: value.hpOpponent,
                atkOpponent: value.atkOpponent,
                elementOpponent: value.elementOpponent,
            });
            matchPairs.set(gameRoom, {
                [socket.id]: socket.id,
                [key]: key,
            });

            console.log("matchPairs.gameRoom", matchPairs.get(gameRoom));
            // Notify both clients that the game is starting
            console.log(data);
            io.to(socket.id).emit(SOCKET.KEY_ROOM, {
                gameRoom: gameRoom,
                hpOpponent: value.hpOpponent,
                assetsOpponent: value.assetsOpponent,
                atkOpponent: value.atkOpponent,
                elementOpponent: value.elementOpponent,
            });

            io.to(key).emit(SOCKET.KEY_ROOM, {
                gameRoom: gameRoom,
                hpOpponent: data.hp,
                assetsOpponent: data.assets,
                atkOpponent: data.atk,
                elementOpponent: data.element,
            });

            // randomly first turn for any player
            const values = Object.values(matchPairs.get(gameRoom));
            const randomIndex = Math.floor(Math.random() * values.length);
            const randomValue = values[randomIndex];
            io.to(randomValue).emit(SOCKET.FIRST_TURN, true);

            foundMatch = true;
        }
    });

    if (!foundMatch) {
        // If no match found, ensure the socket is marked available for matchmaking
        socketPairs.set(socket.id, {
            socket: socket,
            available: true,
            gameName: data.gameName,
            assetsOpponent: data.assets,
            hpOpponent: data.hp,
            atkOpponent: data.atk,
            elementOpponent: data.element,
        });
        console.log("waiting_for_opponent", "Waiting for an opponent...");
        socket.emit("waiting_for_opponent", "Waiting for an opponent...");
    }
}

function sendEvent(socket, event) {
    const gameRoomPair = matchPairs.get(event.gameRoom);
    let otherPlayerKey;

    if (gameRoomPair) {
        // Loop through the keys of the object
        for (const playerKey in gameRoomPair) {
            if (gameRoomPair[playerKey] !== socket.id) {
                otherPlayerKey = gameRoomPair[playerKey];
                break;
            }
        }
    }
    if (otherPlayerKey) {
        console.log("The other player's key is:", otherPlayerKey);
    } else {
        console.log("No other player key found or the game room does not exist.");
    }
    // io.to(event.room).emit("update_data_table", event.table);
    io.to(otherPlayerKey).emit(SOCKET.TAKE_DAMAGE, event);
}

function handleDisconnection(disconnectedSocket) {
    console.log(`User Disconnected: ${disconnectedSocket.id}`);

    const disconnectedSocketId = disconnectedSocket.id;

    // Check if the disconnected socket was in a game and notify the other player

    matchPairs.forEach((value, key) => {
        if (value[disconnectedSocketId] == disconnectedSocketId) {
            // Two users are in a game, and one disconnects

            io.to(key).emit(
                "opponent_disconnected",
                "Your opponent has disconnected."
            );
        }
    });

    // Remove the disconnected socket entry from the map
    socketPairs.delete(disconnectedSocketId);
}

function initSocket(server) {
    var io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`User Connected: ${socket.id}`);

        socket.on(SOCKET.FIND_MATCH, (data) => {
            console.log(data);
            socketPairs.set(socket.id, {
                socket: socket,
                available: true,
                gameName: data,
            });

            findMatch(socket, data);
        });

        socket.on(SOCKET.EVENT_DIAMOND, (data) => {
            sendEvent(socket, data);
        });

        socket.on("success", (data) => {
            console.log(`User Disconnected: ${socket.id}`);
            socketPairs.delete(socket.id);
            matchPairs.delete(data);

            console.log(matchPairs, socketPairs);
        });

        socket.on("disconnect", () => {
            console.log(`User Disconnected: ${socket.id}`);

            handleDisconnection(socket);
        });
    });

	const PORT = process.env.SOCKET_PORT ||3001;
	server.listen(PORT, () => {
	console.log(`SOCKET RUNNING on ${PORT}`);
	});
}

module.exports = { initSocket }