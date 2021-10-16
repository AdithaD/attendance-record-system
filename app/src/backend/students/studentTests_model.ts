import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface studentTestsAttributes { 
    studentTestId: number;
    testId: number;
    studentId: number;
    workEventId: number;
}

type studentTestsCreationAttributes = Optional<studentTestsAttributes, "studentTestId">;
export class studentTests extends Model<studentTestsAttributes, studentTestsCreationAttributes>{}

export function model(sequelize: Sequelize): void {
    studentTests.init(
        {
            studentTestId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            testId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            studentId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            workEventId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "studentTests",
        }
    );
}