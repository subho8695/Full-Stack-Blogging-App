import React from 'react'
import { data, useParams } from 'react-router-dom'
import { useQuery, useMutation, QueryClient, useQueryClient } from '@tanstack/react-query'
import { getComments, getSingleBlog, postComment, Summarize } from '../ApiCall';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
const SingleBlog = () => {
    const { id } = useParams();
    const { data} = useQuery({
        queryKey: ["sBlog"],
        queryFn: () => {
            return getSingleBlog(id);
        }
    })
    const [summ, setsumm] = useState<string>("")
    const [isSum, setisSum] = useState<boolean>(false)
    const [ren, setren] = useState(true)
    const callGemini = async () => {
        // setloading(false)
        setisSum(true)
        setren(false)
        const dataa = await Summarize(data.content);
        console.log(dataa);
        setren(true)
        setsumm(dataa);
    }
    
    const { data: cmnt} = useQuery({
        queryKey: ["cmntt"],
        queryFn: () => {
            // console.log("hi");
            return getComments(id);
        }
    })

    const queryClient = useQueryClient();
    const cmntMutation = useMutation({
        mutationFn: () => {
            let cmnt = text
            let blogId = id;
            return postComment({ cmnt, blogId });
        },
        onSuccess: () => {
            settext("")
            queryClient.invalidateQueries({queryKey:["cmntt"]});
        }
    })
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        // console.log(text);

        settext(e.target.value);
    }
    const handlePost = () => {
        cmntMutation.mutate();
    }
    // console.log("hey");

    const [showCmnt, setshowCmnt] = useState(false)
    const [addCmnt, setaddCmnt] = useState(false)
    const [text, settext] = useState("")

    useEffect(() => {
      setsumm("AI is Summarizing.....")
    }, [isSum])
    
    return (
        <div className=''>
            <Navbar />
            {

                data &&
                <div>
                    <div className='w-[800px] m-auto shadow-xl mt-20 p-5 rounded-2xl'>
                        <div className='flex flex-col items-center p-5 text-center h-full cursor-pointer'>
                            <h1 className='text-2xl font-bold'>{data.title}</h1>
                            <h1 className='mt-5 text-[17px]'>{data.content}</h1>
                        </div>


                        <div>

                        </div>
                        <div className='flex justify-end'>
                            <h2 className="font-bold text-red-600 mt-5">by - {data.createdBy.name}</h2>
                        </div>

                        <h2 className='text-[16px] font-bold text-purple-600 pl-5 cursor-pointer' onClick={() => setshowCmnt(!showCmnt)} >
                            Comments
                        </h2>

                        {
                            showCmnt && cmnt &&
                            <div>
                                <div className='flex flex-col gap-4'>
                                    {


                                        cmnt.map((val, ind) => {
                                            return <div key={val._id} className="shadow-xl p-5 pl-5 rounded-xl">

                                                <div className='flex justify-between'>
                                                    <div className='w-[50%]'>
                                                        <h1 className='font-semibold'>
                                                            {val.text}
                                                        </h1>
                                                    </div>

                                                    <div>
                                                        <h1 className='text-blue-600 font-bold'>
                                                            by - {val.author.name}
                                                        </h1>
                                                    </div>

                                                </div>


                                            </div>
                                        })
                                    }
                                </div>


                                <div className='flex justify-center'>
                                    <button
                                        type="submit"
                                        className="bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition cursor-pointer mt-10 font-bold"
                                        onClick={() => setaddCmnt(!addCmnt)}
                                    >
                                        Add Comment
                                    </button>
                                </div>

                                {
                                    addCmnt &&
                                    <div className='flex gap-5 mt-8'>
                                        <input type="text" placeholder='Add Your Comments...' className='w-full px-4 py-2 border rounded-lg' value={text} onChange={handleChange} required />
                                        <div>
                                            <button
                                                type="submit"
                                                className="bg-red-600 text-white p-3 px-5 rounded-md hover:bg-red-700 transition cursor-pointer"
                                                onClick={handlePost}
                                            >
                                                Post

                                            </button>
                                        </div>
                                    </div>
                                }


                            </div>

                        }
                    </div>


                    <div className='flex flex-col items-center mt-10'>
                        <button
                            className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:opacity-90 text-white p-3 px-5 rounded-md transition cursor-pointer"
                            onClick={callGemini}
                        >
                            Summarize With AI
                        </button>
                    </div>

                    <div className='w-[800px] m-auto mt-10 shadow-2xl'>
                        {
                            isSum &&
                            <textarea
                                name="content"
                                value={summ}
                                rows={7}
                                onChange={()=>setsumm(summ)}
                                className="w-full p-10 border rounded-lg text-[17px] "
                                placeholder="Write your blog content here..."
                                required
                            >
                            </textarea>
                        }
                    </div>

                </div>

            }
        </div>
    )
}

export default SingleBlog