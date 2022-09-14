import bcrypt from 'bcrypt';
import User, { verifyPassword, createToken } from '../models/User.js';

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({ message: 'Invalid email or password', error: true }).status(422);
    }

    if (await verifyPassword(password, user?.password)) {
      // eslint-disable-next-line no-underscore-dangle,no-unsafe-optional-chaining
      const { password: hidePass, ...userProfile } = user?._doc;
      // eslint-disable-next-line no-underscore-dangle
      userProfile.token = createToken(user.email, user._id);
      return res.status(200).json({ message: 'Login successful', user: userProfile });
    }
    return res.status(400).json({ message: 'Invalid email or password' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  const { body } = req;
  const { email } = req.body;

  const newUser = new User(body);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send({ message: 'Email already exist', error: true }).status(422);
    }

    const salt = await bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(newUser.password, salt);
    await newUser.save();

    // eslint-disable-next-line no-underscore-dangle,no-unsafe-optional-chaining
    const { password: hidePass, ...userProfile } = newUser?._doc;
    // eslint-disable-next-line no-underscore-dangle
    userProfile.token = createToken(newUser.email, newUser._id);
    return res.status(201).json({ message: 'New user registered successfully', user: userProfile });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export default login;
