import { useState } from "react";
import "./Navbar.css";
import netflixLogo from "../assets/netflix-logo.svg";
import lang from "../assets/translator-icon.svg";
import caretUp from "../assets/caret-up.svg";
import caretDown from "../assets/caret-down.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");

  const languages = ["English", "हिन्दी"];

  const handleSelect = (lang) => {
    setSelectedLang(lang);
    setIsOpen(false);
  };
  return (
    <>
      <nav className="navbar">
        <div className="navbar_logo">
          <img src={netflixLogo} alt="Netflix Logo" />
        </div>
        <div className="navbar_btns">
          <button className="lang_btn" onClick={() => setIsOpen(!isOpen)}>
            <span className="lang_icon">
              <img src={lang} alt="Language Icon" />
            </span>
            {selectedLang}
            <span className={`arrow ${isOpen ? "open" : ""}`}>
              <img src={isOpen ? caretUp : caretDown} alt="Caret Icon" />
            </span>
          </button>
          {isOpen && (
            <div className="dropdown">
              {languages.map((lang) => (
                <div
                  key={lang}
                  className="dropdown_item"
                  onClick={() => handleSelect(lang)}
                >
                  {lang}
                </div>
              ))}
            </div>
          )}
          <button className="signin_btn">Sign In</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
