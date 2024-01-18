import {
  _decorator,
  Button,
  Component,
  EditBox,
  EventHandler,
  Label,
} from "cc";
import { UserData } from "./UserData";
import Web3 from "web3";

const { ccclass, property } = _decorator;
declare global {
  interface Window {
    ethereum: any;
  }
}

@ccclass("HelloWorld")
export class HelloWorld extends Component {
  @property({ type: Label })
  addressValue: Label;

  @property({ type: Label })
  currentValue: Label;

  @property({ type: Label })
  balanceValue: Label;

  @property({ type: EditBox })
  editBox: EditBox;

  @property({ type: Button })
  button: Button;

  @property({ type: Label })
  btnLabel: Label;

  private userData: UserData;

  private connectWalletEvent = new EventHandler();

  start() {
    this.initEventHandlers();
  }

  private initEventHandlers() {
    this.connectWalletEvent.target = this.node;
    this.connectWalletEvent.component = "HelloWorld";
    this.connectWalletEvent.handler = "handleConnect";
    this.connectWalletEvent.customEventData = "Connected";
  }

  protected onLoad(): void {
    this.initUI();
    this.button.clickEvents.push(this.connectWalletEvent);
  }

  private initUI() {
    this.userData = UserData.getInstance();

    this.addressValue.string = this.userData._account;
    this.balanceValue.string = this.userData._balance.toString();
    this.currentValue.string =
      "Current Value: " + this.userData._balance.toString();
  }

  private async handleConnect(event: Event, data: string) {
    
      this.btnLabel.string = data;
      this.updateUI();
    
  }
  private updateUI() {
    this.addressValue.string = this.userData._account;
    this.balanceValue.string = this.userData._balance.toString();
    this.currentValue.string =
      "Current Value: " + this.userData._balance.toString();
  }

}
