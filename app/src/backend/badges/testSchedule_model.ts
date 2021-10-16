import { DataTypes, INTEGER, Model, Optional, Sequelize } from "sequelize";

interface testScheduleAttributes {
    testId: number;
    timeSlot: Date;
}

type testScheduleCreationAttributes = Optional<testScheduleAttributes, "testId">;
export class testSchedule extends Model<testScheduleAttributes, testScheduleCreationAttributes
> {}

export function model(sequelize: Sequelize): void {
    testSchedule.init(
        {
            testId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: false,
            },
            timeSlot: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
       {
           sequelize,
           modelName: "testSchedule",
       }
    );
    console.log(testSchedule.sequelize);
    console.log(testSchedule === sequelize.models.testSchedule);
}