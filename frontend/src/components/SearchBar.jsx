import React, { useContext, useEffect, useState } from "react";
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
    <div className="border-y bg-pink-50 text-center py-4 relative">
      {/* Search input box */}
      <div className="inline-flex items-center justify-center border border-pink-300 px-5 py-2 mx-auto rounded-full w-11/12 sm:w-1/2 shadow-md transition">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm text-pink-900 placeholder-pink-400"
          type="text"
          placeholder="Search for products..."
        />
        <img
          onClick={handleMicClick}
          className={`w-5 ml-3 cursor-pointer transition-transform ${
            isListening ? "animate-pulse" : ""
          }`}
          src={assets.mic_icon}
          alt="mic"
          title="Click to speak"
        />
        <img
          className="w-5 ml-3 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
          src={assets.search_icon}
          alt="search"
          title="Search"
        />
      </div>

      {/* Close icon - only visible on sm and up */}
      <button
        onClick={() => setShowSearch(false)}
        className="absolute top-3 right-5 text-pink-700 hover:scale-110 transition hidden sm:block"
        aria-label="Close search"
      >
        <img src={assets.cross_icon} alt="close" className="w-4" />
      </button>
    </div>
  ) : null;
};

export default SearchBar;
