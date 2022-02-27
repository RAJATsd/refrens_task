import "./suggestion.css";
import React from "react";

const Suggestion = ({ suggestionInfo: { id, name, items, address } }) => {
  return (
    <div className="suggestion">
      <div className="id-and-name">
        <div className="user-id">{id}</div>
        <div className="user-name">{name}</div>
      </div>
      <div className="address-items-container">
        {/* <div className="user-items">{...items}</div> */}
        <div className="user-address">
          {address}
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
