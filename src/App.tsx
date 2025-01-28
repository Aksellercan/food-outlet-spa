// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ReviewPage from "./pages/ReviewPage";
import { AuthProvider } from "./context/AuthContext";
import './styles.css';
import VerifyAdmin from "./pages/VerifyAdmin";
import OutletForm from "./pages/OutletForm";
import OutletFunctions from "./pages/OutletFunctions";
import EditFoodOutlet from "./pages/EditFoodOutlet";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/Reviews/:id" element={<ReviewPage />} />
          <Route path="/outlet/add" element={<VerifyAdmin />} />
          <Route path="/outlet/add-form" element={<OutletForm />} />
          <Route path="/outlet/list" element={<OutletFunctions />} />
          <Route path="/outlet/edit/:id" element={<EditFoodOutlet />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;