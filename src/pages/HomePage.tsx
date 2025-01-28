import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

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
  const [selectedSort, setSelectedSort] = useState<string>("normal");

  const fetchFoodOutlets = async (sort: string) => {
    try {
      const url =
        sort === "top-rated"
          ? "https://localhost:7277/foodoutlets/top-rated"
          : "https://localhost:7277/api/foodoutlet";
      const response = await fetch(url);
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

  useEffect(() => {
    fetchFoodOutlets(selectedSort);
  }, [selectedSort]);

  return (
    <div className="home-container">
      <header className="header">
        <h1>Food Outlet Review Platform</h1>
      </header>

      <div className="outlet-grid">
        {foodOutlets.map((outlet) => (
          <a key={outlet.id} href={`/reviews/${outlet.id}`} className="outlet-card-link">
            <div className="outlet-card">
              <strong>{outlet.name}</strong>
              <p>Location: {outlet.location}</p>
              <p>Average Rating of {outlet.rating}</p>
              <p>out of {outlet.reviewCount} Reviews</p>
            </div>
          </a>
        ))}
      </div>

      <footer className="footer">
        <p>© 2025 Food Outlet Review Platform</p>
        <select
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
          className="sort-select"
        >
          <option value="normal">Normal Sorting</option>
          <option value="top-rated">Top Rated</option>
        </select>
      </footer>
    </div>
  );
}
