import React, { useRef } from "react";
import "./search-bar.css";
// import { Col, Form, FormGroup } from "reactstrap";
import { BASE_URL } from "../utils/config.js";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const locationRef = useRef("");
  const navigate = useNavigate();

  const searchHandler = async () => {
    const location = locationRef.current.value;

    if (location === "") {
      return alert("Please Enter The Location!");
    }
    const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${location}`)
    if (!res.ok) alert('Somthing went wrong')

    const result = await res.json()
    navigate(`/tours/search?city=${location}`, { state: result.data })
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

// import React, { useState,locationRef } from "react";
// import "./search-bar.css";
// import { BASE_URL } from "../utils/config.js";
// import { useNavigate } from "react-router-dom";

// const SearchBar = () => {
//   const [searchValue, setSearchValue] = useState("");
//   const navigate = useNavigate();

//   const searchHandler = async () => {
//     const searchValue = locationRef.current.value.trim();

//     if (searchValue === "") {
//       return alert("Please enter a search term!");
//     }

//     // Dynamically set the query parameter based on user input
//     const queryParam = `city=${searchValue}&title=${searchValue}&state=${searchValue}`;

//     const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?${queryParam}`);

//     if (!res.ok) {
//       return alert("Something went wrong");
//     }

//     const result = await res.json();
//     navigate(`/tours/search?query=${searchValue}`, { state: result.data });
//   };


//   const handleKeyPress = (event) => {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       searchHandler();
//     }
//   };

//   return (
//     <div className="search__bar d-flex gap-2 form__group align-items-center">
//       <span><i className="ri-search-2-line"></i></span>

//       {/* Input field for search */}
//       <input
//         type="text"
//         placeholder="Search by location"
//         value={searchValue}
//         onChange={(e) => setSearchValue(e.target.value)}
//         className="Locario-input"
//         onKeyPress={handleKeyPress}
//       />
//       {/* <button onClick={searchHandler} className="search-button">Search</button> */}
//     </div>

//   );
// };

// export default SearchBar;
