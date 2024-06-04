const express = require('express');
const { SOCKET } = require('./socket/constants');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

// STORE ID OF SOCKET.
const socketPairs = new Map(); // Map to store socket pairs
const matchPairs = new Map(); // Map to store

// Example usage within a socket disconnect event:

function findMatch(socket, data) {
	let foundMatch = false;

	// Iterate through the map to find an available match
	socketPairs.forEach((value, key) => {
		// If a match is found and it's not the same socket
		if (
			!foundMatch &&
			value.available &&
			key !== socket.id &&
			value.gameName == data
		) {
			const gameRoom = `game_${socket.id}_${key}`;
			// Join the sockets to the same game room
			console.log(gameRoom);
			socket.join(gameRoom);
			value.socket.join(gameRoom);

			// Set availability to false as they are now in a game
			socketPairs.set(socket.id, {
				socket: socket,
				available: false,
				gameName: data,
			});
			socketPairs.set(key, {
				socket: value.socket,
				available: false,
				gameName: value.gameName,
			});
			matchPairs.set(gameRoom, {
				[socket.id]: socket.id,
				[key]: key,
			});

			console.log('matchPairs.gameRoom', matchPairs.get(gameRoom));
			// Notify both clients that the game is starting
			io.to(gameRoom).emit(SOCKET.KEY_ROOM, `${gameRoom}`);

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
			gameName: data,
		});
		console.log('waiting_for_opponent', 'Waiting for an opponent...');
		socket.emit('waiting_for_opponent', 'Waiting for an opponent...');
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
		console.log('No other player key found or the game room does not exist.');
	}
	// io.to(event.room).emit("update_data_table", event.table);
	io.to(otherPlayerKey).emit(SOCKET.TAKE_DAMAGE, event);
}

function handleDisconnection(disconnectedSocket) {
	console.log(`User Disconnected: ${disconnectedSocket.id}`);

	const disconnectedSocketId = disconnectedSocket.id;

	// Check if the disconnected socket was in a game and notify the other player
	socketPairs.forEach((value, key) => {
		if (value.available === false) {
			// Two users are in a game, and one disconnects
			const gameRoom = value.gameRoom;
			disconnectedSocket
				.to(gameRoom)
				.emit('opponent_disconnected', 'Your opponent has disconnected.');

			// Setting the remaining user as available again
			if (socketPairs.has(key)) {
				socketPairs.set(key, {
					socket: value.socket,
					available: true,
					gameRoom: null,
				});
			}
		}
	});

	// Remove the disconnected socket entry from the map
	socketPairs.delete(disconnectedSocketId);
}

