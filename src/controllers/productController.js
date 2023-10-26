const db = require("../models/index");



// Retrieve by Paging with name Category
exports.findAllByPage = (req, res) => {
  const { page, size, name } = req.query;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  const { limit, offset } = getPagination(page, size);
  Product.findAndCountAll({
    include: [
      {
        model: Category, 
      }
    ],
    where: condition,
    limit,
    offset
  })
  .then(data => {
    const response = getPagingData(data, page, limit);
    res.send(response);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving products."
    });
  });
};

// Find a single category with an name category



const findProductsByCategoryName = async (req, res) => {
  const { name } = req.params; // Lấy tên danh mục từ URL

  try {
    // Tìm danh mục dựa trên tên
    const category = await db.Category.findOne({
      where: { name },
    });

    if (!category) {
      return res.status(404).json({ message: 'Danh mục không tồn tại' });
    }

    // Tìm các sản phẩm thuộc danh mục này
    const products = await db.Product.findAll({
      where: { category: name },
    });

    return res.json({ category, products });
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi trong quá trình xử lý yêu cầu' });
  }
};




const storeProduct = async (req, res) => {
  try {
    if (
      req.body.SoHieuSanPham== "" ||
      req.body.XuatXu== "" ||
      req.body.GioiTinh== "" ||
      req.body.LoaiKinh== "" ||
      req.body.Pin== "" ||
      req.body.BaoHanh== "" ||
      req.body.DuongKinhMat== "" ||
      req.body.BeDayMatSo== "" ||
      req.body.DayDeo== "" ||
      req.body.ChongNuoc== "" ||
      req.body.ChucNang== "" ||
      req.body.Anhsp== "" ||
      req.body.Giasp== "" ||
      req.body.NoiSanXuat== "" ||
      req.body.TenThuongHieu== "" 

    ) {
      return res.json({
        success: false,
        message: "Vui lòng thêm đầy đủ thông tin sản phẩm",
      });
    } else {
      let SoHieuSanPham = req.body.SoHieuSanPham;
      let XuatXu = req.body.XuatXu;
      let GioiTinh = req.body.GioiTinh;
      let LoaiKinh = req.body.LoaiKinh;
      let Pin = req.body.Pin;
      let BaoHanh = req.body.BaoHanh;
      let DuongKinhMat = req.body.DuongKinhMat;
      let BeDayMatSo = req.body.BeDayMatSo;
      let DayDeo = req.body.DayDeo;
      let ChongNuoc = req.body.ChongNuoc;
      let ChucNang = req.body.ChucNang;
      let Anhsp = req.body.Anhsp;
      let Giasp = req.body.Giasp;
      let NoiSanXuat = req.body.NoiSanXuat;
      let TenThuongHieu = req.body.TenThuongHieu;
      let product = await db.Product.create({
        SoHieuSanPham :SoHieuSanPham,
        XuatXu :XuatXu,
        GioiTinh :GioiTinh,
        LoaiKinh :LoaiKinh,
        Pin :Pin,
        BaoHanh :BaoHanh,
        DuongKinhMat :DuongKinhMat,
        BeDayMatSo :BeDayMatSo,
        DayDeo :DayDeo,
        ChongNuoc :ChongNuoc,
        ChucNang :ChucNang,
        Anhsp :Anhsp,
        Giasp:Giasp,
        NoiSanXuat :NoiSanXuat,
        TenThuongHieu :TenThuongHieu,
      });
        return res.json({
          success: true,
          message: "Thêm sản phẩm thành công",
          product: product,
          price: price_add,
        });
      
    }
  } catch (error) {
    console.log(error);
  }
};

