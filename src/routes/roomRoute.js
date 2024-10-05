import express from 'express';
import { query, body } from 'express-validator';
import * as roomController from '../controllers/roomController';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = express.Router();

router.get('/available', [
  query('check_in_date').isISO8601().toDate(),
  query('check_out_date').isISO8601().toDate()
], authenticateToken, roomController.getAvailableRooms);

router.post('/', [
  body('room_number').isString().notEmpty(),
  body('capacity').isInt({ min: 1 }),
  body('price_per_night').isFloat({ min: 0 }),
  body('description').isString().optional()
], authenticateToken, isAdmin, roomController.createRoom);

router.get('/', authenticateToken, isAdmin, roomController.getAllRooms);

export default router;