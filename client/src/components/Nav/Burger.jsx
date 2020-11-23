import React from "react";

const Burger = (props) => {
  return (
    <div onClick={props.handleClick} className="burgerMenu">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Burger;
