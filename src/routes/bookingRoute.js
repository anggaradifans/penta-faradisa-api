import express from 'express';
import { body, param } from 'express-validator';
import * as bookingController from '../controllers/bookingController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/', [
  body('room_id').isInt(),
  body('check_in_date').isISO8601().toDate(),
  body('check_out_date').isISO8601().toDate(),
  body('total_price').isFloat({ min: 0 })
], authenticateToken, bookingController.createBooking);

router.get('/user', authenticateToken, bookingController.getUserBookings);

router.patch('/:booking_id/cancel', [
  param('booking_id').isInt()
], authenticateToken, bookingController.cancelBooking);

export default router;