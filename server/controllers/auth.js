import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userData.js';

export const signin = async(req, res) => {
    console.log("sign-in");
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email: email})
        if(!user) return res.status(404).json({message: "user doesn't exist"});

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) return res.status(400).json({message: "invalid credential"});

        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: "Something went Wrong"});
    }
}

export const signup = async(req, res) => {
    console.log(User);
    const {email, password, confirmPassword, firstname, lastname} = req.body;

    try {
        const existingUser = await User.findOne({email: email})

        if(existingUser) return res.status(400).json({message: "user already exist"});

        if(password !== confirmPassword) return res.status(400).json({message: "confirmPassword didn't match"});

        const hashPassword = await bcrypt.hash(password, 12);
        
        // const user = await User.create({email, password: hashPassword, given_name: `${firstname} ${lastname}`});
        const user = new User({email: email, password: hashPassword, given_name: `${firstname} ${lastname}`});
        // const user = new User(req.body);
        await user.save();

        res.status(200).json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}