import { sequelize } from "../database.js";
import { Model, DataTypes } from "sequelize";
import { Pokemon } from "./Pokemon.js";

export class Team extends Model {}
Team.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Team',
    tableName: 'team',
    timestamps: false,
  });

