import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

function Profile() {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          console.log('Fetching data for user:', user); // Log user data
          const response = await fetch(`http://localhost:5000/accounts/${user.id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log('Fetched account data:', data); // Log fetched data
          setName(data.name);
          setBalance(data.balance);
        } catch (error) {
          console.error('Fetch error:', error);
        }
      }
    };
    fetchData();
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>Username: {name}</h2>
      <h2>Balance: {balance}</h2>
    </div>
  );
}

export default Profile;
