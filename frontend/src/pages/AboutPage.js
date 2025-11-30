import React from "react";
import Navbar from "../components/Navbar";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>About The Fest</h2>
        <p>This is the content area for the About Page.</p>
      </div>
    </>
  );
};

export default AboutPage;
