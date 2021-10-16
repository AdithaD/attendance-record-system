import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface WorkEventAttributes {
  workEventId: number;
  date: Date;
}

type WorkEventCreationAttributes = Optional<WorkEventAttributes, "workEventId">;
export class WorkEvent extends Model<
  WorkEventAttributes,
  WorkEventCreationAttributes
> {}

export function model(sequelize: Sequelize): void {
  WorkEvent.init(
    {
      workEventId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "WorkEvent",
    }
  );
}
