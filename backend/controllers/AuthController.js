const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

// const sendEmail = require("../utils/sendEmail")
dotenv.config();
const express = require("express");
const User = require("../models/user");
ACCESS_TOKEN_SECRET = "hello";
REFRESH_TOKEN_SECRET = "helloAgain";

const app = express();

require("dotenv").config();

require("cookie-parser");
app.use(express.json());






exports.signup = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    // Check If The Input Fields are Valid
    if (!name || !password || !email) {
      return res.status(400).json({ message: "Please Input the Required Fields" });
    }

    // Check If User Exists In The Database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    // Hash The User's Password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save The User To The Database
    const newUser = new User({
      name,
      password: hashedPassword,
      email,
      date: new Date(), // Corrected the Date property to lowercase 'date' and assigned a new Date
    });

    await newUser.save();

    return res.status(201).json({ message: "User Created Successfully", user: newUser });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error creating user" });
  }
};



exports.signin = async(req,res)=>{
    try {
        const { password, email } = req.body;
    
        // Check If The Input Fields are Valid
        if (!password || !email) {
          return res.status(400).json({ message: "Please Input the Required Fields" });
        }
    
        // Check If User Exists In The Database
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User Does Not Exist" });
          }

          
        
            const comparePass = await bcrypt.compare(password, existingUser.password);
            if (!comparePass) {
                return res.status(400).json({ message: "Invalid Credentials" });
              }
            
                const accessToken = jwt.sign(
                  { userId: User.id, email: User.email },
                  ACCESS_TOKEN_SECRET,
                  { expiresIn: "2m" },
                );
          
                const refreshToken = jwt.sign(
                  { userId: User.id, email: User.email },
                  REFRESH_TOKEN_SECRET,
                  { expiresIn: "7d" },
                );

                return res.status(200).json({
                    message: "Signed In",
                    user: existingUser,
                    accessToken,
                    refreshToken
                  });
    
        
  
      } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error Signing in" });
      }

}


