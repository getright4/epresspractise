
const mongoose = require('mongoose');
const Product = require('./models/product');
mongoose.connect('mongodb://127.0.0.1:27017/farmStand', {useNewUrlParser : true}, )
  .then(() =>{
    console.log("CONNECTION OPEN")
  })

  .catch(err =>{
    console.log("OH NO! CONNECTION ERROR");
    Console.log(err);
  })

//const p = new product({
//   name: 'Ruby grape fruit',
//  price: 1.99,
//  category: 'fruit'
// })

// p.save()
// .then( p =>{
//    console.log(p);
// })
// .catch(err =>{
//    console.log(err);
// })



//adding more products to the database by using insertMany method and passing an array of products into it for inserting

const seedProducts =[
  {
     name:'Seedless Watermelon',
     price: 2.3,
     category: 'fruit'
  },
  {
      name:'Seedless Grapes',
      price: 1.3,
      category: 'fruit'

  } ,
  {
      name:'Spinach',
      price: 2.1,
      category: 'vegetable'
  }
]

Product.insertMany(seedProducts)
.then( res =>{
  console.log(res)
})
.catch(e =>{
  console.log(err)
})




