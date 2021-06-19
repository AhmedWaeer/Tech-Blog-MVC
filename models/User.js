/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {

    checkPassword(loginPassword) {

        return bcrypt.compareSync(loginPassword, this.password);


    }

}

User.init({

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,

    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            len: [4],
        },

    },
}, {
    hooks: {
        beforeCreate: async(newUserData) => {

            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },

        beforeUpdate: async(newUserData) => {

            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;

        },
    },


    sequelize,

});

module.exports = User;