import React, { useState } from 'react';
import { LogUser } from '../ApiCall';
import { useDispatch, useSelector } from 'react-redux';
import { storeUser } from '../Features/UserSlice';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate()
  
  const handleSubmit = async (e:React.SyntheticEvent) => {
    e.preventDefault();
    // console.log("hey");
    const { email, password } = formData;
    const loggedUserData = await LogUser({ email, password });
    
    // localStorage.setItem("user",JSON.stringify(loggedUserData.cur))
    dispatch(storeUser(loggedUserData.cur));
    navigate("/")
  };

  const curuser = useSelector((state:any) => state.user.userInfo)
  // console.log("From Redux", curuser);
  
  
  return (
    <div className="max-w-md mx-auto mt-30 p-6 shadow-xl bg-white rounded-2xl">
      <h2 className="text-3xl font-bold mb-4 text-center text-green-600">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border rounded-md focus:outline-none"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 border rounded-md focus:outline-none"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
