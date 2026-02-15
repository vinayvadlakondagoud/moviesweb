// Issues.js
import React, { useEffect, useState } from "react";

function Issues() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch("/issues.json")
      .then((res) => res.json())
      .then((data) => setIssues(data))
      .catch((error) => console.log("Error fetching data:", error));
  }, []);

  return (
    <div style={styles.container}>
      {issues.map((issue) => (
        <div key={issue.id} style={styles.card}>
          <img src={issue.Image} alt={issue.issuename} style={styles.image} />
          <h2>{issue.issuename}</h2>
          <p><strong>Impact Level:</strong> {issue.impactlevel}</p>
          <p>{issue.Solution}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    padding: "20px"
  },
  card: {
    width: "300px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
    backgroundColor: "#fff"
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px"
  }
};

export default Issues;