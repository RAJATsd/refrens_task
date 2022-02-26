import "./inputContainer.css";
import React, { useState } from "react";
import Suggestions from "../suggestions/suggestions";
import { debounce } from "lodash";
import { getSuggestionsURL } from "../../constants/apiConstants";

const InputContainer = () => {
  //   const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const fetchSearchedInput = debounce(async (inputValue) => {
    try {
      const trimmedInputValue = inputValue.trim();
      if (trimmedInputValue === "") return;
      const fetchSuggestions = await fetch(
        getSuggestionsURL(trimmedInputValue)
      );
      const fetchedResults = await fetchSuggestions.json();
      setSearchResults(fetchedResults.data);
    } catch (e) {
      console.log("something right did not heppen");
    }
  }, 300);

  return (
    <div className="input-container">
      <input
        type="text"
        className="search-input"
        placeholder="search user by ID,address,name,items or pincode"
        onChange={(evt) => fetchSearchedInput(evt.target.value)}
      />
      {searchResults.length > 0 && (
        <Suggestions searchResults={searchResults} />
      )}
    </div>
  );
};

export default InputContainer;
