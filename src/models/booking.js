import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Booking = sequelize.define('Booking', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  room_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Rooms',
      key: 'id',
    },
  },
  check_in_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  check_out_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('confirmed', 'cancelled'),
    defaultValue: 'confirmed',
  },
});

Booking.associate = (models) => {
  Booking.belongsTo(models.User, { foreignKey: 'user_id' });
  Booking.belongsTo(models.Room, { foreignKey: 'room_id' });
};

export default Booking;