import {
  Sequelize,
  Model,
  ModelDefined,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
} from "sequelize";
import { Topic } from "./topic_model";

interface TestAttributes {
  testId: number;
  name: string;
  date: Date | null;
}

type TestCreationAttributes = Optional<TestAttributes, "testId" | "date">;
export class Test extends Model<TestAttributes, TestCreationAttributes> {
  public getTopics!: HasManyGetAssociationsMixin<Topic>; // Note the null assertions!
  public addTopic!: HasManyAddAssociationMixin<Topic, number>;
  public hasTopic!: HasManyHasAssociationMixin<Topic, number>;
  public countTopics!: HasManyCountAssociationsMixin;
  public createTopic!: HasManyCreateAssociationMixin<Topic>;
}

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
      date: {
        type: DataTypes.DATE,
        allowNull: true,
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
}
