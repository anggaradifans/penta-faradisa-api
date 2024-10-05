import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.associate = (models) => {
  User.hasMany(models.Booking, { foreignKey: 'user_id' });
};

export default User;