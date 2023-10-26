const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const productController = require("../controllers/productController");
const webController = require("../controllers/webcontrollers");

router.get("/register", webController.registerhome);
router.post("/register", authController.register);

router.get("/login", webController.loginhome);
router.post("/login", authController.login);


router.get("/user", webController.usershome);
router.get('/update-user/:id',webController.getUpdateUser)
router.post('/update-user',webController.postUpdateUser)
router.get('/delete-user/:id',webController.getdeleteuser)
router.post('/delete-user',webController.postdeleteuser)

router.get("/", productController.productshome);
router.get("/detailsp/:id", productController.productdetail);
// router.get('/update-product',webController.getUpdateProduct)
// router.post('/update-product',webController.postUpdateProduct)
// router.post('/delete-product/:id',webController.postDeleteProduct)


module.exports = router;