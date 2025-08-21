import { user } from "../Models/BlogModel/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Response } from "express";

export const register = async (req: any, res: Response) => {
  try {
    // console.log("hey");

    const { name, email, password } = req.body;
    // const hashed = await bcrypt.hash(password,10);
    const newuser = await user.create({
      name,
      email,
      password,
    });
    
    return res.status(201).json({
      msg: "user created Successfully",
      newuser,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export const login = async (req:any, res:Response) => {
  try {
    const { email, password } = req.body;
    const cur = await user.findOne({ email: email });
    // console.log(password);

    if (!cur) {
      return res.status(400).json({
        msg: "Email Does Not exist",
        success: false,
      });
    }
    // console.log(cur);
    const curPassword = cur.password;
    // const ok = await bcrypt.compare(password,curPassword)
    if (curPassword != password) {
      return res.status(400).json({
        msg: "Wrong Password",
        success: false,
      });
    }
    const token_data = {
      userid: cur._id,
    };
    const day = 24 * 60 * 60 * 1000;
    const token = jwt.sign(token_data, process.env.SECRET_KEY as string);
    res.cookie("token", token, { maxAge: day });
    return res.status(201).json({
      msg: "User Logged in Successfully",
      cur,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getAllUser = async (req:any, res:Response) => {
  try {
    const users = await user.find();
    return res.status(201).json({
      msg: "User Fetched Successfully",
      users,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export const logout = async (req:any, res:Response) => {
  try {
    const id = req.id;
    // console.log(id);

    const curUser = await user.findById(id);
    // console.log(curUser);
    res.cookie("token", "");
    return res.status(201).json({
      msg: "User Logged Out Successfully",
      curUser,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export const delUser = async (req:any, res:Response) => {
  try {
    const id = req.id;
    const curUser = await user.findById(id);
    // console.log(curUser);
    return res.status(201).json({
      curUser,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getUserById = async (req:any, res:Response) => {
  // console.log("hello");

  const id = req.params.id;
  const curUser = await user.findById(id);
  // console.log(curUser);
  try {
    return res.status(201).json({
      msg: "User fetched Successfully",
      curUser,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async(req:any, res:Response)=>{
  try{
    const id = req.id;
    const curUser = await user.findById(id);
    // console.log(curUser);
    
    return res.status(201).json({
      curUser,
      success:true
    })
  }
  catch(e){
    console.log(e);
    
  }
}
