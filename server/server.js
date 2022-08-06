const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config({path: "./config.env"});
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(require("./routes/login-register.js"));
app.use(require("./routes/order.js"));
app.use(require("./routes/contact.js"));

// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
    dbo.connectToServer((err) => {
        if (err) {
            console.log(err);
        }
    });

    console.log(`Server is running on port: ${port}`);
});
