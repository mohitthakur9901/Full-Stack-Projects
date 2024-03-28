import React, { useEffect, useState } from 'react';
import InputWithLabel from '../components/Input';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Button from '../components/Button';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  userName: string;
}

interface Task {
  title: string;
  description: string;
  assignedTo: string;
}

const CreateTask = () => {
  const { token } = useSelector((state: any) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Task>({
    title: '',
    description: '',
    assignedTo: '',
  });
  const [users, setUsers] = useState<User[]>([]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/task/create-task', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      
      if (response.status === 200) {
        toast.success('Task created successfully');
        setFormData({ title: '', description: '', assignedTo: '' });
      }
    } catch (error) {
      toast.error('Task creation failed');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchData();
  }, [token]);

  return (
    <div className="max-w-md sm:max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Create Task</h1>
      <div className="space-y-4">
        <InputWithLabel label="Title" type="text" name="title" placeholder="Enter title" onChange={handleChange} />
        <textarea
          name="description"
          className="w-full border rounded-md p-2"
          placeholder="Enter description"
          rows={4}
          onChange={handleChange}
        ></textarea>
        <label className="block text-sm font-semibold">Assign To:</label>
        <select
          className="w-full border rounded-md p-2"
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
        >
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.userName}
            </option>
          ))}
        </select>
        <Button type='button' className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleSubmit}>
          {isLoading ? 'Creating Task...' : 'Create Task'}
        </Button>
      </div>
    </div>
  );
};

export default CreateTask;
