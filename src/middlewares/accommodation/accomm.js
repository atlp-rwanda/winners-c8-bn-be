

export default async function accommodationMiddleware (req, res, next){
	// console.log(req.body, req.inputFiles);
	return res.status(200).json({body: req.body, files: req.inputFiles});

}
