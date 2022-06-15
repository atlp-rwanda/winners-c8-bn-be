const success = (res, status, message, datas) => {
  res.status(status).json({
    success: true,
    message,
    data: datas,
  });
};

export default success;
