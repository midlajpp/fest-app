import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrophy, FaCalendarAlt, FaUsers, FaList } from "react-icons/fa"; // ഐക്കണുകൾ

const StatCounters = () => {
  const [stats, setStats] = useState({
    edition: 9,
    stages: 4,
    programs: 114,
    categories: 5,
    participants: 200,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // const res = await axios.get("http://localhost:5000/api/static");
        // ...
        const res = await axios.get("http://localhost:5000/api/static");
        // ...
        if (res.data && res.data.festStats) {
          setStats(res.data.festStats);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching statistics:", err);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const counterData = [
    { label: "Stages", value: stats.stages, icon: <FaCalendarAlt />, unit: "" },
    { label: "Programs", value: stats.programs, icon: <FaTrophy />, unit: "+" },
    {
      label: "Categories",
      value: stats.categories,
      icon: <FaList />,
      unit: "",
    },
    {
      label: "Participants",
      value: stats.participants,
      icon: <FaUsers />,
      unit: "+",
    },
  ];

  if (loading) return <div style={styles.loading}>Loading Stats...</div>;

  return (
    <div style={styles.container}>
      {}
      <div style={styles.editionBox}>
        <div style={styles.editionNumber}>{stats.edition}</div>
        <div style={styles.editionLabel}>th Edition</div>
      </div>

      {}
      <div style={styles.grid}>
        {counterData.map((item, index) => (
          <div key={index} style={styles.counterItem}>
            <div style={styles.counterValue}>
              {item.value} {item.unit}
            </div>
            <div style={styles.counterLabel}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "40px 20px",
    backgroundColor: "#f9f9f9",
  },
  editionBox: {
    marginBottom: "40px",
  },
  editionNumber: {
    fontSize: "4.5rem",
    fontWeight: "900",
    color: "#ff9900",
    lineHeight: 1,
  },
  editionLabel: {
    fontSize: "1.5rem",
    fontWeight: "500",
    color: "#555",
    marginTop: "5px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  counterItem: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  },
  counterValue: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#333",
    lineHeight: 1.2,
  },
  counterLabel: {
    fontSize: "1rem",
    color: "#777",
    marginTop: "5px",
  },
  loading: {
    textAlign: "center",
    padding: "50px",
  },
};

export default StatCounters;
