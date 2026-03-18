import { useState } from "react";
import "./HeroSection.css";
import caretRight from "../assets/caret-right.svg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleGetStarted = () => {
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    navigate("/login", { state: { email } });
  };

  return (
    <section className="hero">
      <div className="hero_overlay">
        <div className="hero_content">
          <h1>Unlimited movies, shows, and more</h1>
          <p className="hero_subtext">Starts at ₹149. Cancel at any time.</p>
          <p className="hero_cta_text">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <div className="hero_input_wrapper">
            <div className="hero_input">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                className={error ? "input_error" : ""}
              />
              <button className="get_started_btn" onClick={handleGetStarted}>
                Get Started
                <span>
                  <img src={caretRight} alt="caret-right"></img>
                </span>
              </button>
            </div>
            {error && <p className="error_msg">⚠ {error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
