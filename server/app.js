const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
const transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: "splashofwater900@gmail.com",
		pass: process.env.EMAIL_PASS,
	},
});
app.post("/", (req, res) => {
	const mailOptions = {
		from: req.body.from,
		to: req.body.to,
		subject: req.body.subject,
		text: req.body.message,
	};

	transporter.sendMail(mailOptions, (error) => {
		if (error) {
			console.error("Error sending email:", error);
			return res.status(500).send(error);
		}
		res.status(200).send("Email sent successfully");
	});
});
const port = 3030;
app.listen(port, () => console.log(`Server running on port ${port}`));
