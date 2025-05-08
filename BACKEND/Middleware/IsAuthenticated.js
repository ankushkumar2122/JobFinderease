const JWT = require("jsonwebtoken");

const IsAuthenticated = (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "User not authenticated", success: false });
    }

    // Verify the token using the secret key
    const decode = JWT.verify(token, process.env.SECRET_KEY);

    // If token verification is successful, add userId to the request object
    req.id = decode.userId;
    next();
  } catch (error) {
    console.error(error);

    // Handle expired or invalid token errors
    return res
      .status(401)
      .json({ message: "Invalid or expired token", success: false });
  }
};

module.exports = { IsAuthenticated };
