const mongoose=require("mongoose");
const firmSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
                type:String,
                enum:["veg","non-veg"]
            }
        ]
    },
    region:{
        type:[
            {
                type:String,
                enum:["south-Indian","north-Indian","chineese","bakery"]
            }
        ]
    },
    offer:{
        type:String
    },
    image:{
        type:String
    },
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor"
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }]

    
})
const firm=mongoose.model("Firm",firmSchema);
module.exports=firm;