const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Product = require('./models/product');


//to check or confirm if the database is connected or not

mongoose.connect('mongodb://127.0.0.1:27017/farmStand', {useNewUrlParser : true , useUnifiedTopology: true})
  .then(() =>{
    console.log("CONNECTION OPEN")
  })

  .catch(err =>{
    console.log("OH NO! CONNECTION ERROR");
     console.log(err)
  })



app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get('/dog', (req,res) =>{
    res.send('WOOF');
})

const categories = ["fruits","vegetables", "dairy"]

//displaying all the existing products in my database
app.get('/products', async (req,res) =>{
    const products = await Product.find({});
    res.render('products/index', { products })
})


//after displaying all products available by listitem links, i want to display the entire details of the product 
//when the user clicks on a single list item(single product). so i created a new show.ejs file and rendered it in
//this url address 
app.get('/products/:id', async(req,res)=>{
  const {id} = req.params;                                   //destructuring
  const products = await products.findById(id);
  console.log(products);
  res.render('products/show' ,{ products});
})

//get request for creating a new product
app.get('/products/new', (req,res)=>{
   res.render('products/new', {categories});
})


app.post('/products', async (req,res)=>{
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect('products/${newProduct._id}');
})

app.get('/products/:id/edit', async(req,res)=>{
     const{id} = req.params;
     const products = await products.findById(id);
    res.render('products/edit',{products ,categories});
})


app.put('/products/:id', async(req,res)=>{
  const{id} = req.params;
  const products = products.findByIdAndUpdate(id, req.body, {runValidators : true , new: true});
  res.redirect('products/${product._id}')
})


app.delete('/products/:id' ,async(req,res)=>{
      const {id} = req.params;
      const deletedProduct = await Product.findByIdAndDelete(id);
      res.redirect('products')
})

app.listen(3000, () =>{
    console.log("APP IS LISTENING ON PORT 3000");
})



   