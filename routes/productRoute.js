
const productController=require("../controllers/productController");
 const express = require("express");
const router = express.Router();
const path=require("path");


 router.post('/add-product/:firmId',productController.addProduct);
 router.get('/:firmId/products',productController.getProductByFirm);


 router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    req.setHeader('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
});

router.delete("/:productId",productController.deleteProductbyId);

 module.exports=router;