import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {UserModel} from "../models/Users.js"

const router = express.Router();

router.post("/register", async (req, res) => {
  console.log(req.body);
    const { username, password } = req.body;
    const user = await UserModel.countDocuments({ username });
  
    if (user > 0) {
      return res.json({ message: "User already exists!" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10); // Await the hash function
      const newUser = new UserModel({
        username,
        password: hashedPassword,
      });
      await newUser.save();
      res.json({ message: "User Registered Successfully!" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "An error occurred while registering the user." });
    }
  });
  

// router.post("/login", async (req,res)=>{
//     const {username,password} = req.body;
//     const user = await UserModel.findOne({ username });
//     console.log(user);
//     if(!user){
//         return res.json({message:"User doesn't exist!"});
//     }

//     const isPasswordValid = await bcrypt.compare( password , user.password);
//     console.log(isPasswordValid);
//     if(!isPasswordValid){
//         return res.json({message:"Username and password don't match!"});
//     }
//     const token = jwt.sign({id:user._id},"secret");
//     res.json({token,userID: user._id});

// }); 

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
  }

  try {
      const user = await UserModel.findOne({ username });
      if (!user) {
          return res.status(401).json({ message: "User doesn't exist!" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(401).json({ message: "Username and password don't match!" });
      }
      const token = jwt.sign({ id: user._id }, "secret");

      res.json({ token, userID: user._id });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
});




export {router as userRouter};