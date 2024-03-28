import React from 'react';
import Button from './Button';
import axios from 'axios';
import { useSelector } from 'react-redux';

interface User {
  _id: string;
  userName: string;
  email: string;
  avatar: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface ListProps {
  UsersList: User[];
}

const List: React.FC<ListProps> = ({ UsersList}) => {
  const {token} = useSelector((state : any) => state.user)

  const updateToAdmin = async (id: string) => {
    try {
      const res = await axios.put(`/api/user/${id}/admin` , null , {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // reload window
      window.location.reload();
      console.log(res.data);      
    } catch (error) {
      console.error(error);
    }
   
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-auto">
      {UsersList.map((user) => (
        <div key={user._id} className="user-card bg-white rounded-md shadow-md p-4">
          <img
            src={user.avatar}
            alt={user.userName}
            className="w-full h-56 rounded-t-md object-cover"
          />
          <div className="flex justify-between items-center pt-4">
            <h3 className="text-lg font-medium text-gray-800">{user.userName}</h3>
            <p className=" text-sm uppercase bg-gray-200 rounded-md text-black">{user.role}</p>
          </div>
          <div className="text-gray-600 text-sm pt-2">
            <p>Email: {user.email}</p>
            <p>Joined At : {user.createdAt}</p>
          </div>
          <div className="flex items-center justify-end">
            {
              user.role === 'admin' ? (
                "") : (
                <Button className='w-full bg-green-400 h-10 px-8 rounded-md hover:bg-green-300 transition ease-in-out' type='button' onClick={() => updateToAdmin(user._id)} >
                  Make Admin
                </Button>
              )
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
