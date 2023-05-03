const Product = require('../models/Product');

const addProduct = (req, res, next) => {
    const { name, description, price,img_link, weight, vendor } = req.body;
            const newProduct = new Product({ name,
            description,
            price,
            img_link,
            weight,
            vendor });
            newProduct.save((err, product) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({success: false, message: "Error Adding Product, please try again."})
                } else {
                    res.status(200).send({ success: true, message: 'Poduct Added Successfully' })
                }
            })
}

const getAllProducts = (req, res, next)=>{
  Product.find({}, (err, product) =>{
    if(err){
        console.log(err);
        res.status(500).send({success: false, message: "Error Fetching Products, please try again."})  
    }else{
        res.status(200).send({ success: true, message: 'Poducts fetched Successfully', products: product })
    }
})
}

const editProduct = (req, res, next) => {
    const {id, product} = req.body;
    Product.updateOne({_id: id}, 
        {description: product}, function (err, user) {
        if (err) console.log(err)
        if(user){
            res.status(200).json({success: true, message: "Product description edited successfully"})
        }
    });

  }


module.exports = { addProduct, getAllProducts, editProduct }
