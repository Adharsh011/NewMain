const Vendor = require("../model/Vendor")

 const isVendor = async(req,res,next) =>{
    try{
        const vendor = await Vendor.findOne({user:req.user.id});
        if(!vendor){
            return res.status(403).json({ message: "Access denied. Vendor only." });
        }

        req.vendor = vendor;
        next();
    }catch(error){
        console.error("vendor middleware error :", error);
        res.status(500).json({ message: "Server error verifying vendor"});
    }
}
module.exports = isVendor;