import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface FoodOutlet {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
}

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const isGuest = new URLSearchParams(location.search).get("guest") === "true";

  const [foodOutlets, setFoodOutlets] = useState<FoodOutlet[]>([]);

  useEffect(() => {
    const fetchFoodOutlets = async () => {
      try {
        const response = await fetch("https://localhost:7277/api/foodoutlet");
        if (response.ok) {
          const data: FoodOutlet[] = await response.json();
          setFoodOutlets(data);
        } else {
          console.error("Failed to fetch food outlets");
        }
      } catch (error) {
        console.error("Error fetching food outlets:", error);
      }
    };

    fetchFoodOutlets();
  }, []);

  return (
    <div className="home-container" style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      overflow: "hidden",
      backgroundColor: "#F4F4F4",
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: "#0000FF",
        color: "#fff",
        padding: "15px 0",
        textAlign: "center",
        fontSize: "24px",
        width: "100%",
      }}>
        <h1>Food Outlet Review Platform</h1>
      </header>

      {/* Outlet Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        padding: "20px",
        flex: 1,
        maxHeight: "65vh",
        overflowY: "auto",
      }}>
        {foodOutlets.map((outlet) => (
          <a 
          key={outlet.id}
          href={`https://localhost:7277/foodoutlets/${outlet.id}/reviews`}
          style={{
            textDecoration: "none", // Remove underline
            color: "inherit", // Keep text color the same
          }}
        >
          <div key={outlet.id} style={{
            padding: "15px",
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "12px", // Rounded corners
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textAlign: "center",  // Center content inside the box
            overflow: "hidden",    // Prevent text from overflowing
            position: "relative",  // Allow for more styling (if needed)
            minWidth: "120px",  // Prevent too small box
            maxWidth: "200px",   // Prevent too large box
            minHeight: "150px",  // Add height to make it more balanced
            maxHeight: "250px",  // Max height for box
          }}>
            <strong style={{margin: "0", lineHeight: "1.2"}}>{outlet.name}</strong>
            <p style={{margin: "0", lineHeight: "1.2"}}>Location: {outlet.location}</p>
            <p style={{margin: "0", lineHeight: "1.2"}}>Average Rating of {outlet.rating}</p>
            <p style={{margin: "0", lineHeight: "1.2"}}>out of {outlet.reviewCount} Reviews</p>
          </div>
        </a>
        ))}
      </div>

      {/* Footer */}
      <footer style={{
        backgroundColor: "#000",
        color: "#fff",
        textAlign: "center",
        padding: "10px 0",
      }}>
        <p>© 2025 Food Outlet Review Platform</p>
      </footer>
    </div>
  );
}
