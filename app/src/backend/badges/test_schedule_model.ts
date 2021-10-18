import { Sequelize, Model, DataTypes, Optional } from "sequelize";
import { Student } from "../students/student_model";
import { Test } from "./test_model";
import { Topic } from "./topic_model";

interface TestScheduleAttributes {
  testId: number;
  date: Date;
  completed: boolean;
}

export class TestSchedule extends Model<TestScheduleAttributes> {}

export function model(sequelize: Sequelize): void {
  TestSchedule.init(
    {
      testId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
        primaryKey: true,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        primaryKey: true,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "TestSchedule",
    }
  );
}

export function relations(): void {
  TestSchedule.belongsTo(Test, {
    foreignKey: { name: "testId" },
  });
  TestSchedule.belongsTo(Student);
}
