import "./App.css";
import InputContainer from "./components/inputContainer/inputContainer";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import SearchResults from "./components/searchResults/searchResults";
import UserDetails from "./components/userDetails/userDetails";

// the App component is the main entry to the frontend
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <InputContainer />

        <Switch>
          <Route path={"/search"}>
            <Route path={":inputValue"} element={<SearchResults />} />
          </Route>
          <Route path={"/user"}>
            <Route path={":userId"} element={<UserDetails />} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
