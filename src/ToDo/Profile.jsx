import React, { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth.currentUser) {
      setDisplayName(auth.currentUser.displayName || "");
      setLoading(false);
    } else {
      navigate("/");
    }
  }, [auth.currentUser, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      alert("Profile updated successfully");
      setLoading(false);
      navigate("/ToDo");
    } catch (error) {
      alert("Error updating profile: ", error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-container">
      <h1>Edit Profile</h1>
      <form onSubmit={handleUpdate}>
        <label>
          Display Name:
          <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Profile;
