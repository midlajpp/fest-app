import React, { useState, useEffect } from "react";
// import axios from "axios";

// ഇവിടെ ടെസ്റ്റിംഗിനായി ചില ഡമ്മി ഡാറ്റ നൽകുന്നു.
// യഥാർത്ഥത്തിൽ ഇത് /api/gallery/preview എന്ന ബാക്കെൻഡ് റൂട്ടിൽ നിന്ന് ലഭിക്കും.
const DUMMY_SLIDES = [
  {
    laptopUrl: "./images/1.jpg",
    mobileUrl: "./images/1.jpg",
  },
  {
    laptopUrl: "./images/2.jpg",
    mobileUrl: "./images/2.jpg",
  },
  {
    laptopUrl: "./images/3.jpg",
    mobileUrl: "./images/3.jpg",
  },
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const [slides] = useState(DUMMY_SLIDES);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const length = slides.length;

  useEffect(() => {
    const nextSlide = () => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const interval = setInterval(nextSlide, 3000);

    return () => clearInterval(interval);
  }, [current, length]);

  // =======================================================
  // 2. ബാക്കെൻഡ് ഡാറ്റാ Fetch ചെയ്യാനുള്ള ലോജിക്
  // =======================================================
  // ഇത് ഡാറ്റാബേസിൽ ഡാറ്റ ഉണ്ടെങ്കിൽ മാത്രം ഉപയോഗിക്കുക
  /*
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/gallery/preview');
        if (res.data.length > 0) {
            setSlides(res.data);
        }
      } catch (err) {
        console.error("Error fetching slides:", err);
      }
    };
    fetchSlides();
  }, []);
  */

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  const currentImageUrl = isMobile
    ? slides[current].mobileUrl
    : slides[current].laptopUrl;

  return (
    <div className="slider" style={styles.slider}>
      {slides.map((slide, index) => (
        <div
          className={index === current ? "slide active" : "slide"}
          key={index}
        >
          {}
          {index === current && (
            <img
              src={currentImageUrl}
              alt="Fest Slide"
              className="image"
              style={styles.image}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  slider: {
    position: "relative",
    height: "400px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    "@media (max-width: 768px)": {
      height: "300px",
    },
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    // borderRadius: "15px",
    transition: "opacity 0.5s ease-in-out",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

export default ImageSlider;
