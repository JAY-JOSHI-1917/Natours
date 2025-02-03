import React, { useRef } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";

const SearchBar = () => {
  const locationRef = useRef("");

  const searchHandler = () => {
    const location = locationRef.current.value;

    if (location === "") {
      return alert("Please Enter The Location!");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      searchHandler();
    }
  };

  return (
    <div className="search__bar d-flex gap-2 form__group align-items-center">
      <span>
        <i class="ri-search-2-line"></i>
      </span>
      <input
        type="text"
        placeholder="Search By Location"
        ref={locationRef}
        className="Location-Input"
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default SearchBar;
