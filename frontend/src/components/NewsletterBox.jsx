import React from "react";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-inner">
        <div className="newsletter-copy">
          <p className="newsletter-kicker">A NOTE FROM FOREVER</p>
          <h2>
            Subscribe now
            <br />
            & get <em>20% off.</em>
          </h2>
          <p className="newsletter-description">
            Join our list for exclusive offers, new arrivals, and a little
            inspiration for what to wear next.
          </p>
        </div>

        <form className="newsletter-form" onSubmit={onSubmitHandler}>
          <label className="newsletter-label" htmlFor="newsletter-email">
            YOUR EMAIL ADDRESS
          </label>
          <div className="newsletter-form-row">
            <input
              id="newsletter-email"
              type="email"
              placeholder="you@example.com"
              required
            />
            <button type="submit">
              <span>JOIN THE LIST</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>
          <p className="newsletter-note">
            New edits, special offers, straight to your inbox.
          </p>
        </form>
      </div>
    </section>
  );
};

export default NewsletterBox;
