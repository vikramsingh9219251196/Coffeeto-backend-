const express = require("express");
const authController = require("../controllers/authController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  orderStatusController,
  getAllOrdersController,
} = authController;

const { isAdmin, requireSignIn } = authMiddleware;



//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//forget password || post 
router.post("/forgot-password",forgotPasswordController)
//test routes
router.get("/test", requireSignIn,  testController);

//protected route auth
router.get("/user-auth",requireSignIn,(req,res)=>{
  res.status(200).send({ok:true});
})
//admin
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
  res.status(200).send({ok:true});
})
//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders

router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);
// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);


module.exports = router;