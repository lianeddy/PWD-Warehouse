const { user, securityQuestion } = require("../models");
const { encryptToken } = require("../middlewares");
const { encryptHandler, emailHandler } = require("../handlers");

// const registerAsAdmin = async (req, res, next) => {
// 	try {
// 		const adminData = {
// 			...req.body,
// 			role_id: 1,
// 		};
// 		const verify = encryptToken(adminData);
// 		const mailOption = {
// 			from: "Admin <nature.goods.official@no-reply.com>",
// 			to: req.body.email,
// 			subject: "Email Verification",
// 			template: "VerifyEmailForAdmin",
// 			context: {
// 				username: req.body.username,
// 				email: req.body.email,
// 				verify,
// 			},
// 		};
// 		await emailHandler(mailOption);
// 		console.log(adminData);
// 		return res
// 			.status(200)
// 			.send({ status: "SUCCESS", message: "Please check your email" });
// 	} catch (err) {
// 		next(err);
// 	}
// };
// const emailVerificationForAdmin = async (req, res, next) => {
// 	try {
// 		const {
// 			username,
// 			password,
// 			email,
// 			full_name,
// 			security_answer,
// 			security_question_id,
// 			role_id,
// 		} = req.user;
// 		const addAdmin = await user.create({
// 			username,
// 			password: encryptHandler(password),
// 			email,
// 			full_name,
// 			security_answer,
// 			security_question_id,
// 			role_id,
// 		});
// 		const getAdmin = await user.findOne({
// 			where: {
// 				id: addAdmin.id,
// 			},
// 			attributes: { exclude: "password" },
// 		});
// 		const response = {
// 			...getAdmin.dataValues,
// 			token: encryptToken(getAdmin.dataValues),
// 		};
// 		return res.status(200).send(response);
// 	} catch (err) {
// 		next(err);
// 	}
// };

// module.exports = { registerAsAdmin, emailVerificationForAdmin };
