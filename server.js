const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
var PORT = process.env.PORT || 3000;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// Data
var reservations =
    [
        {
            "customerName": "whyyyy",
            "phoneNumber": "1234597890",
            "customerEmail": "pleasedont@life.com",
            "customerID": "foo"
        },
        {
            "customerName": "chris",
            "phoneNumber": "555-333-4444",
            "customerEmail": "ch@slkf.com",
            "customerID": "chrisBush"
        }
    ];

    var waitlist =
    [
        {
            "customerName": "whyyyy",
            "phoneNumber": "1234597890",
            "customerEmail": "pleasedont@life.com",
            "customerID": "foo"
        },
    ];
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "homepage.html"));
});

app.get("/table", function (req, res) {
    res.sendFile(path.join(__dirname, "table.html"));
});
app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays all characters
app.get("/api/reserve", function (req, res) {
    return res.json(reservations);
});

// Displays all characters
app.get("/api/waitlist", function (req, res) {
    return res.json(waitlist);
});


// Displays a single character, or returns false
app.get("/api/reservations/:reservation", function (req, res) {
    var chosen = req.params.reservation;

    console.log(chosen);

    for (var i = 0; i < reservations.length; i++) {
        if (chosen === characters[i].routeName) {
            return res.json(characters[i]);
        }
    }

    return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/reservations", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;

    console.log(newReservation);
    if(reservations.length < 6) {
        reservations.push(newReservation) 
    } else{
        waitlist.push(newReservation)
    }
    
    res.json(reservations);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
