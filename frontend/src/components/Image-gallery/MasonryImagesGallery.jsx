import React from "react";
import galleryImages from "./galleryImages";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const MasonryImagesGallery = () => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 400: 3 }}>
      <Masonry gutter="1rem">
        {galleryImages.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              className="masonry__img"
              src={item.src}
              alt=""
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
              {item.text}
            </span>
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default MasonryImagesGallery;
