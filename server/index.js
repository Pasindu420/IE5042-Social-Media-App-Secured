import dotenv from 'dotenv';
dotenv.config();
import bodyParser from "body-parser";
import  Express  from "express";
import cors from 'cors';
import mongoose from "mongoose";
const app = Express();
import postRoutes from './routes/post.js';
import authRoutes from './routes/auth.js';
import helmet from "helmet";
// Locate this section in server/index.js (around line 10-15)
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"], // Only allow resources from your own domain
            scriptSrc: ["'self'", "https://accounts.google.com", "https://apis.google.com"], // Allow Google Scripts
            connectSrc: ["'self'", "https://accounts.google.com"], // Allow AJAX to Google
            frameSrc: ["'self'", "https://accounts.google.com"], // Allow the Google Login popup
            imgSrc: ["'self'", "data:", "https://lh3.googleusercontent.com"], // Allow profile pictures
            styleSrc: ["'self'", "'unsafe-inline'"], // Allow CSS
        },
    },
    xFrameOptions: { action: 'deny' } // Prevents Clickjacking
}));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
//app.use(cors());
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true
}));


app.use("/posts", postRoutes);
app.use("/user", authRoutes);
const url = process.env.CONNECTION_URL;
//let url = "mongodb+srv://ms26903392_db_user:iPEB1wKEHb4xhYuG@softwaresecurity.zay97sj.mongodb.net/?appName=SoftwareSecurity";
const port = process.env.port || 5000;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{ app.listen(port , ()=>console.log("Server is running")) })
    .catch((err)=>{console.log(err.message)});

// mongoose.set("useFindAndModify", false);    


