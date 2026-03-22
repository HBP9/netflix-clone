import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileSelect from "./pages/ProfileSelect";
import Layout from "./components/Layout";
import ShowsPage from "./pages/ShowsPage";
import MoviesPage from "./pages/MoviesPage";
import NewPopularPage from "./pages/NewPopularPage";
import MyListPage from "./pages/MyListPage";
import BrowseByLanguagePage from "./pages/BrowseByLanguagePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfileSelect />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/shows" element={<ShowsPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/new" element={<NewPopularPage />} />
          <Route path="/mylist" element={<MyListPage />} />
          <Route path="/browse" element={<BrowseByLanguagePage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
