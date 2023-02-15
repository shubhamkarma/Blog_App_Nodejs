const express = require('express')
const morgan = require('morgan')
// const ConnectionToDb = require('../Mongodb_practice/db/connection')
const ObjectId = require('mongodb').ObjectId

const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/mongoose-ex2").then((conn)=>{console.log("Connected to DB")}).catch((e)=>{console.log(e)})
const ProductModel = require('./User')

const app = express()
const port = 3500;
app.listen(port,()=>{
  console.log('The server is running at port:',port)
})
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//logger middleware
app.use(morgan('tiny'))
app.set('view engine', 'ejs')


app.get('/home', async(req,res)=>{
  let formDetails = await ProductModel.find({})
  // console.log(formDetails)
  res.render('home',{formDetails})
  // res.sendStatus(200)
})

app.get('/create',(req,res)=>{
  res.render('create')
})

app.post('/create', async(req,res)=>{
  // console.log(req.body)
  let payLoad = {
    Name:req.body.Name,
    Snippet:req.body.Snippet,
    Blog:req.body.Blog
  }
  const insertedPayLoad = new ProductModel(payLoad)
  await insertedPayLoad.save()
  return res.redirect('/home')
})

app.delete('/delete/:id', async(req,res)=>{
  const id = req.params.id
  const deletePost = await ProductModel.findByIdAndDelete({_id:new ObjectId(id)})
  res.json({redirect:'/home'})
})

app.get('/update/:id', async(req,res)=>{
  const id = req.params.id
  console.log(id)
  const formDetails = await ProductModel.findById({_id: new ObjectId(id)}) 
  console.log(formDetails._id.toString())
  formDetails._id = formDetails._id.toString()
  res.render('update',{formDetails})
})

app.put('/update/:id', async(req,res)=>{
  const id = req.params.id
  console.log(req.body)
  const payLoad = {
    Name:req.body.Name,
    Snippet:req.body.Snippet,
    Blog:req.body.Blog
  }
  const updated = await ProductModel.updateOne({_id:new ObjectId(id)},{$set:payLoad})
  res.json({redirect:'/home'})
})

app.use((req,res)=>{
  res.sendStatus(404)
})