import sequelize from '../database.js';
import { DataTypes, Model } from 'sequelize';

// 1. Je créer ma class qui extends de Model
class User extends Model {}

// 2. Je dois initialiser mon modèle
User.init(
  // 2.1 Je dois définir les attributs de mon modèle
  {
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    username: {
      type: DataTypes.TEXT,
    },
    role: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'user',
    },
  },
  // 2.2 Je dois passé des informations supplémentaires sur mon entité
  {
    // Je passe la connexion à ma base de données
    sequelize,
    tableName: 'user',
  },
);

export default User;
