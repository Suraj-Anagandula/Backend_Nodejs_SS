

console.log("Hello world!")


const express=require("express");
const mongoose=require("mongoose");
const vendorRoute=require("./routes/vendorRoute");
const firmRoute=require("./routes/firmRoute");
const productRoute=require("./routes/productRoute");

const bodyParser=require("body-parser");
const path=require("path");



const app=express();
const PORT= process.env.PORT || 4000;
const DotEnv=require("dotenv");
DotEnv.config();
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected successfully"))
.catch((error)=>console.log(error))

app.use(bodyParser.json());
app.use("/vendor",vendorRoute);
app.use("/firm",firmRoute);
app.use("/product",productRoute);
app.use("/uploads",express.static('uploads'));

app.listen(PORT,()=>{
    console.log(`Server is started and running at ${PORT}`);
});

app.use("/",(req,res)=>{
    res.send("<h1>Welcome to Website</h1>");
});

