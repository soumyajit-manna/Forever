import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero-section flex flex-col sm:flex-row overflow-hidden min-h-[460px] mt-2">
      <div className="hero-copy w-full sm:w-1/2 flex items-center">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-[1px] bg-[#a6533d]"></span>
            <span className="hero-kicker">
              THE NEW SEASON / EDIT 01
            </span>
          </div>

          <h1>
            Wear it
            <br />
            <span className="hero-accent-line">your way.</span>
          </h1>

          <p className="hero-tagline">
            Considered pieces for the everyday, made to feel like you.
          </p>

          <Link to="/collection" className="hero-cta">
            EXPLORE THE COLLECTION
          </Link>
        </div>
      </div>

      <img
        className="hero-image object-cover"
        src="https://images.pexels.com/photos/32048962/pexels-photo-32048962.jpeg?auto=compress&cs=tinysrgb&w=1400"
        alt="A stylish couple with their toddler in coordinated neutral outfits"
      />
    </section>
  );
};

export default Hero;
