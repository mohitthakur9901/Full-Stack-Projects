import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

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

const Issue = () => {
  const {loggedInUser} = useSelector((state: any) => state.user)
  const [issues, setIssues] = useState<IssueProps[]>([]);
  const { token } = useSelector((state: any) => state.user);

  // Improved error handling and loading state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Selected status for filtering (default: all)
  const [selectedStatus, setSelectedStatus] = useState<IssueStatus>();

  const navigate = useNavigate();

  useEffect(() => {
    const getAllIssues = async () => {
      setIsLoading(true);
      setError("");

      try {
        const res = await fetch("/api/issue", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          ...(selectedStatus && {
            query: JSON.stringify({ status: selectedStatus }),
          }),
        });

        if (!res.ok) {
          throw new Error(`Error fetching issues: ${res.statusText}`);
        }
        const data = await res.json();
        console.log(data.data);
        
        setIssues(data.data);
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching issues:', err);
        setError("");
      }
    };
    getAllIssues();
  }, [selectedStatus, token]);
  

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value as IssueStatus);
  };

  const handleUpdate = async (id: string, status: IssueStatus) => {
    try {
      const res = await fetch(`/api/issue/update-issue/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        toast.success('Issue updated successfully', {
          style: {
            background: '#333',
            color: '#fff',
          },
        });
        window.location.reload();
      }
    } catch (error) {
      console.error('Error updating issue:', error);
      toast.error('Error updating issue', {
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    }
  }

  return (
      token  ? (
        <div className="container mx-auto mt-5">
          <div className="flex items-center justify-end mb-4">
            <Button className='bg-red-600 hover:bg-red-400 transition ease-in' onClick={() => navigate('/create-issue')} >
              Create Issue
            </Button>
          </div>
          {isLoading && <p className="text-center">Loading issues...</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>}
          {issues && (
            <>
              {/* Improved dropdown implementation for filtering */}
              <select
                value={selectedStatus}
                onChange={handleStatusChange}
                className="w-full mb-4 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">All</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="in_progress">In Progress</option>
              </select>

              {/* Enhanced table with status displayed */}
              <table className="w-full table-auto border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="px-3 py-2">ID</th>
                    <th className="px-3 py-2">Title</th>
                    <th className="px-3 py-2">Description</th>
                    <th className="px-3 py-2">Status</th>
                   {
                    loggedInUser.Role === 'admin' && (
                      <th className="px-3 py-2">Update Status</th>)
                   }
                  </tr>
                </thead>
                <tbody>
                  {issues.map((issue) => (
                    issue.status === selectedStatus || !selectedStatus ? (
                      <tr key={issue._id} className="border-b border-gray-300">
                        <td className="px-3 py-2">{issue._id}</td>
                        <td className="px-3 py-2">{issue.title}</td>
                        <td className="px-3 py-2">{issue.description}</td>
                        <td
                          className={`px-3 py-2 text-${issue.status === "open"
                              ? " text-green-400 "
                              : issue.status === "closed"
                                ? " text-red-400"
                                : "text-blue-400"
                            }`}
                        >
                          {issue.status}
                        </td>
                       {
                        loggedInUser.Role === 'admin' && (
                          <td className="px-3 py-2">
                          <select className="px-3 py-2 border border-gray-300 rounded" onChange={(e) => handleUpdate(issue._id, e.target.value as IssueStatus)}>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                            <option value="in_progress">In Progress</option>
                          </select>
                    
                          </td>)
                       }
                      </tr>
                    ) : (
                      null
                    )
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      ) : (
        <div className="container mx-auto mt-5">
          <p className="text-center">Please login to view issues.</p>
          <p className="text-center">
            <a href="/signin" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      )
  );
};

export default Issue;
