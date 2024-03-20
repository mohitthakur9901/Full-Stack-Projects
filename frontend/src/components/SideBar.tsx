import React, { useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../store/User/UserSlice';
import UpdateAccount from '../pages/UpdateAccount';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SideBar = ({ setIsTrue }: { setIsTrue: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const dispatch = useDispatch();
    const [activeChild, setActiveChild] = useState<string | null>(null);
    const navigate = useNavigate();
    const { token, loggedInUser } = useSelector((state: any) => state.user);

    const DeleteUser = async () => {
        try {
            const response = await fetch(`/api/auth/user/${loggedInUser._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                toast.success('User deleted successfully');
                navigate('/');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete user');
        }
    }

    const SideBarLinks = [
        { name: "Update Account", content: <UpdateAccount /> },
        { name: "Delete Account", action: DeleteUser },
        { name: "LogOut", action: () => {
            dispatch(clearUser());
            navigate('/');
            setIsTrue(prevState => !prevState);
            setActiveChild(null);
            window.location.reload(); // Reload the page to clear the Redux state. 
        } },
        // Add more sidebar links as needed
    ];

    const handleButtonClick = (name: string) => {
        setActiveChild(prevState => (prevState === name ? null : name));
        setIsTrue(prevState => !prevState);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar aria-label="Settings sidebar"
        className="hidden lg:block lg:w-64 min-h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out"
>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        {/* Render buttons as a list */}
                        <ul className="list-none p-0">
                            {SideBarLinks.map((link, index) => (
                                <li key={index}>
                                    <button
                                        className={`w-full py-4 px-6 mb-2 rounded-lg hover:bg-gray-800 focus:outline-none focus:bg-gray-800 ${activeChild === link.name ? 'bg-gray-800' : ''}`}
                                        onClick={() => (link.action ? link.action() : handleButtonClick(link.name))}
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>

            <div className="flex-1 bg-gray-200">
                {activeChild && SideBarLinks.find(link => link.name === activeChild)?.content}
            </div>
        </div>
    );
};

export default SideBar;
