import React from "react";
import "./NFTCard.scss";
import { getElementBgImg, getElementImg } from "utils";
const NFTCard = ({ data, ...restProps }) => {


  return (
    data && (
      <div className="card card--nft"  {...restProps }>
        <div className="card__img" >
          <img  style={{ background:`url("${getElementBgImg(data.attributes.element)}")  no-repeat bottom / cover`}} src={data.image} alt="card" />
        </div>
        <div className="card__info">
          <div className="card__row card__category">
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                height: 24,
              }}
            >
              {data.type} <img src="/images/bear_icon.png" alt="coin" />
            </div>
            <img src={getElementImg(data.attributes.element)} alt="coin" />
          </div>
          <div className="card__row card__name">
            <div className="card_text">{data.name} </div>
          </div>
          <div className="card__row">
            <div className="card__row__label">Owner</div>
            <div className="card__row__value">
              <p>{data.owner}</p>
              <img src="/images/btc.svg" alt="coin" />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default NFTCard;
