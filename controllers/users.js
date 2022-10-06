import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(StatusCodes.OK)
      .json(users);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { body } = req;
  const {
    email,
    phone,
    cnic,
  } = body;

  const newUser = new User(body);
  try {
    const existingUser = await User.findOne({
      $or: [{
        email,
        phone,
      }],
    });
    if (existingUser) {
      let message;
      if (existingUser?.email === email) {
        message = 'User with same email already exists.';
      } else if (existingUser?.phone === phone) {
        message = 'User with same phone number already exists.';
      } else if (existingUser?.cnic === cnic) {
        message = 'User with same CNIC already exists.';
      } else {
        message = 'User already exists.';
      }
      return res.send({ message, error: true }).status(422);
    }

    const password = Math.random();
    const salt = await bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(password, salt);
    await newUser.save();

    res.status(StatusCodes.CREATED)
      .json({
        message: 'New user created',
        user: newUser,
      });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export default getUsers;
