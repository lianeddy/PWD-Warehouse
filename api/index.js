const express = require("express");
const cors = require("cors");
const { userRouter } = require("./routes");
const bearerToken = require("express-bearer-token");

const app = express();

app.use(bearerToken());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => res.status(200).send("nature goods api"));
app.use("/users", userRouter);

const API_PORT = process.env.API_PORT || 2000;
require("dotenv").config();

app.listen(API_PORT, async () => {
	// rebuild database based on models dir
	// await sequelize.sync({force: true});
	console.log(`running on ${API_PORT}`);
});
