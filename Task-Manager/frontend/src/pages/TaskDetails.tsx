import React from 'react'
import { useParams } from 'react-router-dom'

const Card = React.lazy(() => import('../components/Card'))

const TaskDetails = () => {
  const params = useParams();
  return (
    <Card id={params.id}/>
  )
}

export default TaskDetails