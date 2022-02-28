import { getSuggestionsURL, getUserById } from "../constants/apiConstants";

export const searchUsersByString = async (stringValue) => {
  try {
    const fetchSuggestions = await fetch(getSuggestionsURL(stringValue));
    const fetchedResults = await fetchSuggestions.json();

    if (fetchedResults.data) {
      return fetchedResults.data;
    } else return null;
  } catch (e) {
    return null;
  }
};

export const searchUserByUserId = async (userId) => {
  try {
    const fetchUserByUserId = await fetch(getUserById(userId));
    const fetchedResults = await fetchUserByUserId.json();

    if (fetchedResults.data) {
      return fetchedResults.data;
    } else return null;
  } catch(e) {
    return null;
  }
}