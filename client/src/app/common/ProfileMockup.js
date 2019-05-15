import React from "react";

const ProfileMockup = ({ brandColor, logo }) => {
  return (
    <div className="mockup-wrapper">
      <div
        className="mockup-logo"
        style={{
          backgroundImage: logo ? `url(${logo})` : "none"
        }}
      />
      <div className="mockup-card">
        <div
          className="mockup-brand-color"
          style={{
            backgroundColor: brandColor
          }}
        />
        <div className="mockup-image" />
      </div>
    </div>
  );
};

export default ProfileMockup;
