import "./Footer.css";
import { useState } from "react";
import caretRight from "../assets/caret-right.svg";

const Footer = () => {
  const [email, setEmail] = useState("");
  const footerLinks = [
    ["FAQ", "Investor Relations", "Privacy", "Speed Test"],
    ["Help Centre", "Jobs", "Cookie Preferences", "Legal Notices"],
    ["Account", "Ways to Watch", "Corporate Information", "Only on Netflix"],
    ["Media Centre", "Terms of Use", "Contact Us"],
  ];
  return (
    <footer className="footer">
      <div className="subscribe_drop">
        <p className="hero_cta_text">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div className="hero_input footer_input">
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
      <p className="footer_contact">Questions? Call 000-800-919-1743</p>
      <div className="footer_links">
        {footerLinks.map((column, index) => (
          <ul key={index} className="footer_column">
            {column.map((link) => (
              <li key={link}>
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <p className="footer_region">Netflix India</p>
    </footer>
  );
};

export default Footer;
