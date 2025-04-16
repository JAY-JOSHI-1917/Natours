import React, { useState } from "react";
import CommonSection from "../shared/CommonSection.jsx";
import { Col, Container, Row } from "reactstrap";

import { useLocation } from "react-router-dom";
import TourCard from "./../shared/TourCard.jsx";

const SearchResultList = () => {
  const location = useLocation();
  const [data] = useState(location.state);

  // Filter out tours with disabled visibility
  const enabledTours = data?.filter(tour => tour.visibility === "enable") || [];

  return (
    <>
      <CommonSection title={"Tour Search Result"} />
      <section>
        <Container>
          <Row>
            {/* <h1 color="black">Hello there</h1> */}
            {enabledTours.length === 0 ? (
              <h4 className="text-center">No Tour found</h4>
            ) : (
              enabledTours.map(tour => (
                <Col lg="3" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SearchResultList;



// import React, { useState, useEffect } from "react";
// import CommonSection from "../shared/CommonSection.jsx";
// import { Col, Container, Row } from "reactstrap";
// import { useLocation } from "react-router-dom";
// import TourCard from "./../shared/TourCard.jsx";

// const SearchResultList = () => {
//   const location = useLocation();
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     if (location.state && Array.isArray(location.state)) {
//       setData(location.state);
//     } else {
//       setData([]);
//     }
//   }, [location.state]);

//   return (
//     <>
//       <CommonSection title="Tour Search Result" />
//       <section>
//         <Container>
//           <Row>
//             {data.length === 0 ? (
//               <h4 className="text-center">No Tour found</h4>
//             ) : (
//               data.map((tour) => (
//                 <Col lg="3" className="mb-4" key={tour._id}>
//                   <TourCard tour={tour} />
//                 </Col>
//               ))
//             )}
//           </Row>
//         </Container>
//       </section>
//     </>
//   );
// };

// export default SearchResultList;
