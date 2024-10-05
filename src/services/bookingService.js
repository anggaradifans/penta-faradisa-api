import { Op } from 'sequelize';
import { Booking, Room, User } from '../models';

export const createBooking = async (userId, roomId, checkInDate, checkOutDate, totalPrice) => {
  const transaction = await Booking.sequelize.transaction();

  try {
    const availabilityCheck = await Booking.findOne({
      where: {
        room_id: roomId,
        [Op.or]: [
            {
              check_in_date: { [Op.lte]: checkOutDate },
              check_out_date: { [Op.gte]: checkInDate }
            }
        ]
      },
      transaction,
    });

    if (availabilityCheck) {
      throw new Error('Room is not available for the selected dates');
    }

    const booking = await Booking.create(
      {
        user_id: userId,
        room_id: roomId,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        total_price: totalPrice,
        status: 'confirmed',
      },
      { transaction }
    );

    await transaction.commit();
    return booking;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const getUserBookings = async (userId) => {
  return Booking.findAll({
    where: { user_id: userId },
    include: [
      {
        model: Room,
        attributes: ['room_number', 'capacity', 'price_per_night'],
      },
    ],
    order: [['check_in_date', 'DESC']],
  });
};

export const cancelBooking = async (bookingId, userId) => {
  const [updatedRowsCount, updatedBookings] = await Booking.update(
    { status: 'cancelled' },
    {
      where: { id: bookingId, user_id: userId },
      returning: true,
    }
  );

  if (updatedRowsCount === 0) {
    throw new Error('Booking not found or not owned by user');
  }

  return updatedBookings[0];
};

export default {
  createBooking,
  getUserBookings,
  cancelBooking,
};