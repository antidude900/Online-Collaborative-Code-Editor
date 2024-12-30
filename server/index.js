const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"]
	})
);

app.use(express.json());
const transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASS,
	},
});

app.post("/api/sendMail", (req, res) => {
	console.log("reached")
	const mailOptions = {
		from: process.env.EMAIL,
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

app.get("/", (req, res) => {
	res.send("Server is listening....");
});

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
