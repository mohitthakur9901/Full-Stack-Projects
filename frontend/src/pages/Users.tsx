import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Table } from 'flowbite-react';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  name: string;
  email: string;
  Role: string;
  createdAt: string;
  updatedAt: string;
}

const Users = () => {
  const { token, loggedInUser } = useSelector((state: any) => state.user);
  const [users, setUsers] = useState<User[]>([]);
  const [filterRole, setFilterRole] = useState<string>('all');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch('/api/auth/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getUsers();
  }, [token, setUsers]);

  const deleteUser = async (id: string) => {
    try {
      const response = await fetch(`/api/auth/user/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        toast.error('Failed to delete user');
        throw new Error('Failed to delete user');
      } else {
        toast.success('User deleted successfully');
        setUsers(users.filter((user) => user._id !== id));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  const updateToAdmin = async (id: string) => {
    try {
      const response = await fetch(`/api/auth/user/${id}/admin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        toast.error('Failed to make user admin');
        throw new Error('Failed to make user admin');
      } else {
        toast.success('User made admin successfully');
        setUsers(users.map((user) => user._id === id ? { ...user, Role: 'admin' } : user));
      }
    } catch (error) {
      console.error('Error making user admin:', error);
    }
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterRole(event.target.value);
  };



  return (
    <div className="overflow-x-auto rounded-lg shadow px-4 py-2">
        <div className=" flex flex-col items-center justify-center ">
        <h1 className="text-3xl font-bold mb-2 uppercase bg-blue-400 rounded-lg text-white px-10 py-5">All Users and Admins</h1>
        <p className="mb-4 uppercase">List of all users and Admins in the system.</p>
        {/* Filter dropdown */}
        <div className="mb-4 ">
          <label htmlFor="filterRole" className="mr-2 font-medium">Filter by Role:</label>
          <select
            id="filterRole"
            className="px-2 py-1 border border-gray-300 rounded"
            value={filterRole}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <Table className="w-full">
        <Table.Head>
          <Table.HeadCell className="text-left px-4 py-2 font-medium text-sm text-white">
            Name
          </Table.HeadCell>
          <Table.HeadCell className="px-4 py-2 font-medium text-sm  text-white">
            Email
          </Table.HeadCell>
          <Table.HeadCell className="px-4 py-2 font-medium text-sm  text-white">
            Role
          </Table.HeadCell>
          <Table.HeadCell className="px-4 py-2 font-medium text-sm text-white">
            Created At
          </Table.HeadCell>
          <Table.HeadCell className="px-4 py-2 font-medium text-sm  text-white">
            Updated At
          </Table.HeadCell>
          <Table.HeadCell className="px-4 py-2 font-medium text-sm  text-white">
            Remove
          </Table.HeadCell>
          <Table.HeadCell className="px-4 py-2 font-medium text-sm  text-white">
            Make Admin
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users.map((user) => (
            user.Role === filterRole || filterRole === 'all' ? (
              <Table.Row key={user._id} className="hover:bg-gray-100">
              <Table.Cell className="text-left px-4 py-2 whitespace-nowrap">
                {user.name}
              </Table.Cell>
              <Table.Cell className="px-4 py-2">{user.email}</Table.Cell>
              <Table.Cell className="px-4 py-2 flex"> {(
                <p className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-lg dark:bg-gray-700 dark:text-green-400 border border-green-400">
                  {user.Role}
                </p>
              )}
              </Table.Cell>
              <Table.Cell className="px-4 py-2">{user.createdAt}</Table.Cell>
              <Table.Cell className="px-4 py-2">{user.updatedAt}</Table.Cell>
              <Table.Cell className="px-4 py-2">
                {
                  loggedInUser._id === user._id ||  user.Role === 'admin' ? (
                    <p className='bg-green-100 text-green-800 text-sm  font-medium rounded-lg  dark:text-green-400 border border-green-400 w-10 flex items-center justify-center'>You</p>
                  ) : (
                    <Button className='bg-red-600 hover:bg-red-400' onClick={() => deleteUser(user._id)}>
                      Remove
                    </Button>
                  )
                }
              </Table.Cell>
              <Table.Cell className="px-4 py-2">
                {
                  user.Role == 'user' && (
                    <Button className='bg-green-600 hover:bg-green-400' onClick={() => updateToAdmin(user._id)}>
                      Make Admin
                    </Button>
                  )
                }
              </Table.Cell>
            </Table.Row>
            ): (
              null
            )
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Users;
