import React from 'react'
import CommonSection from '../shared/CommonSection'
import { Col, Container, Row } from 'reactstrap';

import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";

import TourCard from '../shared/TourCard';
import Subtitle from '../shared/Subtitle';
import Slider from 'react-slick';
import "../styles/seasonal-tour.css";

const Seasonal_tour = () => {

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const { data: winterTours } = useFetch(`${BASE_URL}/tours/search/getTourBySeason?season=winter`);
  const { data: summerTours } = useFetch(`${BASE_URL}/tours/search/getTourBySeason?season=summer`);
  const { data: monssonTours } = useFetch(`${BASE_URL}/tours/search/getTourBySeason?season=monsoon`);
  return (
    <>
      <section>
        <Container className="season-container">
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className="featured__tour-title" id='winter'>Winter Tours</h2>
            </Col>

            {/* <Slider {...settings}> */}
            {winterTours?.map((tour) => (

              <Col lg="3" className="mb-5" key={tour._id}>
                <TourCard tour={tour} />
              </Col>
            ))}
            {/* </Slider> */}
          </Row>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className="featured__tour-title" id='summer'>Summer Tours</h2>
            </Col>
            {summerTours?.map((tour) => (
              <Col lg="3" className="mb-4" key={tour._id}>
                <TourCard tour={tour} />
              </Col>
            ))}
          </Row>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className="featured__tour-title" id='monsoon'>Monsoon Tours</h2>
            </Col>
            {monssonTours?.map((tour) => (
              <Col lg="3" className="mb-4" key={tour._id}>
                <TourCard tour={tour} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading........</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {
            !loading &&
            !error &&
            <Row>

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
      </section> */}
    </>
  )
}

export default Seasonal_tour;