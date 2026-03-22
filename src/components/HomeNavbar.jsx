import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./HomeNavbar.css";
import netflixLogo from "../assets/netflix-logo.svg";
import { Search, Bell, ChevronDown, ChevronUp, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const navLinks = [
  { id: 1, label: "Home", path: "/home" },
  { id: 2, label: "Shows", path: "/shows" },
  { id: 3, label: "Movies", path: "/movies" },
  { id: 4, label: "New & Popular", path: "/new" },
  { id: 5, label: "My List", path: "/mylist" },
  { id: 6, label: "Browse by Languages", path: "/browse" },
];
const notifications = [
  {
    id: 1,
    title: "Don't miss out",
    description: "Experience more Hello Bachhon",
    time: "1 day ago",
    image: "https://placehold.co/80x55/333/fff",
  },
  {
    id: 2,
    title: "New arrival",
    description: "Boyfriend on Demand",
    time: "1 week ago",
    image: "https://placehold.co/80x55/333/fff",
  },
  {
    id: 3,
    title: "Now available",
    description: "Tune in for a new episode.",
    time: "2 weeks ago",
    image: "https://placehold.co/80x55/333/fff",
  },
  {
    id: 4,
    title: "Netflix Lookahead",
    description: "Explore what's coming soon.",
    time: "3 weeks ago",
    image: "https://placehold.co/80x55/333/fff",
  },
];
const profiles = [
  { id: 1, name: "Yash", color: "#4169e1" },
  { id: 2, name: "Bhushan", color: "#e4a400" },
  { id: 3, name: "Pratibha", color: "#e30914" },
  { id: 4, name: "Children", color: "#4CAF50" },
];

const HomeNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const searchRef = useRef(null);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedProfile, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        if (!searchQuery) {
          setSearchOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchQuery]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className={`home_navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="home_navbar_logo" onClick={() => navigate("/home")}>
        <img src={netflixLogo} alt="Netflix Logo" />
      </div>

      <ul className="home_nav_links">
        {navLinks.map((link) => (
          <li
            key={link.id}
            className={`nav_link ${location.pathname === link.path ? "active" : ""}`}
            onClick={() => navigate(link.path)}
          >
            {link.label}
          </li>
        ))}
      </ul>

      <div className="home_navbar_right">
        <div
          className={`nav_search ${searchOpen ? "open" : ""}`}
          ref={searchContainerRef}
        >
          <button
            className="nav_icon_btn"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search size={20} />
          </button>
          {searchOpen && (
            <>
              <input
                ref={searchRef}
                type="text"
                placeholder="Titles, people, genres"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="nav_search_input"
              />
              {searchQuery && (
                <button
                  className="nav_search_clear"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchOpen(false);
                    searchRef.current.focus();
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </>
          )}
        </div>

        <div
          className="nav_bell_wrapper"
          onMouseEnter={() => setShowNotifications(true)}
          onMouseLeave={() => setShowNotifications(false)}
        >
          <button className="nav_icon_btn">
            <Bell size={20} />
          </button>

          {showNotifications && (
            <div className="notifications_dropdown">
              <div className="notifications_arrow" />
              {notifications.map((notif) => (
                <div key={notif.id} className="notification_item">
                  <img src={notif.image} alt={notif.title} />
                  <div className="notification_text">
                    <p className="notification_title">{notif.title}</p>
                    <p className="notification_desc">{notif.description}</p>
                    <p className="notification_time">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className="nav_profile_wrapper"
          onMouseEnter={() => setShowProfileMenu(true)}
          onMouseLeave={() => setShowProfileMenu(false)}
        >
          <div className="nav_profile">
            <div className="nav_avatar">
              {selectedProfile && (
                <img
                  src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${selectedProfile.name}`}
                  alt={selectedProfile.name}
                />
              )}
            </div>
            {showProfileMenu ? (
              <ChevronUp size={14} />
            ) : (
              <ChevronDown size={14} />
            )}
          </div>

          {showProfileMenu && (
            <div className="profile_dropdown">
              <div className="notifications_arrow" />

              {profiles
                .filter((p) => p.name !== selectedProfile?.name)
                .map((profile) => (
                  <div key={profile.id} className="profile_dropdown_item">
                    <div className="profile_dropdown_avatar">
                      <img
                        src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${profile.name}`}
                        alt={profile.name}
                      />
                    </div>
                    <span>{profile.name}</span>
                  </div>
                ))}

              <div className="profile_dropdown_divider" />

              <div className="profile_dropdown_item">
                <span>Manage Profiles</span>
              </div>
              <div className="profile_dropdown_item">
                <span>Account</span>
              </div>
              <div className="profile_dropdown_item">
                <span>Help Centre</span>
              </div>

              <div className="profile_dropdown_divider" />

              <div
                className="profile_dropdown_item signout"
                onClick={handleLogout}
              >
                <span>Sign out of Netflix</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
