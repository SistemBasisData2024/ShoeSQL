import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

function Profile() {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  console.log('User from AuthContext:', user); // Log user data

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          console.log('Fetching data for user:', user); // Log user data
          const response = await axios.get(`http://localhost:5000/user/${user.id}`);
          console.log('Fetched account data:', response.data); // Log fetched data
          setName(response.data.user.name);
          setBalance(response.data.user.balance);
        } catch (error) {
          console.error('Fetch error:', error);
          setError(error.message);
        } finally {
          setLoading(false); // Set loading to false regardless of success or failure
        }
      } else {
        console.log('User not authenticated');
        setLoading(false); // If user is not authenticated, set loading to false
      }
    };
    fetchData();
  }, [user]);

  

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>Username: {name}</h2>
      <h2>Balance: {balance}</h2>
      <button>top up</button>
    </div>
  );
}

export default Profile;
