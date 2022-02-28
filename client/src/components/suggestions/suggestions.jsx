import "./suggestions.css";
import React, { useEffect } from "react";
import Suggestion from "./singleSuggestion/suggestion";
import useKeyPress from "../../hooks/useKeyPress";
import { Link } from "react-router-dom";

/**
 * @param {array} searchResults - the users fetched on a specific input
 * @param {string} searchInput - the Input value on typing 
 * @param {number} selectedListOptionIndex 
 * @param {function} setSelectedListOptionIndex
 * @param {function} setSearchInput 
 * @returns 
 */
const Suggestions = ({
  searchResults,
  searchInput,
  selectedListOptionIndex,
  setSelectedListOptionIndex,
  setSearchInput,
}) => {
  const ifArrowUpPressed = useKeyPress("ArrowUp");
  const ifArrowDownPressed = useKeyPress("ArrowDown");

  /**
   * checking if the up arrow is pressed to change selectedListOptionIndex
   */
  useEffect(() => {
    if (ifArrowUpPressed) {
      const newSelectedIndex = !selectedListOptionIndex
        ? searchResults.length - 1
        : selectedListOptionIndex - 1;
      setSelectedListOptionIndex(newSelectedIndex);
    }
  }, [ifArrowUpPressed]);

  /**
   * checking if the down arrow is pressed to change selectedListOptionIndex
   */
  useEffect(() => {
    if (ifArrowDownPressed) {
      const newSelectedIndex =
        selectedListOptionIndex !== searchResults.length - 1 &&
        selectedListOptionIndex !== null
          ? selectedListOptionIndex + 1
          : 0;
      setSelectedListOptionIndex(newSelectedIndex);
    }
  }, [ifArrowDownPressed]);

  return (
    <div className="suggestions-container">
      {searchResults.length > 0 ? (
        searchResults.map((suggestionInfo, index) => (
          <Link
            key={suggestionInfo.id}
            onClick={() => setSearchInput("")}
            to={`/user/${suggestionInfo.id}`}
            className="user-redirecting-link"
          >
            <Suggestion
              suggestionInfo={suggestionInfo}
              isSuggestionSelected={selectedListOptionIndex === index}
              searchInput={searchInput}
            />
          </Link>
        ))
      ) : (
        <div className="no-user-message">
          {searchInput.length < 3 ? (
            <h4>Word should be at least 3 characters</h4>
          ) : (
            <h3>No User Found</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default Suggestions;
