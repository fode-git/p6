const express = require("express");
const router = express.Router();

const sauce = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, sauce.list);
router.get('/:id', auth, sauce.OneSauce);
router.put('/:id', auth, multer, sauce.update);
router.post('/', auth, multer, sauce.create);
router.delete('/:id', auth, sauce.delete);
router.post('/:id/like', auth, sauce.likeSauce);

module.exports = router;
