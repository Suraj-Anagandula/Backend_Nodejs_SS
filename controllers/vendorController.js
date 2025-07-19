const Vendor=require("../models/Vendor");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

const dotEnv=require("dotenv");
dotEnv.config();
const secretkey=process.env.whatisYourName;

const vendorRegister=async (req,res) => {
    const{username,email,password}=req.body;
    try{
        const vendorEmail=await Vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json("Email already exists!");
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newVendor=new Vendor({
            username,
            email,
            password:hashedPassword
        });
        await newVendor.save();
        res.status(201).json({message:"Vendor Registered Successfully!"});
        console.log("Registered!");
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"Internal Server ERROR"});

    }
    
}



const vendorLogin=async (req,res)=>{
     const {email,password}=req.body;
    try {
        const vendor=await Vendor.findOne({email});
        if(!vendor || !(await bcrypt.compare(password,vendor.password))){
            return res.status(401).json({error:"Invalid username or password"})
        }
        const token=jwt.sign({vendorId:vendor._id},secretkey,{expiresIn: "1h"});

 

        res.status(200).json({success:"Login sucessful",token,vendorId:vendor._id});
      //  console.log(email,"this is token:",token,"vendorId:",vendorId:vendor._id);
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"})
        
    }
}



const getAllVendors=async(req,res)=>{
    try {

        const vendors= await Vendor.find().populate("firm");
        res.json({vendors});
        
    } catch (error) {
        console.error(error);
           res.status(500).json({error:"Internal server error"});
        
    }
}

const getVendorById=async(req,res)=>{
    const vendorId=req.params.id;

    if (!vendorId) {
    return res.status(400).json({ error: "Vendor ID is required" });
  }

    try {
        const vendorById=await Vendor.findById(vendorId).populate("firm");
        if(!vendorById){
            return res.status(404).json({error:"vendor not Found"});
        }
         

           let vendorFirmId = null;
           let vendorFirmName=null;

        // ✅ Check if `firm` is an array
        if (Array.isArray(vendorById.firm) && vendorById.firm.length > 0) {
            vendorFirmId = vendorById.firm[0]._id;
            vendorFirmName=vendorById.firm[0].firstName;
        }
        // ✅ If `firm` is a single object
        else if (vendorById.firm && vendorById.firm._id) {
            vendorFirmId = vendorById.firm._id;
            //vendorFirmName=vendorById.firm[0].firstName;
            vendorFirmName = vendorById.firm.firstName;
        }


        res.status(200).json({vendorId,vendorFirmId,vendorFirmName});
        console.log(vendorFirmId);
    } catch (error) {
        console.error(error);
           res.status(500).json({error:"Internal server error"});    
    }


}




module.exports={vendorRegister,vendorLogin,getAllVendors,getVendorById};