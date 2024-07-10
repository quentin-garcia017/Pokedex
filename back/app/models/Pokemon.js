import { sequelize } from "../database.js";
import { Model, DataTypes } from "sequelize";


export class Pokemon extends Model {}
Pokemon.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    atk: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    def: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    atk_spe: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    def_spe: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Pokemon',
    tableName: 'pokemon',
    timestamps: false,
  });
  
