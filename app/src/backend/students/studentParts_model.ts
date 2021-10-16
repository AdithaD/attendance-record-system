import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface studentPartsAttributes {
  studentPartId: number;
  partId: number;
  studentId: number;
  workEventId: number;
}

type studentPartsCreationAttributes = Optional<
  studentPartsAttributes,
  "studentPartId"
>;
export class studentParts extends Model<
  studentPartsAttributes,
  studentPartsCreationAttributes
> {}

export function model(sequelize: Sequelize): void {
  studentParts.init(
    {
      studentPartId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      partId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      workEventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "studentParts",
    }
  );
}
