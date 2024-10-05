import { validationResult } from 'express-validator';
import userService from '../services/userService';
import logger from '../utils/logger';

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    const user = await userService.createUser(username, email, password);
    res.status(201).json({ user_id: user.user_id });
  } catch (error) {
    logger.error('Error in user registration', { error });
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    res.json({ token });
  } catch (error) {
    logger.error('Error in user login', { error });
    next(error);
  }
};