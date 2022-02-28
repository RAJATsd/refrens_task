import "./inputContainer.css";
import React, { useState, useCallback, useRef, useEffect } from "react";
import Suggestions from "../suggestions/suggestions";
import { debounce } from "lodash";
import { searchUsersByString } from "../../apis/users";
import { useNavigate } from "react-router-dom";
import searchIconImage from "../../assets/searchIcon.png";
import closeIcon from "../../assets/close_icon.png";

/**
 * @returns the Input component
 * @states searchInput - value of the input component
 * @states searchResults - list of the fetched users
 * @states selectedListOptionIndex - the index of selected list option on keyboard navigation 
 */
const InputContainer = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedListOptionIndex, setSelectedListOptionIndex] = useState(null);
  const inputRef = useRef();
  const navigator = useNavigate();

  const fetchSearchedInput = useCallback(
    debounce((inputValue) => fetchFunction(inputValue), 300),
    []
  );

  useEffect(() => {
    if (selectedListOptionIndex !== null) {
      setSelectedListOptionIndex(null);
    }
  }, [searchInput]);

  /**
   * function to set the state value of input and fetch users by api
   * @param {event} event - event passed on change of input
   * @returns nothing
   */
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

  /**
   * @param {string} inputValue 
   * makes api call to fetch all users
   */
  const fetchFunction = async (inputValue) => {
    const fetchedResults = await searchUsersByString(inputValue);
    if (fetchedResults) {
      setSearchResults(fetchedResults);
    }
  };

  /**
   * @param {event} event 
   * function to redirect the page on pressing enter
   */
  const handleKeyPress = (event) => {
    if (event.code === "Enter") {
      if (selectedListOptionIndex) {
        navigator(`user/${searchResults[selectedListOptionIndex].id}`);
      } else {
        navigator(`/search/${searchInput}`);
      }
      setSearchInput("");
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
        onKeyPress={handleKeyPress}
        onClick={() => {
          if (setSelectedListOptionIndex !== null) {
            setSelectedListOptionIndex(null);
          }
        }}
        ref={inputRef}
      />
      <img src={searchIconImage} alt="search-input" className="search-icon" />
      <img
        className="close-suggestion-and-clear-button"
        src={closeIcon}
        onClick={() => {
          if (searchInput !== "") {
            setSearchInput("");
          }
        }}
        alt="close-suggestions"
      />

      {searchInput.trim() !== "" && (
        <Suggestions
          searchResults={searchResults}
          selectedListOptionIndex={selectedListOptionIndex}
          setSelectedListOptionIndex={setSelectedListOptionIndex}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      )}
    </div>
  );
};

export default InputContainer;
