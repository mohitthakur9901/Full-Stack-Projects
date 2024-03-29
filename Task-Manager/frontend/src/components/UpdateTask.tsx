import React, { useEffect, useState } from 'react';
import InputWithLabel from './Input';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Button from './Button';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


interface User {
  _id: string;
  userName: string;
}

interface Task {
  title: string;
  description: string;
  assignedTo: string;
  status: string;
}

const UpdateTask = ({ taskId }: { taskId: string | undefined }) => {
  const { token } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Task>({
    title: '',
    description: '',
    assignedTo: '',
    status: ''
  });
  console.log(formData);

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(`/api/task/${taskId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success('Task updated successfully');
        setFormData({ title: '', description: '', assignedTo: '', status: ' ' });
      }
      navigate(`/tasks`);

    } catch (error) {
      console.error('Error updating task:', error);
      setError('Error updating task');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data.data);


        const taskResponse = await axios.get(`/api/task/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(taskResponse.data.data);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, [token, taskId]);

  return (
    <div className="max-w-md sm:max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Update Task</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="space-y-4">
        <InputWithLabel label="Title" type="text" name="title" placeholder="Enter title" value={formData.title} onChange={handleChange} />
        <textarea
          name="description"
          className="w-full border rounded-md p-2"
          placeholder="Enter description"
          rows={4}
          onChange={handleChange}
          value={formData.description}
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
        <select
          className="w-full border rounded-md p-2"
          name="status"
          onChange={handleChange}
        >
          <option value="">Select Status</option>
          <option value="open">Open</option> 
          <option value="closed">Closed</option>
          <option value="in_progress">In Progress</option>
        </select>
        <Button
          type="button"
          className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleSubmit}
        >
          {isLoading ? 'Updating Task...' : 'Update Task'}
        </Button>
      </div>
    </div>
  );
};

export default UpdateTask;
