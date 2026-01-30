import  Express  from "express";
import { getPost ,getPosts, createPost, updatePost, deletePost, likePost, getPostBySearch } from "../controllers/posts.js";
import auth from '../middleware/auth.js'

const router = Express.Router();
router.get("/search", getPostBySearch);
router.get("/", getPosts);
router.get("/getPost/:id", getPost)
router.post("/",auth, createPost);
router.patch("/:id", auth,updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost",auth, likePost); 

export default router