import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import "./HomeFooter.css";

const footerLinks = [
  ["Audio Description", "Investor Relations", "Legal Notices"],
  ["Help Centre", "Jobs", "Cookie Preferences"],
  ["Gift Cards", "Terms of Use", "Corporate Information"],
  ["Media Centre", "Privacy", "Contact Us"],
];

const HomeFooter = () => {
  return (
    <footer className="home_footer">
      <div className="footer_social">
        <a href="#">
          <Facebook size={24} />
        </a>
        <a href="#">
          <Instagram size={24} />
        </a>
        <a href="#">
          <Twitter size={24} />
        </a>
        <a href="#">
          <Youtube size={24} />
        </a>
      </div>

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

      <p className="footer_copyright">© 1997-2026 Netflix, Inc.</p>
    </footer>
  );
};

export default HomeFooter;
