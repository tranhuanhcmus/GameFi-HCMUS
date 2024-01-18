import { _decorator, Button, Component, Event, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ButtonClickEvents')
export class ButtonClickEvents extends Component {
    @property({
        type:Label
    })
    label
    start() {
        
        
    }
    handleClickConnectWallet(event:Event,data:string){
        this.label.string=data

        this.initWeb3()

        
    }

    initWeb3 = async () => {
        if (window.ethereum) {
          console.log("have install metamask");
          const chainId = await window.ethereum.request({ method: "eth_chainId" });
          console.log(chainId as number);
          window.ethereum.on("chainChanged", () => window.location.reload());
    
          const accounts = await window.ethereum
            .request({ method: "eth_requestAccounts" })
            .catch((err) => {
              if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error
                // If this happens, the user rejected the connection request.
                console.log("Please connect to MetaMask.");
              } else {
                console.error(err);
              }
            });
        
          console.log(accounts);
        } else console.log("dont have install metamask");
      };

    update(deltaTime: number) {
        
    }
}


