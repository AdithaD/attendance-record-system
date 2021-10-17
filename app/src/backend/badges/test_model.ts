import { Sequelize, Model, DataTypes, Optional } from "sequelize";
import { TestSchedule } from "./test_schedule_model";
import { Badge } from "./badge_model";
import { Topic } from "./topic_model";
import { TestBadge } from "./testBadge_model";

interface TestAttributes {
  testId: number;
  name: string;
}

type TestCreationAttributes = Optional<TestAttributes, "testId">;
export class Test extends Model<TestAttributes, TestCreationAttributes> {}

export function model(sequelize: Sequelize): void {
  Test.init(
    {
      testId: {
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
      modelName: "Test",
    }
  );
}

export function relations(): void {
  Test.hasMany(Topic, {
    foreignKey: { name: "testId" },
    constraints: false,
  });

  Test.hasMany(TestSchedule, {
    foreignKey: { name: "testId" },
  });

  Test.belongsToMany(Badge, { through: TestBadge, foreignKey: "testId" });
}
