'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SoHieuSanPham: {
        type: Sequelize.STRING
      },
      XuatXu: {
        type: Sequelize.STRING
      },
      GioiTinh: {
        type: Sequelize.STRING
      },
      LoaiKinh: {
        type: Sequelize.STRING
      },
      Pin: {
        type: Sequelize.STRING
      },
      BaoHanh: {
        type: Sequelize.STRING
      },
      DuongKinhMatSo: {
        type: Sequelize.STRING
      },
      BeDayMatSo: {
        type: Sequelize.STRING
      },
      DayDeo: {
        type: Sequelize.STRING
      },
      ChongNuoc: {
        type: Sequelize.STRING
      },
      ChucNang: {
        type: Sequelize.STRING
      },
      Anhsp: {
        type: Sequelize.TEXT
      },
      Giasp: {
        type: Sequelize.STRING
      },
      NoiSanXuat: {
        type: Sequelize.STRING
      },
      TenThuongHieu: {
        type: Sequelize.STRING,
        // references: {
        //   model: 'Categories',
        //   key: 'name'
        // },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Products');
  }
};