
import { Link, useNavigate } from 'react-router-dom';
import MyButton from '../components/Button'
import MyInput from '../components/Input';
import {  useDispatch } from 'react-redux';
import Auth0 from '../components/Auth0';
import { useState } from 'react';
import { UserLoginValidation } from '../libs/Validattion';
import toast from 'react-hot-toast';
import axios from 'axios';

import { setUser } from '../redux/User/user';

interface UserData {
    email: string;
    password: string;
}
const SignIn = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const [formData, setFormData] = useState<UserData>({
        email: "",
        password: "",
    })
    const dispatch = useDispatch()


    const handleChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const handlesubmitUser = async () => {
        setLoading(true)
        const validateUser = UserLoginValidation.safeParse(formData);
        if (!validateUser.success) {
            setLoading(false)
            toast.error("Invalid Credentials")
            return
        }
        try {

            const response = await axios.post('/api/auth/login', validateUser.data)
            console.log(response.data.data);
            if (response.status === 400) {
                setLoading(false)
                toast.error("Something Went Wrong")
            }
            dispatch(setUser(response.data.data))
            setLoading(false)
            setFormData({
                email: "",
                password: "",
            })
            toast.success("LoggedIn Successfully")
            navigate("/")
        } catch (error: any) {
            setLoading(false)
            setFormData({
                email: "",
                password: ""
            })
            toast.error(error.response.data.message)
        }
    }


    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-screen-lg mx-auto p-5">
                <div className="col-span-1">
                    <h1 className="text-4xl font-bold mb-5 text-center">Get Started</h1>
                    <p className="text-gray-700 leading-relaxed text-center">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nemo quae doloremque rerum, ratione unde sed alias facere sit
                        quibusdam voluptates dolorum quaerat. Id dolorum esse suscipit temporibus, iusto deleniti?
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-y-2">
                    <h1 className="text-4xl font-bold mb-2 text-center">Login</h1>

                    <MyInput
                        postion="outside"
                        label="Email"
                        onChange={handleChangeData}
                        className="w-full md:w-3/4 mb-3"
                        required
                        name='email'
                        type="email"
                        color="primary"
                    />
                    <MyInput
                        postion="outside"
                        label="Password"
                        onChange={handleChangeData}
                        className="w-full md:w-3/4 mb-3"
                        required
                        name='password'
                        type="password"
                        color="primary"
                    />
                    <MyButton
                        type="button"
                        size="md"
                        isLoading={loading}
                        disabled={loading}
                        onClick={handlesubmitUser}
                        children={"Sign Up"}
                        className="w-full md:w-3/4 bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 px-4"
                    />
                    <Auth0 />
                    <div className="">
                        <p className="text-center md:text-left text-gray-700 mt-4">
                            Already have an account? <Link to="/sign-up" className="text-blue-500 underline">Sign Up</Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default SignIn