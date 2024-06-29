'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cup.init({
    id: {
      type:DataTypes.UUID,
      allowNull:false,
      primaryKey:true,
      defaultValue: DataTypes.UUIDV4,
      validate:{
        notNull:{
          args:true,
          msg:"Cup id is not null"
        }
      }
    },
    owner: {
      type:DataTypes.TEXT,
      allowNull:false,
      primaryKey:true,
    },
    cup: {
      type:DataTypes.INTEGER,
      allowNull:false
    },

  }, {
    sequelize,
    modelName: 'Cup',
  });
  return Cup;
};