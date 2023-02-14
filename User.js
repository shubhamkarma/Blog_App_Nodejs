    const mongoose = require('mongoose')

    const ProductSchema = new mongoose.Schema({
        Name:String,
        Snippet:String,
        Blog:String
    },{
        versionKey:false,
        timestamps:true
    })

    const ProductModel = mongoose.model('products',ProductSchema)
        
    module.exports = ProductModel
