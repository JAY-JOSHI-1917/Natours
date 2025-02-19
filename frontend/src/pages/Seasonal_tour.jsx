import React from 'react'
import CommonSection from '../shared/CommonSection'
import { Container } from 'reactstrap';

const Seasonal_tour = () => {
  return (
    <>
      <CommonSection title={"Seasonal Tours"} />

      <section>
        {/* <Container>
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
        </Container> */}
      </section>
    </>
  )
}

export default Seasonal_tour;