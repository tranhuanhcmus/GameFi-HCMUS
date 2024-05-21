import React, { useState } from "react";
import './Dropdown.scss';

const Dropdown = () => {

	const [isActive,setIsActive]=useState(false)

  return (
    <div className={`drop_down ${isActive ? 'active':''}`}>
      <div className="drop_down__label" onClick={()=>setIsActive(prev=>!prev)}>
        <div className="drop_down__text">Marketplace</div>
        <div className="drop_down__arrow">
          <img src="/images/arrow_down.svg" alt="arrow_down" />
        </div>
      </div>
      <div className="drop_down__options">
		  <div className="drop_down_option_wrapper">
        	<div className="drop_down__option">Home</div>
        	<div className="drop_down__option">Discover</div>
        	<div className="drop_down__option">Activities</div>
        	<div className="drop_down__option">Collection Verification</div>
		  </div>
      </div>
    </div>
  );
};

export default Dropdown;
