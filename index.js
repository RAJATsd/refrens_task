const express = require("express");
const path = require("path");
const app = express();

const dummyData = require("./dummydata");
const API_PORT = process.env.PORT || "3001";

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("/suggestions/:searchText", (req, res) => {
  try {
    const { searchText } = req.params;
    if (!searchText || searchText.trim() === "") {
      return res.status(404).json({ message: "EMPTY STRING", data: [] });
    }

    const lowerCasedSearchText = searchText.toLowerCase();

    const searchedResults = dummyData.filter(
      (singleItem) =>
        singleItem.id.toLowerCase().includes(lowerCasedSearchText) ||
        singleItem.name.toLowerCase().includes(lowerCasedSearchText) ||
        singleItem.items
          .map((ele) => ele.toLowerCase())
          .includes(lowerCasedSearchText) ||
        singleItem.address.toLowerCase().includes(lowerCasedSearchText) ||
        singleItem.pincode.toLowerCase().includes(lowerCasedSearchText)
    );

    return res
      .status(200)
      .json({ message: "RESULT FOUND", data: searchedResults });
  } catch (error) {
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
});

app.get("/user/:userId", (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId || userId === "") {
      return res.status(404).json({ message: "EMPTY User Id" });
    }

    const searchedUser = dummyData.find(
      (singleItem) => singleItem.id === userId
    );

    return res.status(200).json({
      message: "RESULT FOUND",
      data: searchedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
});

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"))
);

app.listen(API_PORT, () => console.log("Connected to 3001"));
