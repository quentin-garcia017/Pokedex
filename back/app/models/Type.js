import { sequelize } from "../database.js";
import { Model, DataTypes } from "sequelize";

export class Type extends Model {}
Type.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Type',
    tableName: 'type',
    timestamps: false,
  });