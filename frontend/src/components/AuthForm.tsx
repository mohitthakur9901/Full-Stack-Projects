import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";

import { useDispatch } from "react-redux";
import { setUser } from "../store/User/UserSlice";

interface UserSignUp {
  name: string;
  email: string;
  password: string;
}

interface UserSignIn {
  email: string;
  password: string;
}

const AuthForm = ({ isSignUp = false }: { isSignUp?: boolean }) => {
  const [formData, setFormData] = useState<UserSignUp | UserSignIn>(
    isSignUp ? { name: "", email: "", password: "" } : { email: "", password: "" }
  );  
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage("");
      const endpoint = isSignUp ? "/api/auth/signup" : "/api/auth/signin";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        if (isSignUp) {
          navigate("/signin");
        } else {
          dispatch(setUser(data.data))
          navigate("/");
        }
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex justify-center items-center">
    <div className="flex p-3 max-w-3xl flex-col md:flex-row md:items-center gap-5 bg-white shadow-md rounded-md">
      {/* left */}
      <div className="flex-1">
        <Link to="/" className="font-bold text-4xl">
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Issue Tracker
          </span>
        </Link>
        <p className="text-sm mt-5">
          This is a demo project. You can {isSignUp ? "sign up" : "sign in"} with example@gmail.com 
        </p>
      </div>
      {/* right */}

      <div className="flex-1">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <div>
              <Label className="text-white" value="Your Name" />
              <TextInput
                className="rounded-md p-2"
                type="text"
                placeholder="name"
                id="name"
                onChange={handleChange}
              />
            </div>
          )}
          <div>
            <Label className="text-white" value="Your email" />
            <TextInput
              className="rounded-md p-2"
              type="email"
              placeholder="name@company.com"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="text-white" value="Your password" />
            <TextInput
              className="rounded-md p-2"
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
            />
          </div>
          <Button
            gradientDuoTone="purpleToBlue"
            type="submit"
            disabled={loading}
            className="py-2 px-4 bg-blue-500 text-white rounded-md"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : isSignUp ? (
              "Sign Up"
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>{isSignUp ? "Already have an account?" : "Don't have an account?"}</span>
          <Link to={isSignUp ? "/signin" : "/signup"} className="text-blue-500">
            {isSignUp ? "Sign In" : "Sign Up"}
          </Link>
        </div>
        {errorMessage && (
          <Alert className="mt-5" color="failure">
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  </div>
  );
};

export default AuthForm;
