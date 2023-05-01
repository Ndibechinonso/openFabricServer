var express = require('express');
var router = express.Router();
const withAuth = require('../middlewares/routeAuth');

const {addProduct, getAllProducts} = require('../controllers/productController')

/* GET users listing. */
router.get('/', getAllProducts);

router.post('/addProduct', addProduct)


module.exports = router;
