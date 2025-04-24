const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(cors());app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));



//connect to database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((err) => {
    if (err) {
        console.error("connection failed: " + err);
        return;
    }
    console.log("Database connected!");
});

// Routes



app.get("/workexperience", (req, res) => {

    //Get experiences
    connection.query("select * FROM experiences;", (err, results) => {
        if (err) {
            res.status(500).json({ error: "something went wrong" + err });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: "no experiences added" })
        }
      
        res.json(results);
    });
});

app.post("/addexperience", (req, res) => {
    let company = req.body.company;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;

    let errors = {
        message: "",
        detail: "",
        https_response: {

        }
    }

    if (!company || !jobtitle || !location) {

        //error messages
        errors.message = "fields not included";
        errors.detail = "You must include all fields in JSON";
        //response
        errors.https_response.message = "Bad Request";
        errors.https_response.code = 400;

        res.status(400).json(errors);

        return;
    }

    //add experience to database
    connection.query(
        'INSERT INTO experiences(company, jobtitle, location) VALUES (?, ?, ?);', [company, jobtitle, location], (err, result) => {
            if (err) {
                res.status(500).json({ error: "something went wrong" + err });
                return;
            };
            console.log("query created: " + result)
            res.status(200).json({message: "Work experience received",
                data: {
                    company,
                    jobtitle,
                    location
                }
            });
        });


});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});