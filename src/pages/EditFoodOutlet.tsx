import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditFoodOutlet() {
  const { id } = useParams(); // Get the outlet id from the URL
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  // Fetch food outlet details on component mount
  useEffect(() => {
    const fetchOutlet = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("You must be logged in to edit a food outlet.");
        navigate("/login"); // Redirect to login if not logged in
        return;
      }

      try {
        const response = await fetch(`https://localhost:7277/api/foodoutlet/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setName(data.name);
          setLocation(data.location);
        } else {
          alert("Failed to fetch food outlet details.");
        }
      } catch (error) {
        console.error("Error fetching food outlet details:", error);
        alert("An error occurred while fetching food outlet details.");
      }
    };

    fetchOutlet();
  }, [id, navigate]);

  // Handle form submission for updating outlet details
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("You must be logged in to update a food outlet.");
      return;
    }

    const foodOutletData = {
      name,
      location,
    };

    try {
      const response = await fetch(`https://localhost:7277/api/foodoutlet/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(foodOutletData),
      });

      if (response.ok) {
        alert("Food outlet updated successfully!");
        navigate("/outlet/list"); // Redirect to the manage outlets page after successful update
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Something went wrong."}`);
      }
    } catch (error) {
      console.error("Error updating food outlet:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Edit Food Outlet</h2>
      <form onSubmit={handleSubmit} className="food-outlet-form">
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
        <button type="submit">Update Outlet</button>
      </form>
    </div>
  );
}
