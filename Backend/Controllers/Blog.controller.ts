import { blog} from '../Models/BlogModel/Blog.model.js';
import { comment } from '../Models/BlogModel/comment.model.js';
import { user } from '../Models/BlogModel/User.model.js';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

import { Request, Response } from 'express';

export const createBlog = async (req: any, res: Response) => {
  try {
    const { category, title, content } = req.body;
    if (!category || !title || !content) {
      return res.status(400).json({
        msg: 'something is missing',
        success: false,
      });
    }
    const newBlog = await blog.create({
      category,
      title,
      content,
      createdBy: req.id,
    });
    return res.status(201).json({
      msg: 'Blog Successfully Created',
      newBlog,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};
export const postComment = async (req:any, res:Response) => {
  try {
    const { cmnt, blogId } = req.body;
    const UserId = req.id;  
    const curBlog = await blog.findById(blogId);
    const curCmnt = await comment.create({
      text: cmnt,
      author: UserId,
    });
    console.log(blogId);
    
    const curCmntId = curCmnt._id;
    curBlog?.comments.push(curCmntId);
    await curBlog?.save()
    const nowblog = await curBlog?.populate("comments")
    return res.status(201).json({
      msg: 'Comment created successfully',
      curCmnt,
      nowblog,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getAllBlogs = async (req:Request, res:Response) => {
  try {
    const blogs = await blog.find().populate('createdBy');
    return res.status(201).json({
      msg: 'All Blogs Fetched Successfully',
      blogs,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getBlogById = async (req:Request, res:Response) => {
  try {
    const id = req.params.id;
    const curBlog = await blog
      .findById(id)
      .populate('createdBy')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
        },
      });
    return res.status(201).json({
      msg: 'Blog Fetchedd Successfully',
      curBlog,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export const deleteBlogById = async (req:Request, res:Response) => {

  const blogId = req.params.id;
  const deletedBlog = await blog.findByIdAndDelete(blogId);
  if (!deletedBlog) {
    return res.status(400).json({
      msg: 'Blog Not Found',
      success: false,
    });
  }
  return res.status(201).json({
    msg: 'Blog Deleted Successfully',
    deletedBlog,
    success: true,
  });
};

export const delAllBlog = async(req:any,res:Response)=>{
    try{
        const userid = req.id;
    }catch(e){
        console.log(e);
    }
}

export const getUserBlogs = async(req:any,res:Response)=>{
  try{
    const id = req.id;
    const userBlogs = await blog.find({createdBy:id}).populate("createdBy");
    if(!userBlogs){
      return res.status(404).json({
        msg:"Blogs Not Found",
        success:false
      })
    }
    return res.status(201).json({
      msg:"Blogs fetched Successfully",
      userBlogs,
      success:true
    })
  }
  catch(e){
    console.log(e);
  }
}

export const delBlogByUser = async(req:Request,res:Response)=>{
  
}

// export const getCommentsByUser = async(req,res)=>{
//   try{
//     const userid = req.id;
//     const allComments = comment.find({author:userid})
//     return res.status(201).json({
//       msg:"all comment fetched successfully",
//       allComments,
//       success:true
//     })
//   }
//   catch(e){
//     console.log(e);
    
//   }
// }

export const deleteCommentById = async(req:Request,res:Response)=>{
  try{
    const cmntId = req.params.id;
    // console.log(cmntId);
    
    const deleted = await comment.findByIdAndDelete(cmntId)
    return res.status(201).json({
      msg:"Comment Deleted Successfully",
      // deleted,
      success:true
    })
  }
  catch(e){
    console.log(e);
  }
}

export const getCommentsByBlog = async(req:Request,res:Response)=>{
  try{
    const blogId = req.params.id;
    const curBlog = await blog.findById(blogId);
    if (!curBlog) {
      return res.status(404).json({
        msg: "Blog Not Found",
        success: false
      });
    }
    const temp = (await curBlog
    .populate({
      path:"comments",
      populate:{
        path:"author"
      }
    }))
    .comments;
    return res.status(201).json({
      msg:"Comments fetched Successfully",
      temp,
      success:true
    })
  }
  catch(e){
    console.log(e);
  }
}