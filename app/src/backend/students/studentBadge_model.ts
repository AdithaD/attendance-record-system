import { DataTypes, Model, Sequelize } from "sequelize";
import { Badge } from "../badges/badge_model";
import { Student } from "../students/student_model";

interface StudentBadgeAttributes {
  badgeId: number;
  studentId: number;
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
    },
    {
      sequelize,
      modelName: "StudentBadge",
    }
  );
}

export function relations(): void {
  StudentBadge.belongsTo(Student, { foreignKey: "studentId" });
  StudentBadge.belongsTo(Badge, { foreignKey: "badgeId" });
}
