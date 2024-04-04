
import MyButton from '../components/Button'
import MyInput from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import Auth0 from '../components/Auth0';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserSignUpValidation } from '../libs/Validattion';

interface UserData {
    username: string;
    email: string;
    password: string;
}

const SignUp = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const navigate = useNavigate()


    const [formData, setFormData] = useState<UserData>({
        username: "",
        email: "",
        password: "",
    })

    console.log(formData);

    const handleChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const handlesubmitUser = async () => {
        setLoading(true)
        setError("")
        const validateUser = UserSignUpValidation.safeParse(formData);
        if (!validateUser.success) {
            setLoading(false)
            setError(validateUser.error.message)
            toast.error("Invalid Credentials")
            return
        }
        try {

            const response = await axios.post('/api/auth/register', validateUser.data)
            console.log(response.data);
            if (response.status === 400) {
                setLoading(false)
                setError(response.data.message)
                toast.error("Something Went Wrong")
            }
            setLoading(false)
            setFormData({
                username: "",
                email: "",
                password: "",
            })
            toast.success("Account Created Successfully")
            navigate("/sign-in")
        } catch (error: any) {
            setLoading(false)
            setError(error.response.data.message)
            setFormData({
                username: "",
                email: "",
                password: ""
            })
            toast.error(error.response.data.message)
        }
    }



    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full  max-w-screen-lg mx-auto p-5">
                <div className="col-span-1">
                    <h1 className="text-4xl font-bold mb-5 text-center">Get Started</h1>
                    <p className="text-gray-700 leading-relaxed text-center">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nemo quae doloremque rerum, ratione unde sed alias facere sit
                        quibusdam voluptates dolorum quaerat. Id dolorum esse suscipit temporibus, iusto deleniti?
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-4">
                    <h1 className="text-4xl font-bold mb-2 text-center">Sign Up</h1>
                    <MyInput
                        postion="outside"
                        label="Username"
                        name='username'
                        onChange={handleChangeData}
                        className="w-full md:w-3/4 mb-3"
                        required
                        type="text"
                        color="primary"
                    />
                    <MyInput
                        postion="outside"
                        label="Email"
                        name='email'
                        onChange={handleChangeData}
                        className="w-full md:w-3/4 mb-3"
                        required
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
                        children={"Sign Up"}
                        isLoading={loading}
                        disabled={loading}
                        onClick={handlesubmitUser}
                        className="w-full md:w-3/4 bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 px-4"
                    />
                    <Auth0 />
                    <div className="">
                        <p className="text-center md:text-left text-gray-700 mt-4">
                            Already have an account? <Link to="/sign-in" className="text-blue-500 underline">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SignUp