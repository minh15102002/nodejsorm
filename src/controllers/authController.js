const db = require("../models/index");
const bcrypt = require("bcrypt");
const JWT = require("../middleware/JWT");

const checkEmail = async (emailUser) => {
  let user = await db.User.findOne({
    where: { email: emailUser },
  });
  if (user) {
    return true;
  } else {
    return false;
  }
};

const checkUserName = async (userName) => {
  let user = await db.User.findOne({
    where: { username: userName },
  });
  if (user) {
    return true;
  } else {
    return false;
  }
};

const checkPassword = async (password, hashedPassword) => {
  const checkPass = await bcrypt.compare(password, hashedPassword);
  return checkPass;
};

const registerhome=(req, res)=>{
  res.render('register.ejs')
}
const register = async (req, res) => {
  try {
    if (
      !req.body.username ||
      !req.body.email ||
      !req.body.fistname ||
      !req.body.lastname ||
      !req.body.password
    ) {
      return res.json({
        success: false,
        message: "Vui lòng điền đầy đủ thông tin đăng ký",
      });
    } else {
      let username = req.body.username;
      let email = req.body.email;
      let fistname = req.body.fistname;
      let lastname = req.body.lastname;
      let password = req.body.password;
      let isEmailExit = await checkEmail(email);
      let isUserName = await checkUserName(username);
      if (isEmailExit == true) {
        return res.json({
          success: false,
          message: "Email đã tồn tại !",
        });
      }
      if (isUserName == true) {
        return res.json({
          success: false,
          message: "Tên đăng nhập đã tồn tại !",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.User.create({
        email: email,
        username: username,
        fistname:fistname,
        lastname :lastname,
        password: hashedPassword,
        RoleId: 2,
      });
      return res.json({
        success: false,
        message: "Đăng ký thành công !",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const loginhome=async(req, res)=>{
  res.render('login.ejs')
}
const login = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.json({
        success: false,
        message: "Vui lòng điền đầy đủ thông tin đăng nhập",
      });
    } else {
      let username = req.body.username;
      let password = req.body.password;
      let user = await db.User.findOne({
        where: { username: username },
      });
      if (!user) {
        return res.json({
          success: false,
          message: "Tên đăng nhập không tồn tại !",
        });
      } else {
        let isPasswordExit = await checkPassword(password, user.password);
        if (!isPasswordExit) {
          return res.json({
            success: false,
            message: "Mật khẩu không đúng vui lòng kiểm tra lại",
          });
        } else {
          let dataUser = {
            id: user.id,
          };
          let userRes = {
            id: user.id,
            username: user.username,
          };
          let token = JWT.createJWT(dataUser);
          res.cookie("jwt", token, {
            maxAge: 24 * 60 * 60 * 1000,
          });
          return res.json({
            success: true,
            message: "Đăng nhập thành công !",
            token: token,
            user: userRes,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const logout = (req, res) => {
  let jwt = req.cookies.jwt;
  if (!jwt) {
    res.json({
      success: false,
      message: "Người dùng chưa đăng nhập !",
    });
  }
  res.cookie("jwt", "", { maxAge: 0 });
  res.json({
    success: true,
    message: "Đăng xuất thành công !",
  });
};

module.exports = {
  register,
  login,
  logout,
  loginhome,
  registerhome
};
