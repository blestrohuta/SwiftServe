'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static formatPrice(price) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
    }

    static associate(models) {
      Item.belongsTo(models.Category)
      Item.hasMany(models.OrderDemand)
    }
  }
  Item.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};