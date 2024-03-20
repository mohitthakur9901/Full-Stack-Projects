import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Table } from 'flowbite-react';

interface User {
  _id: string;
  name: string;
  email: string;
  Role: string;
  createdAt: string;
  updatedAt: string;
}
const Users = () => {
  const { token } = useSelector((state: any) => state.user);
  const [users, setUsers] = useState<User[]>(
    []
  )

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

  return (
    <div className="overflow-x-auto rounded-lg shadow px-4 py-2">
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
          
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users.map((user) => (
            <Table.Row key={user._id} className="hover:bg-gray-100">
              <Table.Cell className="text-left px-4 py-2 whitespace-nowrap">
                {user.name}
              </Table.Cell>
              <Table.Cell className="px-4 py-2">{user.email}</Table.Cell>
              <Table.Cell className="px-4 py-2 flex"> {(
                    <p className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-lg dark:bg-gray-700 dark:text-green-400 border border-green-400">
                      {user.Role}
                    </p>
                  
                  
                  )}</Table.Cell>
              <Table.Cell className="px-4 py-2">{user.createdAt}</Table.Cell>
              <Table.Cell className="px-4 py-2">{user.updatedAt}</Table.Cell>
              <Table.Cell className="px-4 py-2">
                <Button className='bg-red-600 hover:bg-red-400'>
                  Delete
                </Button>
              </Table.Cell>

            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Users;
