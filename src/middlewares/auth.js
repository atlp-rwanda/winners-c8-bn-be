import { verify } from "jsonwebtoken";

const authchecker = async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return res.status(401).send({ error: "Login Required" });
  }

  try {
    const data = verify(token, process.env.TOKEN_SECRET);
    req.user = data;
    req.user.managerId = "0b54cb13-9f35-4c9c-ad05-9b73fdba9c45";
  } catch (err) {
    return res.status(401).send({ error: "Invalid Token" });
  }

  next();
};

export default authchecker;
