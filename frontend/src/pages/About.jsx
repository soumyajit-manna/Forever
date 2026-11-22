import { Link } from "react-router-dom";
import NewsletterBox from "../components/NewsletterBox";

const aboutImage =
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85";

const About = () => {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-image">
          <img
            src={aboutImage}
            alt="A shopper carrying a selection of fashion bags"
          />
          <span>THE EVERYDAY EDIT / FOREVER</span>
        </div>

        <div className="about-story">
          <p className="about-kicker">
            <span>01</span>
            THE FOREVER STORY
          </p>
          <h1>
            Style is a story.
            <br />
            <em>Make it yours.</em>
          </h1>
          <p>
            Forever is built around a simple idea: getting dressed should feel
            effortless, personal, and entirely your own.
          </p>
          <p>
            We bring together everyday favorites and expressive pieces to make
            finding something that feels like you a little easier.
          </p>
          <Link to="/collection" className="about-cta">
            <span>DISCOVER THE COLLECTION</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="about-mission">
        <div className="about-mission-heading">
          <p className="about-kicker">
            <span>02</span>
            WHAT WE BELIEVE
          </p>
          <h2>
            Good style should feel <em>like you.</em>
          </h2>
        </div>

        <div className="about-values">
          <p className="about-mission-copy">
            Our mission is to make discovering your next favorite feel
            thoughtful and easy, with a considered edit, a straightforward
            shopping experience, and support whenever you need it.
          </p>

          <div className="about-values-grid">
            <article>
              <span>01 / THE EDIT</span>
              <h3>Considered pieces</h3>
              <p>
                A mix of easy-to-wear essentials and styles with a point of
                view.
              </p>
            </article>
            <article>
              <span>02 / YOUR STYLE</span>
              <h3>Always personal</h3>
              <p>
                No rules to follow—just pieces to make your own, day after day.
              </p>
            </article>
            <article>
              <span>03 / HERE TO HELP</span>
              <h3>A little more care</h3>
              <p>
                From choosing a look to questions after you order, we’re here
                for you.
              </p>
            </article>
          </div>
        </div>
      </section>

      <NewsletterBox />
    </main>
  );
};

export default About;
