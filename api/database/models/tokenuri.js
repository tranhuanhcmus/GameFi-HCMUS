'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TokenUri extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TokenUri.init({
    tokenUri: {
      type:DataTypes.TEXT,
      unique:true
    },
    data: {
      type:DataTypes.JSONB,
      allowNull:true,
    }
  }, {
    sequelize,
    modelName: 'TokenUri',
  });
  return TokenUri;
};