var express = require('express');
require('dotenv').config();
var cors = require('cors');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();
var multer = require('multer');
const path = require('path');
const fs = require('fs')
//var upload = multer({ dest: 'uploads/', limits: { fieldSize: 10000000000 } }).any()

// building storage engine  cb --> callback
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: 'audio/wav', limit: '60mb' }))
app.use(cors());

app.use(express.static('./public'));

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('studentAudio');

// checking the extension and mimeType
function checkFileType(file, cb) {

    const fileTypes = /wav/;
    // checking extension
    const extensionName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    // checking mimeType

    console.log(file.mimetype === "audio/wav" && extensionName);

    if (file.mimetype === "audio/wav" && extensionName) {
        return cb(null, true);
    } else {
        cb('Just audio files allowed!!')
    }
}

function parseMovementData(movStr) {
    var result = movStr.split(" ");
    var values = [];
    var i;
    for (i = 0; i < result.length; i++) {
        var numStr = result[i].slice(result[i].lastIndexOf(':') + 1);
        var numVal = parseFloat(numStr);
        values.push(numVal);
    }

    return values;

}

// var jsonObj = convertToText(req.file.path, req.filename, req.body.date);
//"../data/test.csv"
//convertToText("public/uploads/test2.wav", "AudioText6test", "2020-05-11 16:04:22");
// function convertToText(audioPath, filename, date) {
//     const spawn = require('child_process').spawn;
//     const scriptExecution = spawn("python", ["audioTranscribe.py"])
//     var info = [audioPath, date];
//     var text;
//     scriptExecution.stdout.on('data', function (data) {
//         var text = data.toString()
//         console.log("Here:  " + data.toString());
//         // saving transcribed files into transcriptions folder
//         fs.writeFile('./transcriptions/' + filename + '.txt', text, function (err) {
//             if (err) {
//                 return console.log(err)
//             }
//             console.log("File created!")
//         })

//     });
//     scriptExecution.stdin.write(JSON.stringify(info));
//     scriptExecution.stdin.end();
// }

// connection to interventions_db

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})


var signalsConnection = mysql.createConnection({
    host: process.env.DB_SIG_HOST,
    user: process.env.DB_SIG_USER,
    password: process.env.DB_SIG_PASS,
    database: process.env.DB_SIG_DATABASE,
    port: process.env.DB_SIG_PORT
})

var outputConnection = mysql.createConnection({
    host: process.env.DB_OUT_HOST,
    user: process.env.DB_OUT_USER,
    password: process.env.DB_OUT_PASS,
    database: process.env.DB_OUT_DATABASE,
    port: process.env.DB_OUT_PORT
})

app.post('/interventions', function (req, res) {
    const intervention = {
        interventionType: req.body.interventionType,
        place: req.body.place,
        students: req.body.students,
        date: req.body.date,
        time: req.body.time,
        severity: req.body.severity,
        teachers: req.body.teachers
    }

    var q = "INSERT INTO interventions SET ?;";

    connection.query(q, intervention, function (error, result) {
        if (error) throw error;
        console.log(result);
        res.send("Posted to DB");
    })
    console.log("Entry successfully added to the database");
    console.log("POST Request SENT To /INTERVENTIONS");
})

app.get('/posts', function (req, res) {

    var q = "SELECT * FROM interventions;";

    connection.query(q, function (error, result) {
        if (error) throw error;
        console.log(JSON.stringify(result));
        res.send(JSON.stringify(result));
    });
})

app.post('/addAudio', function (req, res) {
    var q = "INSERT INTO audio SET ?;";
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log("There is an Multer error " + err)
        }
        else if (err) {
            // An unknown error occurred when uploading.
            console.log("There is an error " + err)
        }

        console.log("This is the filename: " + req.file.filename)
        console.log(req.file);
        console.log("Obtained audio file!");
        console.log("Audio is successfully posted!")

        // calling the python script to transcribe audio file and get the timestamp when audio ends
        const spawn = require('child_process').spawn;
        const scriptExecution = spawn("python", ["audioTranscribe.py"])
        var info = [req.file.path, req.body.date];
        var text;
        scriptExecution.stdout.on('data', function (data) {
            var obj = JSON.parse(data.toString());
            console.log("Here:  " + data.toString());

            const audios = {
                studentId: req.body.studentId,
                audioPath: req.file.path,
                beginTime: obj["begin"],
                endTime: obj["end"],
                audioText: obj["audio_text"],
                sentiment: "DEFAULT"
            }

            // Inserting into audio table
            signalsConnection.query(q, audios, function (error, result) {
                if (error) throw error;
                console.log(result);
                console.log("Posted to audio_recordings table");
            })
            // saving transcribed files into transcriptions folder
            fs.writeFile('./transcriptions/' + req.file.filename + '.txt', text, function (err) {
                if (err) {
                    return console.log(err)
                }
                console.log("File created!")
            })

        });
        scriptExecution.stdin.write(JSON.stringify(info));
        scriptExecution.stdin.end();

    })
})

