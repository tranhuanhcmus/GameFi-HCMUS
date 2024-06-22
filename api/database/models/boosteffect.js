'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BoostEffect extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BoostEffect.init({
    id: {
      type:DataTypes.UUID,
      allowNull:false,
      primaryKey:true,
      validate:{
        notNull:{
          args:true,
          msg:"BoostEffect id is not null"
        }
      }
    },
    owner: {
      type:DataTypes.TEXT,
      allowNull:false,
      primaryKey:true,
    }
  }, {
    sequelize,
    modelName: 'BoostEffect',
  });
  return BoostEffect;
};