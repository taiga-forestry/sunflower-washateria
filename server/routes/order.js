const { response } = require("express");
const express = require("express");
 
// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");

router.route("/place-order").post((req, response) => {
    let db_connect = dbo.getDb();
    let my_obj = { 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        username: req.body.username,
        date: req.body.date,
        time: req.body.time,
        address: req.body.address
    };

    db_connect.collection("orders").insertOne(my_obj, (err, res) => {
        if (err) throw err;
        return response.json(res);
        // console.log(response.json());
        // return response.send({token: req.body.username});
    });
});

router.route("/update-history").put((req, response) => {
    let db_connect = dbo.getDb();
    let my_query = { username: req.body.username };
    let old_history = req.body.oldHistory;
    old_history.push({ date: req.body.date, time: req.body.time, address: req.body.address });
    let new_history = { $set: {orderHistory: old_history} };

    db_connect.collection("users").updateOne(my_query, new_history, (err, res) => {
        if (err) throw err;
        return response.json(res);
    });
});

router.route("/find-orders-by-date/:date").get((req, response) => {
    let db_connect = dbo.getDb();
    let my_query = { date: req.params.date };

    db_connect.collection("orders").find(my_query).toArray((err, res) => {
        if (err) throw err;
        return response.json(res);
    });
});

router.route("/add-zipcode").post((req, response) => {
    let db_connect = dbo.getDb();
    let my_obj = { zipcode: req.body.zipcode };

    db_connect.collection("zipcodes").insertOne(my_obj, (err, res) => {
        if (err) throw err;
        return response.json(res);
    });
});

router.route("/delete-zipcode").delete((req, response) => {
    let db_connect = dbo.getDb();
    let my_query = { zipcode: req.body.zipcode };

    db_connect.collection("zipcodes").deleteOne(my_query, (err, res) => {
        if (err) throw err;
        return response.json(res);
    });
});

router.route("/get-zipcodes").get((req, response) => {
    let db_connect = dbo.getDb();

    db_connect.collection("zipcodes").find({}).toArray((err, res) => {
        if (err) throw err;
        return response.json(res);
    });
})

module.exports = router;