io.on('connection', (socket) => {
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

	// socket.on(SOCKET.UPDATE_LOCATION_DRIVER, (data) => {
	//   const temp = { lat: data.lat, lng: data.lng };

	//   driverLocations[data.driverinfo] = temp;

	//   for (const driverid in listbooking) {
	//     if (data.driverinfo === driverid) {
	//       const tmp = listbooking[driverid];
	//       const datatemp = { ...tmp, location: { lat: data.lat, lng: data.lng } };
	//       socket
	//         .to(listbooking[driverid].idcustomer)
	//         .emit(SOCKET.UPDATE_LOCATION_DRIVER_TO_CUSTOMER, datatemp);
	//     }
	//   }
	// });

	// socket.on(SOCKET.BOOKING, async (data) => {
	//   // customer book car after send location surroundings for customer
	//   const messages = {
	//     data: data,
	//     messages: "Send to driver success",
	//   };

	//   const arraytempdriversuitable = {};

	//   // Calculate distances concurrently
	//   const distancePromises = Object.keys(driverLocations).map(
	//     async (driverName) => {
	//       try {
	//         const distance = await calculateDrivingDistance(
	//           driverLocations[driverName],
	//           data.origin.location
	//         );

	//         if (distance <= 5) {
	//           arraytempdriversuitable[driverName] = driverLocations[driverName];
	//         }
	//       } catch (error) {
	//         console.error(error);
	//       }
	//     }
	//   );

	//   await Promise.all(distancePromises);
	//   socket.emit(SOCKET.SEND_DRIVERS_LOCATION, arraytempdriversuitable);
	//   customerRequest[data.Customer?.id] = {
	//     destination: data.destination,
	//     origin: data.origin,
	//     Customer: data.Customer,
	//     cardetails: data.cardetails,
	//   };

	//   const messagePromises = Object.keys(driverLocations).map(
	//     async (driverName) => {
	//       try {
	//         const distance = await calculateDrivingDistance(
	//           driverLocations[driverName],
	//           data.origin.location
	//         );

	//         if (distance <= 5) {
	//           socket.to(driverName).emit(SOCKET.SEND_CUSTOMER_LOCATION, messages);
	//         }
	//       } catch (error) {
	//         console.error(error);
	//       }
	//     }
	//   );

	//   await Promise.all(messagePromises);
	// });

	// socket.on(SOCKET.SEND_NOTIFY_PICK_UP, (data) => {
	//   const messages = "pick up";
	//   socket
	//     .to(data.customerId)
	//     .emit(SOCKET.SEND_NOTIFY_PICK_UP_CUSTOMER, messages);
	// });

	// socket.on(SOCKET.SEND_NOTIFY_TRIP_SUCCESS, (data) => {
	//   const messages = "drop off";

	//   delete listbooking[data.driverId];

	//   socket
	//     .to(data.customerId)
	//     .emit(SOCKET.SEND_NOTIFY_PICK_UP_CUSTOMER, messages);
	// });

	// socket.on(SOCKET.SEND_NOTIFY_CANCEL_TRIP, async (data) => {
	//   const messages = "cancel trip";

	//   socket
	//     .to(data.customerId)
	//     .emit(SOCKET.SEND_NOTIFY_PICK_UP_CUSTOMER, messages);

	//   customerRequest[data.customerId] =
	//     listbooking[data.driverId]?.customerRequest;

	//   delete listbooking[data.driverId];

	//   const arraytempdriversuitable = {};

	//   // Calculate distances with customer and boadcast to custmer
	//   const distancePromises = Object.keys(driverLocations).map(
	//     async (driverName) => {
	//       try {
	//         const distance = await calculateDrivingDistance(
	//           driverLocations[driverName],
	//           customerRequest[data.customerId].origin.location
	//         );

	//         if (distance <= 5) {
	//           arraytempdriversuitable[driverName] = driverLocations[driverName];
	//         }
	//       } catch (error) {
	//         console.error(error);
	//       }
	//     }
	//   );

	//   await Promise.all(distancePromises);
	//   socket
	//     .to(data.customerId)
	//     .emit(SOCKET.SEND_DRIVERS_LOCATION, arraytempdriversuitable);

	//   // const datatemp = [];
	//   // for (const customer in customerRequest) {
	//   //   datatemp.push({ data: { ...customerRequest[customer] } });
	//   // }

	//   for (const driverName in driverLocations) {
	//     const datatemp = [];
	//     const messagePromises = Object.keys(customerRequest).map(
	//       async (customer) => {
	//         try {
	//           const distance = await calculateDrivingDistance(
	//             driverLocations[driverName],
	//             customerRequest[customer].origin.location
	//           );

	//           if (distance <= 5) {
	//             datatemp.push({ data: { ...customerRequest[customer] } });
	//           }
	//         } catch (error) {
	//           console.error(error);
	//         }
	//       }
	//     );
	//     await Promise.all(messagePromises);
	//     socket.to(driverName).emit(SOCKET.GET_LOCATION_CUSTOMER_ARRAY, datatemp);
	//   }
	// });

	// socket.on(SOCKET.GET_LOCATION_CUSTOMER, async (data) => {
	//   // send location customer request to driver when request
	//   const datatemp = [];
	//   console.log(data);
	//   console.log(driverLocations[data]);
	//   const messagePromises = Object.keys(customerRequest).map(
	//     async (customer) => {
	//       try {
	//         const distance = await calculateDrivingDistance(
	//           driverLocations[data],
	//           customerRequest[customer].origin.location
	//         );

	//         if (distance <= 5) {
	//           datatemp.push({ data: { ...customerRequest[customer] } });
	//         }
	//       } catch (error) {
	//         console.error(error);
	//       }
	//     }
	//   );
	//   await Promise.all(messagePromises);
	//   socket.emit(SOCKET.GET_LOCATION_CUSTOMER_ARRAY, datatemp);
	// });

	// socket.on(SOCKET.ATTACK, (data) => {
	//   console.log("socketId ", socket.id, " attack: ", data);
	//   console.log(
	//     "send to component ",
	//     sockets.find((item) => item != socket.id)
	//   );
	//   socket
	//     .to(sockets.find((item) => item != socket.id))
	//     .emit(SOCKET.ATTACK, data);
	// });

	// socket.on(SOCKET.MOVE, (data) => {
	//   console.log("socketId ", socket.id, " move: ", data);
	//   console.log(
	//     "send to component ",
	//     sockets.find((item) => item != socket.id)
	//   );
	//   socket
	//     .to(sockets.find((item) => item != socket.id))
	//     .emit(SOCKET.MOVE, data);
	// });

	socket.on('success', (data) => {
		console.log(`User Disconnected: ${socket.id}`);
		matchPairs.delete(data);
		handleDisconnection(socket);
		console.log(matchPairs, socketPairs);
	});

	socket.on('disconnect', () => {
		console.log(`User Disconnected: ${socket.id}`);

		handleDisconnection(socket);
	});
});
const PORT = 3001;
server.listen(PORT, () => {
	console.log(`SERVER RUNNING on ${PORT}`);
});
