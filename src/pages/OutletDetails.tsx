import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Outlet {
  id: number;
  name: string;
  location: string;
}

const OutletDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [outlet, setOutlet] = useState<Outlet | null>(null);

  useEffect(() => {
    axios.get(`https://localhost:7277/api/foodoutlet/${id}`)
      .then((response) => setOutlet(response.data))
      .catch((error) => console.error("Error fetching outlet:", error));
  }, [id]);

  if (!outlet) return <p>Loading...</p>;

  return (
    <div>
      <h1>{outlet.name}</h1>
      <p>Location: {outlet.location}</p>
      <button onClick={() => navigate(`/outlet/edit/${id}`)}>Edit</button>
      <button onClick={() => {
        axios.delete(`https://localhost:7277/api/foodoutlet/${id}`)
          .then(() => navigate("/"))
          .catch((error) => console.error("Error deleting outlet:", error));
      }}>
        Delete
      </button>
    </div>
  );
};

export default OutletDetails;
