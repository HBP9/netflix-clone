import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import netflixLogo from "../assets/netflix-logo.svg";
import "./Login.css";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const footerLinks = [
    ["FAQ", "Help Centre", "Terms of Use", "Privacy"],
    ["Cookie Preferences", "Corporate Information"],
  ];

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
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
            />
            <div className="password_wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="password_toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </span>
            </div>
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
