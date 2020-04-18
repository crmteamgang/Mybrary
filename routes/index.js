const express = require("express")
const router = express.Router();
//with router we can create route -- if we want to use this router method, we need to call it from server.js

//router.ACTION  -- post, get...
router.get("/", (req,res)=>{
    res.render("index")
})


module.exports = router




 