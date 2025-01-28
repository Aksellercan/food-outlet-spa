import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


// Define interfaces for the review and food outlet
interface Review {
  id: number;
  foodOutlet: { name: string };
  score: number;
  comment: string;
}

interface FoodOutlet {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
}

export default function ReviewPage() {
  const { id } = useParams<{ id: string }>(); // Capture the id from the URL
  const [reviews, setReviews] = useState<Review[]>([]);
  const [comment, setComment] = useState<string>(""); // State for the comment input
  const [score, setScore] = useState<number>(1); // State for the score dropdown (1-5)
  const navigate = useNavigate(); // For navigation after logout
  const [loading, setLoading] = useState(false); // New loading state


  //const [jwtToken, setJwtToken] = useState<string>(""); // Assuming JWT token is set somewhere
  

  // Fetch reviews on component mount or when id changes
  useEffect(() => {
    const fetchReviews = async () => {
      if (id) {
        try {
          const response = await fetch(`https://localhost:7277/foodoutlets/${id}/reviews`);
          if (response.ok) {
            const data: Review[] = await response.json();
            setReviews(data);
          } else {
            console.error("Failed to fetch reviews");
          }
        } catch (error) {
          console.error("Error fetching reviews:", error);
        }
      }
    };

    fetchReviews();
  }, [id]);

  // Handle form submission
  const handlePostComment = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage
    if (!token) {
      alert("You must be logged in to post a comment.");
      return;
    }
    const wordCount = comment.trim().split("").length; // Split comment by spaces and count words
    if (wordCount > 120) {
      alert("Your comment exceeds the 60-word limit. Please shorten it.");
      return; // Prevent posting if word count exceeds the limit
    }

    setLoading(true); // Set loading state to true before making the request


    try {
      const response = await fetch(`https://localhost:7277/foodoutlets/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Attach token for authorization
        },
        body: JSON.stringify({
          comment,
          score,
        }),
      });

      if (response.status == 201) {
        alert("Your comment has been posted successfully!");
        setComment(""); // Clear the comment input after successful post
      } else {
        alert("Failed to post your comment. Please try again.");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("An error occurred. Please try again later.");
    }finally {
      setLoading(false); // Reset loading state after request completes
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear the token
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="review-container">
      <header className="header">
        <h1>Reviews for Outlet {id}</h1>
        <button onClick={handleLogout}>Log Out</button> {/* Log Out button */}
      </header>

      <main className="main-content">
        {/* Display existing reviews */}
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id} className="review-card">
                {/* <h3>{review.score} stars</h3> */}
                <p>{review.comment}</p>
                <p>Score: {review.score}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews available.</p>
        )}

        {/* Review submission form */}
        <form onSubmit={handlePostComment}>
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="score">Score:</label>
            <select
              id="score"
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              required
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>

          <button type="submit">Submit Review</button>
        </form>
      </main>

      <footer className="footer">
        <p>© 2025 Food Outlet Review Platform</p>
      </footer>
    </div>
  );
}
