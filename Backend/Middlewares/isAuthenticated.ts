import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";

export const isAuthenticated = async (req: any, res: Response, next: NextFunction) => {
    try{
        // console.log("hey");
        
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({
                message:"user not authenticated LogIn first",
                success:false
            })
        }
        const decode = await jwt.verify(token,process.env.SECRET_KEY as string);
        if(!decode){
            return res.status(401).json({
                message:"invalid token",
                success:false
            })
        }
        req.id = (decode as any).userid;
        
        // console.log(req.id);
        
        next();
    }catch(e){
        console.log(e);
        
    }
}