import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Status = "open" | "closed" | "in_progress";

interface TaskProps {
  _id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

const Card = ({ id }: { id: string | undefined }) => {
  const { token } = useSelector((state: any) => state.user);
  const [taskData, setTaskData] = useState<TaskProps>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [assignedUser, setAssignedUser] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/task/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setTaskData(response.data.data);
        }
      } catch (error) {
        setError("Error fetching task data");
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      if (taskData) {
        try {
          const response = await axios.get(`/api/user/${taskData.assignedTo}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            setAssignedUser(response.data.data.userName);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    if (id) {
      fetchData();
      setLoading(true)
    }
    if (taskData) {
      fetchUser();
      setLoading(false)
    }
  }, [id, token , taskData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600 text-lg">Error: {error}</div>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl max-h-screen mx-auto items-center mt-10">
      
      <div>
        <div
          key={taskData?._id}
          className="bg-white shadow-md rounded-md p-6 mb-6 w-full"
        >
          <h1 className="text-4xl mb-4 uppercase font-semibold">
            {taskData?.title}
          </h1>
          <p className="text-gray-600 mb-6 w-1/2 text-xl ">
            {taskData?.description}
          </p>
          <div className="flex items-center justify-between text-gray-500 text-xl">
            <p className="flex items-center gap-2">
              Status:{" "}
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                {taskData?.status}
              </span>
            </p>
            <span className="font-bold">Assigned To: {assignedUser}</span>
            <span className="font-bold">Assigned Date: {taskData?.createdAt}</span>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
