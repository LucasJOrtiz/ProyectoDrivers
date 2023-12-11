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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // firstName: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // lastName: {
    //   type: DataTypes.STRING,
    // },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '/path/to/default.png' 
    },
    // image: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   defaultValue: {
    //     img: 'cr-pi-drivers-main\client\public\images\default.png',  
    //     description: 'We are updating our database, come back later to see the image' 
    //   },
    // },
    dob: {
      type: DataTypes.DATEONLY,
    },
    nationality: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
      length: [10, 200],
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },

  {
    timestamps: false,
    paranoid: true,
  }
  );
};