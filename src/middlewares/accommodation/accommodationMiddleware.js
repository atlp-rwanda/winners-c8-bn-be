import 'dotenv/config';
import Formidable from 'formidable';



export default async function accommodationMiddleware (req, res, next){

	// parse a file upload
	const form = new Formidable.IncomingForm();

	form.parse(req, (err, fields, files) => {
		  req.body = fields;
		  req.inputFiles = files;
		  next();
	});

}
