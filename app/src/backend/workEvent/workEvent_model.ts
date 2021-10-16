import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface workEventAttributes {
  workEventId: number;
  date: Date;
  type: String;
}

type workEventCreationAttributes = Optional<workEventAttributes, "workEventId">;
export class workEvent extends Model<
  workEventAttributes,
  workEventCreationAttributes
> {}

export function model(sequelize: Sequelize): void {
  workEvent.init(
    {
      workEventId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      type: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "workEvent",
    }
  );
  console.log(workEvent.sequelize);
  console.log(workEvent === sequelize.models.Badge);
}
