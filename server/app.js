var express = require('express');
require('dotenv').config();
var cors = require('cors');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

// setting up testing page
//app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})

// test
// app.get('/', function (req, res) {
//     res.render("home");
// })

app.post('/interventions', function (req, res) {

    // just for testing
    // var arg1 = "Consultation";
    // var arg2 = "office";
    // var arg3 = "Franzi, Isabel, Van";
    // var arg4 = "2019.09.03";
    // var arg5 = "10 AM";
    // var arg6 = "Medium";
    // var arg7 = "Lee"

    var interventionType = req.body.interventionType;
    var place = req.body.place;
    var students = req.body.students;
    var date = req.body.date;
    var time = req.body.time;
    var severity = req.body.severity;
    var teachers = req.body.teachers;

    var q = "INSERT INTO interventions (interventionType,place,students,date,time,severity,teachers) VALUES('" + interventionType + "','" + place + "','" + students + "','" + date + "','" + time + "','" + severity + "','" + teachers + "');";

    connection.query(q, function (error, result, fields) {
        if (error) throw error;
        console.log(result);
        res.send("Posted to DB");
    })
    console.log("Entry successfully added to the database");
    console.log("POST Request SENT To /INTERVENTIONS");
})


app.listen(8080, function () {
    console.log("Server is listening on port 8080!");
});