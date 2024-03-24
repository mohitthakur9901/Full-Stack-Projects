import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Home = () => {

  const navigate = useNavigate()
  const { token } = useSelector((state: any) => state.user)

  return (
    token ? (
      <div>

      </div>
    ) : (
      <div className="container mx-auto h-screen flex flex-col items-center font-mono justify-center bg-blue-200 mt-4 mb-4 rounded-lg cursor-pointer ">  {/* Blue background */}
        <h1 className="text-6xl font-bold text-white mb-4 uppercase">Issue-Tracker</h1>  {/* Styled heading */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-md" onClick={() => navigate('/signin')}>Sign In</button>
        {/* description  */}
        <p className="text-gray-700 text-center mt-8 w-96">
          This is a simple issue tracker application built with React and TypeScript. It allows users to create issues, view them, and update their status. The application is hosted on GitHub Pages.
        </p>

      </div>
    )
  )
}

export default Home