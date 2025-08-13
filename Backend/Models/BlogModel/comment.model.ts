import mongoose from "mongoose"
const commentschema = new mongoose.Schema({
  text:{
    type:String
  },
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }
},{timestamps:true})

export const comment = mongoose.model("comment",commentschema)