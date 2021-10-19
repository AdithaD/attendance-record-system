import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Part } from "../badges/part_model";
import { WorkEvent } from "../workEvent/workEvent_model";
import { Student } from "./student_model";

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
        references: {
          model: WorkEvent,
          key: "workEventId",
        },
      },
    },
    {
      sequelize,
      modelName: "StudentParts",
    }
  );
}

export function relations(): void {
  StudentParts.belongsTo(Student, { foreignKey: "studentId" });
  StudentParts.belongsTo(Part, { foreignKey: "partId" });
  StudentParts.belongsTo(WorkEvent, { foreignKey: "workEventId" });
}
