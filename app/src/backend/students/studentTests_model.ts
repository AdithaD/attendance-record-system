import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface StudentTestsAttributes {
  studentTestId: number;
  testId: number;
  studentId: number;
  workEventId: number;
}

type StudentTestsCreationAttributes = Optional<
  StudentTestsAttributes,
  "studentTestId"
>;
export class StudentTests extends Model<
  StudentTestsAttributes,
  StudentTestsCreationAttributes
> {}

export function model(sequelize: Sequelize): void {
  StudentTests.init(
    {
      studentTestId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      testId: {
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
      modelName: "StudentTests",
    }
  );
}
