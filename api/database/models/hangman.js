'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hangman extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Hangman.init({
    id: {
      type:DataTypes.UUID,
      allowNull:false,
      primaryKey:true,
      defaultValue: DataTypes.UUIDV4,
      validate:{
        notNull:{
          args:true,
          msg:"Hangman id is not null"
        }
      }
    },
    question: {
      type:DataTypes.TEXT,
      allowNull:false
    },
    answer: {
      type:DataTypes.TEXT,
      allowNull:true
    }
  }, {
    sequelize,
    modelName: 'Hangman',
  });
  return Hangman;
};