import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Badge } from "../badges/badge_model";
import { Part } from "../badges/part_model";
import { StudentBadge } from "../students/studentBadge_model";
import { TestSchedule } from "../badges/test_schedule_model";

interface StudentAttributes {
  studentId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  notes: string | null;
}

type StudentCreationAttributes = Optional<StudentAttributes, "studentId">;
export class Student extends Model<
  StudentAttributes,
  StudentCreationAttributes
> {}

export function model(sequelize: Sequelize): void {
  Student.init(
    {
      studentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Student",
    }
  );
}

export function relation(): void {
  Student.belongsToMany(Part, { through: "studentParts" });
  Student.belongsToMany(Badge, { through: StudentBadge });
  Student.hasMany(TestSchedule, {
    foreignKey: { name: "completed" },
  });
  Student.belongsTo(Badge);
}
