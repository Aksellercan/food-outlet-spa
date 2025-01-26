import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

// Define the type for a Food Outlet
interface FoodOutlet {
  id: number;
  name: string;
  rating: number;
  comment: string;
}

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const isGuest = new URLSearchParams(location.search).get("guest") === "true";

  const [loading, setLoading] = useState<boolean>(true);

useEffect(() => {
  const fetchFoodOutlets = async () => {
    try {
      const response = await axios.get("http://localhost:7277/api/foodoutlet");
      setFoodOutlets(response.data);
    } catch (error) {
      console.error("Error fetching food outlets:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchFoodOutlets();
}, []);

return (
  <div className="home-container">
    <h1>Food Outlets</h1>
    {!isGuest && (
      <button className="add-outlet-btn" onClick={() => navigate("/outlet/add")}>
        + Add Review
      </button>
    )}
    <div className="outlet-list">
      {loading ? (
        <p>Loading food outlets...</p>
      ) : foodOutlets.length === 0 ? (
        <li>No food outlets available</li>
      ) : (
        <ul>
          {foodOutlets.map((outlet) => (
            <li key={outlet.id}>
              {outlet.name} - {`⭐`.repeat(Math.round(outlet.rating))} - "{outlet.comment}"
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);
}
