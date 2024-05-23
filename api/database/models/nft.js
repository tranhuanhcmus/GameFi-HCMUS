'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NFT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NFT.init({
    tokenId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      validate:{
        notNull:{
          args:true,
          msg:"TokenId is not null"
        }
      }
    },
    tokenUri: {
      type:DataTypes.TEXT,
      allowNull:true
    },
    owner: {
      type:DataTypes.TEXT,
      allowNull:true
    },
    exp: {
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    lastTimePlayed: {
      type:DataTypes.DATE,
      defaultValue: new Date()
    },
    energy: {
      type:DataTypes.INTEGER,
      defaultValue:3
    }
  }, {
    sequelize,
    modelName: 'NFT',
  });
  return NFT;
};