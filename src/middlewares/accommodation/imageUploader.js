import { v2 as cloudinary } from 'cloudinary'
import 'dotenv/config';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const imageUploader = {}

imageUploader.accommodationCreation = (req, res, next) => {
    if(Object.keys(req.inputFiles).length>0){
        try{
            cloudinary.uploader.upload(
                req.inputFiles.accommodation_image.filepath, 
                { folder: "accommodations/facilities/" },
                (error, result) => {
    
                    req.inputFiles.cloudinaryOutput = result;
                    req.body.images_links = [result.url];
                    next()
                }
            );
        }
        catch(err){
            return res.status(500).json({
                error: `Failed to upload the image, due to this error: ${err}`,
              });
        }
    }
}
imageUploader.accommodationUpdate = (req, res, next) => {
    if(Object.keys(req.inputFiles).length>0){
        try{
            cloudinary.uploader.upload(
                req.inputFiles.accommodation_image.filepath, 
                { folder: "accommodations/facilities/" },
                (error, result) => {
    
                    req.inputFiles.cloudinaryOutput = result;
                    req.body.image_link = result.url;
                    next()
                }
            );
        }
        catch(err){
            return res.status(500).json({
                error: `Failed to upload the image, due to this error: ${err}`,
              });
        }
    }
}
imageUploader.roomCreation = (req, res, next) => {
    if(Object.keys(req.inputFiles).length>0){
        try{
            cloudinary.uploader.upload(
                req.inputFiles.room_image.filepath, 
                { folder: "accommodations/rooms/" },
                (error, result) => {
    
                    req.inputFiles.cloudinaryOutput = result;
                    req.body.images_links = [result.url];
                    next()
                }
            );
        }
        catch(err){
            return res.status(500).json({
                error: `Failed to upload the image, due to this error: ${err}`,
              });
        }
    }
}
imageUploader.roomUpdate = (req, res, next) => {
    if(Object.keys(req.inputFiles).length>0){
        try{
            cloudinary.uploader.upload(
                req.inputFiles.room_image.filepath, 
                { folder: "accommodations/rooms/" },
                (error, result) => {
    
                    req.inputFiles.cloudinaryOutput = result;
                    req.body.image_link = result.url;
                    next()
                }
            );
        }
        catch(err){
            return res.status(500).json({
                error: `Failed to upload the image, due to this error: ${err}`,
              });
        }
    }
}


export default imageUploader; 