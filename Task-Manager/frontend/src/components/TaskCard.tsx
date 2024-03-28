import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

type Status =  "open"| "closed" | "in_progress" ;

interface TaskProps {
  _id:string;
  title:string;
  assignedTo:string;
  status: Status;
}
interface TaskCardProps {
  TaskList : TaskProps[];
}

const TaskCard : React.FC<TaskCardProps> = ({TaskList}) => {
  const { token } = useSelector((state:any) => state.user);
  const [assignedUsers, setAssignedUsers] = useState<{[key: string]: string}>({});

  const getStatusColor = (status: Status) => {
    switch (status) {
      case "open":
        return "text-green-500";
      case "closed":
        return "text-red-500";
      case "in_progress":
        return "text-yellow-500";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userIds = TaskList.map(task => task.assignedTo);
      const promises = userIds.map(userId => axios.get(`/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }));

      try {
        const responses = await Promise.all(promises);
        const usersData = responses.reduce((acc, response, index) => {
          if (response.status === 200) {
            acc[userIds[index]] = response.data.data.userName;
          }
          return acc;
        }, {} as {[key: string]: string});
        setAssignedUsers(usersData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [TaskList, token]);

  return (
    <div className="task-list">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TaskList.map((task) => (
          <Link to={`/task/${task._id}`} key={task._id}>
            <div className="task-item bg-white rounded-md shadow-md p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-800">{task.title}</h3>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm font-bold text-gray-600">Assigned To: {assignedUsers[task.assignedTo]}</span>
                <span className={`text-sm font-bold ${getStatusColor(task.status)}`}>{task.status}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TaskCard;