const indexProduct = async (req, res) => {
  try {
    const page = req.params.page;
    if (page <= 0) {
      return res.json({
        success: false,
        message: `Không tìm thấy sản phẩm`,
      });
    }
    const product_page = 2;

    let { count, rows } = await db.Product.findAndCountAll({
      offset: (page - 1) * product_page,
      limit: product_page,
    });
    const totalPages = Math.ceil(count / product_page);
    if (page == "" || page > totalPages) {
      return res.json({
        success: false,
        message: `Không tìm thấy sản phẩm`,
      });
    }
    return res.json({
      success: true,
      product: rows,
      countPage: totalPages,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    let SoHieuSanPham = req.body.SoHieuSanPham;
    let XuatXu = req.body.XuatXu;
    let GioiTinh = req.body.GioiTinh;
    let LoaiKinh = req.body.LoaiKinh;
    let Pin = req.body.Pin;
    let BaoHanh = req.body.BaoHanh;
    let DuongKinhMat = req.body.DuongKinhMat;
    let BeDayMatSo = req.body.BeDayMatSo;
    let DayDeo = req.body.DayDeo;
    let ChongNuoc = req.body.ChongNuoc;
    let ChucNang = req.body.ChucNang;
    let Anhsp = req.body.Anhsp;
    let Giasp = req.body.Giasp;
    let NoiSanXuat = req.body.NoiSanXuat;
    let TenThuongHieu = req.body.TenThuongHieu;

    let getproduct = await db.Product.findOne({ where: { id: id } });
    if (!getproduct) {
      return res.json({
        success: false,
        message: "Không tìm thấy sản phẩm cần sửa !",
      });
    } else {
      await db.Product.update({
        SoHieuSanPham :SoHieuSanPham,
        XuatXu :XuatXu,
        GioiTinh :GioiTinh,
        LoaiKinh :LoaiKinh,
        Pin :Pin,
        BaoHanh :BaoHanh,
        DuongKinhMat :DuongKinhMat,
        BeDayMatSo :BeDayMatSo,
        DayDeo :DayDeo,
        ChongNuoc :ChongNuoc,
        ChucNang :ChucNang,
        Anhsp :Anhsp,
        Giasp:Giasp,
        NoiSanXuat :NoiSanXuat,
        TenThuongHieu :TenThuongHieu,
      }, {
        where: { id: id }
      })
      
      return res.json({
        success: true,
        message: "Sửa sản phẩm thành công !",
      });
    }
  } catch (error) {
    console.log(error)
  }

};

const deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let getproduct = await db.Product.findOne({ where: { id: id } });
    if (!getproduct) {
      return res.json({
        success: false,
        message: "Không tìm thấy sản phẩm cần xóa !",
      });
    } else {
      await db.Product.destroy({
        where: {
          id: id,
        },
      });
      return res.json({
        success: true,
        message: "Xóa sản phẩm thành công!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const showProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await db.Product.findOne({
      where: { id: id },
    });
    if (!product) {
      return res.json({
        success: false,
        message: `Không có sản phẩm id= ${id}!`,
      });
    }
    return res.json({
      success: true,
      message: "Chi tiết sản phẩm",
      product: product,
    });
  } catch (error) {
    console.log(error);
  }
};


const showProducts = async (req, res) => {
  try {
    // Tìm tất cả sản phẩm
    const products = await db.Product.findAll();

    // Kiểm tra xem có sản phẩm nào không
    if (products.length === 0) {
      return res.json({
        success: false,
        message: "Không có sản phẩm nào!",
      });
    }

    return res.json({
      success: true,
      message: "Danh sách sản phẩm",
      products: products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Lỗi trong quá trình xử lý yêu cầu.",
    });
  }
};



const productshome = async (req, res) => {
  const products = await db.Product.findAll();
    res.render('home.ejs', { listproducts: products });
};
const productdetail=async(req, res)=>{
  const id=req.params.id
  const product = await db.Product.findOne({
    where: { id: id },
  });
  // let product= await showProduct(productid)
  res.render('detailsp.ejs',{productdt:product})
}
module.exports = {
  indexProduct,
  storeProduct,
  updateProduct,
  deleteProduct,
  showProduct,
  showProducts,
  findProductsByCategoryName,
  productshome,
  productdetail
};
