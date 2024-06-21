import React, { useState } from "react";
import "./NFTPage.scss";
import InfoBoard from "./InfoBoard";

const sampleData = {
  id: 4,
  type: "Monster",
  name: "Water knight",
  image: "/images/bear4.jpg",
  element: "water",
  price: "4 ETH",
  owner: '0xFe25C8BB510D24ab8B3237294D1A8fCC93241454',
  description: "Breathing Space joyfully brings the unique blend of DeFi, Collect-to-Earn and Play-to-Earn Abstract is known for to the Neo  N3 ecosystem: the most feature-complete blockchain platform for  building decentralized applications for the smart economy of  tomorrow."
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
              <p style={{ fontSize: 22, fontWeight: 700 }}>{data.price}</p>
              <p style={{ fontSize: 16 }} className="nft_page__label">
                $300
              </p>
              <div className="primary_button buy_button">Buy Now</div>
              <div className="make_offer" style={{
                position:'absolute',
                top:'20%',
                right:'5%',
              }}>
                <span className="text_bold">Make offer</span>
                <span>to buy at another price</span>
              </div>
            </div>
          </div>
          <div className="information">
            <div className="information__title">{data.name}</div>
            <div className="information__own">
              <div className="information__own__item">
                <div className="information__own__image">
                  <img src="/images/nft_1.svg" alt="img" />
                </div>
                <div className="information__own__wrapper">
                  <div className="information__own__label">Collection</div>
                  <div className="information__own__content">Abstract</div>
                </div>
              </div>
              <div className="information__own__item">
                <div className="information__own__image">
                  <img src="/images/nft_2.svg" alt="img" />
                </div>
                <div className="information__own__wrapper">
                  <div className="information__own__label">Owner</div>
                  <div className="information__own__content">{data.owner}</div>
                </div>
              </div>
            </div>
            <div className="information__description">
              {data.description}
            </div>
            <InfoBoard className="information__content" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTPage;
