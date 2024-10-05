import express from 'express';
import { body } from 'express-validator';
import * as userController from '../controllers/userController';

const router = express.Router();

router.post('/register', [
  body('username').isLength({ min: 3 }).trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], userController.register);

router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], userController.login);

export default router;