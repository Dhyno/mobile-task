'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class toDo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  toDo.init({
    todoName: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'toDo',
  });
  return toDo;
};