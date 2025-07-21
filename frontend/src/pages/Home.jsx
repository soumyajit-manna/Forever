import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";
import InteractiveLookbook from "../components/InteractiveLookbook";
import Testimonial from "../components/Testimonial";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <InteractiveLookbook />
      <BestSeller />
      <OurPolicy />
      <Testimonial />
      <NewsletterBox />
    </div>
  );
};

export default Home;
