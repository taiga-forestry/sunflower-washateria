const { response } = require("express");
const express = require("express");
 
// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// To hash passwords and stuff
const sjcl = require("sjcl");

router.route("/register-user").post((req, response) => {
    let hashedPassword = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(req.body.password));
    let db_connect = dbo.getDb();
    let my_obj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        username: req.body.username, 
        password: hashedPassword,
        permissions: req.body.permissions,
        orderHistory: []
    };

    db_connect.collection("users").insertOne(my_obj, (err, res) => {
        if (err) throw err;
        return response.json(res);
    });
});

router.route("/check-username/:username").get((req, response) => {
    let db_connect = dbo.getDb();
    let my_query = { username: req.params.username };

    db_connect.collection("users").findOne(my_query, (err, res) => {
        if (err) throw err;
        return response.json(res);
    })
});

module.exports = router;
