import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    // title: String,
    // message: String,
    // creator: String,
    // tags: [String],
    // selectedFile: String,
    // likeCount: {
    //     type: Number,
    //     dafault: 0
    // },
    // createdAt: {
    //     type: Date,
    //     default: new Date()
    // }
    title: String,
    message: String,
    creator: String,
    name: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const PostMessage = mongoose.model("PostMessage", postSchema);
// Exporting this is important as We can use this model to find data and do CRUD operation on it. 
export default PostMessage;