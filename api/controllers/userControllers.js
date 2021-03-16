const { user } = require("../models");
const sequelize = require("../database");
const hash = require("../handlers");
const { encryptToken } = require("../middlewares");

const login = async (req, res) => {
	try {
		const getUser = await user.findAll({
			where: {
				email: req.body.email,
				// password: hash(req.body.password),
				password: req.body.password,
			},
		});
		if (getUser.length === 0) {
			return res.status(404).send({
				message: "User Not Found",
				status: "Not Found",
			});
		}
		const response = {
			...getUser[0].dataValues,
			token: encryptToken(getUser[0].dataValues),
		};
		return res.status(200).send(getUser[0]);
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
};

module.exports = { login };
