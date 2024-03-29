import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

type TaskStatus = 'open' | 'closed' | 'in-progress';

interface User {
  _id: string;
  userName: string;
  email: string;
  avatar: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface Task {
  _id: string;
  title: string;
  assignedTo: string;
  status: TaskStatus;
}

const Dashboard = () => {
  const { token } = useSelector((state: any) => state.user);
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskStatus, setTaskStatus] = useState<TaskStatus>('open');


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all users
        const userResponse = await axios.get(`/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(userResponse.data.data);

        // Fetch all tasks
        const taskResponse = await axios.get(`/api/task`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(taskResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors appropriately (e.g., display error message)
      }
    };

    fetchData();
  }, [token]);


  const findUserById = (userId: string) => {
    return users.find((user) => user._id === userId);
  };

  const filterTasks = (status: any) => {
    if (status === 'all') {
      return tasks;
    }
    return tasks.filter((task) => task.status === status);
  };


  return (
    <div className="dashboard grid grid-cols-1 md:grid-cols-2 gap-4 p-10 bg-red-500">
      {/* Total number of tasks */}
      <div className="flex items-center justify-between bg-gray-100 p-4 rounded shadow-md">
        <h3 className="text-xl font-semibold mb-2">Total Tasks:</h3>
        <span className="text-3xl font-bold">{tasks.length}</span>
      </div>

      {/* Task filtering */}
      <div className="task-status-filters bg-gray-100 p-4 rounded shadow-md flex items-center justify-between md:justify-start mb-5 gap-4">
        <h3>Filter by Status:</h3>
        <select
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value as TaskStatus)}
          className=" text-gray-700 border outline-none focus:ring-2 focus:ring-blue-500 py-2 px-3 rounded-md"
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
          <option value="in_progress">In Progress</option>
        </select>
      </div>

      {/* Task list */}
      <div className="task-list bg-gray-100 p-4 rounded shadow-md">
        <h3>Assigned Tasks:</h3>
        <ul className="list-none">
          {filterTasks(taskStatus).map((task) => (
            <li key={task._id} className="flex items-center justify-between py-2 border-b border-gray-200">
              <span className="text-gray-700">{task.title}</span>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">{findUserById(task.assignedTo)?.userName}</span>
                <span className="px-2 py-1 rounded-full bg-blue-500 text-white text-xs">
                  {task.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Employee list */}
      {users.length > 0 && (
        <div className="employee-list bg-gray-100 p-4 rounded shadow-md">
          <h3>Employees ({users.length}):</h3>
          <ul className="list-none">
            {users.map((user) => (
              <li key={user._id} className="py-2 border-b border-gray-200">
                {user.userName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
