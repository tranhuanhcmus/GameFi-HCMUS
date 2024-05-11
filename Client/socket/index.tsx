import { Socket } from "socket.io-client";
import io from "socket.io-client";
import { SOCKET } from "./constants";

const PORT = 3001;
let server: string;
// server = `http://192.168.1.14:${PORT}`; // TODO CHANGE LATER
server = `http://localhost:${PORT}`; // TODO CHANGE LATER
// // Check if the environment is a browser and window.location is defined
// const isBrowser =
//   typeof window !== "undefined" &&
//   typeof window.document !== "undefined" &&
//   typeof window.location !== "undefined";

// if (isBrowser) {
//   // Check if the current hostname is "localhost" only if window.location is available
//   const isLocalhost =
//     window.location && window.location.hostname === "localhost";

//   if (isLocalhost) {
//     server = `http://localhost:${PORT}`;
//   } else {
//     // PLEASE, CHECK YOUR IP OF SERVER TO CHANGE HERE
//     const SERVER_URL = "http://192.168.10.138:";
//     server = `${SERVER_URL}${PORT}`;
//   }
// } else {
//   // For React Native and other non-browser environments
//   const SERVER_URL = "http://192.168.1.14:";
//   server = `${SERVER_URL}${PORT}`;
// }

console.log(`Server URL: ${server}`);

export type Cell = {
  row: string;
  column: string;
};

export type DataSocketTransfer = {
  room: string;
  damage: number;
  move: { startCell: Cell; endCell: Cell };
  table: any;
  event?: string;
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

  /* Emit event */
  emitJoinRoom(data: string) {
    this.socket.emit(SOCKET.JOIN_ROOM, data);
  }

  emitFindMatch(nameGame: string) {
    this.socket.emit(SOCKET.FIND_MATCH, nameGame);
  }

  emitEventGame(data: any) {
    this.socket.emit(SOCKET.EVENT_DIAMOND, data);
  }

  emitDisconnect() {
    this.socket.emit("disconnect");
  }
  emitSuccess(data: any) {
    this.socket.emit("success", data);
  }

  emitSendAcceptBooking(data: any) {
    this.socket.emit(SOCKET.SEND_ACCEPT_BOOKING, data);
  }

  emitSendUpdateLocation(data: any) {
    this.socket.emit(SOCKET.UPDATE_LOCATION_DRIVER, data);
  }

  emitGetCustomerLocation(data: any) {
    this.socket.emit(SOCKET.GET_LOCATION_CUSTOMER, data);
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

  emitAttack(data: any) {
    this.socket.emit(SOCKET.ATTACK, data);
  }

  emitMove(data: any) {
    this.socket.emit(SOCKET.MOVE, data);
  }
  /* on listen event */
  onListenKeyRoom(callback: (data: any) => void) {
    this.socket.on(SOCKET.KEY_ROOM, (data) => {
      callback(data);
    });
  }

  onListenCustomerLocation(callback: (data: any) => void) {
    this.socket.on(SOCKET.SEND_CUSTOMER_LOCATION, (data) => {
      callback(data);
    });
  }

  onListenCustomerLocationRequest(callback: (data: any) => void) {
    this.socket.on(SOCKET.GET_LOCATION_CUSTOMER_ARRAY, (data) => {
      callback(data);
    });
  }

  onListenCancelFromCustomer(callback: (data: any) => void) {
    this.socket.on(SOCKET.SEND_NOTIFY_CANCEL_TRIP_TO_DRIVER, (data) => {
      callback(data);
    });
  }

  onListenTakeDamage(callback: (data: DataSocketTransfer) => void) {
    this.socket.on(SOCKET.TAKE_DAMAGE, (data) => {
      callback(data);
    });
  }
  removeListenTakeDamage(callback: any) {
    this.socket.off(SOCKET.TAKE_DAMAGE, callback);
  }

  onListenMove(callback: (data: any) => void) {
    this.socket.on(SOCKET.MOVE, (data) => {
      callback(data);
    });
  }

  onListenFirstTurn(callback: (data: any) => void) {
    this.socket.on(SOCKET.FIRST_TURN, (data: any) => {
      callback(data);
    });
  }
}
