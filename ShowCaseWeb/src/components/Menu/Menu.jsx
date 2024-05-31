import React, { useState } from "react";
import './Menu.scss';

const Menu = () => {

	const [isActive,setIsActive]=useState(false)

  return (
    <div className={`menu ${isActive ? 'active':''}`}>
      <div className="menu__label" onClick={()=>setIsActive(prev=>!prev)}>
        <div className="menu__text">Marketplace</div>
        <div className="menu__arrow">
          <img src="/images/arrow_down.svg" alt="arrow_down" />
        </div>
      </div>
      <div className="menu__options">
		  <div className="menu_option_wrapper">
        	<div className="menu__option">Home</div>
        	<div className="menu__option">Discover</div>
        	<div className="menu__option">Activities</div>
        	<div className="menu__option">Collection Verification</div>
		  </div>
      </div>
    </div>
  );
};

export default Menu;
