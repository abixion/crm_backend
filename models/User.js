import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/config.js';

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: 1,
    validate: {
      async validator(email) {
        const user = await this.constructor.findOne({ email });
        if (user) {
          if (this.id === user.id) {
            return true;
          }
          return false;
        }
        return true;
      },
      message: () => 'The specified email address is already in use.',
    },
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const verifyPassword = async (inputPassword, userPassword) => {
  const compare = await bcrypt.compare(inputPassword, userPassword);
  return compare;
};

export const createToken = (email, _id) => jwt.sign({ email, _id }, `${jwtConfig.secret}`, { expiresIn: '10h' });

const User = mongoose.model('User', userSchema);

export default User;
