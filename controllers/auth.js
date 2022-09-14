import bcrypt from 'bcrypt';
import User, { comparePassword } from '../models/User.js';

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.send({ message: 'Invalid email or password', error: true }).status(422);
      return;
    }

    if (await comparePassword(password, user?.password)) {
      // eslint-disable-next-line no-underscore-dangle,no-unsafe-optional-chaining
      const { password: hidePass, ...formattedUser } = user?._doc;
      res.status(200).json({ message: 'Login successful', user: formattedUser });
    } else {
      res.status(400).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  const { body } = req;

  const newUser = new User(body);
  try {
    const salt = await bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(newUser.password, salt);
    await newUser.save();

    // eslint-disable-next-line no-underscore-dangle,no-unsafe-optional-chaining
    const { password: hidePass, ...formattedUser } = newUser?._doc;
    res.status(201).json({ message: 'New user registered successfully', user: formattedUser });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export default login;
