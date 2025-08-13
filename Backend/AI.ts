import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config({});
import { Response } from "express";
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const aiCall = async (req:any, res:Response) => {
  const { prompt } = req.body;
  console.log(prompt);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Please Create a good content on this topic ${prompt} in between 100 words only give the text only not heading or nothing and make it ready to post on a blog website`,
    });
    return res.status(201).json({
      text: response.text,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getSummarized = async (req:any, res:Response) => {
  const { prompt } = req.body;
  // console.log(prompt);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Please Summarize this content ${prompt} Such that User got satisfied and can fully understand the topic and only give the text only not heading or nothing`,
    });
    return res.status(201).json({
      text: response.text,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};
