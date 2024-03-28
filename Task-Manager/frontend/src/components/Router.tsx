import React from 'react'
import { Route, Routes } from 'react-router-dom';


const Profile = React.lazy(() => import('../pages/Profile'));
const Employee = React.lazy(() => import('../pages/Employee'));
const Task = React.lazy(() => import('../pages/Task'));
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const TaskDetails = React.lazy(() => import('../pages/TaskDetails'));
const CreateTask = React.lazy(() => import('../pages/CreateTask'));

const Router = () => {
  return (
    <Routes>
      <Route path="/employee" element={<Employee />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/tasks" element={<Task />} />
      <Route path="/task/:id" element={<TaskDetails />} />
      <Route path="/create-task" element={<CreateTask />} />
    </Routes>
  )
}

export default Router