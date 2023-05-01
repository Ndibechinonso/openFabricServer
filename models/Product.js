const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: [{type: mongoose.SchemaTypes.Mixed, required: true}],
    price: {type: Number, required: true},
    img_link: {type: String, required: true},
    weight: {type: Number, required: true},
    vendor: {type: String, required: true}
})

 module.exports = mongoose.model('Product', ProductSchema);