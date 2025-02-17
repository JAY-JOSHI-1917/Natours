import React from "react";
import galleryImages from "../components/Image-gallery/galleryImages";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import galleryImg01 from "../assets/images/Gallery/White-Rann-Customer-1.jpg";
import galleryImg04 from "../assets/images/Gallery/Kalo-Dungar-Customer-1.jpg";
import { Button } from "reactstrap";

const Gallery = () => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 100: 5 }}>
      <Masonry gutter="1rem">
        <div>
          <img
            src={galleryImg01}
            alt="White Rann"
            style={{
              width: "100%",
              display: "block",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          />
          <span
            style={{
              fontWeight: "700",
              fontSize: "1.2rem",
            }}
          >
            White Rann
          </span>
        </div>
        <div>
          <img
            src={galleryImg04}
            alt="Kalo Dungar"
            style={{
              width: "100%",
              display: "block",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          />
          <span
            style={{
              fontWeight: "700",
              fontSize: "1.2rem",
            }}
          >
            Kalo Dungar
          </span>
        </div>
        <div>
          <img
            src={galleryImg01}
            alt="White Rann"
            style={{
              width: "100%",
              display: "block",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          />
          <span
            style={{
              fontWeight: "700",
              fontSize: "1.2rem",
            }}
          >
            White Rann
          </span>
        </div>
        <div>
          <img
            src={galleryImg04}
            alt="Kalo Dungar"
            style={{
              width: "100%",
              display: "block",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          />
          <span
            style={{
              fontWeight: "700",
              fontSize: "1.2rem",
            }}
          >
            Kalo Dungar
          </span>
        </div>
        <div>
          <img
            src={galleryImg04}
            alt="Kalo Dungar"
            style={{
              width: "100%",
              display: "block",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          />
          <span
            style={{
              fontWeight: "700",
              fontSize: "1.2rem",
            }}
          >
            Kalo Dungar
          </span>
        </div>
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default Gallery;
