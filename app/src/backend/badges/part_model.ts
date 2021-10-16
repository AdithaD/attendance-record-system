import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Topic } from "./topic_model";
import { Student } from "../students/student_model";

interface PartAttributes {
  partId: number;
  topicId: number;
  name: string;
}

type PartCreationAttributes = Optional<PartAttributes, "partId">;
export class Part extends Model<PartAttributes, PartCreationAttributes> {}

export function model(sequelize: Sequelize): void {
  Part.init(
    {
      partId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      topicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // Model attributes are defined here
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Part",
    }
  );
}

export function relations(): void {
  Part.belongsTo(Topic, {
    foreignKey: { name: "topicId" },
  });
}

export function relation(): void {
  Part.belongsToMany(Student, { through: "studentParts" });
}
