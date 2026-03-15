import { useState } from "react";
import "./HeroSection.css";
import caretRight from "../assets/caret-right.svg";

const HeroSection = () => {
  const [email, setEmail] = useState("");
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
          <div className="hero_input">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="get_started_btn">
              Get Started
              <span>
                <img src={caretRight} alt="caret-right"></img>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
