'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDemand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDemand.belongsTo(models.User)
      OrderDemand.belongsTo(models.Item)
    }
  }
  OrderDemand.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    startDate: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: 'Date cannot be empty'
        }
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Duration cannot be empty'
        }
      }
    },
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderDemand',
  });
  return OrderDemand;
};