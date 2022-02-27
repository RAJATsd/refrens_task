import "./suggestions.css";
import React, { useState, useEffect } from "react";
import Suggestion from "./singleSuggestion/suggestion";
import useKeyPress from "../../hooks/useKeyPress";

const Suggestions = ({ searchResults, searchInput }) => {
  const ifArrowUpPressed = useKeyPress("ArrowUp");
  const ifArrowDownPressed = useKeyPress("ArrowDown");
  const [selectedListOptionIndex, setSelectedListOptionIndex] = useState(0);

  useEffect(() => {
    if (ifArrowUpPressed) {
      const newSelectedIndex =
        selectedListOptionIndex !== 0
          ? selectedListOptionIndex - 1
          : searchResults.length - 1;
      setSelectedListOptionIndex(newSelectedIndex);
    }
  }, [ifArrowUpPressed]);

  useEffect(() => {
    if (ifArrowDownPressed) {
      const newSelectedIndex =
        selectedListOptionIndex !== searchResults.length - 1
          ? selectedListOptionIndex + 1
          : 0;
      setSelectedListOptionIndex(newSelectedIndex);
    }
  }, [ifArrowDownPressed]);

  return (
    <div className="suggestions-container">
      {searchResults.length > 0
        ? searchResults.map((suggestionInfo, index) => (
            <Suggestion
              key={suggestionInfo.id}
              suggestionInfo={suggestionInfo}
              isSuggestionSelected={selectedListOptionIndex === index}
              searchInput={searchInput}
            />
          ))
        : <div className="no-user-message">No User Found</div>} 
    </div>
  );
};

export default Suggestions;
