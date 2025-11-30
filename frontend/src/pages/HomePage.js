import React from "react";
import Navbar from "../components/Navbar";
import ImageSlider from "../components/ImageSlider";
import StatCounters from "../components/StatCounters";
import GalleryPreview from "../components/GalleryPreview";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: "0", textAlign: "center" }}>
        <ImageSlider /> {}
        <StatCounters />
        <GalleryPreview />
        <h2>Home Page Content will go here (Slider, Stats, News Preview)</h2>
        <p>This is the main content area of your Fest Application.</p>
      </div>
    </>
  );
};

export default HomePage;
