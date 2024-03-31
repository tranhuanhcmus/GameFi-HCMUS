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

const driverLocations = {
	driver1: { lat: 10.7769, lng: 106.7009 }, // District 1
	driver2: { lat: 10.7654, lng: 106.6973 }, // District 3
	driver3: { lat: 10.7916, lng: 106.7078 }, // District 4
	driver4: { lat: 10.8491, lng: 106.6297 }, // Binh Thanh District
	driver5: { lat: 10.7601, lng: 106.6636 }, // Phu Nhuan District
};

const customerRequest = {};
const listbooking = {};

const calculateDrivingDistance = async (origin, destination) => {
	const originLat = origin.lat;
	const originLng = origin.lng;
	const destinationLat = destination.lat;
	const destinationLng = destination.lng;

	const originStr = `${originLat},${originLng}`;
	const destinationStr = `${destinationLat},${destinationLng}`;

	const apiKey = 'AIzaSyCOv0UiRLIxv-IbgnzKGZWJu5BBL-R91gg'; // Replace with your Google Maps API key
	const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originStr}&destination=${destinationStr}&key=${apiKey}`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Error getting directions: ${response.status}`);
		}

		const data = await response.json();

		if (data.status === 'OK' && data.routes.length > 0) {
			const distanceInMeters = data.routes[0].legs[0].distance.value;
			const distanceInKilometers = distanceInMeters / 1000;

			return distanceInKilometers;
		} else {
			throw new Error(`Error getting directions: ${data.status}`);
		}
	} catch (error) {
		throw new Error(`Error: ${error.message}`);
	}
};

io.on('connection', (socket) => {
	console.log(`User Connected: ${socket.id}`);

	socket.on(SOCKET.JOIN_ROOM, (data) => {
		socket.join(data);
		console.log(`User with ID: ${socket.id} joined room: ${data}`);
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

	socket.on(SOCKET.SEND_ACCEPT_BOOKING, async (data) => {
		const temp = {
			idcustomer: data.idcustomer,
			name: data.name,
			identify: data.identify,
			brandName: data.brandName,
			customerRequest: { ...customerRequest[data.idcustomer] },
		};

		delete customerRequest[data.idcustomer];

		for (const driver in driverLocations) {
			if (Object.keys(customerRequest).length === 0) {
				const data = { data: {} }; // You can send an empty object as data
				socket.to(driver).emit(SOCKET.GET_LOCATION_CUSTOMER_ARRAY, data);
			} else {
				const datatemp = [];
				const messagePromises = Object.keys(customerRequest).map(
					async (customer) => {
						try {
							const distance = await calculateDrivingDistance(
								driverLocations[data.driver],
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
				socket.to(driver).emit(SOCKET.GET_LOCATION_CUSTOMER_ARRAY, datatemp);
			}
		}

		listbooking[data.driver] = temp;

		socket.to(data.idcustomer).emit(SOCKET.SEND_ACCEPT_BOOKING_SUCCESS, data);
	});

	socket.on(SOCKET.SEND_NOTIFY_CANCEL_TRIP_FROM_CUSTOMER, async (data) => {
		if (data.driverId) {
			delete listbooking[data.driverId];
			socket
				.to(data.driverId)
				.emit(
					SOCKET.SEND_NOTIFY_CANCEL_TRIP_TO_DRIVER,
					'cancel trip from customer'
				);
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
				socket
					.to(driverName)
					.emit(SOCKET.GET_LOCATION_CUSTOMER_ARRAY, datatemp);
			}
		} else {
			delete customerRequest[data.customerId];
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
				socket
					.to(driverName)
					.emit(SOCKET.GET_LOCATION_CUSTOMER_ARRAY, datatemp);
			}
		}
	});

	socket.on('disconnect', () => {
		console.log('User Disconnected', socket.id);
	});
});
const PORT = 3001;
server.listen(PORT, () => {
	console.log(`SERVER RUNNING on ${PORT}`);
});
