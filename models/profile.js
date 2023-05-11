'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    get maskedPhoneNumber() {
      let editedPhoneNumber = this.phoneNumber;

      if (editedPhoneNumber.length > 4) {
        const numDigitsToMask = editedPhoneNumber.length - 4;
        const maskedDigits = '*'.repeat(numDigitsToMask);
        editedPhoneNumber = editedPhoneNumber.substring(0, 4) + maskedDigits;
      }

      return editedPhoneNumber;
    }

    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
  }
  Profile.init({
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};