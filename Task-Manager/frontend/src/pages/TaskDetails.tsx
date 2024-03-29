import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../components/Button';
import UpdateTask from '../components/UpdateTask';
import { useSelector } from 'react-redux';

const Card = React.lazy(() => import('../components/Card'))

const TaskDetails = () => {
  const params = useParams();
  const {user} = useSelector((state: any) => state.user)
  console.log(user.user.role);
  
  const [updateFormVisible, setUpdateFormVisible] = useState(false);

  const handleUpdateClick = () => {
    setUpdateFormVisible(!updateFormVisible);
  };


  return (
 <div className="">
  <div className="flex justify-end mr-10 gap-5">
 {
  user.user.role === 'admin' ? (
    <Button className=' bg-blue-400 h-10 px-8 rounded-md hover:bg-blue-300 transition ease-in-out'type='button' onClick={handleUpdateClick}>
    {
      updateFormVisible ? "go back" :  "update task" 
    }
  </Button>
  ) : (
    ""
  )
 }
  </div>
  {updateFormVisible ? (
        <UpdateTask taskId={params.id} /> 
      ) : (
        <Card id={params.id}/>  
      )}
 </div>
  )
}

export default TaskDetails