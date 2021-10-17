import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Test } from "./test_model";
import { Student } from "../students/student_model";
import { StudentBadge } from "../students/studentBadge_model";
import { TestBadge } from "./testBadge_model";

export enum Type {
  A,
  S,
  C,
}

export enum Tier {
  Diamond,
  Platnium,
  Lithium,
}

interface BadgeAttributes {
  badgeId: number;
  badgeName: string;
  badgeTier: string;
  badgeType: string;
  notes: string | null;
}

type BadgeCreationAttributes = Optional<BadgeAttributes, "badgeId">;
export class Badge extends Model<BadgeAttributes, BadgeCreationAttributes> {}

export function model(sequelize: Sequelize): void {
  Badge.init(
    {
      badgeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Model attributes are defined here
      badgeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      badgeTier: {
        type: DataTypes.STRING,
        validate: {
          isIn: [Object.keys(Tier)],
        },
        allowNull: false,
      },
      badgeType: {
        type: DataTypes.STRING,
        validate: {
          isIn: [Object.keys(Type)],
        },
        allowNull: false,
      },

      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Badge",
    }
  );
  console.log(Badge.sequelize);
  console.log(Badge === sequelize.models.Badge);
}

export function relations(): void {
  Badge.belongsToMany(Test, { through: TestBadge, foreignKey: "badgeId" });
  Badge.belongsToMany(Student, {
    through: StudentBadge,
    foreignKey: "badgeId",
  });
}