app.post('/addSignal', function (req, res) {
    var signalType = req.body.signalType;
    var dataObj = {};
    var q;
    var tableSpec;
    if (signalType === "heartrate") {
        dataObj = {
            bpm: req.body.bpm,
            date: req.body.date,
            studentId: req.body.studentId
        }
        q = "INSERT INTO heartrate SET ?;";
        tableSpec = "heartrate table";
    }
    else if (signalType === "locations") {
        dataObj = {
            long: req.body.long,
            lat: req.body.lat,
            date: req.body.date,
            studentId: req.body.studentId
        }
        q = "INSERT INTO locations SET ?;";
        tableSpec = "locations table";
    }

    else if (signalType === "movements") {

        var gravity = parseMovementData(req.body.gravity);
        var acceleration = parseMovementData(req.body.acceleration);
        var rotation = parseMovementData(req.body.rotation);
        var attitude = parseMovementData(req.body.attitude);

        dataObj = {
            gravityX: gravity[0],
            gravityY: gravity[1],
            gravityZ: gravity[2],
            accX: acceleration[0],
            accY: acceleration[1],
            accZ: acceleration[2],
            rotX: rotation[0],
            rotY: rotation[1],
            rotZ: rotation[2],
            attRoll: attitude[0],
            attPitch: attitude[1],
            attYaw: attitude[2],
            fallenDown: req.body.fallenDown,
            date: req.body.date,
            studentId: req.body.studentId
        }

        q = "INSERT INTO movements SET ?;";
        tableSpec = "movements table";
    }
    else if (signalType === "manual") {
        console.log("Here I am !!!!");
        var gravity = parseMovementData(req.body.gravity);
        console.log(gravity)
        var acceleration = parseMovementData(req.body.acceleration);
        var rotation = parseMovementData(req.body.rotation);
        var attitude = parseMovementData(req.body.attitude);
        dataObj = {
            long: req.body.long,
            lat: req.body.lat,
            bpm: req.body.bpm,
            gravityX: gravity[0],
            gravityY: gravity[1],
            gravityZ: gravity[2],
            accX: acceleration[0],
            accY: acceleration[1],
            accZ: acceleration[2],
            rotX: rotation[0],
            rotY: rotation[1],
            rotZ: rotation[2],
            att_roll: attitude[0],
            att_pitch: attitude[1],
            att_yaw: attitude[2],
            fallenDown: req.body.fallenDown,
            message: req.body.message,
            date: req.body.date,
            studentId: req.body.studentId
        }
        q = "INSERT INTO manual SET ?;";
        tableSpec = "manual table";

        query = "INSERT INTO test_table SET ?;";
        var outputObj = {};
        outputObj = {
            long: req.body.long,
            lat: req.body.lat,
            bpm: req.body.bpm,
            message: req.body.message
        }

        outputConnection.query(query, outputObj, function (error, result) {
            if (error) throw error;
            console.log(result);
            console.log("Posted to test_table");
        })

    }
    else {
        return new Error('Wrong signal type!')
    }
    signalsConnection.query(q, dataObj, function (error, result) {
        if (error) throw error;
        console.log(result);
        res.send("Posted to DB");
        console.log("Posted to " + tableSpec);
    })
})



app.get('/outputManual', function (req, res) {
    var q = "SELECT * FROM test_table;";

    outputConnection.query(q, function (error, result) {
        if (error) throw error;
        console.log(JSON.stringify(result));
        res.send(JSON.stringify(result));
    });
})


app.post('/addSignal', function (req, res) {
    console.log(req.body)
    res.send("Request received")
})

app.listen(1551, function () {
    console.log("Server is listening on port 1551!");
});