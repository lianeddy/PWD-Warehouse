const { decryptToken, encryptToken } = require('./jwtValidator');
const registerValidator = require('./registerValidator');

module.exports = {
  decryptToken,
  encryptToken,
  registerValidator,
};
