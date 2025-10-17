
const User = require("../model/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// Register

exports.registerUser = async (req,res) =>{
    try{
        const {name,email,password} = req.body;
        console.log(req.body);
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User Already existed !"});

        }

        // hashPassword

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = await User.create({name,email,password:hashedPassword});
        res.status(201).json({
            message:"New User is Created",
            user: {id:newUser._id,name:newUser.name,email:newUser.email}

        });
    }catch(error){
        res.status(500).json({message:"Server Error", error:error.message})
    }
}

exports. loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email})
        if(!user) return res.status(404).json({message:"User is not Regidtered Please ccreate an account first"});

        // checking Password

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(404).json({message:"Password is not Matched Please enter a valid Password"});

        const token =   jwt.sign(
            {id:user._id,email:user.email, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"12h"}
        );
        res.json({
            message:"Login Successfully",
            token,
            user: {id:user._id,email:user.email, role:user.role}

        });
    }catch(error) {
    res.status(500).json({Message:"Internal Server error",error:error.message})
}
};
