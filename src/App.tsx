import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

interface UserData {
  name: {
    first: string;
    last: string;
  };
  email: string;
}

const App = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api');
      const user = response.data.results[0];

      setUserData({
        name: {
          first: user.name.first,
          last: user.name.last,
        },
        email: user.email,
      });
      // Save to local storage
      localStorage.setItem('userData', JSON.stringify(user));
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  const refreshUserData = () => {
    setUserData(null); 
    fetchUserData();
  };

  useEffect(() => {
    // Check local storage for existing data
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      fetchUserData();
    }
  }, []);

  return (
    <div className="App">
      <h3>User Info</h3>
      {userData ? (
        <>
          <p>
            <strong>Name:</strong>
             {userData.name.first}  {userData.name.last}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={refreshUserData}>Refresh</button>
    </div>
  );
};

export default App;

