import './suggestions.css';
import React from "react";
import Suggestion from "./singleSuggestion/suggestion";

const Suggestions = ({ searchResults }) => {
  return (
    <div className="suggestions-container">
      {searchResults.length > 0
        ? searchResults.map((suggestionInfo) => (
            <Suggestion
              key={suggestionInfo.id}
              suggestionInfo={suggestionInfo}
            />
          ))
        : "No User Found"}
    </div>
  );
};

export default Suggestions;
