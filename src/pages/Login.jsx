import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import netflixLogo from "../assets/netflix-logo.svg";
import "./Login.css";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const location = useLocation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });

  const footerLinks = [
    ["FAQ", "Help Centre", "Terms of Use", "Privacy"],
    ["Cookie Preferences", "Corporate Information"],
  ];

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!validate()) return;
    login(email);
    navigate("/profile");
  };

  return (
    <section className="login">
      <div className="login_overlay">
        <div className="login_logo">
          <img src={netflixLogo} alt="Netflix Logo" />
        </div>
        <div className="login_card">
          <h1 className="login_title">Sign In</h1>
          <div className="login_inputs">
            <input
              type="email"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={error.email ? "input_error" : ""}
            />
            {error.email && <p className="error_msg">⚠ {error.email}</p>}
            <div className="password_wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={error.password ? "input_error" : ""}
              />
              <span
                className="password_toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </span>
            </div>
            {error.password && <p className="error_msg">⚠ {error.password}</p>}
            <button className="signin_submit" onClick={handleSignIn}>
              Sign In
            </button>
            <p className="forgot_password">Forgot password?</p>
            <div className="remember_me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <p className="signup_link">
              New to Netflix?{" "}
              <span onClick={() => navigate("/")}>Sign up now.</span>
            </p>
          </div>
        </div>
      </div>
      <footer className="login_footer">
        <p className="login_footer_contact">
          Questions? Call 000-800-919-1743 (Toll-Free)
        </p>
        <div className="login_footer_links">
          {footerLinks.map((column, index) => (
            <ul key={index} className="login_footer_column">
              {column.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </footer>
    </section>
  );
};

export default Login;
