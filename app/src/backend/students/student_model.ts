import { DataTypes, Sequelize } from "sequelize";

function model(sequelize: Sequelize): void {
  sequelize.define(
    "Student",
    {
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
    }
  );
}

export default model;
