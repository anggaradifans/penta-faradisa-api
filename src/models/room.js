import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Room = sequelize.define('Room', {
  room_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price_per_night: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: DataTypes.TEXT,
});

Room.associate = (models) => {
  Room.hasMany(models.Booking, { foreignKey: 'room_id' });
};

export default Room;