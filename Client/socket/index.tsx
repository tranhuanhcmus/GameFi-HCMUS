import { Socket } from "socket.io-client";
import io from "socket.io-client";
import { SOCKET } from "./constants";

// PLEASE, CHECK YOUR IP OF SERVER TO CHANGE HERE
const SERVER_URL = "http://192.168.1.14:";
const PORT = 3001;
const server = `${SERVER_URL}${PORT}`;

export type Cell = {
  row: string;
  column: string;
};

export type DataSocketTransfer = {
  room: string;
  damage: number;
  move: { startCell: Cell; endCell: Cell };
  // blockList: Cell[]
};

export class SocketIOClient {
  private static instance: SocketIOClient;
  private socket!: Socket; // Using "!" to indicate that it will be assigned later

  private constructor() {
    this.initializeSocketIO();
  }

  static getInstance(): SocketIOClient {
    if (!SocketIOClient.instance) {
      SocketIOClient.instance = new SocketIOClient();
    }
    return SocketIOClient.instance;
  }

  private initializeSocketIO() {
    this.socket = io(server);

    this.socket.on("connect", () => {
      console.log(`Connected to ${server}`);
    });

    this.socket.on("disconnect", () => {
      console.log(`Disconnect to ${server}`);
    });

    this.socket.on("create_user", (data) => {
      // Handle user creation here
      console.log("create_user");
    });
    console.log("InitializeSocketIO");
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  emitJoinRoom(data: string) {
    this.socket.emit(SOCKET.JOIN_ROOM, data);
  }

  emitSendAcceptBooking(data: any) {
    this.socket.emit(SOCKET.SEND_ACCEPT_BOOKING, data);
  }

  emitSendUpdateLocation(data: any) {
    this.socket.emit(SOCKET.UPDATE_LOCATION_DRIVER, data);
  }

  onListenCustomerLocation(callback: (data: any) => void) {
    this.socket.on(SOCKET.SEND_CUSTOMER_LOCATION, (data) => {
      callback(data);
    });
  }

  emitGetCustomerLocation(data: any) {
    this.socket.emit(SOCKET.GET_LOCATION_CUSTOMER, data);
  }
  onListenCustomerLocationRequest(callback: (data: any) => void) {
    this.socket.on(SOCKET.GET_LOCATION_CUSTOMER_ARRAY, (data) => {
      callback(data);
    });
  }

  emitPickCustomer(data: any) {
    this.socket.emit(SOCKET.SEND_NOTIFY_PICK_UP, data);
  }

  emitSuccessTrip(data: any) {
    this.socket.emit(SOCKET.SEND_NOTIFY_TRIP_SUCCESS, data);
  }

  emitCancelTrip(data: any) {
    this.socket.emit(SOCKET.SEND_NOTIFY_CANCEL_TRIP, data);
  }

  onListenCancelFromCustomer(callback: (data: any) => void) {
    this.socket.on(SOCKET.SEND_NOTIFY_CANCEL_TRIP_TO_DRIVER, (data) => {
      callback(data);
    });
  }

  emitAttack(data: any) {
    this.socket.emit(SOCKET.ATTACK, data);
  }
  onListenAttack(callback: (data: DataSocketTransfer) => void) {
    this.socket.on(SOCKET.ATTACK, (data) => {
      callback(data);
    });
  }

  emitMove(data: any) {
    this.socket.emit(SOCKET.MOVE, data);
  }

  onListenMove(callback: (data: any) => void) {
    this.socket.on(SOCKET.MOVE, (data) => {
      callback(data);
    });
  }
}
