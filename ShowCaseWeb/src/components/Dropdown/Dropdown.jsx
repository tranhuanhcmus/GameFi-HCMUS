import React, { useEffect, useState } from "react";

const Dropdown = ({
  currentValue,
  options = [],
  formatValue = (item) => item,
  onSelect,...restProps
}) => {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState();

  useEffect(() => {
    if (options.length > 0) {
      if (!currentValue) {
        setValue(options[0]);
      } else setValue(currentValue);
    } else {
      setValue(undefined);
    }
  }, [options, currentValue]);

  const onClickOption=(item)=>{
	setValue(item)
	setIsActive(false)
  }

  return (
    <div {...restProps} className={`menu ${isActive ? "active" : ""}`}>
      <div className="menu__label" onClick={() => setIsActive((prev) => !prev)}>
        <div className="menu__text">{formatValue(value)}</div>
        <div className="menu__arrow">
          <img src="/images/arrow_down.svg" alt="arrow_down" />
        </div>
      </div>
      <div className="menu__options">
        <div className="menu_option_wrapper">
          {options.length > 0 &&
            options.map((item, index) => (
              <div onClick={()=>onClickOption(item)} key={index} className="menu__option">
                {formatValue(item)}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
