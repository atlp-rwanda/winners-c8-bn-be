<<<<<<< HEAD
const success = (res, status, message, data) => {
  return res.status(status).json({
    success: true,
    message,
    data,
=======
const success = (res, status, message, datas) => {
  res.status(status).json({
    success: true,
    message,
    data: datas,
>>>>>>> b0a04e1 (changes on registration)
  });
};

export default success;
