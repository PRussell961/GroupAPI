const express = require('express');
const bodyParser = require('body-parser');
const app = require('express')();
const PORT = 8080;
const mysql = require("mysql");
var cors = require('cors')

app.use(cors());
app.use( express.json() );
app.use(bodyParser.urlencoded({extended: true}));
app.listen(PORT);
//DBConnection manager
const con = mysql.createConnection({
    host: "database-1.cnpuqcfam1ux.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "password",
    database: "reviews"    
  })
  con.connect(function(err) {
	if (err) throw err}
);

/* API Requests */ 
    //Put Request
    app.put('/create', (req, res) => { 
        const  author  = req.body.author;
        const  content  = req.body.content; 
        const  book  = req.body.book;       
        sql = "INSERT INTO reviews (author, content, book) VALUES ('" + author + "', '" + content + "', '" + book +"');";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
        res.send("Insert finished");
    })

    //3 Request
    app.post('/read', (req, res) => {
    const book = req.body.books;
    console.log("got " + book)
    const selectAll =
    "SELECT * FROM reviews WHERE book='" + book +"';";
    con.query(selectAll,(err,result)=> {
        console.log(result);
        res.send(result);
    });
    })