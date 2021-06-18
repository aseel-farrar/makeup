'use strict';
require('dotenv').config();
const express = require('express');
const pg = require('pg');
const superagent = require('superagent');
const methodOverride = require('method-override');


const app = express();
const PORT = process.env.PORT || 5000;
const client = new pg.Client( { connectionString: process.env.DATABASE_URL, ssl: process.env.LOCALLY ? false : {rejectUnauthorized: false}} );
// const client = new pg.Client(process.env.DATABASE_URL);
// const client = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('./public'));
app.set('view engine', 'ejs');



//!routes
app.get('/', homePage);
app.get('/allProducts',allProducts);
app.get('/myCard', myCard);
app.get('/delete/:productId', deleteProduct);
app.get('/details/:productId', details);
app.post('/getResult', getResult);
app.post('/saveToCard', saveToCard);
app.post('/details/:productId', details);
app.put('/update/:productId', updateProduct);



//!handlers
function homePage(req, res){
  res.render('index');
}

function getResult(req, res){
  const brand = req.body.brand;
  const price_greater_than = req.body.price_greater_than;
  const price_less_than = req.body.price_less_than;
  const URL = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}&price_greater_than=${price_greater_than}&price_less_than=${price_less_than}`;
  superagent.get(URL).then(result=>{
    // res.send(result.body);
    res.render('productByPrice',{productByPrice:result.body});
  });
}


function allProducts(req, res){
  const URL = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline`;
  superagent.get(URL).then(result=>{
    const allProducts = result.body.map(product => new Product(product));
    // res.send(result.body);
    res.render('maybellineProducts',{allProducts:allProducts});
  });
}

function saveToCard(req, res){
  const {name, price, image, description} = req.body;
  const SQL = `INSERT INTO makeup (name, price, image, description) VALUES ($1, $2, $3, $4);`;
  const safeValues = [name, price, image, description];
  client.query(SQL,safeValues).then(()=>{
    // res.send(req.body);
    res.redirect('/myCard');
  });
}

function myCard(req, res){
  const SQL = `SELECT * FROM makeup;`;
  client.query(SQL).then((result)=>{
    // res.send(req.body);
    res.render('myCard', {allProducts:result.rows});
  });
}

function details(req, res){
  const productId = req.params.productId;
  const SQL = `SELECT * FROM makeup WHERE id=$1;`;
  const safeValue = [productId];
  client.query(SQL, safeValue).then((result)=>{
    // res.send(req.body);
    res.render('productDetails', {product:result.rows[0]});
  });
}

function deleteProduct(req, res){
  const productId = req.params.productId;
  const SQL = `DELETE FROM makeup WHERE id=$1;`;
  const safeValue = [productId];
  client.query(SQL, safeValue).then(()=>{
    // res.send(req.body);
    res.redirect('/myCard');
  });
}

function updateProduct(req, res){
  const {name, price, image, description} = req.body;
  const productId = req.params.productId;
  const SQL = `UPDATE makeup SET name=$1, price=$2, image=$3, description=$4 WHERE id=$5;`;
  const safeValueS = [name, price, image, description, productId];
  client.query(SQL, safeValueS).then(()=>{
    // res.send(req.body);
    res.redirect(`/details/${productId}`);
  });
}

//! constructor

function Product (obj){
  this.name = obj.name;
  this.price = obj.price;
  this.image = obj.image_link;
  this.description = obj.description;
}


//! listner
client.connect().then(()=>{
  app.listen(PORT,()=>{
    console.log(`listening to PORT ${PORT}..`);
  });
});
