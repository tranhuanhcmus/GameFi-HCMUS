import React from "react";
import "./NFTPage.scss";
import { useState } from "react";
const sampleData = {
  id: 4,
  type: "Monster",
  name: "Water knight",
  image: "/images/bear4.jpg",
  element: "water",
  price: "4 ETH",
};
const NFTPage = () => {
  const [data, setData] = useState(sampleData);
  return (
    <div className="page_wrapper">
      <div className="page nft_page">
        <div className="section nft_page_detail">
          <div className="visualize">
            <div className="visualize__image">
              <img src={data.image} alt="img" />
            </div>
            <div className="visualize__controls">
              <div className="nft_page__label">Price</div>
              <p style={{ fontSize: 22, fontWeight: 700 }}>0.75 BTC </p>
              <p style={{ fontSize: 16 }} className="nft_page__label">
                $300
              </p>
              <div
                class="primary_button buy_button"
              >
                Buy Now
              </div>
            </div>
          </div>
          <div className="information">
            <div className="information__image"></div>
            <div className="information__controls"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTPage;
