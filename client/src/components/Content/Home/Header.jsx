import React from "react";
import "../../../css/index.css";
import "../../../css/header.css";
import Typical from 'react-typical';

const Header = () => {
  return (
    <header>
      <div className="headerBody">
        <h1>Best <span>
          <Typical 
            loop={Infinity}
            wrapper="b"
            steps={[
              'Working',2000,
              'Collaboration',2000,
              'Education',2000
            ]}
          />
          </span>Platform Ever</h1>
        <p>
          No matter Working at office, Working at home, Working during trips,
          the place you can name can enjoy using <b>CREACT</b>, which makes the
          work become easy and pleasant!
        </p>
        <div className="headerButtons">
          <button>Open CREACT in your browser</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
