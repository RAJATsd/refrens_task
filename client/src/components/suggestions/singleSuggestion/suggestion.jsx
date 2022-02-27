import "./suggestion.css";
import React, { useRef, useEffect } from "react";

const Suggestion = ({
  suggestionInfo: { id, name, items, address },
  isSuggestionSelected,
  searchInput,
}) => {
  const elementReference = useRef();

  useEffect(() => {
    if (isSuggestionSelected) {
      elementReference.current.scrollIntoView({ block: "nearest" });
    }
  }, [isSuggestionSelected]);

  return (
    <div
      className={`suggestion ${isSuggestionSelected ? "selected-one" : ""}`}
      ref={elementReference}
    >
      <div className="id-and-name">
        <div className="user-id">{id}</div>
        <div className="user-name">{name}</div>
      </div>
      <div className="address-items-container">
        {items.map(ele => ele.toLowerCase()).includes(searchInput.toLowerCase()) ? (
          <div className="user-items">{`"${searchInput}" found in items`}</div>
        ) : null}
        <div className="user-address">{address}</div>
      </div>
    </div>
  );
};

export default Suggestion;
