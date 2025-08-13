import React, { useState } from 'react';
import { regUser } from '../ApiCall';
import { Navigate, useNavigate } from 'react-router-dom';
import { storeUser } from '../Features/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };
  const dispatch = useDispatch();

  const handleSubmit = async (e:React.SyntheticEvent) => {
    e.preventDefault();
    const nowUser = await regUser(formData);
    console.log(nowUser.newuser);
    if (nowUser.success == true) {
      // dispatch(storeUser(nowUser.newuser));
      // console.log("Hey");
      navigate("/login")
    }
    
    // console.log("Signup Data:", formData);
  };
  // const curuser = useSelector((state) => state.user.userInfo)
  //     console.log("From Redux", curuser);


  return (
    <div className='mt-20'>
      <div className="max-w-md mx-auto mt-10 p-6 shadow-xl bg-white rounded-2xl ">
        <h2 className="text-3xl font-bold mb-4 text-center text-red-600">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-3 border rounded-md"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-md"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded-md "
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 cursor-pointer"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>

  );
};

export default Signup;
