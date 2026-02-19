import React, { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { token, setToken,backend_url } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName:"",
    profilePicture: null,
  });

  const url = `${backend_url}/api/user/signup`;
  const [errors, setErrors] = useState({
    passwordMatch: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, passwordMatch: false });
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    console.log("Form Data: ",formData);
    const res = await axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    }
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue-200">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full mt-5 mb-5 max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
       

        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
          {!errors.passwordMatch && (
            <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
          )}
        </div>
        <div className="mb-4 flex gap-5">
        <div className="flex flex-col">
          <label className="block text-gray-700 font-semibold mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
          </div>
          <div className="flex flex-col">
          <label className="block text-gray-700 font-semibold mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            
          />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Profile Picture (Optional)
          </label>
          <input
            type="file"
            name="profilePicture"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-lg "
            id="fileInput"
          />
           

        </div>
        <div className="flex mb-4">
          <input type="checkbox" className="mb-5" required />
          <p className=" ml-3 text-gray-700">
            By Continuing, i agree to the terms of use and privacy policy.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg  "
        >
          Sign Up
        </button>

       
        <div className="flex items-center gap-2 mt-3">
          <p className=" text-gray-700">Already have an account?</p>
          <p onClick={handleSignIn} className="cursor-pointer text-blue-500 hover:underline">
            Click here
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
