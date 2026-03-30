import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPostBySearch = async(req, res) => {
    const {search, tags} = req.query;
    try{
        const title  = search[0]? new RegExp(search, 'i'): undefined;
        // console.log(query);
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});
        // console.log(posts);
        res.status(200).json(posts);
    }catch(err){
        res.status(404).json(err);
    }
}

export const getPosts = async (req, res)=>{
    // it is better to use try and catch over here as an the model can give eror back
    try {
        const posts = await PostMessage.find();
        // console.log(posts);
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({message: error.message}) 
    }
};

export const getPost = async (req, res)=>{

    const {id} = req.params;

    // it is better to use try and catch over here as an the model can give eror back
    try {
        const posts = await PostMessage.findById(id);
        // console.log(posts);
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({message: error.message}) 
    }
};

export const createPost = async (req, res)=>{
    // console.log(req.body);
    // console.log(req.Id);
    let post = req.body;
    const aa = {...post, creator: req.userId, createdAt: new Date().toISOString()}
    const newPost = new PostMessage(aa);
    console.log(aa);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const updatePost = async (req, res)=>{
    const { id: _id } = req.params;
    // updated post
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

    // the last param will just make sure that this request return new post back
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});
    res.json(updatePost);
}

export const deletePost = async (req, res)=>{
    const {id: _id} = req.params;
    console.log("Delete");
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");
    await PostMessage.findByIdAndRemove(_id);
    res.json({message: "post deleted successfully"});
}

export const likePost = async (req, res)=>{
    // console.log("Like post")
    const {id: _id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");
    const post = await PostMessage.findById(_id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const likedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true});
    // console.log(likedPost);
    res.json(likedPost);
}