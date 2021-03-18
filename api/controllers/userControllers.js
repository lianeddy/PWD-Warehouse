const { user, securityQuestion } = require('../models');
const { encryptToken } = require('../middlewares');
const { encryptHandler, emailHandler, hash } = require('../handlers');

const sequelize = require("../database");
const hash = require("../handlers");


const register = async (req, res, next) => {
  try {
    const {
      username,
      password,
      email,
      full_name,
      security_answer,
      security_question_id,
    } = req.body;
    const addUser = await user.create({
      username,
      password: encryptHandler(password),
      email,
      full_name,
      security_answer,
      security_question_id,
    });
    const getUser = await user.findAll({
      where: {
        id: addUser.id,
      },
      attributes: { exclude: 'password' },
    });
    const response = {
      ...getUser[0].dataValues,
      token: encryptToken(getUser[0].dataValues),
    };
    const mailOption = {
      from: 'Admin <nature.goods.official@no-reply.com>',
      to: email,
      subject: 'Email Verification',
      template: 'VerifyEmail',
      context: {
        username,
        email,
        token: response.token,
      },
    };
    await emailHandler(mailOption);
    return res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

const getSecurityQuestion = async (req, res, next) => {
  try {
    const getQuestion = await securityQuestion.findAll();
    const response = [];
    getQuestion.forEach((value) => {
      response.push({ value: value.id, label: value.question });
    });
    return res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

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
		// console.log(response.token)
		return res.status(200).send(response);
	} catch (err) {
		console.log(err);
		next(err);
	}
};

const keepLogin = async (req, res) => {
	try {
		const id = req.user.id;
		const getUser = await user.findByPk(id);
		return res.status(200).send(getUser);
	} catch (err) {
		next(err);
	}
};

module.exports = { register, getSecurityQuestion, login, keepLogin };
