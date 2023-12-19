import Web3 from "web3";

export class UserData  {
  private static instance: UserData | null = null;
  _web3:Web3;
  _account: string;
  _balance: number;

  public constructor() {
    this._account = "0x";
    this._balance = 0;
    this._web3=null;
  }
  public resetData() {
    this._account = "0x";
    this._balance = 0;
    this._web3=null;
  }
  public isConnectedWallet(): boolean {
    return this._account !== "0x"
  }
  static getInstance(): UserData {
    if (!this.instance) {
      this.instance = new UserData();
    }
    return this.instance;
  }
  start() {}

  update(deltaTime: number) {}
}
