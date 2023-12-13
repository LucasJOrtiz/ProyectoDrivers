const { DataTypes } = require('sequelize');
const { defaultImagePath } = require('../utils');

module.exports = (sequelize) => {

  sequelize.define('Driver', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique:true,
    },

    forename: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    name: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      get() {
        const forename = this.getDataValue('forename');
        const surname = this.getDataValue('surname');
        return `${forename} ${surname}`;
      },
      set(value) {
        const parts = value.split(' ');
        this.setDataValue('forename', parts[0]);
        this.setDataValue('surname', parts[1]);
      },
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: defaultImagePath
    },

    dob: {
      type: DataTypes.DATEONLY,
    },

    nationality: {
      type: DataTypes.STRING,
    },

    description: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [10, 200],
          msg: 'Description length must be between 10 and 200 characters.',
        },
      },
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