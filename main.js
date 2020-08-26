const express = require("express");
const urls = require("./urls");
//require all librarys 

const app = express();
//init expresss


urls(app)
//load ulrs from urls.js

app.listen(3000);