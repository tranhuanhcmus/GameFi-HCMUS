import { EYE } from "constants";
import { FUR } from "constants";
import { ITEM } from "constants";
import { ELEMENT } from "constants";
import React from "react";
import { useState, useEffect } from "react";
import { getLevel } from "utils";

const InfoBoard = ({ className, data, ...restProps }) => {
  const getHeadData = (data) => {
    console.log(data);
	return [
		{
		  id: 1,
		  name: "Attributes",
		  data: {
			Eye: EYE[data?.attributes?.eye],
			Fur: FUR[data?.attributes?.fur],
			Item: ITEM[data?.attributes?.item],
			Element: ELEMENT[data?.attributes?.element],
		  },
		},
		{
		  id: 2,
		  name: "Detail",
		  data: {
			  Name: data?.name,
			ATK:data?.atk,
			HP: data?.hp,
		    Level: Math.floor(getLevel(data?.exp)),
		    'Scale Level': data?.scale_level,
		  },
		},
		{
		  id: 3,
		  name: "Bids",
		  data: {
			CurrentBid: data?.price || "0.3 ETH",
			Bidder: "Bob",
			TimeLeft: "2 days",
		  },
		},
		{
		  id: 4,
		  name: "Info",
		  data: {
			Owner: data?.owner,
			TokenID: data?.tokenId,
			TokenStandard: "ERC-721",
			BlockChain: "Sepolia",
			Metadata: "Centralized",
		  },
		},
	  ];
  };

  const [heads, setHeads] = useState(getHeadData(data));
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected(heads.find((head) => head.id === 4));
  }, [heads]);

  useEffect(() => {
    setHeads(getHeadData(data));
  }, [data]);

  return (
    <div {...restProps} className={`info_board ${className}`}>
      <div className="info_board__head">
        {heads.map((head) => (
          <div
            key={head.id}
            className={`info_board__head__item ${
              selected && selected.id === head.id && "selected"
            }`}
            onClick={() => setSelected(head)}
          >
            {head.name}
          </div>
        ))}
      </div>
      {selected && (
        <div className="info_board__body">
          {Object.entries(selected.data).map(([key, value]) => (
            <div key={key} className="info_board__row">
              <div className="info_board__row__label">{key}</div>
              <div className="info_board__row__value">{value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InfoBoard;
