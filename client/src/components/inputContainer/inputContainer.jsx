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
    const trimmedInputValue = event.target.value
      .replace(/[^1-9a-zA-Z ]/g, " ")
      .trim();
    if (trimmedInputValue === "" || trimmedInputValue.length < 3) {
      if (searchResults.length > 0) {
        setSearchResults([]);
      }
      return;
    }
    fetchSearchedInput(trimmedInputValue);
  };

  const fetchFunction = async (inputValue) => {
    try {
      const fetchSuggestions = await fetch(
        getSuggestionsURL(inputValue)
      );
      const fetchedResults = await fetchSuggestions.json();

      if (fetchedResults.data) {
        setSearchResults(fetchedResults.data);
      }
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
        <Suggestions searchResults={searchResults} searchInput={searchInput} />
      )}
    </div>
  );
};

export default InputContainer;
