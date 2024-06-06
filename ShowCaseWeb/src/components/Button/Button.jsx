import React from "react";

const Button = ({ children, className="", ...restProps }) => {
  return (
    <div {...restProps} className={`primary_button ${className}`}>
      {children}
    </div>
  );
};

export default Button;
