const { decryptToken, encryptToken } = require("./jwtValidator");
const registerValidator = require("./registerValidator");
const changePasswordValidator = require("./changePasswordValidator");

module.exports = {
	decryptToken,
	encryptToken,
	registerValidator,
	changePasswordValidator,
};
