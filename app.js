//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose=require("mongoose");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/todolistDB");
const itemsschema={
  name:String
};
const Item=mongoose.model("Item",itemsschema);
const item1= new Item({
  name:"Welcome to dolist!!"
});
/////////////////////////////////////////////////**** *//////////////////////////

const defaultItems=[item1];


app.get("/", function(req, res) {

const day = date.getDate();
Item.find({},function(err,items){

if(items.length===0){
  Item.insertMany(defaultItems,function(err){
  if(err)
  console.log(err);
  else{
    console.log("Successss");
  }
});
res.redirect("/");
}

  else
  res.render("list", {listTitle: day, newListItems: items});
});
});


app.post("/", function(req, res){

  const itemname = req.body.newItem;
  const item=new Item({
    name:itemname });
    item.save();
    res.redirect("/");
});
app.post("/delete",function(req,res){
  const toremove=req.body.checkbox;
  console.log(toremove);
  Item.findByIdAndRemove(toremove,function(err){
    if(err)
    console.log("PROBLEM!!!");
    else
    console.log("NO PROBLEM!!");
    res.redirect("/");
  });
});


app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
