import { user } from "../Models/BlogModel/User.model.js";

import { Response } from "express";

export const sendChat = async (req: any, res: Response) => {
  try {
    const curUserId = req.id;
    const { text, userid } = req.body;
    console.log(text);

    const sUser = await user.findById(curUserId);
    const rUser = await user.findById(userid);
    if (!sUser || !rUser) {
      return res.status(400).json({
        msg: "Chat can not be proceed",
        success: false,
      });
    }
    const allChat = sUser?.chats;
    const otherChat = rUser?.chats;
    let ind = -1;
    if (!allChat) {
      return res.status(400).json({
        msg: "No Chats here",
        success: "false",
      });
    }
    ind = allChat.findIndex((item) => {
      return item.userId === userid;
    });
    if (ind != -1) {
      allChat[ind].Msges.push({
        flag: 0,
        text: text,
        date: new Date().toLocaleTimeString(),
      });
      otherChat &&
        otherChat[ind].Msges.push({
          flag: 1,
          text: text,
          date: new Date().toLocaleTimeString(),
        });

      await sUser.save();
      await rUser.save();
    } else {
      sUser.chats.push({
        userId: userid,
        Msges: [
          {
            flag: 0,
            text: text,
            date: new Date().toLocaleTimeString(),
          },
        ],
      });
      rUser.chats.push({
        userId: curUserId,
        Msges: [
          {
            flag: 1,
            text: text,
            date: new Date().toLocaleTimeString(),
          },
        ],
      });
    }
    await sUser.save();
    await rUser.save();

    return res.status(201).json({
      msg: "chat sent Successfully",
      chats: sUser.chats,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};
export const getChatWithUser = async (req: any, res: Response) => {
  try {
    const curUserId = req.id;
    const endUserId = req.params.id;
    const sUser:any = await user.findById(curUserId);
    const rUser:any = await user.findById(endUserId);
    if (!sUser || !rUser) {
      return res.status(400).json({
        msg: "Chat can not be proceed",
        success: false,
      });
    }
    // console.log(sUser);
    // console.log(sUser.chats);
    // sUser.chats = [];
    // sUser.save();
    // rUser.chats = [];
    // console.log(sUser);
    
    const allChat = sUser.chats;
    let chatWithUser:any = allChat.find((item:any) => {
      return item.userId === endUserId;
    });
    if (!chatWithUser) chatWithUser = [];
    return res.status(201).json({
      msg: "All msges with user fetched",
      chatss: chatWithUser,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};
