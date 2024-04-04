
import { useSelector } from 'react-redux'
const Profile = () => {
  const user = useSelector((state:any) => state.user)
  console.log(user.email);
  
  return (
    <div>Profile</div>
  )
}

export default Profile