'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemAppOwner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ItemAppOwner.init({
    id: {
      type:DataTypes.UUID,
      allowNull:false,
      primaryKey:true,
      validate:{
        notNull:{
          args:true,
          msg:"ItemAppOwner id is not null"
        }
      }
    },
    owner: {
      type:DataTypes.TEXT,
      allowNull:false,
      primaryKey:true,
    },
    quantity: {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'ItemAppOwner',
  });
  return ItemAppOwner;
};