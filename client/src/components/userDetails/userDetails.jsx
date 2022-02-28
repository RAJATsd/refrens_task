import "./userDetails.css";
import React, { useState, useEffect } from "react";
import { searchUserByUserId } from "../../apis/users";
import { useParams } from "react-router-dom";

/**
 * fetches the details of the user from userId which is assessed by the URL
 * @returns detail of the user with all the information
 */
const UserDetails = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (userId && userId !== "") {
      fetchUsersByPath();
    }
  }, [userId]);

  const fetchUsersByPath = async () => {
    const fetchedResults = await searchUserByUserId(userId);
    if (fetchedResults) {
      setUserDetails(fetchedResults);
    }
  };

  return (
    userDetails && (
      <div className="user-details-container">
        <h1>User Details</h1>
        <div> Id : {userDetails.id} </div>
        <div> Name : {userDetails.name} </div>
        <div> Address : {userDetails.address} </div>
        <div>
          {" "}
          Items :{" "}
          {userDetails.items.map((singleItem) => (
            <span key={singleItem}> {singleItem},</span>
          ))}{" "}
        </div>
        <div> Pin Code : {userDetails.pincode} </div>
      </div>
    )
  );
};

export default UserDetails;
