const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

const addProduct = (req, res, next) => {
    const { name, description, price,img_link, weight, vendor } = req.body;
    console.log(req.body);
            const newProduct = new Product({ name,
            description,
            price,
            img_link,
            weight,
            vendor });
            newProduct.save((err, product) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({success: false, msg: "Error Adding Product, please try again."})
                } else {
                    res.status(200).send({ success: true, msg: 'Poduct Added Successfully' })
                }
            })
    // .catch((err) => console.log(err, 'err'))
}

const getAllProducts = async (req, res, next)=>{
 Product.find({}, (err, product) =>{
    if(err){
        console.log(err);
        res.status(500).send({success: false, msg: "Error Fetching Products, please try again."})  
    }else{
        console.log(product);
        res.status(200).send({ success: true, msg: 'Poducts fetched Successfully', products: product })
    }
})
}


module.exports = { addProduct, getAllProducts }
