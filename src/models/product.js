'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Product.belongsTo(models.Category);
      Product.belongsTo(models.Category, { foreignKey: 'TenThuongHieu' });
    }
  }
  Product.init({
    SoHieuSanPham: DataTypes.STRING,
    XuatXu:DataTypes.STRING,
    GioiTinh: DataTypes.STRING,
    LoaiKinh:DataTypes.STRING,
    Pin:DataTypes.STRING,
    BaoHanh:DataTypes.STRING,
    DuongKinhMatSo:DataTypes.STRING,
    BeDayMatSo: DataTypes.STRING,
    DayDeo: DataTypes.STRING,
    ChongNuoc: DataTypes.STRING,
    ChucNang: DataTypes.STRING,
    Anhsp: DataTypes.TEXT,
    Giasp:DataTypes.STRING,
    NoiSanXuat: DataTypes.STRING,
    TenThuongHieu:DataTypes.STRING,
    
    
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};