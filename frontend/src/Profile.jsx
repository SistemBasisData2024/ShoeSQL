import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 


function Profile() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [name, setUsername] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Fetch data from API or mock data
    const fetchData = async () => {
      // Replace this with actual API call
      const response = await fetch('http://localhost:5000/accounts'); // Adjust the URL to your API
      const data = await response.json();
      setAccounts(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Update username and balance when selectedAccountId changes
    const selectedAccount = accounts.find(account => account.id === selectedAccountId);
    if (selectedAccount) {
      setUsername(selectedAccount.name);
      setBalance(selectedAccount.balance);
    } else {
      setUsername('');
      setBalance(0);
    }
  }, [selectedAccountId, accounts]); 

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>Username: {name}</h2>
      <h2>Balance: {balance}</h2>
      <h2>Isi Saldo</h2>
      <select onChange={(e) => setSelectedAccountId(Number(e.target.value))}>
        <option value="">Select Account</option>
        {accounts.map(account => (
          <option key={account.id} value={account.id}>
            {account.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Profile; 


