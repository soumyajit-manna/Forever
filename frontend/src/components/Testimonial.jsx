import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import TypewriterText from "./TypewriterText";

const testimonials = [
  {
    name: "Emma Watson",
    title: "Fashion Blogger",
    message:
      "Absolutely love the quality and the lookbook features! Shopping here is always a premium experience.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Liam Johnson",
    title: "Model & Influencer",
    message:
      "ForeverYou has revolutionized my wardrobe. The attention to detail and fast delivery blew me away.",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="testimonial-section">
      <div className="testimonial-inner">
        <div className="testimonial-heading">
          <div>
            <p className="testimonial-kicker">
              <span>05</span>
              NOTES FROM THE COMMUNITY
            </p>
            <h2>
              What our <em>clients say.</em>
            </h2>
          </div>
          <p className="testimonial-intro">
            Style is personal. Here are a few words from customers who make
            ForeverYou their own.
          </p>
        </div>

        <div className="testimonial-carousel">
          <button
            type="button"
            className="testimonial-nav-button"
            aria-label="Show previous client review"
            onClick={() =>
              setActiveIndex(
                (index) => (index + testimonials.length - 1) % testimonials.length,
              )
            }
          >
            <FiChevronLeft aria-hidden="true" />
          </button>
          <div className="testimonial-grid">
            {testimonials.map((testimonial, index) => (
              <article
                className={`testimonial-card${index === activeIndex ? " testimonial-card--active" : ""}`}
                key={testimonial.name}
              >
                <div className="testimonial-card-top">
                  <span>CLIENT NOTE</span>
                  <span>0{index + 1}</span>
                </div>
                <span className="testimonial-quote-mark" aria-hidden="true">
                  “
                </span>
                <TypewriterText
                  as="p"
                  className="testimonial-message"
                  text={testimonial.message}
                  delay={index * 850}
                />
                <div className="testimonial-person">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div>
                    <h3>{testimonial.name}</h3>
                    <p>{testimonial.title}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <button
            type="button"
            className="testimonial-nav-button"
            aria-label="Show next client review"
            onClick={() => setActiveIndex((index) => (index + 1) % testimonials.length)}
          >
            <FiChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
