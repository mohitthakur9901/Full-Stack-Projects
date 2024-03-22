import  { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // Assuming Redux is used for state management

type IssueStatus = "open" | "closed" | "in_progress";

interface IssueProps {
  _id: string;
  title: string;
  description: string;
  status: IssueStatus;
  reporter: string;
  createdAt: Date;
  updatedAt: Date;
}

const DashBoard = () => {
  const { token } = useSelector((state: any) => state.user); // Access user token for API calls
  const [issues, setIssues] = useState<IssueProps[]>([]); // Array of issue objects
  const [user , setUsers] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Define background colors for each status
  const statusColors: any = {
    open: 'blue-300',
    closed: 'red-300',
    in_progress: 'green-300'
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch('/api/issue', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching issues: ${response.statusText}`);
        }

        const data = await response.json();
        setIssues(data.data); // Set the fetched issues
      } catch (err) {
        console.error('Error fetching issues:', err);
        setError("Error");
      } finally {
        setIsLoading(false);
      }
    };
    const getTotalUsers = async () => {
      try {
        const res = await fetch('/api/auth/totalusers', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        const data = await res.json()
        console.log(data.data);
        setUsers(data.data)
       } catch (error) {
        console.log(error)
        setError("Error")
  
      }
    };

    getTotalUsers();
    fetchData();
  }, [token , setIssues, setUsers]); // Refetch data if the token changes

  if (isLoading) {
    return <p className="text-center">Loading data...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  const issueCounts = {
    open: issues.filter((issue) => issue.status === 'open').length,
    closed: issues.filter((issue) => issue.status === 'closed').length,
    in_progress: issues.filter((issue) => issue.status === 'in_progress').length,
    total: issues.length,
  };

 



  return (
    <div className="dashboard container mx-auto mt-5">
      <h2 className=' text-3xl uppercase bg bg-blue-400 text-white rounded-lg py-5 flex justify-center items-center mb-5'>All Issues</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(issueCounts).map(([status, count]) => (
          <div key={status} className={`card bg-${statusColors[status]} shadow-md rounded-lg p-4`}>
            <h3 className="text-lg font-bold mb-2 uppercase ">{status} Issues</h3>
            <p className="text-xl text-center">{count}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 ">
        <h2 className=' text-3xl uppercase bg bg-blue-400 text-white rounded-lg py-5 flex justify-center items-center mb-5'>Total Users</h2>
        <div className="flex items-center justify-center mt-5 bg-green-300 py-10 rounded-lg">
          <h1 className='text-lg font-bold mb-2 uppercase text-black mr-5'>Total Users </h1>
        <h1 className='text-lg font-bold mb-2 uppercase text-black'> {user}</h1>
        </div>
      
      </div>
    </div>
  );
};

export default DashBoard;



// text-3xl uppercase bg bg-blue-400 text-white rounded-lg py-5 flex justify-center items-center mb-5