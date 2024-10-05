import { validationResult } from 'express-validator';
import bookingService from '../services/bookingService';
import logger from '../utils/logger';

export const createBooking = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { room_id, check_in_date, check_out_date, total_price } = req.body;
    const user_id = req.user.userId;
    const booking = await bookingService.createBooking(user_id, room_id, check_in_date, check_out_date, total_price);
    res.status(201).json(booking);
  } catch (error) {
    logger.error('Error creating booking', { error });
    next(error);
  }
};

export const getUserBookings = async (req, res, next) => {
  try {
    const user_id = req.user.userId;
    const bookings = await bookingService.getUserBookings(user_id);
    res.json(bookings);
  } catch (error) {
    logger.error('Error getting user bookings', { error });
    next(error);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    const { booking_id } = req.params;
    const user_id = req.user.userId;
    await bookingService.cancelBooking(booking_id, user_id);
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    logger.error('Error cancelling booking', { error });
    next(error);
  }
};