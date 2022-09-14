import { StatusCodes } from 'http-status-codes';
import PostMessage from '../models/postMessage.js';

const getPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find();
    res.status(StatusCodes.OK).json(posts);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { body } = req;

  const newPost = new PostMessage(body);
  try {
    await newPost.save();

    res.status(StatusCodes.CREATED).json({ message: 'New post created', post: newPost });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export default getPosts;
