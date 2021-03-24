const { decryptToken, encryptToken } = require("./jwtValidator");
const registerValidator = require("./registerValidator");
const changePasswordValidator = require("./changePasswordValidator");
const loginValidator = require("./loginValidator");
const uploader = require("./uploader");

module.exports = {
	decryptToken,
	encryptToken,
	registerValidator,
	changePasswordValidator,
	loginValidator,
	uploader,
};
