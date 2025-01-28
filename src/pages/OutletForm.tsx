import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function OutletForm() {
  const navigate = useNavigate();
  const [outlet, setOutlet] = useState("");
  const [rating, setRating] = useState<number>(1);
  const [review, setReview] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(rating) < 1 || Number(rating) > 5) {
      alert("Rating must be between 1 and 5.");
      return;
    }
    console.log({ outlet, rating, review });
    alert("Review added successfully!");
    navigate("/home");
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Add Review</h2>
      <label>Outlet:</label>
      <input type="text" value={outlet} onChange={(e) => setOutlet(e.target.value)} required />
      <label>Rating:</label>
      <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(Number(e.target.value) || 1)} required />
      <label>Review:</label>
      <textarea value={review} onChange={(e) => setReview(e.target.value)} required />
      <button type="submit">Submit Review</button>
    </form>
  );
}