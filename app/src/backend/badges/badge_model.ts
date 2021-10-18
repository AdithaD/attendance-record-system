import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Test } from "./test_model";
import { Student } from "../students/student_model";
import { StudentBadge } from "../students/studentBadge_model";

interface BadgeAttributes {
  badgeId: number;
  badgeName: string;
  badgeTier: string;
  dateEarned: Date;
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
        allowNull: false,
      },
      dateEarned: {
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
      modelName: "Badge",
    }
  );
  console.log(Badge.sequelize);
  console.log(Badge === sequelize.models.Badge);
}

export function relation(): void {
  Badge.belongsToMany(Test, { through: "testBadge" });
  Badge.belongsToMany(Student, { through: StudentBadge });
  Student.hasOne(Badge, { foreignKey: "studentId" });
}
