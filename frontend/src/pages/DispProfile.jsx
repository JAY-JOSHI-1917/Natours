import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

import './../styles/profile.css';

import userIcon from '../assets/images/user.png';
import { BASE_URL } from '../utils/config';
import { Link } from 'react-router-dom';

const DisplayProfile = () => {
  const { user,dispatch } = useContext(AuthContext);
      const [username, setUsername] = useState(user.username || '');
      const [email, setEmail] = useState(user.email || '');
      const [password, setPassword] = useState('');
      const [address, setAddress] = useState(user.address || '');
      const [photo, setPhoto] = useState(user.photo || '');

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch('/api/user/profile'); // Adjust the endpoint as needed
  //       console.log('Response:', response); // Log the response for debugging
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setUserData(data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div><section className='Profile'>
                    <div>
                        <h1>Your Profile</h1>
                    </div>
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
                                </div>
                            )}
                      
                            <input
                                type="file"
                                id="photoUpload"
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div className="Personal-details">
    
                            <div className="Username title-box">
                        
                                <span className='username'>{username}</span>
                            </div>
                            <div className="Email title-box">
                              
                                <span className='email'>{email}</span>
                            </div>
                            <div className="Password title-box">
                                
                                <span className='password'>{password}</span>
                            </div>
                            <div className="Address title-box">
                               
                                <span className='address'>{address?!address:"Not Provided"}</span>
                            </div>
                        </div>
                    </div>
                    <Link to={"/edit-profile"} className='edit-profile btn primary__btn' >Edit Profile</Link>
                </section></div>

  );
};

export default DisplayProfile;