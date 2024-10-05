import { Op } from 'sequelize';
import { Room, Booking } from '../models';

export const getAvailableRooms = async (checkInDate, checkOutDate) => {
  const unavailableRoomIds = await Booking.findAll({
    attributes: ['room_id'],
    where: {
      [Op.or]: [
        {
          check_in_date: { [Op.lte]: checkOutDate },
          check_out_date: { [Op.gte]: checkInDate }
        }
      ]
    },
    raw: true
  });

  const unavailableIds = unavailableRoomIds.map(booking => booking.room_id);

  return Room.findAll({
    where: {
      id: { [Op.notIn]: unavailableIds }
    }
  });
};

export const createRoom = async (roomNumber, capacity, pricePerNight, description) => {
  return Room.create({
    room_number: roomNumber,
    capacity,
    price_per_night: pricePerNight,
    description
  });
};

export const getAllRooms = async () => {
  return Room.findAll();
};

export default {
  getAvailableRooms,
  createRoom,
  getAllRooms,
};