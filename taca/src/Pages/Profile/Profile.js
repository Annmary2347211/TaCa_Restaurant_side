import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    username: "AsenKrekmanov",
    email: "azkrekmanov@gmail.com",
    password: "bigbigworld123",
    repeatPassword: "bigbigworld123",
    aboutMe: "I am Asen Krekmanov and I am dedicated UI/UX Designer from Sofia, Bulgaria."
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleUpdate = () => {
    // Placeholder for update logic
    alert("Profile updated!");
  };

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <h2>PROFILE</h2>
        <div className="profile-pic">
          <img src="/images/Res1.jpeg" alt="Avatar" />
          <button className="upload-button">Upload Picture</button>
        </div>
        <div className="social-links">
          <button>Add Facebook</button>
          <button>Add Twitter</button>
          <button>Add Instagram</button>
          <button>Add Google+</button>
        </div>
      </div>
      <div className="profile-main">
        <div className="profile-form">
          <div className="form-group">
            <label>Username:</label>
            <input type="text" name="username" value={profileData.username} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>E-mail:</label>
            <input type="email" name="email" value={profileData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" value={profileData.password} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Repeat Password:</label>
            <input type="password" name="repeatPassword" value={profileData.repeatPassword} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>About Me:</label>
            <textarea name="aboutMe" value={profileData.aboutMe} onChange={handleChange}></textarea>
          </div>
          <button className="update-button" onClick={handleUpdate}>Update Information</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
