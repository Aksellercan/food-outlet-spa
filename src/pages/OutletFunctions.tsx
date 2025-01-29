import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface Outlet {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
}

export default function ManageOutlets() {
  const [foodOutlets, setFoodOutlets] = useState<Outlet[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isAdmin = queryParams.get("admin");

  // Fetch the list of food outlets
  useEffect(() => {
    const fetchOutlets = async () => {
      const token = localStorage.getItem("authToken");

      if (!token && isAdmin !== "yes") {
        alert("You must be logged in to manage food outlets.");
        navigate("/login"); // Redirect to login if not logged in
        return;
      }

      try {
        const response = await fetch("https://localhost:7277/api/foodoutlet", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFoodOutlets(data);
        } else {
          alert("Failed to fetch food outlets.");
        }
      } catch (error) {
        console.error("Error fetching food outlets:", error);
        alert("An error occurred while fetching food outlets.");
      }
    };

    fetchOutlets();
  }, [navigate]);

  // Handle the delete action
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("You must be logged in to delete a food outlet.");
      return;
    }

    try {
      const response = await fetch(`https://localhost:7277/api/foodoutlet/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setFoodOutlets(foodOutlets.filter((outlet) => outlet.id !== id)); // Remove deleted item from state
        alert("Food outlet deleted successfully.");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Something went wrong."}`);
      }
    } catch (error) {
      console.error("Error deleting food outlet:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  // Handle the edit action (navigate to the form page for editing)
  const handleEdit = (id: number) => {
    navigate(`/outlet/edit/${id}`); // Navigate to the edit page with the outlet id in the URL
  };

  const handleAddOutlet = () => {
    navigate("/outlet/add-form?admin=yes");
  };

  const handleLoginPage = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleHome = () => {
    navigate("/");
  }

  return (
    <div className="page-container">
      <header className="header">
        <h2>Manage Food Outlets</h2>
        <button className="home-button" onClick={handleHome}>
          Home</button>
        <button className="add-outlet-button" onClick={handleAddOutlet}>
          Add Outlet
        </button>
        <button className="login-button" onClick={handleLoginPage}>
          Log out
          </button>
      </header>
      {foodOutlets.length === 0 ? (
        <p>No food outlets available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Food Outlet Name</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foodOutlets.map((outlet) => (
              <tr key={outlet.id}>
                <td>{outlet.name}</td>
                <td>{outlet.location}</td>
                <td>
                  <button onClick={() => handleEdit(outlet.id)}>Edit</button>
                  <button onClick={() => handleDelete(outlet.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
       <footer className="footer">
        <p>© 2025 Food Outlet Review Platform</p>
      </footer>
    </div>
  );
}
