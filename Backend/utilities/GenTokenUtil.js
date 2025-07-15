import jwt from 'jsonwebtoken';

/**
 * Generate a JWT token for the given user data.
 * @param {Object} data - Payload to embed in the token (e.g., user ID, username).
 * @returns {String} - Signed JWT token.
 */
const createToken = (data) => {
  const token = jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: '10d',
  });

  return token;
};

export default createToken;
