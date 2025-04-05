import React, { useState, useRef, useEffect } from "react";
import "./search-bar.css";
import { BASE_URL } from "../utils/config.js";
import { useNavigate, useLocation } from "react-router-dom";

const allSuggestions = [
  "Safed Rann, Kalo Dungar",
  "Kutch",
  "Shoolpaneshwar Wildlife",
  "Bharuch",
  "Saputara",
  "Dang",
  "Don Hill Station",
  "Wilson Hills",
  "Valsad",
  "Mount Abu",
  "Sirohi",
  "Polo Forest",
  "Sabarkantha",
  "Jambughoda Wildlife Sanctuary",
  "Panchmahal",
  "Dal Lake",
  "Srinagar",
  "Lonar Lake",
  "Maharashtra",
  "Manali",
  "Kullu",
  "Munnar",
  "Kerala",
  "Ooty Lakes",
  "Ooty",
  "Sundarbans",
  "West Bengal",
  "Valley of Flowers",
  "Uttarakhand",
  "Ziro Valley",
  "Arunachal Pradesh",
  "BMW",
  "Ferrari FXX K EVO"
  // Add more suggestions as needed
];

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const locationRef = useRef("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (input.length === 0) {
      setSuggestions([]);
    } else {
      const filteredSuggestions = allSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  }, [input]);

  useEffect(() => {
    // Clear the input field when navigating to any page other than the tours search page
    if (location.pathname !== "/tours/search") {
      setInput("");
      locationRef.current.value = "";
    }
  }, [location]);

  const searchHandler = async (query) => {
    if (query === "") {
      return alert("Please enter a city or title!");
    }

    try {
      const res = await fetch(
        `${BASE_URL}/tours/search/getTourBySearch?query=${query}`
      );
      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const result = await res.json();
      navigate(`/tours/search?query=${query}`, { state: result.data });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchHandler(input);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);
    setIsActive(true);
    searchHandler(suggestion);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSuggestions([]);
      setIsActive(false);
    }, 200);
  };

  return (
    <div className="search__bar d-flex gap-2 form__group align-items-center">
      <span>
        <i className="ri-search-2-line"></i>
      </span>
      <input
        type="text"
        placeholder="Search By Location"
        ref={locationRef}
        className="Location-Input"
        onKeyPress={handleKeyPress}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onBlur={handleBlur}
      />
      {suggestions.length > 0 && (
        <div className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <i class="ri-map-pin-line"></i>&nbsp;
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
