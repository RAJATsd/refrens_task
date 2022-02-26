const express = require("express");
const app = express();

const dummyData = require("./dummydata");
const API_PORT = process.env.PORT || '3001';

app.use("/suggestions/:searchText", (req, res) => {
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
        singleItem.items.includes(lowerCasedSearchText) ||
        singleItem.address.toLowerCase().includes(lowerCasedSearchText) ||
        singleItem.pincode.toLowerCase().includes(lowerCasedSearchText)
    );

    return res
      .status(200)
      .json({ message: "RESULT FOUND", data: searchedResults });
  } catch (error) {
      res.status(500).json({message:"INTERNAL SERVER ERROR"});
  }
});

app.use('/',(req,res)=> res.status(404));

app.listen(API_PORT,()=> console.log('Connected to 3001'));
