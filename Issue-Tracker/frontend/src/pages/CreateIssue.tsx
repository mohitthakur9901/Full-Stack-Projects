import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface IssueProps {
    title: string;
    description: string;
    reporter: string;
}

const CreateIssue = () => {
    const { loggedInUser, token } = useSelector((state: any) => state.user);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<IssueProps>({
        title: '',
        description: '',
        reporter: loggedInUser._id,
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };
    console.log(formData);
    

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            const res = await fetch('/api/issue/new-issue', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            console.log(res);
            

            if (res.ok) {
                setFormData({
                    title: '',
                    description: '',
                    reporter: '',
                });
                toast.success('Issue created successfully', {
                    style: {
                        backgroundColor: 'green',
                        color: 'white',
                    },
                });
                navigate('/issues');
            } else {
                toast.error('Error creating issue', {
                    style: {
                        backgroundColor: 'red',
                        color: 'white',
                    },
                });
            }
        } catch (error) {
            console.error('Error creating issue:', error);
            toast.error('Error creating issue', {
                style: {
                    backgroundColor: 'red',
                    color: 'white',
                },
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="create-issue flex flex-col justify-center items-center">
            <h1 className="title text-4xl font-bold mb-2 bg-blue-400 rounded-lg px-10 py-4 mt-5 text-white">Create Issue</h1>
            <p className="welcome-message text-lg">Welcome {loggedInUser.name}</p>
            <p className="description text-lg">You can create a new issue here</p>
            <form className="issue-form flex flex-col gap-4 w-1/2">
                <label htmlFor="title" className="label">Title</label>
                <input
                    type="text"
                    id="title"
                    className="title-input border border-gray-300 p-2 rounded-md"
                    onChange={handleChange}
                    required
                />
                <label htmlFor="description" className="label">Description</label>
                <input
                    id="description"
                    className="description-input border border-gray-300 p-2 rounded-md"
                    onChange={handleChange}
                    required
                />
                <button
                    className="create-button bg-blue-500 hover:bg-blue-300 transition ease-in text-white px-4 py-2 rounded-md"
                    disabled={isLoading}
                    onClick={handleSubmit} 
                >
                    {isLoading ? 'Creating...' : 'Create Issue'}
                </button>
            </form>
            <button className="back-button bg-blue-500 hover:bg-blue-300 transition ease-in text-white px-4 py-2 rounded-md mt-5" onClick={() => navigate('/issues')}>Go back</button>
        </div>
    );
};

export default CreateIssue;
