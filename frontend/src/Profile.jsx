import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

function Profile() {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);
  const [topUpAmount, setTopUpAmount] = useState('');
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

  const handleTopUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/topup/${user.id}`, { amount: topUpAmount });
      console.log('Top-up response:', response.data);
      setBalance(response.data.newBalance);
      setTopUpAmount('');
    } catch (error) {
      console.error('Top-up error:', error);
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

  return (
    
    
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ShoeSQL</span>
          </a>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
                <Link to="/landing" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Main Menu</Link>
              </li>
              <li>
                <Link to="/profile" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Profile</Link>
              </li>
              <li>
                <Link to="/landing" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Inventory</Link>
              </li>
              <li>
                <Link to="/sell" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Sell</Link>
              </li>
              <li>
                <Link to="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Log Out</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <h1>Profile Page</h1>
      <h2>Username: {name}</h2>
      <h2>Balance: {balance}</h2>
      
      <form onSubmit={handleTopUp}>
        <label>
          Top Up Amount:
          <input
            type="number"
            value={topUpAmount}
            onChange={(e) => setTopUpAmount(e.target.value)}
            required
          />
        </label>
        <button type="submit">Top Up</button>
      </form>
    </div>
  );
}

export default Profile;
