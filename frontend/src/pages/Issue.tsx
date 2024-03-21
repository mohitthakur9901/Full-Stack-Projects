import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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
  const [issues, setIssues] = useState<IssueProps[]>([]);
  const { token } = useSelector((state: any) => state.user);

  // Improved error handling and loading state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Selected status for filtering (default: all)
  const [selectedStatus, setSelectedStatus] = useState<IssueStatus>();


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
        setIssues(data.data);
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching issues:', err);
        setError("");
      }
    };
    getAllIssues();
  }, [selectedStatus]);
  console.log(issues);


  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value as IssueStatus);
  };

  return (
      token  ? (
        <div className="container mx-auto mt-5">
          {isLoading && <p className="text-center">Loading issues...</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>}
          {issues && (
            <>
              {/* Improved dropdown implementation for filtering */}
              <select
                value={selectedStatus}
                onChange={handleStatusChange}
                className="w-full mb-4 mt-5 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
