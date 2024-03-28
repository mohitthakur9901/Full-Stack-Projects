import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const List = React.lazy(() => import('../components/List'));

interface User {
  _id: string;
  userName: string;
  email: string;
  avatar: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const Employee = () => {
  const { token } = useSelector((state: any) => state.user);
  const [users, setUsers] = useState<User[]>([]); 
    
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(res.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error (e.g., show toast message)
      }
    }
    fetchData();
  }, [token]); 
 
  return (
    <div>
      {users.length > 0 ? (
        <List UsersList={users} />
      ) : (
        <p className='animate-pulse'>Loading...</p>
      )}
    </div>
  );
};

export default Employee;
