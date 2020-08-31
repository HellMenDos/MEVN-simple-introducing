const express = require("express");
const urls = require("./urls");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require('path');
const cors = require('cors');



const Schema = mongoose.Schema;
//require all librarys 
const urlencodedParser = bodyParser.urlencoded({extended: false});


const userScheme = new Schema(
	{
	name: String, 
	email: { type : String , unique : true},
	password: String,
	data: String
}, 
	{versionKey: false});
const User = mongoose.model("users", userScheme);

const userSchemeSecond = new Schema(
	{
	name: String, 
	url: String,
	des: String,
	cost: String,
	urlsFile:String
}, 
{versionKey: false}
);
const Course = mongoose.model("course", userSchemeSecond);

const adminpage = new Schema(
	{
	name: String, 
	password: String,
}, 
{versionKey: false}
);
const Admin = mongoose.model("admin", adminpage);

const bought = new Schema(
	{
	userId: String, 
	courseId: String,
	first_param:String,
	Second_param:String
}, 
{versionKey: false}
);
const Bought = mongoose.model("bought", bought);


mongoose.connect("mongodb+srv://FOUR:Kirill3399@cluster0.ekh0a.mongodb.net/pozdno?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true  }, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// db
const app = express();
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(cors());
app.options('*', cors());
//init expresss

models = {
	User,
	Course,
	Admin,
	Bought
}
middalware = {
	urlencodedParser
}

urls(app,models,middalware)
//load ulrs from urls.js



