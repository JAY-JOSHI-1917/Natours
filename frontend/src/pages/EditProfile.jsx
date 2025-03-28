import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';
import './../styles/profile.css';
import userIcon from '../assets/images/user.png';
// import profileback from '../assets/images/Profile-back.jpg';
import { BASE_URL } from '../utils/config';


const EditProfile = () => {
    const { user, dispatch } = useContext(AuthContext);
    const [username, setUsername] = useState(user.username || '');
    const [email, setEmail] = useState(user.email || '');
    const [contact, setContact] = useState(user.contact || '');
    const [password, setPassword] = useState(user.password || '');
    const [address, setAddress] = useState(user.address || '');
    const [photo, setPhoto] = useState(user.photo || '');

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleUpdate = async (field, value) => {
        try {
            // if (!user || user === undefined || user === null) {
            //     alert("Please Login");
            //     return;
            // }

            const updateObj = { [field]: value };
            // console.log(updateObj);
            const user_id = user.data._id;
            const res = await fetch(`${BASE_URL}/users/${user_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(updateObj),
            });

            const result = await res.json();
            if (!res.ok) alert(result.message);

            alert(`${field} updated successfully!`);

            dispatch({
                type: "UPDATE_USER",
                payload: { ...user, [field]: value }, // Merge old user data with new field
            });
        } catch (err) {
            alert(`Failed to update ${field}: ${err.message}`);
        }
    };
    const handlePasswordUpdate = async (field, value) => {
        try {
            // if (!user || user === undefined || user === null) {
            //     alert("Please Login");
            //     return;
            // }

            const updateObj = { [field]: value };
            // console.log(updateObj);
            const user_id = user.data._id;
            const res = await fetch(`${BASE_URL}/users/${user_id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(updateObj),
            });

            const result = await res.json();
            if (!res.ok) alert(result.message);
            alert(result.message)

            alert(`${field} updated successfully!`);

            dispatch({
                type: "UPDATE_USER",
                payload: { ...user, [field]: value }, // Merge old user data with new field
            });
        } catch (err) {
            alert(`Failed to update ${field}: ${err.message}`);
        }
    };

    //main logic beheind the uploading of User profile
    const handlePhotoChange = async (event) => {
        const uploadedPhoto = event.target.files[0];
        if (!uploadedPhoto) return;
        console.log(uploadedPhoto)

        try {
            const user_id = user.data._id;
            const formData = new FormData();
            formData.append("image", uploadedPhoto);
            const res = await fetch(`${BASE_URL}/users/upload-photo/${user_id}`, {
                method: "PUT",
                credentials: "include",
                body: formData,
            });

            const result = await res.json();
            if (!res.ok) {
                alert(result.message);
                return;
            }
            alert("please wait for some times as the Your Profile Photo is uploaded to Cloud.....")
            alert('Photo uploaded successfully!');
            setPhoto(result.url); // Update the state with the URL received from Cloudinary

            dispatch({
                type: "UPDATE_USER",
                payload: { ...user, photo: result.url }, // Update user state with the new photo URL
            });

        } catch (error) {
            console.error("Error uploading photo:", error);
            alert('Failed to upload photo.');
        }
    };






    // const handlePhotoChange = async (uploadedPhoto, event) => {
    //     // const file = event.target.files[0];
    //     const uploadPhoto = uploadedPhoto;

    //     try {
    //         const user_id = user._id;
    //         // console.log(user_id);
    //         const response = await fetch(`${BASE_URL}/users/upload-photo/${user_id}`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: { image: uploadPhoto, },
    //         });
    //         console.log(response);
    //         setPhoto(response.data.photo);
    //         alert('Photo uploaded successfully!');
    //     } catch (error) {
    //         console.error(error);
    //         alert('Failed to upload photo.');
    //     }
    // };



    const handlePhotoDelete = async () => {
        try {
            const user_id = user.data._id;
            const res = await fetch(`${BASE_URL}/users/delete-photo/${user_id}`, {
                method: "DELETE",
                credentials: "include"
            });

            const result = await res.json();
            if (!res.ok) {
                alert(result.message);
                return;
            }

            alert("please wait for some times as the Your Profile Photo is removing  to Cloud.....")
            setPhoto('');
            alert('Photo deleted successfully!');

            dispatch({
                type: "UPDATE_USER",
                payload: { ...user, photo: '' },
            });
        } catch (error) {
            console.error("Error deleting photo:", error);
            alert('Failed to delete photo.');
        }
    };

    ////handle  delete Profile
    const handleDeleteProfile = async () => {
        const confirmed = window.confirm("Are you sure you want to delete your profile?");
        if (!confirmed) return;

        try {
            const user_id = user.data._id;
            const res = await fetch(`${BASE_URL}/users/${user_id}`, {
                method: "DELETE",
                credentials: "include"
            });

            const result = await res.json();
            if (!res.ok) {
                alert(result.message);
                return;
            }

            alert('Profile deleted successfully!');

            // Clear user state from AuthContext and redirect to login page or home
            dispatch({ type: "LOGOUT" });
            console.log("after dispatch")
            window.location.href = "/home";
        } catch (error) {
            console.error("Error deleting profile:", error);
            alert('Failed to delete profile.');
        }
    };



    return (
        <>
            <div><section className='EditProfile'>
                <button className='back-btn' onClick={() => window.history.back()}><i class="ri-arrow-left-s-fill"></i>
                    <b>Go Back To Profile</b>
                </button>
                {/* <div>
                    <h1>Edit User Profile</h1>
                </div> */}
                <div className="Profile-Form">
                    <div className="Photo-box">
                        {photo ? (
                            <img
                                src={user.photo}
                                alt="Profile"
                                className="Photo"
                            />
                        ) : (
                            <div className="Photo">
                                <img
                                    src={userIcon}
                                    alt="Profile"
                                />
                                <button
                                    className='Upload-btn'
                                    onClick={() => document.getElementById('photoUpload').click()}
                                >
                                    Upload Photo
                                </button>
                            </div>
                        )}
                        {photo && (
                            <>
                                <div className='photo-update-btn-box'>
                                    <button
                                        className='update-btn'
                                        onClick={() => document.getElementById('photoUpload').click()}
                                    >
                                        Change Photo
                                    </button>
                                    <button
                                        className='update-btn'
                                        onClick={handlePhotoDelete}
                                    >
                                        Delete Photo
                                    </button>
                                </div>
                            </>
                        )}
                        <input
                            type="file"
                            id="photoUpload"
                            style={{ display: 'none' }}
                            onChange={handlePhotoChange}
                            accept="image/png, image/jpeg, image/jpg, image/jfif"
                        />
                    </div>

                    {/* <div className="Photo-box">

                        {photo ? (
                            <img
                                src={user.photo}
                                alt="Profile"
                                className="Photo"
                            />
                        ) : (
                            <div className="Photo">
                                <img
                                    src={userIcon}
                                    alt="Profile"
                                />
                                <button className='Upload-btn' onClick={() => handlePhotoChange('photoUpload')}>
                                    Upload Photo
                                </button>
                            </div>
                        )}
                        {photo && (
                            <>
                                <button className='update-btn' onClick={() => handlePhotoChange('photoUpload')}>
                                    Change Photo
                                </button>
                                <button>
                                    Delete Photo
                                </button>
                            </>
                        )}
                        <input
                            type="file"
                            id="photoUpload"
                            style={{ display: 'none' }}
                        onChange={handleChange} required accept="image/png,image/jpeg, image/jpg, image/jfif"
                        />
                    </div> */}
                    <div className="Personal-details">

                        <div className="Username title-box">
                            <label>Username:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <button className='update-btn' onClick={() => handleUpdate('username', username)}>
                                Update Username
                            </button>
                        </div>
                        <div className="Email title-box">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button className='update-btn' onClick={() => handleUpdate('email', email)}>
                                Update Email
                            </button>
                        </div>
                        <div className="Password title-box"
                            style={{ position: "relative" }}>
                            <label>Password:</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                style={{
                                    position: "absolute",
                                    top: "25px",
                                    right: "10px",
                                    border: "none",
                                    background: "none",
                                    cursor: "pointer",
                                    fontSize: "1.5rem",

                                }}
                            >
                                <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i></button>
                            <button className='update-btn' onClick={() => handlePasswordUpdate('password', password)}>
                                Update Password
                            </button>
                        </div>
                        <div className="Email title-box">
                            <label>Contact No:</label>
                            <input
                                type="tel"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                            />
                            <button className='update-btn' onClick={() => handleUpdate('contact', contact)}>
                                Update Contact
                            </button>
                        </div>
                        <div className="Address title-box">
                            <label>Address:</label>
                            <textarea
                                className='address'
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <button className='update-btn' onClick={() => handleUpdate('address', address)}>
                                Update Address
                            </button>
                        </div>
                    </div>
                </div>

                <button className='delete-btn' onClick={handleDeleteProfile}>
                    <i class="ri-delete-bin-6-line"></i> Delete Profile
                </button>

            </section></div>
        </>
    );
};

export default EditProfile;
