import React, { useState } from 'react';
import { Button, TextInput, Label, Spinner } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/User/UserSlice';
import toast from 'react-hot-toast';

interface UserUpdate {
  email: string;
  password: string;
}

const UpdateAccount: React.FC = () => {
  const { loggedInUser, token } = useSelector((state: any) => state.user);
  console.log(loggedInUser);
  
  const [form, setForm] = useState<UserUpdate>({
    email: loggedInUser?.email || '', // Pre-fill email if available
    password: '',
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/auth/user/${loggedInUser?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        dispatch(setUser(data.data));
        setLoading(false);
        toast.success('Account Updated Successfully');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error updating account:', error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="w-full max-w-sm rounded-md bg-white shadow-md p-6">
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">Update Account</h2>
          <div>
            <Label htmlFor="email" value="Email Address" />
            <TextInput
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={form.email}
              onChange={handleChange}
              required
              aria-label="Email Address Input"
              className='text-white '
            />
          </div>
          <div>
            <Label htmlFor="password" value="New Password"  />
            <TextInput
              id="password"
              type="password"
              placeholder="Enter your new password"
              value={form.password}
              onChange={handleChange}
              required
              aria-label="New Password Input"
            />
          </div>
          <Button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-md">
            {loading ? (
              <>
                <Spinner size="sm"  color="success"/>
              </>
            ) : (
              'Update Account'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAccount;
