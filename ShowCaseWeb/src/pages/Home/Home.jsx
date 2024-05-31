import React from "react";
import "./Home.scss";

const section1_images = [
  "/images/nft_1.svg",
  "/images/nft_2.svg",
  "/images/nft_3.svg",
  "/images/nft_4.svg",
];

const Home = () => {
  return (
    <div className="page_wrapper">
      <div className="page home_page">
        <div className="section carousel_section">
          {section1_images.map((img, index) => (
            <img key={index} src={img} alt="nft" />
          ))}
        </div>
        <div className="section hot_section">
          <div className="section__header">
            <div className="section__title">Hot Collections</div>
            <div className="section__header__detail">View All</div>
          </div>
          <div className="section__body">
            <div className="hot_nft">
              <div className="hot_nft__image">
                <img src="/images/nft_1.svg" alt="nft" />
              </div>
              <div className="hot_nft__info_wrapper">
                <div className="name">Impostors Genesis</div>
                <div className="price">26,750.07</div>
              </div>
            </div>
            <div className="hot_nft">
              <div className="hot_nft__image">
                <img src="/images/nft_1.svg" alt="nft" />
              </div>
              <div className="hot_nft__info_wrapper">
                <div className="name">Impostors Genesis</div>
                <div className="price">26,750.07</div>
              </div>
            </div>
            <div className="hot_nft">
              <div className="hot_nft__image">
                <img src="/images/nft_1.svg" alt="nft" />
              </div>
              <div className="hot_nft__info_wrapper">
                <div className="name">Impostors Genesis</div>
                <div className="price">26,750.07</div>
              </div>
            </div>
            <div className="hot_nft">
              <div className="hot_nft__image">
                <img src="/images/nft_1.svg" alt="nft" />
              </div>
              <div className="hot_nft__info_wrapper">
                <div className="name">Impostors Genesis</div>
                <div className="price">26,750.07</div>
              </div>
            </div>
            <div className="hot_nft">
              <div className="hot_nft__image">
                <img src="/images/nft_1.svg" alt="nft" />
              </div>
              <div className="hot_nft__info_wrapper">
                <div className="name">Impostors Genesis</div>
                <div className="price">26,750.07</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
