'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OwnerEnergy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OwnerEnergy.init({
    owner: {
		type:DataTypes.TEXT,
		allowNull:false,
		primaryKey:true,
    },
    remainingTime: {
      type:DataTypes.DATE,
      defaultValue: new Date()
    },
    energy: {
      type:DataTypes.INTEGER,
      defaultValue:3
    }
  }, {
    sequelize,
    modelName: 'OwnerEnergy',
  });
  return OwnerEnergy;
};