
const multUpload = async(req,res)=>{
    try{
        const fileInfos = req.files.map((file)=>({
            filename:file.filename,
            path:`/uploads/${file.filename}`
        }));
        res.status(200).json({
            message:"Images uploaded Succesfully",
            images:fileInfos
        });
    }catch(error){
        console.error(error);
        res.status(500).json({message:"upload failed",error:error.message})
    }
};

module.exports = multUpload;