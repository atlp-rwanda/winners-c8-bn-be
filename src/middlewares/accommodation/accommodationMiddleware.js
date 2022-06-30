import 'dotenv/config';
import Formidable from 'formidable';

export default async function accommodationMiddleware (req, res, next){
	
	if(Object.keys(req.body).length>0){
		req.inputFiles = {};
		next();
	}
	
	// parse a file upload
	const form = new Formidable.IncomingForm();

	form.parse(req, (err, fields, files) => {
		if(Object.keys(fields).length>0){
			req.body = fields;
		}
		if(Object.keys(files).length>0){
		  req.inputFiles = files;
		}
		else{
			req.inputFiles = {};
		}
		next();
	});

}
