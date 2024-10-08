import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const [userData, setUserData] = useState({});
  const userEmail = localStorage.getItem("email");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userEmail) {
        setError("No email found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/profile/${userEmail}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userEmail, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
