import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface PartAttributes {
  partId: number;
  name: string;
}

type PartCreationAttributes = Optional<PartAttributes, "partId">;
export class Part extends Model<PartAttributes, PartCreationAttributes> {}

export function model(sequelize: Sequelize): void {
  Part.init(
    {
      partId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Model attributes are defined here
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Part",
    }
  );
}
