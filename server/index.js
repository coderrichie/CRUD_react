const express = require("express")
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "studentdata",

});

app.post("/create",(req,res)=>{
    const name = req.body.name;
    const section = req.body.section;
    const branch = req.body.branch;
    const roll = req.body.roll;
    
    db.query(
        "INSERT INTO students (name, section, branch, roll) VALUES (?,?,?,?)",
        [name, section, branch, roll],
    (err, result)=> {
        if(err){
            console.log(err);
             }
             else{
                 res.send("Values Insterted");
             }
    })

});

app.get('/students', (req, res)=> {
    db.query("SELECT * FROM students", (err,result)=>{
        if(err){
            console.log(err)
        } else{
            res.send(result)
        }
    });
});

app.put('/update',(req,res)=>{

    const id = req.body.id;
    const roll = req.body.roll;
    db.query("UPDATE students SET roll =? WHERE id = ?",
    [roll,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});


app.delete('/delete/:id', (req, res)=>{
    const id = req.params.id;
    
    db.query('DELETE FROM students WHERE id = ?', id, (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.listen(3001, ()=>{
    console.log("Hello");

});

