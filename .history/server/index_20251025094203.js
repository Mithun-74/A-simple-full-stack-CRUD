const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "userdb",
});

db.connect((err)=>{
    if(err) throw err;
    console.log("MySQL con")
})

