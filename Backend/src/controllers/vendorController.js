const Vendor = require("../model/Vendor")

exports.createVendor = async(req,res)=>{
    try{
        const {shopName,description} = req.body;

        const existing = await Vendor.findOne(
            {
                user:req.user.id
            }
        )
        if(existing){
            return res.status(400).json({
                message:"Vendor profile already exists for this user"
            })
        }

        const vendor = await Vendor.create({
            user:req.user.id,
            shopName,
            description
        });
        res.status(201).json(vendor,{message:"Vendor is created"})

    }catch(error){
         res.status(500).json({message:error.message})

    }
};

exports.getMyVendor = async (req,res)=>{
    try{
        const vendor = await Vendor.findOne({user:req.user.id});
        if(!vendor) return res.status(404).json({message:"Vendor is Not Found"});
        res.json(vendor);

    }catch(error){
        res.status(500).json({message:error.message})
    }
};