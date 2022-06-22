const authchecker = async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return res.status(401).send({ error: "Login Required" });
  }

  switch (token) {
    case "1":
      req.user = {
        userId: 1,
        role: "manager",
      };
      break;
    case "2":
      req.user = {
        userId: 2,
        managerId: 1,
        role: "requester",
      };
      break;
    case "3":
      req.user = {
        userId: 3,
        managerId: 1,
        role: "requester",
      };
      break;

    default:
      return res.status(401).send({ error: "Invalid Token" });
  }

  next();
};

export default authchecker;
