import axios from "axios";
const API = "http://localhost:8000/api/v1";

interface regData{
    name:String,
    email:String,
    password:String
}
export const regUser = async (formdata:regData) => {
    const res = await axios.post(`${API}/user/register`, formdata)
    return res.data;
}
interface logInData{
    email:String,
    password:String
}

export const LogUser = async (formdata:logInData) => {
    const res = await axios.post(`${API}/user/login`, formdata,{
        withCredentials:true
    })
    return res.data;
}

interface blogs{
    _id:String,
    category:String,
    title:String,
    content:String,
    createdBy:Object,
    comments:String[],
    createdAt:String,
    updatedAt:String
}

export const getAllBlogs = async()=>{
    const res = await axios.get(`${API}/blog/getAllBlogs`,{
        withCredentials:true
    });
    return res.data;
}

export const getSingleBlog = async(id)=>{
    const res = await axios.get(`${API}/blog/getBlogById/${id}`,{
        withCredentials:true
    });
    return res.data.curBlog
}

interface form{
    category:String,
    title:String,
    content:String
}

export const postBlog = async(formdata:form)=>{
    const res = await axios.post(`${API}/blog/createBlog`,formdata,{
        withCredentials:true
    })
}

export const getComments = async(id:string)=>{
    const res = await axios.get(`${API}/blog/getCommentsOnBlog/${id}`,{
        withCredentials:true
    })
    // console.log(res.data);
    return res.data.temp;
}

export const postComment = async({cmnt,blogId})=>{
    console.log(cmnt);
    
    const res = await axios.post(`${API}/blog/comment`,{cmnt,blogId},{
        withCredentials:true
    })
    return res.data
}

export const logOutt = async()=>{
    const res = await axios.get(`${API}/user/logout`,{
        withCredentials:true
    })
    return res.data
}

export const getUserBlogs = async()=>{
    const res = await axios.get(`${API}/blog/getUserBlogs`,{
        withCredentials:true
    })
    return res.data.userBlogs;
}

export const deleteBlogById = async(id)=>{
    const res = await axios.get(`${API}/blog/delBlogById/${id}`,{
        withCredentials:true
    })
    return res.data
}

export const callAI = async(prompt)=>{
    try{
        console.log(prompt);
        
        const res = await axios.post(`${API}/blog/AI`,{prompt},{
            withCredentials:true
        })
        // console.log(res.data.text);
        
        return res.data.text
    }
    catch(e){
        console.log(e);
        
    }
}

export const getUserDetails = async()=>{
    try{
        const res = await axios.get(`${API}/user/getUser`,{
            withCredentials:true
        })
        return res.data.curUser
    }
    catch(e){
        console.log(e);
    }
}

export const Summarize = async(prompt)=>{
    try{
        // console.log(prompt);
        
        const res = await axios.post(`${API}/blog/summarize`,{prompt},{
            withCredentials:true
        })
        // console.log(res.data.text);
        
        return res.data.text
    }
    catch(e){
        console.log(e);
        
    }
}

export const getAllUsers = async()=>{
    try{
        const res = await axios.get(`${API}/user/getAllUser`,{
            withCredentials:true
        })
        return res.data.users
    }
    catch(e){
        console.log(e);
    }
}

export const getNewUser = async(id)=>{
    try{
        const userInfo = await axios.get(`${API}/user/getUserById/${id}`,{
            withCredentials:true
        })
        // console.log(userInfo);
        
        return userInfo.data.curUser
    }catch(e){
        console.log(e);
        
    }
}

export const sendMsg = async({text,userid})=>{
    try{
        const res = await axios.post(`${API}/user/sendMsz`,{text,userid},{
            withCredentials:true
        })
        return res.data.chats;   
    }
    catch(e){
        console.log(e);
    }
}
export const getMsg = async(userId)=>{
    try{
        const res = await axios.get(`${API}/user/getMsz/${userId}`,{
            withCredentials:true
        })
        // console.log(res.data);
        
        return res.data.chatss.Msges;   
    }
    catch(e){
        console.log(e);
    }
}
