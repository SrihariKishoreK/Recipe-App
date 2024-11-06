import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {userRouter} from "./routes/users.js";
import {recipesRouter} from "./routes/recipes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth",userRouter);
app.use("/recipes",recipesRouter);

mongoose.connect(
    // "mongodb+srv://yogeshshamlin:Nickyzander%40%32%30%30%34@cluster0.4a6cuu0.mongodb.net/RecYipeee?retryWrites=true&w=majority",
    "mongodb://localhost:27017/RecYipee",
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
).then(console.log("Connected to DB!"));

app.listen(3001, ()=>{
    console.log("server started at PORT 3001");
});