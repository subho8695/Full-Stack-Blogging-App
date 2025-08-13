import React, { useState } from 'react';
import { useQuery, useMutation, QueryClient, useQueryClient } from '@tanstack/react-query'
import { logOutt, postBlog } from '../ApiCall';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { callAI } from '../ApiCall';
import { useEffect } from 'react';
const PostBlog = () => {
    const [loading, setloading] = useState(true)
    const [ren, setren] = useState(true)
    const [form, setForm] = useState({
        category: '',
        title: '',
        content: ''
    });
    // console.log("hey");
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const navigate = useNavigate()
    const queryclient = useQueryClient();
    const blogMutation = useMutation({
        mutationFn: () => {
            return postBlog(form);
        },
        onSuccess: () => {
            queryclient.invalidateQueries({queryKey:["AllBlogs"]})
            navigate("/")
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        blogMutation.mutate();
    };
    const callGemini = async () => {
        // setloading(false)
        setren(false)
        const data = await callAI(form.title);
        console.log(data);
        setren(true)
        // setloading(true)
        setForm(prev => ({
            ...prev,
            content: data
        }));
        console.log(form.content);

    }

    useEffect(() => {
      if(!ren){
        setForm(prev => ({
            ...prev,
            content: "AI is generating...."
        }));
      }
    }, [ren])
    
    return (
        <div>
            <Navbar />


            <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Post a New Blog</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg "
                            placeholder="e.g. Technology"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder="e.g. Competitve Programming"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Content</label>
                        <textarea
                            name="content"
                            value={form.content}
                            onChange={handleChange}
                            rows={7}
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder="Write your blog content here..."
                            required
                        >
                        </textarea>
                    </div>
                    <div className='flex justify-end'>
                        <button
                            className=" py-2 rounded-lg cursor-pointer p-5 text-white bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:opacity-90 transition"
                            onClick={callGemini}
                        >
                            Genrate With AI
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-2 rounded-lg cursor-pointer"
                    >
                        Post Blog
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostBlog;
