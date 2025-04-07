import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, FormGroup } from "reactstrap";
import { BASE_URL } from "../utils/config";
import useFetch from "../hooks/useFetch";
import { formatDate } from "../utils/dateUtils";
import "../styles/admin-panel.css"

const AdminPanel = () => {
  const [tours, setTours] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookedTour, setBookedTours] = useState([]);
  const [showAddTourModal, setShowAddTourModal] = useState(false);
  const [showUpdateTourModal, setShowUpdateTourModal] = useState(false);
  const [currentTour, setCurrentTour] = useState(null);
  const [activeSection, setActiveSection] = useState("manage-tours"); // Track the active section



  const [selectedCity, setSelectedCity] = useState(""); // State for selected city
  const [selectedAddress, setSelectedAddress] = useState(""); // State for selected address

  // Extract unique cities and addresses from the tours array
  const uniqueCities = [...new Set(tours.map((tour) => tour.city))];
  const uniqueAddresses = [...new Set(tours.map((tour) => tour.address))];

  // Filter tours based on selected city and address
  const filteredTours = tours.filter((tour) => {
    const matchesCity = selectedCity ? tour.city === selectedCity : true;
    const matchesAddress = selectedAddress ? tour.address === selectedAddress : true;
    return matchesCity && matchesAddress;
  });



  const { data: fetchedTours } = useFetch(`${BASE_URL}/tours/admin/tour`);
  const { data: fetchedBookedTour } = useFetch(`${BASE_URL}/booking/`);
  const { data: fetchedUsers } = useFetch(`${BASE_URL}/users`);




  useEffect(() => {
    setTours(fetchedTours || []);
    setUsers(fetchedUsers || []);
    setBookedTours(fetchedBookedTour || []);
  }, [fetchedTours, fetchedUsers, fetchedBookedTour]);

  const refreshData = async () => {
    try {
      // Fetch tours
      const toursRes = await fetch(`${BASE_URL}/tours/admin/tour`);
      const toursData = await toursRes.json();
      setTours(toursData.data || []);

      // Fetch booked tours
      const bookedToursRes = await fetch(`${BASE_URL}/booking/`);
      const bookedToursData = await bookedToursRes.json();
      setBookedTours(bookedToursData.data || []);

      // Fetch users
      const usersRes = await fetch(`${BASE_URL}/users`);
      const usersData = await usersRes.json();
      setUsers(usersData.data || []);
    } catch (err) {
      console.error("Error refreshing data:", err);
    }
  };

  ///////////////////////////Tour Delete Logic///////////////////////////////////////////////

  const handleDeleteTour = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this tour?");
    if (!confirmed) return;

    try {
      const res = await fetch(`${BASE_URL}/tours/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data)
      if (res.ok) {
        await refreshData();
        setTours(tours.filter((tour) => tour._id !== id));
        alert("Tour deleted successfully!");
      }
      else {
        alert(data.message);
      }
    } catch (err) {
      alert("Failed to delete tour.");
    }
  };


  ///////////////////////////Booked Tour Delete Logic///////////////////////////////////////////////

  const handleBookedDeleteTour = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this tour?");
    if (!confirmed) return;

    try {
      const res = await fetch(`${BASE_URL}/booking/deleteBookedtour/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await refreshData();
        alert("Booked tour Deleted Successfully...");
      } else {
        alert("You cannot delete booked tour as its Status : Pending | On Going")
      }
    } catch (err) {
      alert("Failed to delete tour.");
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setUsers(users.filter((user) => user._id !== id));
        alert("User deleted successfully!");
      }
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  //handle add Tour
  // const [photoBase64, setPhotoBase64] = useState("");

  // const handlePhotoUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPhotoBase64(reader.result);
  //       console.log(reader.result)// Base64 encoded string
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };


  const handleAddTour = async (e) => {
    e.preventDefault();
    // const tourData = Object.fromEntries(formData.entries());
    // tourData.photo = photofile;
    // console.log(tourData.pho)
    // console.log(photofile)
    // console.log("tour data  ::", tourData)
    // const tourData = Object.fromEntries(formData.entries());
    // const photoBase64 = e.target.photo.files[0];
    // formData.append('photo', photoBase64);
    // console.log(photoBase64)
    // console.log("This is tourData:: ", tourData)
    try {
      const formData = new FormData(e.target);
      formData.append("featured", e.target.featured.checked);
      // console.log(formData)
      const res = await fetch(`${BASE_URL}/tours`, {
        method: "POST",
        // headers: { "Content-Type": "multipart/form-data" },
        body: formData,
        // credentials: "include",
      });

      const result = await res.json();
      if (res.ok) {
        setTours([...tours, result.data]);
        setShowAddTourModal(false);
        alert("Tour added successfully!");
      }
    } catch (err) {
      alert("Failed to add tour.");
    }
  };


  // const handleAddTour = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const tourData = Object.fromEntries(formData.entries());

  //   try {
  //     const res = await fetch(`${BASE_URL}/tours`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(tourData),
  //       credentials: "include",
  //     });

  //     const result = await res.json();
  //     if (res.ok) {
  //       setTours([...tours, result.data]); // Append new tour
  //       setShowTourModal(false);
  //       alert("Tour added successfully!");
  //     }
  //   } catch (err) {
  //     alert("Failed to add tour.");
  //   }
  // };

  /////////handle update tour

  const handleUpdateTour = async (e) => {
    e.preventDefault();
    if (!currentTour) return;

    const formData = new FormData(e.target);
    // formData.append("featured", e.target.featured.checked);
    const tourData = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${BASE_URL}/tours/${currentTour._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: formData,
        body: JSON.stringify(tourData),
        credentials: "include",
      });

      const result = await res.json();
      if (res.ok) {
        setTours(tours.map((t) => (t._id === result.data._id ? result.data : t)));
        setShowUpdateTourModal(false);
        alert("Tour updated successfully!");
      }
    } catch (err) {
      alert("Failed to update tour.");
    }
  };

  // const handleUpdateTour = async (e) => {
  //   e.preventDefault();
  //   if (!currentTour) return; // Ensure we have a tour to update

  //   const formData = new FormData(e.target);
  //   const tourData = Object.fromEntries(formData.entries());

  //   try {
  //     const res = await fetch(`${BASE_URL}/tours/${currentTour._id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(tourData),
  //       credentials: "include",
  //     });

  //     const result = await res.json();
  //     if (res.ok) {
  //       setTours(tours.map((t) => (t._id === result.data._id ? result.data : t))); // Update specific tour
  //       setShowTourModal(false);
  //       alert("Tour updated successfully!");
  //     }
  //   } catch (err) {
  //     alert("Failed to update tour.");
  //   }
  // };


  // const handleAddOrUpdateTour = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const tourData = Object.fromEntries(formData.entries());

  //   try {
  //     const res = await fetch(`${BASE_URL}/tours/${currentTour ? currentTour._id : ""}`, {
  //       method: currentTour ? "PUT" : "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(tourData),
  //       credentials: "include",
  //     });
  //     const result = await res.json();
  //     if (res.ok) {
  //       setTours(currentTour ? tours.map((t) => (t._id === result.data._id ? result.data : t)) : [...tours, result.data]);
  //       setShowTourModal(false);
  //       alert(`Tour ${currentTour ? "updated" : "added"} successfully!`);
  //     }
  //   } catch (err) {
  //     alert("Failed to save tour.");
  //   }
  // };

  return (
    <div className="admin-panel">

      {/* Section Switching Buttons */}
      <div className="section-buttons d-flex justify-content-around mb-4">
        <Button
          color={activeSection === "manage-tours" ? "primary" : "secondary"}
          onClick={() => setActiveSection("manage-tours")}
        >
          Manage Tours
        </Button>
        <Button
          color={activeSection === "manage-booked-tours" ? "primary" : "secondary"}
          onClick={() => setActiveSection("manage-booked-tours")}
        >
          Manage Booked Tours
        </Button>
        <Button
          color={activeSection === "manage-users" ? "primary" : "secondary"}
          onClick={() => setActiveSection("manage-users")}
        >
          Manage Users
        </Button>
      </div>

      {/* Conditionally Render Sections */}

      {activeSection === "manage-tours" && (
        <section id="manage-tours" className="manage-tours">
          <div className="manage-tours-heading">
            <h2>Add Tour :</h2>
            <Button color="primary" onClick={() => setShowAddTourModal(true)}>Add Tour</Button>
          </div>

          <div className="filters d-flex gap-3 mb-4">
            <div>
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
            </div>
          </div>
          {/* <Button color="primary" onClick={() => { setCurrentTour(null); setShowTourModal(true); }}>Add Tour</Button> */}
          <h2>Existing Tours :</h2>
          <Table>
            <thead>
              <tr>
                <th>Image Of Tour</th>
                <th>Title</th>
                <th>City</th>
                <th>State</th>
                <th>Address</th>
                <th>Total Guest </th>
                <th> max Group size </th>
                <th>Price</th>
                <th>Season</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {filteredTours.map((tour) => (
                <tr key={tour._id}>
                  <td>
                    <img
                      style={{ width: "200px", borderRadius: "5px" }}
                      src={tour.photo}
                      alt=""
                    />
                  </td>
                  <td>{tour.title}</td>
                  <td>{tour.city}</td>
                  <td>{tour.address}</td>
                  <td>{tour.totalGuestSize}</td>
                  <td>{tour.maxGroupSize}</td>
                  <td>₹{tour.price}</td>
                  <td>{tour.season}</td>
                  <td>{tour.featured ? "True" : "False"}</td>
                  <td>
                    <Button color="warning" onClick={() => { setCurrentTour(tour); setShowUpdateTourModal(true); }}>Edit</Button>
                    <Button color="danger" onClick={() => handleDeleteTour(tour._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>
      )}

      {activeSection === "manage-booked-tours" && (
        <section id="manage-booked-tours">
          <Table>
            <thead>
              <tr>
                <th>Title</th>
                <th>User FullName</th>
                <th>User Email</th>
                <th>Tour Starting date</th>
                <th>Tour Ending date</th>
                <th>Booker Tour Status</th>
                <th>Guest Size</th>
                <th>Contact</th>
                <th>Total Payable Amount</th>
                <th>Payment Mode</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookedTour.map((bookedtour) => {
                // Find the corresponding tour based on tourId
                // const tour = tours.find((t) => t._id === bookedtour.tourId);

                return (
                  <tr key={bookedtour._id}>
                    <td>{bookedtour.tourName}</td>
                    <td>{bookedtour.fullName}</td>
                    <td>{bookedtour.userEmail}</td>
                    {/* <td>{bookedtour.bookAt}</td> */}
                    <td>{formatDate(bookedtour.tourStartingDate)}</td>
                    <td>{formatDate(bookedtour.tourEndingDate)}</td>
                    <td>{bookedtour.status}</td>
                    <td>{bookedtour.guestSize}</td>
                    <td>{bookedtour.phone}</td>
                    <td>{bookedtour.totalPayableAmount}</td>
                    <td>{bookedtour.paymentMode}</td>
                    <td>
                      <Button color="danger" onClick={() => handleBookedDeleteTour(bookedtour._id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </section>

        // <section id="manage-booked-tours">
        //   <Table>
        //     <thead>
        //       <tr>
        //         <th>Title</th>
        //         <th>User FullName</th>
        //         <th>User Email</th>
        //         <th>Guest Size</th>
        //         <th>Contact</th>
        //         <th>Payment Mode</th>
        //         <th>Actions</th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       {bookedTour.map((bookedtour) => (
        //         <tr key={bookedtour._id}>
        //           <td>{bookedtour.tourId}</td>
        //           <td>{bookedtour.tourName}</td>
        //           <td>{bookedtour.fullName}</td>
        //           <td>{bookedtour.userEmail}</td>
        //           <td>{bookedtour.guestSize}</td>
        //           <td>{bookedtour.phone}</td>
        //           <td>{bookedtour.paymentMode}</td>
        //           <td>
        //             {/* <Button color="warning" onClick={() => { setCurrentTour(bookedtour); setShowTourModal(true); }}>Edit</Button> */}
        //             <Button color="danger" onClick={() => handleDeleteTour(bookedtour._id)}>Delete</Button>
        //           </td>
        //         </tr>
        //       ))}
        //     </tbody>
        //   </Table>
        // </section>
      )}

      {activeSection === "manage-users" && (
        <section id="manage-users">
          <h2>Manage Users</h2>
          <Table>
            <thead>
              <tr>
                <th>User Profile Photo</th>
                <th>Username</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td><img style={{ width: "200px", borderRadius: "5px" }} src={user.photo} alt="" /></td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.contact || <pre>    -    </pre>}</td>
                  <td>{user.address || <pre>    -    </pre>}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button color="danger" onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>
      )}
      {/* Add/Edit Tour Modal */}
      {/*Add tour */}
      <Modal isOpen={showAddTourModal} toggle={() => setShowAddTourModal(false)}>
        <Form onSubmit={handleAddTour}>
          <div className="modal-header">
            <h5>Add Tour</h5>
            <Button close onClick={() => setShowAddTourModal(false)} />
          </div>
          <div className="modal-body">
            <FormGroup>
              <label>Photo</label>
              <input type="file" name="photo" accept="image/*" />
            </FormGroup>
            <FormGroup>
              <label>Title</label>
              <input type="text" name="title" required />
            </FormGroup>
            <FormGroup>
              <label>City</label>
              <input type="text" name="city" required />
            </FormGroup>
            <FormGroup>
              <label>Address</label>
              <input type="text" name="address" required />
            </FormGroup>
            <FormGroup>
              <label>Price</label>
              <input type="number" name="price" required />
            </FormGroup>
            <FormGroup>
              <label>Description</label>
              <textarea name="desc" required />
            </FormGroup>
            <FormGroup>
              <label>Max Group Size</label>
              <input type="number" name="maxGroupSize" required />
            </FormGroup>
            <FormGroup>
              <label>Season</label>
              <select name="season" required>
                <option value="">Select Season</option>
                <option value="summer">Summer</option>
                <option value="winter">Winter</option>
                <option value="monsoon">Monsoon</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Featured</label>
              <input type="checkbox" name="featured" />
            </FormGroup>
          </div>
          <div className="modal-footer">
            <Button type="submit" color="primary">Add</Button>
          </div>
        </Form>
      </Modal>

      {/*Update tour*/}
      <Modal isOpen={showUpdateTourModal} toggle={() => setShowUpdateTourModal(false)}>
        <Form onSubmit={handleUpdateTour}>
          <div className="modal-header">
            <h5>Update Tour</h5>
            <Button close onClick={() => setShowUpdateTourModal(false)} />
          </div>
          <div className="modal-body">



          <FormGroup>
              <label>Photo</label>
              <input type="file" name="photo" accept="image/*" />
            </FormGroup>
            <FormGroup>
              <label>Title</label>
              <input type="text" name="title" defaultValue={currentTour?.title || ""} required />
            </FormGroup>
            <FormGroup>
              <label>City</label>
              <input type="text" name="city" defaultValue={currentTour?.city || ""} required />
            </FormGroup>
            <FormGroup>
              <label>Address</label>
              <input type="text" name="address" defaultValue={currentTour?.address || ""} required />
            </FormGroup>
            <FormGroup>
              <label>Price</label>
              <input type="number" name="price" defaultValue={currentTour?.price || ""} required />
            </FormGroup>
            <FormGroup>
              <label>Description</label>
              <textarea name="desc" defaultValue={currentTour?.desc || ""} required />
            </FormGroup>
            <FormGroup>
              <label>Max Group Size</label>
              <input type="number" name="maxGroupSize" defaultValue={currentTour?.maxGroupSize || ""} required />
            </FormGroup>
            <FormGroup>
              <label>Season</label>
              <select name="season" defaultValue={currentTour?.season || ""} required>
                <option value="">Select Season</option>
                <option value="summer">Summer</option>
                <option value="winter">Winter</option>
                <option value="monsoon">Monsoon</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>Featured</label>
              <input type="checkbox" defaultValue={currentTour?.featured || ""} name="featured" />
            </FormGroup>



            
            
          </div>
          <div className="modal-footer">
            <Button type="submit" color="primary">Update</Button>
          </div>
        </Form>
      </Modal>
      {/* <Form onSubmit={handleAddOrUpdateTour}>
            <div className="modal-header">
              <h5>{currentTour ? "Edit Tour" : "Add Tour"}</h5>
              <Button close onClick={() => setShowTourModal(false)} />
            </div>
            <div className="modal-body">
              <FormGroup>
                <label>Photo</label>
                <input type="file" name="photo" accept="image/*" onChange={(e) => handlePhotoUpload(e)} />
              </FormGroup>
              <FormGroup>
                <label>Title</label>
                <input type="text" name="title" defaultValue={currentTour?.title || ""} required />
              </FormGroup>
              <FormGroup>
                <label>City</label>
                <input type="text" name="city" defaultValue={currentTour?.city || ""} required />
              </FormGroup>
              <FormGroup>
                <label>Address</label>
                <input type="text" name="address" defaultValue={currentTour?.address || ""} required />
              </FormGroup>
              <FormGroup>
                <label>Price</label>
                <input type="number" name="price" defaultValue={currentTour?.price || ""} required />
              </FormGroup>
              <FormGroup>
                <label>Description</label>
                <textarea name="desc" defaultValue={currentTour?.desc || ""} required />
              </FormGroup>
              <FormGroup>
                <label>Max Group Size</label>
                <input type="number" name="maxGroupSize" defaultValue={currentTour?.maxGroupSize || ""} required />
              </FormGroup>
              <FormGroup>
                <label>Season</label>
                <select name="season" defaultValue={currentTour?.season || ""} required>
                  <option value="">Select Season</option>
                  <option value="summer">Summer</option>
                  <option value="winter">Winter</option>
                  <option value="monsoon">Monsoon</option>
                </select>
              </FormGroup>
              <FormGroup>
                <label>Featured</label>
                <input type="checkbox" name="featured" defaultChecked={currentTour?.featured || false} />
              </FormGroup>
            </div>
            <div className="modal-footer">
              <Button type="submit" color="primary">{currentTour ? "Update" : "Add"}</Button>
            </div>
          </Form> */}
      {/* </Modal> */}
    </div >
  );
};

export default AdminPanel;