import { useSelector } from "react-redux"

const Home = () => {

  const user = useSelector((state: any) => state.user)
  console.log(user);
  
  
   
  
  return (
    <div className="">Home</div>
  )
}

export default Home