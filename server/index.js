import dotenv from 'dotenv';
dotenv.config();
import bodyParser from "body-parser";
import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import helmet from "helmet";

// --- OAuth & Passport Imports ---
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// --- Route Imports ---
import postRoutes from './routes/post.js';
import authRoutes from './routes/auth.js';

const app = express();

// --- 1. Security & Middleware Configuration ---
app.disable("x-powered-by"); // Fix for Sensitive Info Exposure

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://accounts.google.com"],
      connectSrc: ["'self'", "https://accounts.google.com"],
      frameSrc: ["'self'", "https://accounts.google.com"],
      imgSrc: ["'self'", "data:", "https://lh3.googleusercontent.com"],
    },
  },
}));

app.use(express.json({ limit: "10kb" })); // Fix for Large Payload Attack
app.use(express.urlencoded({ limit: "10kb", extended: true }));

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true // Required for Cross-Domain configuration
}));

// --- 2. Session & Passport Initialization ---
app.use(session({
  secret: 'social_media_secret',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// --- 3. Google OAuth Strategy ---
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, // From your .env
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, // From your .env
    callbackURL: "http://localhost:5000/auth/google/callback" //http://localhost:5000/auth/google/callback
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// --- 4. Routes ---
app.use("/posts", postRoutes);
app.use("/user", authRoutes);

// Auth Routes for OAuth Grant Type requirement
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('http://localhost:3000');
  });

// --- 5. Database Connection ---
const url = process.env.CONNECTION_URL; // Using .env for security
const port = process.env.PORT || 5000;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{ app.listen(port , ()=>console.log("Server is running")) })
    .catch((err)=>{console.log(err.message)});