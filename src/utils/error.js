const error = (res, status, message) => {
<<<<<<< HEAD
  return res.status(status).json({
    success: false,
    message,
  });
=======
	res.status(status).json({
		success: false,
		message,
	});
>>>>>>> b0a04e1 (changes on registration)
};

export default error;
