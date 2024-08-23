import React, { useEffect, useState, Suspense } from "react";
import "./Subscription.css";
import axios from "axios";

function Subscription() {
  const userEmail = localStorage.getItem("email");
  const [plan, setPlan] = useState(null); // Initial state is null
  const [planDetails, setPlanDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const getPlan = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/plan/${userEmail}`
      );
      if (response.data.plan.length > 0) {
        setPlan(response.data.plan[0].planName);
        setPlanDetails(response.data.plan[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addToPlan = async (planName) => {
    const planDate = new Date().toISOString();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/add/plan`,
        {
          userEmail,
          data: { planName, planDate },
        }
      );
      getPlan();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlan();
  }, [userEmail]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="subscription-plan">
        <Suspense fallback={<div>Loading...</div>}>
          {planDetails ? (
            <h2 className="planDetails">
              You have subscribed to {planDetails.planName} plan till -{" "}
              {(() => {
                const planDate = new Date(planDetails.planDate);
                planDate.setFullYear(planDate.getFullYear() + 1);
                return planDate.toDateString();
              })()}
            </h2>
          ) : (
            <>
              <div className="columns">
                <ul className="price">
                  <li className="header">Basic</li>
                  <li className="grey">499 / year</li>
                  <li>1 Device</li>
                  <li>Only Indian Movies</li>
                  <li className="grey">
                    <button
                      className="button"
                      onClick={() => addToPlan("Basic")}
                    >
                      Pay
                    </button>
                  </li>
                </ul>
              </div>

              <div className="columns">
                <ul className="price">
                  <li className="header">Premium</li>
                  <li className="grey">899 / year</li>
                  <li>4 Devices</li>
                  <li>All Content</li>
                  <li className="grey">
                    <button
                      className="button"
                      onClick={() => addToPlan("Premium")}
                    >
                      Pay
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </Suspense>
      </div>
    </div>
  );
}

export default Subscription;
