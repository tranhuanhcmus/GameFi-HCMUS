import React, { useState } from "react";

const WalletButton = () => {
  const [isConnected, setIsConnected] = useState(true);
  return (
    <div className="wallet_button">
      <div className="primary_button network_button">
        <img
          className="network_icon"
          src="/images/btc.svg"
          alt="network_icon"
        />
        <p>BNB Chain</p>
      </div>

      {isConnected ? (
        <>
          <div className="primary_button create_nft_button">Create NFT</div>
          <div className="account_button">
			<img
			src="/images/avt.svg"
			alt="avt"
			/>
		  </div>
        </>
      ) : (
        <div className="primary_button connect_button">Connect Wallet</div>
      )}
    </div>
  );
};

export default WalletButton;
