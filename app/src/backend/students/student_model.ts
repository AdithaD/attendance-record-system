import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface StudentAttributes {
  studentId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  notes: Text | null;
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
      tableName: "Student",
    }
  );
}
