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

    forename: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        if (value==="") {
          this.setDataValue('image', "https://drive.google.com/file/d/1quRhU8FwVxVV7qWMy6JWdQOpY6ls8AeC/view?usp=sharing")
        } else {
          this.setDataValue('image', (value))};
      },
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