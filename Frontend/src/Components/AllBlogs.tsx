import React from 'react'
import { useQuery, useMutation, QueryClient, useQueryClient } from '@tanstack/react-query'
import { getAllBlogs } from '../ApiCall'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
const AllBlogs = () => {

    const { data, isLoading } = useQuery({
        queryKey: ["AllBlogs"],
        queryFn: getAllBlogs
    })
    const navigate = useNavigate()
    const handleClick = (id:string) => {
        navigate(`/blog/${id}`)
    }
    const handlePost = () => {
        navigate(`/postBlog`)
    }

    const seeBlogs = () => {
        navigate('/MyBlogs')
    }
    const doChat = ()=>{
        navigate("/chat")
    }
    const [mainData, setmainData] = useState<any | null>(null)

    const funcSearch = (nowText:string) => {
        const now = data.blogs.filter((val:any, idx:number) => {
            return val.category.toLowerCase().includes(nowText.toLowerCase()) ||
            val.title.toLowerCase().includes(nowText.toLowerCase());
        })
        console.log(now);

        if (now.length == 0) {
            setmainData(null)
        }
        else setmainData(now);
    }
    const [searchText, setsearchText] = useState("")

    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value;
        if (val.length == 0 && data) {
            setmainData(data.blogs)
            setsearchText("")
        }
        else {
            setsearchText(e.target.value)
            console.log(searchText);
            funcSearch(e.target.value)
        }

    }
    useEffect(() => {

        if (data) setmainData(data.blogs)
    }, [data])

    return (
        <div className=''>
            <div className='flex justify-center'>
                <h1 className='text-5xl font-bold mt-10'>Blogs</h1>

            </div>

            <div className='flex justify-center gap-5 mt-20'>
                <div>
                    <input type="text" className='w-full px-4 py-2 border rounded-lg shadow-2xl' placeholder='Search By Category' value={searchText} onChange={handleSearch} />
                </div>

                <div>
                    <button
                        className="bg-red-600 text-white p-[8px] rounded-md hover:bg-red-700 transition cursor-pointer font-medium shadow-2xl"
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className='w-[1100px] m-auto mt-32'>
                {
                    mainData ?



                        <div>



                            <div className={`grid gap-15 ${mainData.length < 2 ? "grid-cols-1" : "grid-cols-2"}`}>
                                {
                                    mainData && mainData.map((val:any, idx:number) => {
                                        let category = val.category
                                        let title = val.title
                                        let content = val.content
                                        let userName = val.createdBy.name
                                        return <div key={val._id} className='shadow-2xl rounded-2xl'>

                                            <div className='p-2'>
                                                <button className='text-[16px] font-bold text-white hover:underline cursor-pointer bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-1 rounded-xl px-2'>{category}</button>
                                            </div>
                                            <div className=" flex flex-col items-center p-10 text-center h-full" >

                                                <h1 className='text-xl font-bold'>{title}</h1>
                                                <h1 className='mt-5 font-[500]'>{content}</h1>

                                                <h2 className="font-bold mt-5 text-[18px] text-blue-600">- {userName}</h2>
                                                <h2 className='text-[15px] font-bold text-red-600 mt-5 cursor-pointer hover:underline' onClick={() => {
                                                    handleClick(val._id)
                                                }}>View More...</h2>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>

                        : <h1 className='text-center text-4xl font-bold text-gray-700'>No Blogs Found</h1>
                }
            </div>

            <div className='flex justify-center mt-30 mb-10 gap-20'>
                <button
                    type="submit"
                    className="bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition cursor-pointer font-medium"
                    onClick={handlePost}
                >
                    Post Blog
                </button>

                <button
                    type="submit"
                    className="bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition cursor-pointer font-medium"
                    onClick={seeBlogs}
                >
                    My Blogs
                </button>

                <button
                    className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white p-3 rounded-md transition cursor-pointer font-medium"
                    onClick={doChat}
                >
                    Chatify
                </button>
            </div>
        </div>
    )
}

export default AllBlogs