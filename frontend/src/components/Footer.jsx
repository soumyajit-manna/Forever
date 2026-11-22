import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-intro">
          <div>
            <p className="footer-eyebrow">THE FOREVER EDIT · 01</p>
            <h2>
              Style that <em>stays.</em>
            </h2>
          </div>
          <Link to="/collection" className="footer-cta">
            <span>EXPLORE THE COLLECTION</span>
            <FiArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <div className="footer-divider" />

        <div className="footer-columns">
          <div className="footer-brand">
            <Link to="/" className="footer-wordmark" aria-label="Forever home">
              FOR<span className="wordmark-accent">EVER</span>
              <span className="wordmark-period">.</span>
            </Link>
            <p>
              Thoughtful everyday style, made for wherever life takes you.
              Find the pieces that feel like you.
            </p>
            <span className="footer-signoff">MADE TO MOVE WITH YOU</span>
          </div>

          <nav className="footer-links" aria-label="Footer navigation">
            <p className="footer-label">EXPLORE</p>
            <Link to="/">Home</Link>
            <Link to="/collection">Shop all</Link>
            <Link to="/about">Our story</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          <div className="footer-contact">
            <p className="footer-label">NEED A HAND?</p>
            <a href="mailto:mannasoumyajit47@gmail.com">
              mannasoumyajit47@gmail.com
            </a>
            <a href="tel:+919382869803">+91 93828 69803</a>
            <span>We’re always happy to help.</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2025 FOREVER. ALL RIGHTS RESERVED.</span>
          <span>GOOD STYLE. GOOD DAYS.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
