import fastify from "fastify";
import mongoose from "mongoose";
export const dbconnect=()=>{ mongoose.connect("mongodb+srv://ohriparas2005:8O52nrdNPJu5qqto@cluster0.gpenh.mongodb.net/paras",).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});}