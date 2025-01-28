import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface FoodOutlet {
  name: string;
}

interface Review {
  id: number;
  foodOutlet: FoodOutlet;
  score: number;
  comment: string;
}

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const isGuest = new URLSearchParams(location.search).get("guest") === "true";

  const [reviews, setReviews] = useState<Review[]>([]); // Use the Review type here

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://localhost:7277/foodoutlets/8/reviews"); // 8 will be foodoutlet id passed by homepage
        if (response.ok) {
          const data: Review[] = await response.json(); // Cast API response to Review[]
          setReviews(data);
        } else {
          console.error("Failed to fetch reviews");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
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
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              {review.foodOutlet.name} - {"⭐".repeat(review.score)} - "{review.comment}"
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
