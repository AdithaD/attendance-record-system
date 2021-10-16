import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface StudentPartsAttributes {
  studentPartId: number;
  partId: number;
  studentId: number;
  workEventId: number;
}

type StudentPartsCreationAttributes = Optional<
  StudentPartsAttributes,
  "studentPartId"
>;
export class StudentParts extends Model<
  StudentPartsAttributes,
  StudentPartsCreationAttributes
> {}

export function model(sequelize: Sequelize): void {
  StudentParts.init(
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
      modelName: "StudentParts",
    }
  );
}
