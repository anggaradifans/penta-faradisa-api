import { validationResult } from 'express-validator';
import roomService from '../services/roomService';
import logger from '../utils/logger';

export const getAvailableRooms = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { check_in_date, check_out_date } = req.query;
    const rooms = await roomService.getAvailableRooms(check_in_date, check_out_date);
    res.json(rooms);
  } catch (error) {
    logger.error('Error getting available rooms', { error });
    next(error);
  }
};

export const createRoom = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { room_number, capacity, price_per_night, description } = req.body;
    const room = await roomService.createRoom(room_number, capacity, price_per_night, description);
    res.status(201).json(room);
  } catch (error) {
    logger.error('Error creating room', { error });
    next(error);
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await roomService.getAllRooms();
    res.json(rooms);
  } catch (error) {
    logger.error('Error getting all rooms', { error });
    next(error);
  }
};