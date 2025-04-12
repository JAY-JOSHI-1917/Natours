import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";

import "../styles/tour.css";
// import tourData from "../assets/data/tours";
import TourCard from "./../shared/TourCard";
// import SearchBar from "./../shared/SearchBar";
// import NewsLetter from "./../shared/Newsletter";

import Slider from "react-slick";

import { Container, Row, Col } from "reactstrap";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`)
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`)


  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
  }, [page, tourCount, tours]);



  const [selectedCity, setSelectedCity] = useState(""); // State for selected city
  const [selectedAddress, setSelectedAddress] = useState(""); // State for selected address

  // Extract unique cities and addresses from the tours array
  const uniqueCities = [...new Set(tours?.map((tour) => tour.city))];
  const uniqueAddresses = [...new Set(tours?.map((tour) => tour.address))];

  // // Filter tours based on selected city and address
  // const filteredTours = tours?.filter((tour) => {
  //   const matchesCity = selectedCity ? tour.city === selectedCity : true;
  //   const matchesAddress = selectedAddress ? tour.address === selectedAddress : true;
  //   return matchesCity && matchesAddress;
  // });




  return (
    <>
      <CommonSection title={"All Tours"} />
      <section>
        <Container>

        <div className="filters d-flex gap-3 mb-4">
            {/* <div>
              <label htmlFor="cityFilter">Filter by City:</label>
              <select
                id="cityFilter"
                className="form-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">All Cities</option>
                {uniqueCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="addressFilter">Filter by State:</label>
              <select
                id="addressFilter"
                className="form-select"
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
              >
                <option value="">All States</option>
                {uniqueAddresses.map((address) => (
                  <option key={address} value={address}>
                    {address}
                  </option>
                ))}
              </select>
            </div> */}
          </div>

          {loading && <h4 className="text-center pt-5">Loading........</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {
            !loading &&
            !error &&
            <Row>
              {tours?.map((tour) => (
                <Col lg="3" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}

              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? "active__page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          }
        </Container>
      </section>

    </>
  );
};

export default Tours;
