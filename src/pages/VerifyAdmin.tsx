import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyAdmin() {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem("authToken");

      const response = await fetch("https://localhost:7277/api/login/admin", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Admin verified, navigate to the actual outlet page
        navigate("/outlet/list?admin=yes");
      } else {
        // Not authorized, show a message or navigate elsewhere
        navigate("/");
      }
    };

    verifyAdmin();
  }, [navigate]);

  return <div>Verifying Admin...</div>;
}
