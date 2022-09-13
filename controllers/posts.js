import postMessage from "../models/postMessage.js";
import PostMessage from "../models/postMessage.js";

const getPosts = async (req, res) => {
    try {
        const posts = await postMessage.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

export const createPost = async (req, res) => {
    const body = req.body;

    const newPost = new PostMessage(body);
    try {
        await newPost.save()

        res.status(201).json({message: 'New post created', post: newPost});
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

export default getPosts;