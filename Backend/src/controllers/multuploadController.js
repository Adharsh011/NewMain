
const Product = require("../model/Product")

const multUpload = async(req,res)=>{
    try{
         const {productId} = req.body;
      

        if(!productId) {
            return res.status(400).json({mesage:"Product Id is required"});
        }

          if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
 const filePaths = req.files.map((file) => `/uploads/${file.filename}`);
        const product = await Product.findById(productId);
        console.log(product);
        if(!product){
            return res.status(404).json({message:"Product not Found"})
        }

        product.images.push(...filePaths);

        await product.save();

        
    res.status(200).json({
      message: "Images uploaded and saved successfully!",
      product,
    })
       
        res.status(200).json({
            message:"Images uploaded Succesfully",
            images:filePaths
        });
    }catch(error){
        console.error(error);
        res.status(500).json({message:"upload failed",error:error.message})
    }
};

module.exports = multUpload;