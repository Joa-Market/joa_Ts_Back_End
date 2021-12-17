import { DataTypes, Model } from "sequelize"; 
import sequelize from "./index";
import { salepost } from './salepost';
import { address } from './address';

interface UsersAttributes{
  id?: number;
  email: string;
  password: string;
  snslogin?: string;
  nickName: string;
  salt: string;
  image?: string;
}

export class Users extends Model<UsersAttributes>{
  public readonly id!: number;
  public email!: string;
  public snslogin!: string;
  public nickName!: string;
  public salt!: string;
  public image!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  
  public static associations: {
  };
}
Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    snslogin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nickName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: "User",
  }
)

// Users.hasOne(address, {
//   as: "address",
//   foreignKey: "userid",
//   sourceKey: "id",
// });
// Users.hasMany(salepost, {
//   foreignKey: "userid",
//   sourceKey: "id",
// });
