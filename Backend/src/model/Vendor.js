const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const vendorSchema = new mongoose.Schema({
   name:{type:String,required:true},
   email:{type:String,required:true,unique:true},
   password:{type:String,required:true},
    shopName:{type:String,required:true},
    description:{type:String},
    verified:{type:Boolean,default:false}
},{timestamps:true});

vendorSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})

vendorSchema.methods.getSignedToken = function(){
    return jwt.sign({id: this._id,role:"vendor"},process.env.JWT_SECRET,{
        expiresIn: "7d",
    });
};

vendorSchema.methods.matchPassword = async function(enteredPassword){
    return await  bcrypt.compare(enteredPassword,this.password);

};

module.exports = mongoose.model("Vendor",vendorSchema);