import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface User {
  userName: string;
  email: string;
  password: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState<User>({
    userName: "",
    email: "",
    password: "",
  })

  console.log(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value.trim() });
    setErrorMessage("");
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post('/api/auth/register', user)
      console.log(response);
      
      if (response.status === 200) {
        toast.success('Registration successful');
        navigate('/signin');
      }
      setIsLoading(false);
      console.log(response.data);
      setUser({ userName: "", email: "", password: "" });
      setErrorMessage("");

    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-20 bg-gradient-to-b from-gray-400 to-gray-800 ">
      <h2 className="text-3xl font-bold mb-8">Signup</h2>
      <div className="w-full max-w-md space-y-4 ">
        <Input
          type="text"
          label="Username"
          placeholder="John Doe"
          name="userName"
          onChange={(e) => handleChange(e)}
        />

        <Input
          type="email"
          label="Email"
          name="email"

          placeholder="john.doe@example.com"
          onChange={(e) => handleChange(e)}

        />
        {/* {errors.email && <p className="text-red-500">{errors.email.message}</p>} */}
        <Input
          type="password"
          label="Password"
          name="password"

          placeholder="*************"
          onChange={(e) => handleChange(e)}

        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Button type="button" onClick={handleSubmit} disabled={isLoading} className="w-full bg-blue-400 h-12 rounded-md hover:bg-blue-300 transition ease-in-out ">
          {isLoading ? "Signing up..." : "Sign Up"}
        </Button>
      </div>
      <p className="text-gray-300 mt-4">
        Already have an account? <Link to="/signin" className="text-blue-500">Sign In</Link>
      </p>
    </div>
  );
};

export default Signup;
