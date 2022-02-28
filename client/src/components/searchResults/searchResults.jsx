import "./searchResults.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchUsersByString } from "../../apis/users";
import Suggestion from "../suggestions/singleSuggestion/suggestion";

/**
 * 
 * @returns The results of search on pressing enter
 */
const SearchResults = () => {
  const { inputValue } = useParams();
  const [fetchedResults, setFetchedResults] = useState([]);

  useEffect(() => {
    if (inputValue && inputValue !== "") {
      fetchUsersByPath();
    }
  }, [inputValue]);

  /**
   * function to fetch the users by specific path
   */
  const fetchUsersByPath = async () => {
    const fetchedResults = await searchUsersByString(inputValue);
    if (fetchedResults) {
      setFetchedResults(fetchedResults);
    }
  };
  
  return (
    <div className="search-results-container">
      <h1>Search Results</h1>
      {fetchedResults.length === 0 && <h2>No Such User Exist</h2>}
      {fetchedResults.map((oneUser) => (
        <Suggestion
          key={oneUser.id}
          suggestionInfo={oneUser}
          searchInput={inputValue}
        />
      ))}
    </div>
  );
};

export default SearchResults;
