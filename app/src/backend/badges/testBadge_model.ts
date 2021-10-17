import { DataTypes, Model, Sequelize } from "sequelize";
import { Badge } from "./badge_model";
import { Test } from "./test_model";

interface TestBadgeAttributes {
  badgeId: number;
  testId: number;
  isOptional: boolean;
}

export class TestBadge extends Model<TestBadgeAttributes> {}

export function model(sequelize: Sequelize): void {
  TestBadge.init(
    {
      badgeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: Badge,
          key: "badgeId",
        },
      },
      testId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: Test,
          key: "testId",
        },
      },
      isOptional: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "TestBadge",
    }
  );
}
