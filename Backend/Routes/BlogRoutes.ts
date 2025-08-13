import express from "express"
import { createBlog, deleteBlogById, deleteCommentById, getAllBlogs, getBlogById, getCommentsByBlog, getUserBlogs, postComment } from "../Controllers/Blog.controller.js";
import { isAuthenticated } from "../Middlewares/isAuthenticated.js";
import { aiCall, getSummarized } from "../AI.js";
const router = express.Router();
router.route("/createBlog").post(isAuthenticated, createBlog)
router.route("/comment").post(isAuthenticated, postComment)
router.route("/getAllBlogs").get(getAllBlogs)
router.route("/getUserBlogs").get(isAuthenticated, getUserBlogs);
router.route("/delBlogById/:id").get(isAuthenticated, deleteBlogById)
router.route("/delCommentById/:id").get(isAuthenticated, deleteCommentById)
router.route("/getCommentsOnBlog/:id").get(isAuthenticated,getCommentsByBlog);
router.route("/getBlogById/:id").get(isAuthenticated,getBlogById);
router.route("/AI").post(aiCall);
router.route("/summarize").post(getSummarized);
export default router