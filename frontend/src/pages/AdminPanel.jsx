import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, FormGroup } from "reactstrap";
import { BASE_URL } from "../utils/config";
import useFetch from "../hooks/useFetch";

const AdminPanel = () => {
  const [tours, setTours] = useState([]);
  const [users, setUsers] = useState([]);
  const [showTourModal, setShowTourModal] = useState(false);
  const [currentTour, setCurrentTour] = useState(null);

  const { data: fetchedTours } = useFetch(`${BASE_URL}/tours/admin/bookedtour`);
  const { data: fetchedUsers } = useFetch(`${BASE_URL}/users`);

  useEffect(() => {
    setTours(fetchedTours || []);
    setUsers(fetchedUsers?.data || []);
  }, [fetchedTours, fetchedUsers]);

  const handleDeleteTour = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this tour?");
    if (!confirmed) return;

    try {
      const res = await fetch(`${BASE_URL}/tours/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setTours(tours.filter((tour) => tour._id !== id));
        alert("Tour deleted successfully!");
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

  const handleAddOrUpdateTour = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const tourData = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${BASE_URL}/tours/${currentTour ? currentTour._id : ""}`, {
        method: currentTour ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tourData),
        credentials: "include",
      });
      const result = await res.json();
      if (res.ok) {
        setTours(currentTour ? tours.map((t) => (t._id === result.data._id ? result.data : t)) : [...tours, result.data]);
        setShowTourModal(false);
        alert(`Tour ${currentTour ? "updated" : "added"} successfully!`);
      }
    } catch (err) {
      alert("Failed to save tour.");
    }
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      {/* Tours Section */}
      <section>
        <h2>Manage Tours</h2>
        <Button color="primary" onClick={() => { setCurrentTour(null); setShowTourModal(true); }}>Add Tour</Button>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>City</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour._id}>
                <td>{tour.title}</td>
                <td>{tour.city}</td>
                <td>₹{tour.price}</td>
                <td>
                  <Button color="warning" onClick={() => { setCurrentTour(tour); setShowTourModal(true); }}>Edit</Button>
                  <Button color="danger" onClick={() => handleDeleteTour(tour._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      {/* Users Section */}
      <section>
        <h2>Manage Users</h2>
        <Table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Button color="danger" onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>

      {/* Add/Edit Tour Modal */}
      <Modal isOpen={showTourModal} toggle={() => setShowTourModal(false)}>
        <Form onSubmit={handleAddOrUpdateTour}>
          <div className="modal-header">
            <h5>{currentTour ? "Edit Tour" : "Add Tour"}</h5>
            <Button close onClick={() => setShowTourModal(false)} />
          </div>
          <div className="modal-body">
            <FormGroup>
              <label>Title</label>
              <input type="text" name="title" defaultValue={currentTour?.title || ""} required />
            </FormGroup>
            <FormGroup>
              <label>City</label>
              <input type="text" name="city" defaultValue={currentTour?.city || ""} required />
            </FormGroup>
            <FormGroup>
              <label>Price</label>
              <input type="number" name="price" defaultValue={currentTour?.price || ""} required />
            </FormGroup>
          </div>
          <div className="modal-footer">
            <Button type="submit" color="primary">{currentTour ? "Update" : "Add"}</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminPanel;