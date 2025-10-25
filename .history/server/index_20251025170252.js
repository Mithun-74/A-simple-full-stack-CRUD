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
    console.log("MySQL connected");
});

app.get("/users",(req,res)=>{
    const sql = "SELECT * FROM users";
    db.query(sql,(err,result)=>{
        if(err) return res.status(500).json({error: err});
        res.json(result);
    });
});

app.post("/users",(req,res)=>{
    const {name , age} = req.body;
    const sql = "INSERT INTO users (name,age) VALUES (?,?)";
    db.query(sql,[name,age],(err,result)=>{
        if(err) return res.status(500).json({error : err});
        res.json({id: result.insertId, name, age});
    });
});


app.
