import React from "react";
import "../../css/nav.css";
import Burger from "./Burger";
import { Link } from "react-router-dom";
// import { AiOutlineClose } from "react-icons/ai";
// import CloseIcon from '@material-ui/icons/Close';

const RightBar = (props) => {
  return (
    <div className="nav-rightBar">
      <Burger handleClick={props.handleClick} />
      {/* <CloseIcon /> */}
      <hr />
      <ul>
        <Link to="/download">
          <li>Download</li>
        </Link>
        <Link to="/reason">
          <li>Why choose us?</li>
        </Link>
        <Link to="/price">
          <li>Price</li>
        </Link>
        <Link to="/safety">
          <li>Safety</li>
        </Link>
        <Link to="/support">
          <li>Support</li>
        </Link>
      </ul>
    </div>
  );
};

export default RightBar;
