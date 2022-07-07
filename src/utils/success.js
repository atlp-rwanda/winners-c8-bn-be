const success = (res, status, message, data) => {
  return res.status(status).json({
    success: true,
    status,
    message,
    data,
  });
};

export default success;
