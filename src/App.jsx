import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileSelect from "./pages/ProfileSelect";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfileSelect />} />
        <Route path="/home" element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default App;
