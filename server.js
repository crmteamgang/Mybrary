//check if we are in production mode
if(process.env.NODE_ENV !== "production"){ 
    require('dotenv').config()
}

const express = require("express")
const app = express();
const expressLayout = require("express-ejs-layouts")
const bodyParser = require("body-parser")

//main page route
const indexRouter = require("./routes/index");
//author route
const authorRouter = require("./routes/authors");
  

//config express application


//set view configuration
app.set("view engine", "ejs") 
//where views come from
app.set("views", __dirname + '/views')
//hook up express layouts - where layout is gonna be
// every signle file will be here
app.set("layout", "layouts/layout")
app.use(expressLayout)
//where public files gonna be
app.use(express.static("public"))

app.use(bodyParser.urlencoded({limit:'10mb', extended:false}))

//import mongoose
const mongoose = require("mongoose")
//set connection between app and database   mongoose.connect(mongostringurl, {options for set up})
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, })
//access to connection and check if we are connected
const db = mongoose.connection;
db.on("error", error =>console.log("NISI KONEKTOVAN"))
db.once("open", () =>console.log("KONEKTOVAN"))

//here we execute, before listen, values from router

app.use('/', indexRouter);
app.use('/authors', authorRouter);

//set listener on server port or default 3000
app.listen(process.env.PORT ||  3000)



