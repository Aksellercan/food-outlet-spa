import { useState, useEffect } from "react";
import { useNavigate, useLocation} from "react-router-dom";

export default function FoodOutletForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const locationQuery = useLocation();
  const isAdmin = new URLSearchParams(locationQuery.search).get("admin") === "yes";

  useEffect(() => {
    if (!isAdmin && !token) {
      alert("You must be an admin to access this page.");
      navigate("/not-authorized"); // Navigate to not-authorized page if not an admin
    }
  }, [isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken"); // Get the token from localStorage

    if (!token) {
      alert("You must be logged in to add a food outlet.");
      return;
    }

    const foodOutletData = {
      name,
      location,
    };

    try {
      const response = await fetch("https://localhost:7277/api/foodoutlet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Set the Authorization header
        },
        body: JSON.stringify(foodOutletData), // Send the data as JSON
      });

      if (response.ok) {
        alert("Food outlet added successfully!");
        navigate("/outlet/list"); // Redirect to home page after successful submission
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Something went wrong."}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="food-outlet-form">
      <h2>Add a Food Outlet</h2>
      <div>
        <label htmlFor="name">Food Outlet Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Outlet</button>
    </form>
  );
}
