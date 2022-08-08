const router = require("express").Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const nodemailer = require("nodemailer");



//CREATE new mail order
router.post('/orders', isAuthenticated, async (req, res, next) => {
    const { email, subject, message } = req.body;

    const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    })

    await transport.sendMail({
        from: email,
        to: "order@mealnextdoor.com",
        subject: subject,
        html: `<div className="order"> 
        <p>${message}</p>
        </div>`
    })

});

module.exports = router;