import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { storeUser } from '../Features/UserSlice';
import { getUserDetails, logOutt } from '../ApiCall';
import { useEffect } from 'react';
const Navbar = () => {
    const user:any = useSelector((state: any) => state.user.userInfo);
    // console.log(user);
    const dispatch = useDispatch();
    let user2:any|null = null;
    let name = "";
    // if (user2 != null) {
    //     let parsed = JSON.parse(user2);
    //     name = parsed.name
    // }
    console.log("rendering");
    const navigate = useNavigate();

    const handleClick = async()=>{
        const logOutRes = await logOutt()
        dispatch(storeUser(null))
        navigate("/")
    }

    
    user2 = user
    console.log(user2);
    
    return (
        <div className='pt-5'>
            <div className='flex justify-between'>
                <div>
                    <h1 className='text-4xl font-bold'>Blog<span className='text-red-500'>Tube</span></h1>
                </div>
                {
                    !user2 ? <div className='flex gap-3'>
                        <div>
                            <Link to="/login"><button className='bg-red-500 text-white px-4 shadow-2xl py-2 rounded-md hover:bg-red-600 cursor-pointer'>LogIn</button></Link>

                        </div>

                        <div>
                            <Link to="/signup"><button className='bg-purple-700 text-white px-4 shadow-2xl py-2 rounded-md hover:bg-purple-800 cursor-pointer'>SignUp</button></Link>

                        </div>
                    </div>
                        :
                        <div className='flex gap-4'>
                            <button className='text-xl font-semibold bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white px-4 shadow-2xl py-2 rounded-md hover:bg-purple-800 cursor-pointer'>{user2.name}</button>
                            <button className='text-xl font-semibold bg-gradient-to-r from-red-500 via-green-500 to-purple-500 text-white px-4 shadow-2xl py-2 rounded-md hover:bg-red-700 cursor-pointer' onClick={handleClick}>Log Out</button>
                        </div>
                }
            </div>

        </div>
    )
}

export default Navbar