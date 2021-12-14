import { DataTypes, Model } from "sequelize"; 
import sequelize from "./index";
import { Users } from './user';
import { address } from './address';

interface salepostAttributes{
  id?: number;
  userid: number;
  title: string;
  contents: string;
  productImg: string;
  productName: string;
  price: number;
  chatCnt?: number;
  commentCnt?: number;
  likeCnt?: number;
  lookCnt?: number;
}

export class salepost extends Model<salepostAttributes>{
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
salepost.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userid: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        title: {
            type: DataTypes.STRING,
        },
        contents: {
            type: DataTypes.STRING,
        },
        productImg: {
            type: DataTypes.STRING,
        },
        productName: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        chatCnt: {
            type: DataTypes.INTEGER,
            defaultValue : 0,
        },
        commentCnt: {
            type: DataTypes.INTEGER,
            defaultValue : 0,
        },
        likeCnt: {
            type: DataTypes.INTEGER,
            defaultValue : 0,
        },
        lookCnt: {
            type: DataTypes.INTEGER,
            defaultValue : 0,
        }
    },
    {
        sequelize,
        modelName: "salepost",
    }
);

salepost.belongsTo(Users, {
    foreignKey: 'userid', targetKey: 'id'
});
salepost.belongsTo(address, {
    foreignKey: 'userid', targetKey: 'id'
});


