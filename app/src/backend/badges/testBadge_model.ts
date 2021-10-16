import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { Test } from "./test_model";
import { Topic } from "./topic_model";

interface testBadgeAttributes {
    testBadgeId: number;
    badgeId: number;
    testId: number;
    name: string;
    isOptional: boolean;
}

type testBadgeCreationAttributes = Optional<testBadgeAttributes, "testBadgeId">;
export class testBadge extends Model<testBadgeAttributes, testBadgeCreationAttributes> {}

export function model(sequelize: Sequelize): void {
    testBadge.init(
        {
            testBadgeId: {
                type: DataTypes.INTEGER,
             primaryKey: true,
                autoIncrement: true,
            },
            badgeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            testId:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isOptional: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "testBadge",
        }
    );
}
