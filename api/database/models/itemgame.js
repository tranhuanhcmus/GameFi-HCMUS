'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ItemGame.init({
    id: {
      type:DataTypes.UUID,
      allowNull:false,
      primaryKey:true,
      defaultValue: DataTypes.UUIDV4,
      validate:{
        notNull:{
          args:true,
          msg:"TokenId is not null"
        }
      }
    },
    name: {
      type:DataTypes.TEXT,
      allowNull:false
    },
    description: {
      type:DataTypes.TEXT,
      allowNull:true
    },
    category: {
      type:DataTypes.TEXT,
      allowNull:true
    },
    quantity: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    gemcost: {
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    goldcost: {
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    image: {
      type:DataTypes.TEXT,
      allowNull:true
    },

  }, {
    sequelize,
    modelName: 'ItemGame',
  });
  return ItemGame;
};