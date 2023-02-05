const express = require("express");
const router = express.Router();
const userCtrl =require('../controllers/user');

router.post('/signup',userCtrl.signup);
router.post('/login',userCtrl.login);
'http://localhost:3000/api/auth/signup'
module.exports = router;


