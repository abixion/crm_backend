import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
      message: (props) => 'The specified email address is already in use.',
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

export const comparePassword = async (inputPassword, userPassword) => {
  const compare = await bcrypt.compare(inputPassword, userPassword);
  return compare;
};

const User = mongoose.model('User', userSchema);

export default User;
