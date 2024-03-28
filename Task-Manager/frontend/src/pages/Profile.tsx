import React, { useState } from 'react'
import Button from '../components/Button'
import InputWithLabel from '../components/Input'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import { setUser } from '../store/userSlice/user'
import { useNavigate } from 'react-router-dom'


interface FormDataProps {
  userName: string,
  email: string,
  password: string
}
function Profile() {
  const { user, token } = useSelector((state: any) => state.user)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  const [formData, setFormData] = useState<FormDataProps>({
    userName: '',
    email: '',
    password: ''
  })
  // console.log(formData);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  }

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    if (!formData.userName || !formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(`/api/user/${user.user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      // console.log(response);

      if (response.status === 200) {
        dispatch(setUser({ ...user, user: { ...user.user, userName: formData.userName, email: formData.email, password: formData.password } }));
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.error(error);
      setError('Error updating profile');
    }

    setLoading(false);
    setFormData({ userName: '', email: '', password: '' });
    setError('');
  };

  const handleDelete = async () => {
   
    setLoading(true);
    setError('');
    try {
      const response = await axios.delete(`/api/user/${user.user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.status === 200) {
        dispatch(setUser({ ...user, user: null }));
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      setError('Error deleting profile');
    }
    setLoading(false);
  }

  const handleAvatarChange = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/user/avatar', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.status === 200) {
        dispatch(setUser({ ...user, user: { ...user.user, avatar: response.data.data.avatar } }));
        toast.success('Avatar updated successfully');
      }
    } catch (error) {
      console.log(error);
      setError('Error updating avatar');
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:space-x-12 ">

      <div className="w-full md:w-1/3 flex flex-col items-center bg-slate-200 rounded-lg mt-5">
        <h1 className="text-3xl font-bold mb-4 uppercase bg-blue-400 rounded-lg px-16 py-4">Hey {user.user.userName}</h1>
        <div className="flex flex-col items-center gap-4 mt-4">
          <img src={user.user.avatar} alt="avatar" className="h-16 w-16 rounded-full" />
          <InputWithLabel label="UserName" id='username' name='userName' type='text' onChange={handleChange} required />
          <InputWithLabel label="Email" name='email' type='email' onChange={handleChange} required />
          <InputWithLabel label="Password" name='password' type='password' onChange={handleChange} required />
        </div>
        <div className="flex justify-center md:justify-end mt-5 gap-10 items-center">
          <Button className='w-full bg-blue-400 h-10 px-8 rounded-md hover:bg-blue-300 transition ease-in-out' type='button' onClick={handleSubmit} disabled={loading}>Submit</Button>
          <Button className='w-full bg-green-400 h-10 px-8 rounded-md hover:bg-green-300 transition ease-in-out' type='button' onClick={handleAvatarChange} disabled={loading}>Avatar</Button>
          <Button
            className="w-full bg-red-400 h-10 px-8 rounded-md hover:bg-red-300 transition ease-in-out"
            type="button"
            onClick={() => {
              handleDelete
              toast.promise(handleDelete(), {
                loading: 'Deleting profile...',
                success: 'Profile deleted successfully',
                error: 'Error deleting profile'})
            }}
            disabled={loading}
          >
            Delete
          </Button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  )
}
export default Profile