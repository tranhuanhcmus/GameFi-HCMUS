import { useState, useEffect } from "react";
import "./Home.scss";
import Menu from "components/Menu/Menu";
import Dropdown from "components/Dropdown/Dropdown";
import Button from "components/Button/Button";
import NFTCard from "components/NFTCard/NFTCard";
import { useNavigate } from "react-router-dom";
import { NFTService } from "services/NFTService";
import { getElementBgImg, NFTAdapter } from "utils";

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

const Home = () => {
  const [nfts, setNfts] = useState([]);

  const fetchNFTs = async () => {
    try {
      const response = await NFTService.getList();
      if (response.length) {
        setNfts(response.map((item) => NFTAdapter(item)));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  const navigate = useNavigate();
  const onClickCard = (item) => {
    navigate(`/nft/${item.tokenId}`);
  };

  return (
    <div className="page_wrapper">
      <div className="page home_page">
        <div className="section carousel_section">
          {nfts &&
            nfts
              .slice(0, 5)
              .map((item) => (
                <img
                  style={{
                    background: `#fff url("/images/bg_v2.png")  no-repeat bottom / cover`,
                  }}
                  key={item.tokenId}
                  src={item.image}
                  alt="nft"
                />
              ))}
        </div>
        {/* <div className="section hot_section">
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
        </div> */}
        <div className="section discover_section">
          <div className="section__header">
            <div className="section__title">
              Discover
              <p>{nfts.length} items listed</p>
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
            {nfts &&
              nfts.map((item, index) => (
                <NFTCard
                  onClick={() => onClickCard(item)}
                  key={item.tokenId}
                  data={item}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
