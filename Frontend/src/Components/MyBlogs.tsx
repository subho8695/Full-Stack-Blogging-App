import React from 'react'
import { useQuery, useMutation, QueryClient, useQueryClient } from '@tanstack/react-query'
import { deleteBlogById, getUserBlogs } from '../ApiCall'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const MyBlogs = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["userBlogs"],
        queryFn: getUserBlogs
    })
    const navigate = useNavigate()
    const handlePost = () => {
        navigate(`/postBlog`)
    }
    const handleClick = (id:string) => {
        navigate(`/blog/${id}`)
    }
    const queryclient = useQueryClient();
    

    const [id, setid] = useState("")
    const deleteMutation = useMutation({
        mutationFn: () => {

            return deleteBlogById(id)
        },
        onSuccess: () => {
            queryclient.invalidateQueries({queryKey:["userBlogs"]});
            queryclient.invalidateQueries({queryKey:["AllBlogs"]})
        }
    })
    const [confirmDel, setconfirmDel] = useState(false)
    const handleClickDelete = (id) => {
        setid(id);
        deleteMutation.mutate()
    }
    return (
        <div>
            <Navbar />
            <div className='w-[1100px] m-auto mt-32'>
                {
                    data ?

                        <div className={`grid gap-15 ${data.length < 2 ? "grid-cols-1" : "grid-cols-2"}`}>
                            {
                                data && data.map((val, idx) => {
                                    let category = val.category
                                    let title = val.title
                                    let content = val.content
                                    let userName = val.createdBy.name
                                    return <div key={val._id} className='rounded-xl'>

                                        <div className="shadow-2xl flex flex-col items-center p-10 text-center h-full rounded-xl" >
                                            <h1 className='text-xl font-bold'>{title}</h1>
                                            <h1 className='mt-5 font-[500]'>{content}</h1>
                                            <h2 className="font-bold mt-5 text-[18px] text-blue-600">- {userName}</h2>
                                            <h2 className='text-[15px] font-bold text-red-600 mt-5 cursor-pointer' onClick={() => {
                                                handleClick(val._id)
                                            }}>View More</h2>


                                            <button

                                                className="bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition cursor-pointer font-medium mt-8"
                                                onClick={() => setconfirmDel(true)}
                                            >
                                                Delete
                                            </button>

                                            {
                                                confirmDel && <button

                                                className="bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition cursor-pointer font-medium mt-8"
                                                onClick={() => {
                                                    handleClickDelete(val._id)
                                                }}
                                            >
                                                Confirm ?
                                            </button>

                                            }
                                        </div>
                                    </div>
                                })
                            }
                        </div>

                        : <h1>No Blogs Yet</h1>


                }

                {
                    data && data.length == 0 &&
                    <h1 className='text-4xl font-bold text-gray-600 text-center'>No Blogs Yet</h1>
                }

                <div className='flex justify-center mt-10'>
                    <button
                        type="submit"
                        className="bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition cursor-pointer font-medium"
                        onClick={handlePost}
                    >
                        Post Blog
                    </button>
                </div>

            </div>
        </div>
    )
}

export default MyBlogs