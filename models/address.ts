"use strict";
import { DataTypes, Model } from "sequelize"; 
import sequelize from "./index";
import { Users } from './user';

interface addressAttributes{
  id?: number;
  address_name: string;
  road_address_name: string;
  userid: number;
  x: number;
  y: number;
}
export class address extends Model<addressAttributes>{
  public readonly id!: number;
  public userid!: string;
  public title!: string;
  public contents!: string;
  public productImg!: string;
  public productName!: string;
  public price!: number;
  public chatCnt!: number;
  public commentCnt!: number;
  public likeCnt!: number;
  public lookCnt!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  
  public static associations: {
  };
}
address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    address_name: {
      type: DataTypes.STRING,

    },
    road_address_name: {
      type: DataTypes.STRING,

    },
    x: {
      type: DataTypes.DOUBLE,

    },
    y: {
      type: DataTypes.DOUBLE,

    },
    userid:{
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    }
  },
  {
    sequelize,
    modelName: "address"
  }
);

address.belongsTo(Users, {
  foreignKey: 'userid', targetKey: 'id'
});
