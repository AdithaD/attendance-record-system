import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Part } from "./part_model";
import { Test } from "./test_model";

interface TopicAttributes {
  topicId: number;
  testId: number;
  name: string;
  optional: boolean;
}

type TopicCreationAttributes = Optional<TopicAttributes, "topicId">;
export class Topic extends Model<TopicAttributes, TopicCreationAttributes> {}

export function model(sequelize: Sequelize): void {
  Topic.init(
    {
      topicId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      testId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // Model attributes are defined here
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      optional: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Topic",
    }
  );
}

export function relations(): void {
  Topic.hasMany(Part, {
    foreignKey: { name: "topicId" },
    constraints: false,
  });
  Topic.belongsTo(Test, { foreignKey: { name: "testId" } });
}
