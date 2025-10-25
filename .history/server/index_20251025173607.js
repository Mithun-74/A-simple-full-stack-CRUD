const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_password",
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


app.put("/users/:id",(req,res)=>{
    const {name , age} = req.body;
    const {id} = req.params;
    const sql = "UPDATE users SET name = ?, age = ? WHERE id = ?";
    db.query(sql,[name,age,id], (err,result)=>{
        if(err) return res.status(500).json({error: err});
        res.json({message :"User updated successfully"});
    })
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "User deleted" });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
