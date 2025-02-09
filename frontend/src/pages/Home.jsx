import React from "react";
import "../styles/home.css";

import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import worldImg from "../assets/images/world.png";
import experienceImg from "../assets/images/experience.png";

import Subtitle from "./../shared/Subtitle.jsx";

import heroBGvid from "../assets/images/hero-bg-video.mp4";
import FeaturedTourList from "../components/Featured-tours/FeaturedTourList.jsx";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery.jsx";
import Testimonial from "../components/Testimonial/Testimonials.jsx";
import Newsletter from "../shared/Newsletter.jsx";

const Home = () => {
  return (
    <>
      {/* ============ Hero Section ============ */}
      <section>
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

      {/* ============ Experience section start ============== */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle={"Experience"} />
                <h2>
                  With our all experience <br /> we will serve you
                </h2>
                <p></p>
              </div>

              <div className="counter__wrapper d-flex align-items-center gap-5">
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
            </Col>
          </Row>
        </Container>
      </section>
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
              <MasonryImagesGallery />
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

      <Newsletter />
    </>
  );
};

export default Home;
