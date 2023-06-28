// including libraries
const mongoose=require('mongoose')
const shortId=require('shortid')
const { Schema } = mongoose;

// variable
const urlSchema = new Schema({ 
    // will store the data

    // full url
    full:{
        type:String,
        required:true
    },
    note:{
        type:String,
        required:true
    },
    // generated short url
    short:{
        type:String,
        required:true,
        default:shortId.generate
    },
    // number of clicks
    clicks:{
        type:Number,
        required:true,
        default:0
    },
})

// exporting
module.exports=mongoose.model('urls',urlSchema)