const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.route("/send-contact-message").post((req, response) => {
    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false,
        tls: {
            ciphers:'SSLv3'
        },
        auth: {
            user: "sunflower-messenger@outlook.com", // generated ethereal user
            pass: "ChrisPaulGeorge16", // generated ethereal password
        },
    });

    const message = {
        from: `"Sunflower Messenger" <sunflower-messenger@outlook.com>`, // sender address
        to: "tiger.j540@gmail.com",// list of receivers
        subject: "A new customer has left a message!", // Subject line
        text: `
            Name: ${req.body.email} has left a message:
            Message: ${req.body.message}
            Contact: 
            Email: ${req.body.email}
            Phone: ${req.body.phone}`
    }
    
    // send mail with defined transport object
    const info = transporter.sendMail(message); 
    console.log("Message sent: %s", info.messageId);
    response.send("Email sent!");
});

module.exports = router;