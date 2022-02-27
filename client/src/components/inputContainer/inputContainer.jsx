import "./inputContainer.css";
import React, { useState, useCallback } from "react";
import Suggestions from "../suggestions/suggestions";
import { debounce } from "lodash";
import { getSuggestionsURL } from "../../constants/apiConstants";

const InputContainer = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchSearchedInput = useCallback(
    debounce((inputValue) => fetchFunction(inputValue), 300),
    []
  );

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
    fetchSearchedInput(event.target.value);
  };

  const fetchFunction = async (inputValue) => {
    try {
      console.log("here for test");
      const trimmedInputValue = inputValue.trim();
      if (trimmedInputValue === "") {
        if (searchResults.length > 0) {
          setSearchResults([]);
        }
        return;
      }
      const fetchSuggestions = await fetch(
        getSuggestionsURL(trimmedInputValue)
      );
      const fetchedResults = await fetchSuggestions.json();
      setSearchResults(fetchedResults.data);
    } catch (e) {
      console.log("something right did not heppen");
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        className="search-input"
        placeholder="search user by ID,address,name,items or pincode"
        onChange={handleInputChange}
        value={searchInput}
      />
      {searchInput.trim() !== "" && (
        <Suggestions searchResults={searchResults} />
      )}
    </div>
  );
};

export default InputContainer;
