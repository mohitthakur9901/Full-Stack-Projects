
import Button from '../components/Button';
import { SiTask } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  return (
    <div className='bg-gradient-to-b from-gray-400 to-gray-800 flex items-center justify-center min-h-screen'>
      <div className="text-center">
        <h1 className='text-4xl md:text-6xl font-bold text-white mb-4 flex gap-5'><SiTask /> Task Manager</h1>
        <p className='text-lg md:text-xl text-white mb-6'>Assign Tasks To Your Team Members</p>
        <Button onClick={() => navigate('/signup')} className='bg-blue-700 hover:bg-blue-500 py-3 px-6 rounded-lg text-white uppercase shadow-lg transition duration-300 ease-in-out'>
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default Home;
