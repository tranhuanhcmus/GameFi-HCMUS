'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemGameOwner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ItemGameOwner.init({
    id: {
      type:DataTypes.UUID,
      allowNull:false,
      primaryKey:true,
      validate:{
        notNull:{
          args:true,
          msg:"ItemGameOwner id is not null"
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
    },


  }, {
    sequelize,
    modelName: 'ItemGameOwner',
  });
  return ItemGameOwner;
};