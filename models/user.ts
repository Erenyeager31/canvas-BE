import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../dbconfig";

interface userAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  attempts:number;
  lockin:Date;
}

export interface UserInput extends Optional<userAttributes, "id" | 'attempts' | "lockin"> {}
export interface UserOutput extends Required<userAttributes> {}

class User extends Model<userAttributes, UserInput> implements userAttributes {
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public attempts!: number;
  public lockin!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attempts:{
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    lockin:{
      type:DataTypes.DATE,
      allowNull:true
    }
  },
  {
    sequelize: sequelizeConnection,
    tableName: "users",
    timestamps: true,
  }
);

export default User;
