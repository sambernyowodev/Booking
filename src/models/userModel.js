const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    Id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    UserName: { type: DataTypes.STRING(250), allowNull: false },
    Email: { type: DataTypes.STRING(250), allowNull: false },
    Password: { type: DataTypes.STRING(250), allowNull: false },
    FirstName: { type: DataTypes.STRING(250), allowNull: true },
    LastName: { type: DataTypes.STRING(250), allowNull: true },
  };

  const options = {
    freezeTableName: true,
    //add the timestamp attributes (updatedAt, createdAt)
    timestamps: true,
  };

  return sequelize.define("Users", attributes, options);
}
