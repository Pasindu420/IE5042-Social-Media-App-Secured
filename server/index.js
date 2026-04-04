import dotenv from 'dotenv';
dotenv.config();
import  Express  from "express";
import cors from 'cors';
import mongoose from "mongoose";
const app = Express();
import postRoutes from './routes/post.js';
import authRoutes from './routes/auth.js';
import helmet from "helmet";
app.use(helmet({
    contentSecurityPolicy: true, // Specifically enables CSP to prevent XSS
    xFrameOptions: { action: 'deny' } // Strictly prevents Clickjacking
}));
app.use(cors());


app.use("/posts", postRoutes);
app.use("/user", authRoutes);
const url = process.env.CONNECTION_URL;
//let url = "mongodb+srv://ms26903392_db_user:iPEB1wKEHb4xhYuG@softwaresecurity.zay97sj.mongodb.net/?appName=SoftwareSecurity";
const port = process.env.port || 5000;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{ app.listen(port , ()=>console.log("Server is running")) })
    .catch((err)=>{console.log(err.message)});

// mongoose.set("useFindAndModify", false);    


