import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';
import './../styles/profile.css';
import userIcon from '../assets/images/user.png';
// import profileback from '../assets/images/Profile-back.jpg';
import { BASE_URL } from '../utils/config';
import { use } from 'react';


const EditProfile = () => {
    const { user,dispatch } = useContext(AuthContext);
    const [username, setUsername] = useState(user.username || '');
    const [email, setEmail] = useState(user.email || '');
    const [contact,setContact ] = useState(user.contact || '');
    const [password, setPassword] = useState(user.password || '');
    const [address, setAddress] = useState(user.address || '');
    const [photo, setPhoto] = useState(user.photo || '');

    const [showPassword, setShowPassword] = useState(false);

    console.log(user);

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
            console.log(updateObj);
            const user_id = user._id;
            const res = await fetch(`${BASE_URL}/users/${user_id}`, {
                method: "put",
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


    // const handlePhotoChange = async (event) => {
    //     const file = event.target.files[0];
    //     const formData = new FormData();
    //     formData.append('photo', file);

    //     try {
    //         const response = await axios.post('/api/user/upload-photo', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
    //         setPhoto(response.data.photo);
    //         alert('Photo uploaded successfully!');
    //     } catch (error) {
    //         console.error(error);
    //         alert('Failed to upload photo.');
    //     }
    // };

    // const handlePhotoDelete = async () => {
    //     try {
    //         await axios.delete('/api/user/delete-photo');
    //         setPhoto('');
    //         alert('Photo deleted successfully!');
    //     } catch (error) {
    //         console.error(error);
    //         alert('Failed to delete photo.');
    //     }
    // };

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
                                <button className='Upload-btn' onClick={() => document.getElementById('photoUpload').click()}>
                                    Upload Photo
                                </button>
                            </div>
                        )}
                        {photo && (
                            <>
                                <button className='update-btn' onClick={() => document.getElementById('photoUpload').click()}>
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
                        />
                    </div>
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
                        style={{position: "relative"}}>
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
                            <button className='update-btn' onClick={() => handleUpdate('password', password)}>
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
            </section></div>
        </>
    );
};

export default EditProfile;
