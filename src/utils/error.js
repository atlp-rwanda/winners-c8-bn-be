const error = (res, status, message) => {
  return res.status(status).json({
    success: false,
    message,
  });
};

export default error;
