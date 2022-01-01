const express = require("express");
const company = require("../companyData");
const product = require("../productData");
const router = express.Router();
router.use(express.json());

router.get("/",(req,res) => {

    res.json({data:"Company Details"});

});

router.post("/addCompany",(req,res) => {

    const compId = req.body.companyId;
    const name = req.body.name;
    const productId = req.body.productId;

    const comp = company.filter((p)=>p.companyId === compId);
    if(comp.length === 0){
        company.push({companyId: compId,name: name,productId: productId});
        return res.json({data:"Company added!"})
    } else {
        return res.json({data:"Company already exist!"})
    }
});

router.get("/list",(req,res) => {

    res.json({data: company});

});


router.get("/companyDetailProduct/:title",(req,res) => {

    const pname = req.params.title;
    const prod = product.filter((p)=>p.title === pname);

    if(prod.length === 0){
        return res.json({data:"not found any record!"})
    } else {
        const pid = prod.productId;
        const comp = company.filter((p)=>p.productId === pid);
        return res.json({data: prod})

    }
});


module.exports = router;