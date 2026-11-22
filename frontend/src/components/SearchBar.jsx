import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  const [visible, setVisible] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const location = useLocation();

  const recognitionRef = useState(
    "webkitSpeechRecognition" in window
      ? new window.webkitSpeechRecognition()
      : null
  )[0];

  // Show search bar only on /collection route
  useEffect(() => {
    setVisible(location.pathname.includes("collection"));
  }, [location]);

  // Configure voice recognition
  useEffect(() => {
    if (!recognitionRef) return;

    recognitionRef.continuous = false;
    recognitionRef.interimResults = false;
    recognitionRef.lang = "en-IN";

    recognitionRef.onresult = (event) => {
      const voiceInput = event.results[0][0].transcript;
      setSearch(voiceInput);
    };

    recognitionRef.onend = () => {
      setIsListening(false);
    };
  }, [recognitionRef, setSearch]);

  const handleMicClick = () => {
    if (recognitionRef) {
      setIsListening(true);
      recognitionRef.start();
    } else {
      alert("Speech Recognition is not supported in your browser.");
    }
  };

  return showSearch && visible ? (
    <section className="search-panel" aria-label="Product search">
      <div className="search-panel-inner">
        <div className="search-panel-heading">
          <p>FIND YOUR NEXT FAVORITE</p>
          <span>SEARCH / 01</span>
        </div>

        <div className="search-panel-content">
          <div className="search-field">
            <img className="search-field-icon" src={assets.search_icon} alt="" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search by name, style, or mood..."
              aria-label="Search products"
            />
            <button
              type="button"
              onClick={handleMicClick}
              className={`search-voice-button ${isListening ? "is-listening" : ""}`}
              aria-label={isListening ? "Listening for search" : "Search by voice"}
              aria-pressed={isListening}
              title="Search by voice"
            >
              <img src={assets.mic_icon} alt="" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowSearch(false)}
            className="search-close-button"
            aria-label="Close search"
          >
            <img src={assets.cross_icon} alt="" />
            <span>CLOSE</span>
          </button>
        </div>

        <p className="search-panel-hint">
          {isListening ? "LISTENING — SAY WHAT YOU’RE LOOKING FOR" : "TYPE TO FILTER THE COLLECTION"}
        </p>
      </div>
    </section>
  ) : null;
};

export default SearchBar;
