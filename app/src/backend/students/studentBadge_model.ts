import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Badge } from "../badges/badge_model";
import { Student } from "../students/student_model";

interface StudentBadgeAttributes {
  badgeId: number;
  studentId: number;
  completionDate: Date;
}

export class StudentBadge extends Model<StudentBadgeAttributes> {}

export function model(sequelize: Sequelize): void {
  StudentBadge.init(
    {
      badgeId: {
        type: DataTypes.INTEGER,
        references: {
          model: Badge,
          key: "badgeId",
        },
        primaryKey: true,
      },
      // Model attributes are defined here
      studentId: {
        type: DataTypes.INTEGER,
        references: {
          model: Student,
          key: "studentId",
        },
        primaryKey: true,
      },
      completionDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "StudentBadge",
    }
  );
}
