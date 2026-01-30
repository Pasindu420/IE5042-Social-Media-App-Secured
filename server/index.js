import bodyParser from "body-parser";
import  Express  from "express";
import cors from 'cors';
import mongoose from "mongoose";
const app = Express();
import postRoutes from './routes/post.js';
import authRoutes from './routes/auth.js';

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());


app.use("/posts", postRoutes);
app.use("/user", authRoutes);
let url = "mongodb+srv://pasanpinsara00_db_user:nAeRmhceeepCnkkz@socialmediaappcluster.x12pe9d.mongodb.net/?appName=SocialMediaAppCluster";
const port = process.env.port || 5000;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{ app.listen(port , ()=>console.log("Server is running")) })
    .catch((err)=>{console.log(err.message)});

// mongoose.set("useFindAndModify", false);    
