import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import cityLayers from "../assets/lookbook/summer-edit.jpg";
import colorPop from "../assets/lookbook/city-style.jpg";
import streetIcons from "../assets/lookbook/modern-classics.jpg";
import afterHours from "../assets/lookbook/studio-look.jpg";

const lookbookItems = [
  {
    title: "City Layers",
    subtitle: "Tailored for now",
    image: cityLayers,
  },
  {
    title: "Color Pop",
    subtitle: "Make a statement",
    image: colorPop,
  },
  {
    title: "Street Icons",
    subtitle: "Off-duty energy",
    image: streetIcons,
  },
  {
    title: "After Hours",
    subtitle: "Unexpected details",
    image: afterHours,
  },
];

const InteractiveLookbook = () => {
  return (
    <section className="lookbook-section">
      <div className="lookbook-inner">
        <div className="lookbook-heading">
          <div>
            <p className="lookbook-kicker">
              <span>02</span>
              THE STYLE JOURNAL
            </p>
            <h2>
              A look for <em>every mood.</em>
            </h2>
          </div>
          <div className="lookbook-aside">
            <p>
              Four style stories. A few fresh ways to wear what you love. Pick
              a mood and make it your own.
            </p>
            <Link to="/collection" className="lookbook-cta">
              <span>EXPLORE THE COLLECTION</span>
              <span className="lookbook-arrow">
                <FiArrowUpRight aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>

        <div className="lookbook-grid">
          {lookbookItems.map((item, index) => (
            <Link
              to="/collection"
              key={item.title}
              aria-label={`Shop the ${item.title} edit`}
              className={`lookbook-card lookbook-card--${index + 1} group`}
            >
              <img src={item.image} alt={item.title} />
              <span className="lookbook-number" aria-hidden="true">
                0{index + 1}
              </span>
              <div className="lookbook-copy">
                <h3>{item.title}</h3>
                <p>
                  {item.subtitle} <span aria-hidden="true">— SHOP THIS EDIT</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveLookbook;
