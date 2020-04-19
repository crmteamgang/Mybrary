const mongoose = require('mongoose')

//schema in nosql bases is equal to tables in sql bases
const authorSchema =  new mongoose.Schema({
    name: {
        type:String,
        required: true
    }
})

// export ...model(nameOfTableWeWant, object)
module.exports = mongoose.model("Author", authorSchema);
