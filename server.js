// including express and mongoose library
// creating variables
const express= require('express')
const mongoose =require('mongoose')
const url = require('./models/shortUrl')
const app =express()

mongoose.connect('mongodb+srv://admin:admin@cluster0.gg6ad.mongodb.net/uploader?retryWrites=true&w=majority')

//using set function
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))

//using get function
app.get('/', async (req,res) => {
    const shortUrls = await url.find(); 
    res.render('index',{data:shortUrls}) 

})

//using get function
app.get('/search',async (req,res)=>{  
    try {  
        const data = await url.find({$or:[{full:{'$regex':req.query.dsearch}},{note:{'$regex':req.query.dsearch}}]})
        res.render('index',{data:data});  
    }catch(error){  
        console.log(error);  
    }  
    });  


//using post function
app.post('/shortUrls',async (req,res)=>{
    await url.create({full: req.body.fullUrl, note: req.body.note})
    res.redirect('/')
})

//using get function
app.get('/:shortUrl',async (req,res)=> {
    const shortUrl = await url.findOne({short: req.params.shortUrl })
    if(shortUrl==null) return res.sendStatus(404)
    shortUrl.clicks++
    shortUrl.save()
    res.redirect(shortUrl.full)
})


// to open the code output on browser
app.listen(process.env.PORT || 5000, () => {
    console.log(`backend listening on 5000`)
  })
