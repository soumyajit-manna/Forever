import { FiArrowUpRight } from "react-icons/fi";
import NewsletterBox from "../components/NewsletterBox";

const contactImage =
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1400&q=85";

const Contact = () => {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-copy">
          <p className="contact-kicker">
            <span>FOREVER / CONTACT</span>
            <span>WE’RE HERE FOR YOU</span>
          </p>
          <h1>
            Let’s talk
            <br />
            <em>style.</em>
          </h1>
          <p className="contact-hero-description">
            Questions about an order, a piece you love, or anything in between?
            We’d be happy to help.
          </p>
          <a
            className="contact-primary-link"
            href="mailto:mannasoumyajit47@gmail.com"
          >
            <span>SEND US A NOTE</span>
            <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <div className="contact-portrait">
          <img
            src={contactImage}
            alt="A curated clothing rail in a softly lit boutique"
          />
          <span>GOOD STYLE STARTS WITH A CONVERSATION</span>
        </div>
      </section>

      <section className="contact-details">
        <div className="contact-details-heading">
          <div>
            <p className="contact-kicker">
              <span>DIRECT LINES</span>
            </p>
            <h2>
              Get in <em>touch.</em>
            </h2>
          </div>
          <p>
            However you’d like to reach us, we’re always glad to hear from you.
          </p>
        </div>

        <div className="contact-details-grid">
          <article className="contact-detail-card">
            <span className="contact-detail-index">01 / VISIT</span>
            <h3>Our Store</h3>
            <address>
              54709 Willms Station
              <br />
              Suite 350, Washington, USA
            </address>
          </article>

          <article className="contact-detail-card">
            <span className="contact-detail-index">02 / SAY HELLO</span>
            <h3>Talk to us</h3>
            <a href="tel:+919382869803">(+91) 93828 69803</a>
            <a href="mailto:mannasoumyajit47@gmail.com">
              mannasoumyajit47@gmail.com
            </a>
          </article>

          <article className="contact-detail-card">
            <span className="contact-detail-index">03 / JOIN US</span>
            <h3>Careers at Forever</h3>
            <p>Interested in being part of our team? We’d love to hear from you.</p>
            <a
              className="contact-careers-link"
              href="mailto:mannasoumyajit47@gmail.com?subject=Careers%20at%20Forever"
            >
              EXPLORE OPPORTUNITIES
              <FiArrowUpRight aria-hidden="true" />
            </a>
          </article>
        </div>
      </section>

      <NewsletterBox />
    </main>
  );
};

export default Contact;
