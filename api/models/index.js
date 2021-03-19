const user = require("./user");
const securityQuestion = require("./securityQuestion");
const role = require("./role");
const product = require("./product");
const inventory = require("./inventory");
const category = require("./category");
const warehouse = require("./warehouse");
const userStatus = require("./userStatus");
const emailVerification = require("./emailVerification");
const productImage = require("./productImage");
const cart = require("./cart");

module.exports = {
	role,
	user,
	securityQuestion,
	userStatus,
	emailVerification,
	product,
	inventory,
	category,
	warehouse,
	productImage,
	cart,
};
