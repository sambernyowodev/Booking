const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    Id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    Name: { type: DataTypes.STRING(250), allowNull: false },
    Description: { type: DataTypes.STRING(250), allowNull: true },
  };

  const options = {
    freezeTableName: true,
    //add the timestamp attributes (updatedAt, createdAt)
    timestamps: true,
  };

  return sequelize.define("UserRoles", attributes, options);
}
