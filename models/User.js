const { Model, DataTypes } = require('sequelize');
//require bcrypt to hash my users password
const bcrypt = require('bcrypt');

const sequelize = require('../config/connection');
   

   //create our USER MODEL
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        //define an id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //define username COLUMN
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },

        //define password COLUMN
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //password must be at least 4 characters long
                len: [4]
            }
        }
    },
    //hooks in second object
    {
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },

            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);