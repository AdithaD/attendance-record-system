import { Sequelize, Model, DataTypes, Optional } from "sequelize";
import { Test } from "./test_model";

interface TestScheduleAttributes {
  testScheduleId: number;
  testId: number;
  date: Date;
  teacher: string;
  completed: boolean;
}
type TestScheduleCreationAttributes = Optional<
  TestScheduleAttributes,
  "testScheduleId"
>;
export class TestSchedule extends Model<
  TestScheduleAttributes,
  TestScheduleCreationAttributes
> {}

export function model(sequelize: Sequelize): void {
  TestSchedule.init(
    {
      testScheduleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      testId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      teacher: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      completed: {
        type: DataTypes.BOOLEAN,
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
}
