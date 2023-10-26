'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Username address already in use!'
        },
        validate: {
          notEmpty: {
            args: true,
            msg: 'username can not be empty !'
          },
          notNull: {
            args: true,
            msg: 'Please enter username !'
          },
        }
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        },
        unique: {
          args: true,
          msg: 'Email address already in use!'
        },
        validate: {
          notEmpty: {
            args: true,
            msg: 'Email can not be empty !'
          },
          notNull: {
            args: true,
            msg: 'Please enter email !'
          },
        }
      },
      
      password: {
        type: Sequelize.STRING
      },
      fistname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      RoleId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};