const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        vendor:{type:mongoose.Schema.Types.ObjectId,ref:"Vendor",required:true},
        title:{type:String,required:true},
        description:{type:String},
        price:{type:Number,required:true},
        stock:{type:Number,default:0},
        category:{type:String},
        images:[{type:String}]
    },{timestamps:true}
);
module.exports = mongoose.model("Product",productSchema);