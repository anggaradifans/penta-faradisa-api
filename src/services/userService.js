import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models';

export const createUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password_hash: hashedPassword
  });
  return { user_id: user.id };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw new Error('Invalid credentials');
  }

  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export default {
  createUser,
  loginUser,
};