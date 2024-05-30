import React from "react";
import "./Home.scss";
import Menu from "components/Menu/Menu";
import Dropdown from "components/Dropdown/Dropdown";
import Button from "components/Button/Button";
import NFTCard from "components/NFTCard/NFTCard";

const section1_images = [
  "/images/nft_1.svg",
  "/images/nft_2.svg",
  "/images/nft_3.svg",
  "/images/nft_4.svg",
];

const filterOptions = [
  { value: "Newest" },
  { value: "Oldest" },
  { value: "High Price" },
  { value: "Low Price" },
  { value: "Eye" },
  { value: "Fur" },
  { value: "Element" },
  { value: "Item" },
];

const nfts = [
  {
    id: 1,
    type: "Monster",
    name: "Dark knight",
    image: "/images/bear1.jpg",
    price: "1 ETH",
    element: "dark",
  },
  {
    id: 2,
    type: "Monster",
    name: "Fire Guy",
    image: "/images/bear2.jpg",
    element: "fire",
    price: "2 ETH",
  },
  {
    id: 3,
    type: "Monster",
    name: "Thunder knight",
    image: "/images/bear3.jpg",
    element: "thunder",
    price: "3 ETH",
  },
  {
    id: 4,
    type: "Monster",
    name: "Water knight",
    image: "/images/bear4.jpg",
    element: "water",
    price: "4 ETH",
  },
  {
    id: 5,
    type: "Monster",
    name: "Tree knight",
    element: "dark",
    image: "/images/bear5.jpg",
    price: "3 ETH",
  },
  {
    id: 6,
    type: "Monster",
    name: "Fire+Water knight",
    image: "/images/bear6.jpg",
    element: "fire",
    price: "3 ETH",
  },
  {
    id: 7,
    type: "Monster",
    name: "Special Dark knight",
    image: "/images/bear7.jpg",
    element: "dark",
    price: "3 ETH",
  },
  {
    id: 8,
    type: "Monster",
    element: "fire",
    name: "Light knight",
    image: "/images/bear8.jpg",
    price: "3 ETH",
  },
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
        <div className="section discover_section">
          <div className="section__header">
            <div className="section__title">
              Discover
              <p>151,146 items listed</p>
            </div>
            <div className="section__header__controls">
              <Dropdown
                style={{
                  minWidth: 220,
                  background: "#202832",
                  borderRadius: 12,
                  padding: `3px 0`,
                }}
                options={filterOptions}
                formatValue={(item) => item?.value || ""}
              />
              <Button>
                <img
                  className="network_icon"
                  src="/images/filter_icon.svg"
                  alt="fitler_icon"
                />
                <p>Filter</p>
              </Button>
            </div>
          </div>
          <div className="section__body">
            {nfts.map((item, index) => (
              <NFTCard key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
