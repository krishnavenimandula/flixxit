import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const [userData, setUserData] = useState({});
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/profile/${userEmail}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userEmail]);

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-details">
        <div className="profile-field">
          <strong>First Name:</strong> <span>{userData.firstName}</span>
        </div>
        <div className="profile-field">
          <strong>Last Name:</strong> <span>{userData.lastName}</span>
        </div>
        <div className="profile-field">
          <strong>Email:</strong> <span>{userData.email}</span>
        </div>
        <div className="profile-field">
          <strong>Current Plan:</strong> <span>{userData.currentPlan}</span>
        </div>
        <div className="profile-field">
          <strong>Plan Start Date:</strong>{" "}
          <span>{new Date(userData.planStartDate).toDateString()}</span>
        </div>
        <div className="profile-field">
          <strong>Plan End Date:</strong>{" "}
          <span>{new Date(userData.planEndDate).toDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
