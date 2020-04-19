const express = require("express")
const router = express.Router();
const Author = require('../models/author')

//with router we can create route -- if we want to use this router method, we need to call it from server.js

//router.ACTION  -- post, get... all authors route
router.get("/", async (req,res)=>{
    let searchAuthor = {}
    if(req.query.name != null  && req.query.name !== ""){
        searchAuthor.name = new RegExp(req.query.name , "i")
    }
    try{
        const allauthors = await Author.find(searchAuthor)
        res.render("authors/index",{
            authors: allauthors, 
            searchAuthor: req.query
        })
    }
    catch(err){
        res.redirect("/")
    } 
})

//new authors route - for displaying the form
router.get("/new", (req,res)=>{
    // try{
        
    // }
    // catch(err){
        
    // }
    res.render("authors/new", {author: new Author()})
})

// new authors route - for creating new author
router.post("/", async (req,res)=>{
    const author = new Author({
        name: req.body.name
    })

    try{
        const newAuthor = await author.save();
        res.redirect("authors")
    }
    catch(err){
        res.render('authors/new', {
            author: author,
            errorMessage: "Error creating author"
        })
    }
    // author.save((err, newAuthor) => {
    //     if(err){
    //         res.render('authors/new', {
    //             author: author,
    //             errorMessage: "Error creating author"
    //         })
    //     }
    //     else{
    //         //res.redirect(`authors/${newAuthor.id}`)
    //         res.redirect("authors")
    //     }
    // })
   // res.send(req.body.name)
})


module.exports = router




 