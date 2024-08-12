const express = require("express");
const { SOCKET } = require("./socket/constants");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// STORE ID OF SOCKET.
const socketPairs = new Map(); // Map to store socket pairs
const matchPairs = new Map(); // Map to store

// Example usage within a socket disconnect event:

function findMatch(socket, data) {
  console.log(`Searching for match for game: ${data.gameName}`);

  // Find the first available match
  const matchEntry = Array.from(socketPairs.entries()).find(([key, value]) => 
    value.available && 
    key !== socket.id && 
    value.gameName === data.gameName
  );

  if (matchEntry) {
    const [opponentId, opponentData] = matchEntry;
    const gameRoom = `game_${socket.id}_${opponentId}`;

    // Join the sockets to the same game room
    socket.join(gameRoom);
    opponentData.socket.join(gameRoom);

    // Update both players' data in socketPairs
    const playerData = {
      socket: socket,
      available: false,
      gameName: data.gameName,
      assetsOpponent: data.assets,
      hpOpponent: data.hp,
      atkOpponent: data.atk,
      elementOpponent: data.element,
    };

    socketPairs.set(socket.id, playerData);
    socketPairs.set(opponentId, { ...opponentData, available: false });

    // Set up matchPairs
    matchPairs.set(gameRoom, {
      [socket.id]: socket.id,
      [opponentId]: opponentId,
    });

    // Randomly choose first turn
    const players = [socket.id, opponentId];
    const firstPlayer = players[Math.floor(Math.random() * players.length)];
    io.to(firstPlayer).emit(SOCKET.FIRST_TURN, true);

    console.log(`Match found: ${gameRoom}`);

    // Notify both clients that the game is starting
    io.to(socket.id).emit(SOCKET.KEY_ROOM, {
      gameRoom: gameRoom,
      hpOpponent: opponentData.hpOpponent,
      assetsOpponent: opponentData.assetsOpponent,
      atkOpponent: opponentData.atkOpponent,
      elementOpponent: opponentData.elementOpponent,
    });

    io.to(opponentId).emit(SOCKET.KEY_ROOM, {
      gameRoom: gameRoom,
      hpOpponent: data.hp,
      assetsOpponent: data.assets,
      atkOpponent: data.atk,
      elementOpponent: data.element,
    });
  } else {
    // If no match found, mark the socket as available for matchmaking
    socketPairs.set(socket.id, {
      socket: socket,
      available: true,
      gameName: data.gameName,
      assetsOpponent: data.assets,
      hpOpponent: data.hp,
      atkOpponent: data.atk,
      elementOpponent: data.element,
    });
    console.log(`Player ${socket.id} waiting for opponent in game: ${data.gameName}`);
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
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`SERVER RUNNING on ${PORT}`);
});
