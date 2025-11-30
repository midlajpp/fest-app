import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const GalleryPreview = () => {
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/gallery/preview"
        );
        setPreviewImages(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching gallery preview:", err);

        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (loading)
    return <div style={styles.loading}>Loading Gallery Preview...</div>;
  if (previewImages.length === 0) return null;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Fest Highlights</h2>

      {}
      <div style={styles.grid}>
        {previewImages.map((image, index) => (
          <div key={index} style={styles.imageWrapper}>
            <img
              src={image.laptopUrl || image.mobileUrl}
              alt={`Fest Highlight ${index + 1}`}
              style={styles.image}
            />
          </div>
        ))}
      </div>

      {}
      <div style={styles.moreLinkContainer}>
        <Link to="/gallery" style={styles.moreLink}>
          View Full Gallery <FaArrowRight style={{ marginLeft: "8px" }} />
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "50px 20px",
    backgroundColor: "#fff",
  },
  heading: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "2rem",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  imageWrapper: {
    overflow: "hidden",
    borderRadius: "15px",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
  },
  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  moreLinkContainer: {
    textAlign: "center",
    marginTop: "30px",
  },
  moreLink: {
    display: "inline-flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#ff9900",
    fontWeight: "bold",
    fontSize: "1.1rem",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "2px solid #ff9900",
    transition: "background-color 0.3s",
  },
  loading: {
    textAlign: "center",
    padding: "50px",
  },
};

export default GalleryPreview;
