import React from "react";
import { useState,useEffect } from "react";

const sampleHeads = [
	{
	  id: 1,
	  name: "Attributes",
	  data: {
		Artist: "John Doe",
		Title: "Sunset Over Mountains",
		Type: "Digital Art",
		Edition: "1 of 10",
		Year: 2024,
	  },
	},
	{
	  id: 2,
	  name: "Offers",
	  data: {
		HighestOffer: "0.5 ETH",
		Seller: "Alice",
		ExpiryDate: "2024-06-30",
	  },
	},
	{
	  id: 3,
	  name: "Bids",
	  data: {
		CurrentBid: "0.3 ETH",
		Bidder: "Bob",
		TimeLeft: "2 days",
	  },
	},
	{
	  id: 4,
	  name: "Info",
	  data: {
		Contract: "0xFe25C8BB510D24ab8B3237294D1A8fCC93241454",
		TokenID: "100",
		TokenStandard: "ERC-721",
		BlockChain: "Sepolia",
		Metadata: "Centralized",
	  },
	},
  ];

const InfoBoard = ({ className, ...restProps }) => {
	const [heads, setHeads] = useState(sampleHeads);
	const [selected, setSelected] = useState();
  
	useEffect(() => {
	  setSelected(heads.find(head => head.id === 4)); 
	}, [heads]);
  
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
