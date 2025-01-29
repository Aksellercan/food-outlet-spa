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
  const [searchTerm, setSearchTerm] = useState<string>(""); // State to store the search term
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

  const handleAdmin = () => {
    navigate("/outlet/add"); // Redirect to login page
  };

  // const handleLogin = () => {
  //   localStorage.removeItem("authToken"); // Clear the token
  //   navigate("/login"); // Redirect to login page
  // };

  const handleLogin = () => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      // If token exists, log out the user
      localStorage.removeItem("authToken");
      navigate("/"); // Redirect to home page after logging out
    } else {
      // If token doesn't exist, redirect to login page
      navigate("/login");
    }
  };

  const filteredFoodOutlets = foodOutlets.filter((outlet) =>
    outlet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <header className="header">
        <h1>Food Outlet Review Platform</h1>
        <button onClick={handleAdmin}>Admin</button> 
        {/* <button onClick={handleLogin}>Log in</button> Log Out button */}
        <button onClick={handleLogin}>
          {localStorage.getItem("authToken") ? "Log Out" : "Log in"}
        </button> {/* Log In / Log Out button */}
      </header>

      {/* Search filter */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by outlet name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
          className="search-input"
        />
      </div>

      {/* <div className="outlet-grid">
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
      </div> */}

<div className="outlet-grid">
        {filteredFoodOutlets.length === 0 ? (
          <p>No outlets found</p> // If no outlets match search, show this message
        ) : (
          filteredFoodOutlets.map((outlet) => (
            <a key={outlet.id} href={`/reviews/${outlet.id}`} className="outlet-card-link">
              <div className="outlet-card">
                <strong>{outlet.name}</strong>
                <p>Location: {outlet.location}</p>
                <p>Average Rating of {outlet.rating}</p>
                <p>out of {outlet.reviewCount} Reviews</p>
              </div>
            </a>
          ))
        )}
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
