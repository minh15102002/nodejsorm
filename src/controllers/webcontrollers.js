const db = require("../models/index");
const productController = require("./productController");
const authController = require("./authController");

const productshome = async (req, res) => {
    const products = await db.Product.findAll();
      res.render('home.ejs', { listproducts: products });
  };
const productdetail=async(req, res)=>{
    const id=req.params.id
    const product = await db.Product.findOne({
      where: { id: id },
    });
    res.render('detailsp.ejs',{productdt:product})
  }
  const registerhome=(req, res)=>{
    res.render('register.ejs')
  }
  const loginhome=async(req, res)=>{
    res.render('login.ejs')
  }
  const getUpdateUser=async (req, res) => {
    const userid=req.params.id
    let user= await db.User.findByPk(userid);
    res.render('editUser.ejs',{useredit:user})
    if (!user) {
      return res.status(404).send("Tài khoản không tồn tại");
    }
  }
  const postUpdateUser = async (req, res) => {
    try {
      let id = req.body.id;
      let username = req.body.username;
      let email = req.body.email;
      let fistname = req.body.fistname;
      let lastname = req.body.lastname;
      let password = req.body.password;
      let RoleId = req.body.RoleId;
  
      let getuser = await db.User.findOne({ where: { id: id } });
      if (!getuser) {
        return res.json({
          success: false,
          message: "Không tìm thấy nguoi dung cần sửa !",
        });
      } else {
        await db.User.update({
          username :username,
          email :email,
          fistname :fistname,
          lastname :lastname,
          password :password,
          RoleId :RoleId,
        }, {
          where: { id: id }
        })
        
        return res.json({
          success: true,
          message: "Sửa nguoi dung thành công !",
        });
      }
    } catch (error) {
      console.log(error)
    }
  
  };
  const getUpdateProduct=async(req, res)=>{
    // res.render('updatepr.ejs')
  }
  const postUpdateProduct=async(req, res)=>{
    // res.render('updatepr.ejs')
  }
  const usershome=async(req, res)=>{
    const users = await db.User.findAll();
    res.render('homeUser.ejs', { listusers: users });
  }
  const postdeleteuser = async (req, res) => {
    try {
      let id = req.params.id;
      let getuser = await db.User.findOne({ where: { id: id } });
      if (!getuser) {
        return res.json({
          success: false,
          message: "Không tìm thấy user cần xóa !",
        });
      } else {
        await db.User.destroy({
          where: {
            id: id,
          },
        });
        return res.json({
          success: true,
          message: "Xóa user thành công!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const getdeleteuser=async(req, res)=>{
    let id = req.params.id;
    const users = await db.User.findOne({where:{id:id}});
    res.render('homeUser.ejs', { listusers: users });
  }
  
  module.exports = {
    loginhome,
    registerhome,
    usershome,
    productshome,
    productdetail,
    getUpdateUser,
    postUpdateProduct,
    getUpdateProduct,
    postUpdateUser,
    getdeleteuser,
    postdeleteuser,
  };