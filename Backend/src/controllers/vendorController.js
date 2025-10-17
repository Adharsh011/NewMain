const Vendor = require("../model/Vendor")

exports.registerVendor = async(req,res)=>{
    try{
        const {name,email,password,shopName,description} = req.body;

        const existing = await Vendor.findOne({email});
        if(existing){
            return res.status(400).json({
                message:"Vendor profile already exists for this user"
            })
        }

        const vendor = await Vendor.create({
            email,
            name,
            password,
            shopName,
            description
        });
        res.status(201).json(vendor,{message:"Vendor is created"})

    }catch(error){
         res.status(500).json({message:error.message})

    }
};

exports.loginVendor = async (req,res)=>{
    console.log("good")
    try{
        const {email,password} = req.body;
        console.log(email,password);
        const vendor = await Vendor.findOne({email});
        if(!vendor) return res.status(404).json({message:"Vendor is Not Found"});
        const isMatch = await vendor.matchPassword(password);
         if(!isMatch) return res.status(404).json({message:"Vendor is Not Found"});
        
         const token = vendor.getSignedToken();

         res.json (
        {
            message:"Login Successfully",
            token,
            vendor
        }
         )
         console.log({
  message: "Login response sent",
  token,
  vendor
})

    }catch(error){
        res.status(500).json({message:error.message})
    }
};