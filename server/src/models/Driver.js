const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('Driver', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique:true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      length: [10, 200],
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: {
        img: 'cr-pi-drivers-main\client\public\images\default.png',  
        description: 'We are updating our database, come back later to see the image' 
      },
    },
    nationality: {
      type: DataTypes.STRING,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
    },
  },

  {
    timestamps: false,
    paranoid: true,
  }
  );
};