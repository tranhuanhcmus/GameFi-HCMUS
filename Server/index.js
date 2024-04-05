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
const sockets = [];

io.on('connection', (socket) => {
	console.log(`User Connected: ${socket.id}`);

	socket.on(SOCKET.JOIN_ROOM, (data) => {
		if (sockets.length < 2) {
			// 1 ROOM ONLY HAVE 2 PLAYERS
			sockets.push(socket.id);
			socket.join(data);
			console.log(`User with ID: ${socket.id} joined room: ${data}`);
			console.log('sockets ', sockets);
		}
	});

	socket.on(SOCKET.UPDATE_LOCATION_DRIVER, (data) => {
		const temp = { lat: data.lat, lng: data.lng };

		driverLocations[data.driverinfo] = temp;

		for (const driverid in listbooking) {
			if (data.driverinfo === driverid) {
				const tmp = listbooking[driverid];
				const datatemp = { ...tmp, location: { lat: data.lat, lng: data.lng } };
				socket
					.to(listbooking[driverid].idcustomer)
					.emit(SOCKET.UPDATE_LOCATION_DRIVER_TO_CUSTOMER, datatemp);
			}
		}
	});

	socket.on(SOCKET.BOOKING, async (data) => {
		// customer book car after send location surroundings for customer
		const messages = {
			data: data,
			messages: 'Send to driver success',
		};

		const arraytempdriversuitable = {};

		// Calculate distances concurrently
		const distancePromises = Object.keys(driverLocations).map(
			async (driverName) => {
				try {
					const distance = await calculateDrivingDistance(
						driverLocations[driverName],
						data.origin.location
					);

					if (distance <= 5) {
						arraytempdriversuitable[driverName] = driverLocations[driverName];
					}
				} catch (error) {
					console.error(error);
				}
			}
		);

		await Promise.all(distancePromises);
		socket.emit(SOCKET.SEND_DRIVERS_LOCATION, arraytempdriversuitable);
		customerRequest[data.Customer?.id] = {
			destination: data.destination,
			origin: data.origin,
			Customer: data.Customer,
			cardetails: data.cardetails,
		};

		const messagePromises = Object.keys(driverLocations).map(
			async (driverName) => {
				try {
					const distance = await calculateDrivingDistance(
						driverLocations[driverName],
						data.origin.location
					);

					if (distance <= 5) {
						socket.to(driverName).emit(SOCKET.SEND_CUSTOMER_LOCATION, messages);
					}
				} catch (error) {
					console.error(error);
				}
			}
		);

		await Promise.all(messagePromises);
	});

	socket.on(SOCKET.SEND_NOTIFY_PICK_UP, (data) => {
		const messages = 'pick up';
		socket
			.to(data.customerId)
			.emit(SOCKET.SEND_NOTIFY_PICK_UP_CUSTOMER, messages);
	});

	socket.on(SOCKET.SEND_NOTIFY_TRIP_SUCCESS, (data) => {
		const messages = 'drop off';

		delete listbooking[data.driverId];

		socket
			.to(data.customerId)
			.emit(SOCKET.SEND_NOTIFY_PICK_UP_CUSTOMER, messages);
	});

	socket.on(SOCKET.SEND_NOTIFY_CANCEL_TRIP, async (data) => {
		const messages = 'cancel trip';

		socket
			.to(data.customerId)
			.emit(SOCKET.SEND_NOTIFY_PICK_UP_CUSTOMER, messages);

		customerRequest[data.customerId] =
			listbooking[data.driverId]?.customerRequest;

		delete listbooking[data.driverId];

		const arraytempdriversuitable = {};

		// Calculate distances with customer and boadcast to custmer
		const distancePromises = Object.keys(driverLocations).map(
			async (driverName) => {
				try {
					const distance = await calculateDrivingDistance(
						driverLocations[driverName],
						customerRequest[data.customerId].origin.location
					);

					if (distance <= 5) {
						arraytempdriversuitable[driverName] = driverLocations[driverName];
					}
				} catch (error) {
					console.error(error);
				}
			}
		);

		await Promise.all(distancePromises);
		socket
			.to(data.customerId)
			.emit(SOCKET.SEND_DRIVERS_LOCATION, arraytempdriversuitable);

		// const datatemp = [];
		// for (const customer in customerRequest) {
		//   datatemp.push({ data: { ...customerRequest[customer] } });
		// }

		for (const driverName in driverLocations) {
			const datatemp = [];
			const messagePromises = Object.keys(customerRequest).map(
				async (customer) => {
					try {
						const distance = await calculateDrivingDistance(
							driverLocations[driverName],
							customerRequest[customer].origin.location
						);

						if (distance <= 5) {
							datatemp.push({ data: { ...customerRequest[customer] } });
						}
					} catch (error) {
						console.error(error);
					}
				}
			);
			await Promise.all(messagePromises);
			socket.to(driverName).emit(SOCKET.GET_LOCATION_CUSTOMER_ARRAY, datatemp);
		}
	});

	socket.on(SOCKET.GET_LOCATION_CUSTOMER, async (data) => {
		// send location customer request to driver when request
		const datatemp = [];
		console.log(data);
		console.log(driverLocations[data]);
		const messagePromises = Object.keys(customerRequest).map(
			async (customer) => {
				try {
					const distance = await calculateDrivingDistance(
						driverLocations[data],
						customerRequest[customer].origin.location
					);

					if (distance <= 5) {
						datatemp.push({ data: { ...customerRequest[customer] } });
					}
				} catch (error) {
					console.error(error);
				}
			}
		);
		await Promise.all(messagePromises);
		socket.emit(SOCKET.GET_LOCATION_CUSTOMER_ARRAY, datatemp);
	});

	socket.on(SOCKET.ATTACK, (data) => {
		console.log('socketId ', socket.id, ' attack: ', data);

		socket.to(data.room).emit(SOCKET.ATTACK, data.damage);
	});

	socket.on('disconnect', () => {
		console.log('User Disconnected', socket.id);
	});
});
const PORT = 3001;
server.listen(PORT, () => {
	console.log(`SERVER RUNNING on ${PORT}`);
});
