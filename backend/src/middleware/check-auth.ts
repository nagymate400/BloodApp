const jwt = require("jsonwebtoken");
import express from 'express';

module.exports = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
    console.log(decodedToken.userId);
    next();
  } catch (error) {
    res.status(401).json({
      message: "Auth failed!",
    });
  }
};
