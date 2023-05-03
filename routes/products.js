var express = require('express');
var router = express.Router();
const withAuth = require('../middlewares/routeAuth');

const {addProduct, getAllProducts, editProduct} = require('../controllers/productController')

/* GET users listing. */
router.get('/', getAllProducts);

router.post('/addProduct', withAuth, addProduct)

router.post('/editProduct',withAuth, editProduct)



module.exports = router;
