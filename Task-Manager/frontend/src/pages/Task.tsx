import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const TaskCard = React.lazy(() => import('../components/TaskCard'))


type Status =  "open"| "closed" | "in_progress" ;

interface TaskProps {
  _id:string;
  title:string;
  description:string;
  assignedTo:string;
  status: Status;
  createdAt:string;
  updatedAt:string;
}

const Task = () => {
  const {token} = useSelector((state:any) => state.user)
  const [taskData , setTaskData] = useState<TaskProps[]>([])

  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/task', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setTaskData(response.data.data);
      }
    }
    fetchData()
  }, [token])
  
  return (
    <div>
      <div className="flex justify-end mr-5 h-10 sm:mr-10">
      <Link to='/create-task' className=" flex items-center bg-blue-400 rounded-md hover:bg-blue-300 transition ease-in-out px-12" >
        Create Task
      </Link>
      </div>
        <TaskCard TaskList={taskData}/>
    </div>
  )
}

export default Task