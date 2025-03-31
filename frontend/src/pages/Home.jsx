import React, { useEffect } from "react";
import "../styles/home.css";

import { Container, Row, Col, Button } from "reactstrap";
import heroImg from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
// import heroVideo from "../assets/images/hero-video.mp4";
import worldImg from "../assets/images/world.png";
// import experienceImg from "../assets/images/experience.png";

import Winter from "../assets/images/Winter.jpg";
import Summer from "../assets/images/Summer.jpg";
import Monsoon from "../assets/images/Monsoon.jpg";

import { Link } from "react-router-dom";
// import { NavLink, Link, useNavigate } from "react-router-dom";

import Subtitle from "./../shared/Subtitle.jsx";

import heroBGvid from "../assets/images/hero-bg-video.mp4";
import FeaturedTourList from "../components/Featured-tours/FeaturedTourList.jsx";
// import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery.jsx";
import Gallery from "../shared/Gallery.jsx";
import Testimonial from "../components/Testimonial/Testimonials.jsx";
import { BASE_URL } from "../utils/config.js";
// import Tours from "./Tours.jsx";

const Home = () => {
  return (
    <>
      {/* ============ Hero Section ============ */}
      <section className="hero__section">
        <div className="hero__back__vid-box">
          <video
            autoPlay
            muted
            loop
            src={heroBGvid}
            className="hero__back__vid"
          ></video>
        </div>
        <Container className="hero-bg-box">
          <div className="hero-row">
            <div className="hero__img-box">
              <img src={heroImg} alt="" className="hero-img" />
            </div>
            <div className="hero-main-vid-box">
              <video
                autoPlay
                muted
                loop
                src={heroBGvid}
                className="hero-main-vid"
              ></video>
            </div>
            <div className="hero__img-box">
              <img src={heroImg02} alt="" className="hero-img" />
            </div>
          </div>

          <div className="hero__content">
            <div className="hero__subtitle d-flex align-items-center">
              <Subtitle subtitle={"Know Before You Go"} />
              <img src={worldImg} alt="" />
            </div>
            <h1>
              Travelling opens the door to creating
              <span className="highlight"> memories</span>
            </h1>
          </div>
        </Container>
      </section>
      {/* ============ Hero Section ============ */}

      {/* =========== Tour By Season Start ============== */}
      <section>
        <Container className="season mb-5">
          <Row className="mb-5">
            <Col lg="12">
              <div className="season__content">
                <Subtitle subtitle={"Seasons"} />
                <h2>Discover the Wonders of Each Season</h2>
              </div>
            </Col>
          </Row>
          <Row className="season__card-row">
            <Link class="season__card" to="/seasons">
              <img src={Winter} alt="Winter" />
              <span className="img-cap">
                See Best Tour For <h3 className="h3-winter">Winter</h3>
              </span>
            </Link>
            {/* <div class="card__side card__side--back card__side--back-1">
                  <div class="card__cta">
                    <div class="card__price-box">
                      <p class="card__price-only">Only</p>
                      <p class="card__price-value">$297</p>
                    </div>
                    <a href="#popup" class="btn btn--white">
                      Book now!
                    </a>
                  </div>
                </div> */}
            <Link class="season__card" to="/seasons">
              <img src={Summer} alt="Summer" />
              <span className="img-cap">
                See Best Tour For <h3 className="h3-summer">Summer</h3>
              </span>
            </Link>
            {/* <div class="card__side card__side--back card__side--back-1">
                  <div class="card__cta">
                    <div class="card__price-box">
                      <p class="card__price-only">Only</p>
                      <p class="card__price-value">$297</p>
                    </div>
                    <a href="#popup" class="btn btn--white">
                      Book now!
                    </a>
                  </div>
                </div> */}
            <Link class="season__card" to="/seasons">
              <img src={Monsoon} alt="Monsoon" />
              <span className="img-cap">
                See Best Tour For <h3 className="h3-monsoon">Monsoon</h3>
              </span>
            </Link>
            {/* <div class="card__side card__side--back card__side--back-1">
                  <div class="card__cta">
                    <div class="card__price-box">
                      <p class="card__price-only">Only</p>
                      <p class="card__price-value">$297</p>
                    </div>
                    <a href="#popup" class="btn btn--white">
                      Book now!
                    </a>
                  </div>
                </div> */}
          </Row>
        </Container>
      </section>

      {/* =========== Tour By Season End ============== */}

      {/* ============ Featured Tour Start =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className="featured__tour-title">Our Featured Tours</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>
      {/* ============ Featured Tour End =========== */}

      <section class="section-features">
        <Container>
          <Row>
            <Col lg="12">
              <div className="experience__content">
                <Subtitle subtitle={"Experience"} />
                <h2>You Will Experience</h2>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="3">
              <div class="feature-box">
                <i class="feature-box__icon ri-earth-line"></i>
                <h3 class="mb-5">Explore the hidden gems of India</h3>
                <p class="feature-box__text">
                  <span className="d-flex align-items-start gap-3">
                    <span>&rarr;</span>{" "}
                    <h6>
                      Travel to amazing places and enjoy new experiences.{" "}
                    </h6>
                  </span>
                  <span className="d-flex align-items-start gap-3">
                    <span>&rarr;</span>{" "}
                    <h6>
                      See different cultures and make unforgettable memories.{" "}
                    </h6>
                  </span>
                </p>
              </div>
            </Col>

            <Col lg="3">
              <div class="feature-box">
                <i class="feature-box__icon ri-compass-3-line"></i>
                <h3 class="mb-5">Meet the beauty of Nature</h3>
                <p class="feature-box__text">
                  <span className="d-flex align-items-start gap-3">
                    <span>&rarr;</span>
                    <h6>Spend time in nature and see its beauty up close.</h6>
                  </span>
                  <span className="d-flex align-items-start gap-3">
                    <span>&rarr;</span>{" "}
                    <h6>Find peace and relaxation in the natural world. </h6>
                  </span>
                </p>
              </div>
            </Col>

            <Col lg="3">
              <div class="feature-box">
                <i class="feature-box__icon ri-road-map-line"></i>
                <h3 class="mb-5">Find your way to Nature</h3>
                <p class="feature-box__text">
                  <span className="d-flex align-items-start gap-3">
                    <span>&rarr;</span>
                    <h6>
                      Discover your path and make your own adventures.
                    </h6>{" "}
                  </span>
                  <span className="d-flex align-items-start gap-3">
                    <span>&rarr;</span>{" "}
                    <h6>
                      Follow your instincts and create unique experiences.{" "}
                    </h6>
                  </span>
                </p>
              </div>
            </Col>

            <Col lg="3">
              <div class="feature-box">
                <i class="feature-box__icon ri-heart-pulse-line"></i>
                <h3 class="mb-5">Live a healthier and happier life</h3>
                <p class="feature-box__text">
                  <span className="d-flex align-items-start gap-3">
                    <span>&rarr;</span>
                    <h6>
                      Make choices that help you feel better and be healthier.
                    </h6>{" "}
                  </span>
                  <span className="d-flex align-items-start gap-3">
                    <span>&rarr;</span>
                    <h6>
                      Take small steps towards a happier and healthier you.
                    </h6>{" "}
                  </span>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ============ Experience section start ============== */}

      {/* <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Successfull Trip</h6>
                </div>
                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Regular Clients</h6>
                </div>
                <div className="counter__box">
                  <span>15</span>
                  <h6>Years experience</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience__img">
                <img src={experienceImg} alt="" />
              </div>
             */}

      {/* ============ Experience section end ============== */}

      {/* ============ Gallery section start ============== */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle="Gallery" />
              <h2 className="gallery__title">
                Visit Our Customers Tour Gallery
              </h2>
            </Col>
            <Col lg="12">
              <Gallery />
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center mt-5">
              <Button className="btn primary__btn view-img">
                <Link to="/gallery">
                  <span className="d-flex align-items-center gallery__text">
                    <span>View More Images</span>
                    <span>&rarr;</span>
                  </span>
                </Link>
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ============ Gallery section end ============== */}
      {/* ============ Testimonial section start ============== */}

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Fans Love"} />
              <h2 className="testimonial__title">What our fans say about us</h2>
            </Col>
            <Col lg="12">
              <Testimonial />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ============ Testimonial section end ============== */}

    </>
  );
};

export default Home;
