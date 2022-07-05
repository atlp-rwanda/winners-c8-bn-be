import { v2 as cloudinary } from 'cloudinary'
import 'dotenv/config';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const imageUploader = {}

imageUploader.accommodationCreation = (req, res, next) => {
    const files = req.files;
    if(files && (Object.keys(files).includes("accommodation_image"))){
        try{
            cloudinary.uploader.upload(
                req.files.accommodation_image.tempFilePath, 
                { folder: `winners-c8-bn-be/${process.env.NODE_ENV}/accommodations/facilities/` },
                (error, result) => {
    
                    // save the link to the image
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
    else{ 
        return res.status(400).json({
            error: "the accommodation facility's image file is not provided.",
          });
    }
}
imageUploader.accommodationUpdate = (req, res, next) => {
    const files = req.files;
    if(files && (Object.keys(files).includes("accommodation_image"))){
        try{
            cloudinary.uploader.upload(
                req.files.accommodation_image.tempFilePath, 
                { folder: `winners-c8-bn-be/${process.env.NODE_ENV}/accommodations/facilities/` },
                (error, result) => {
    
                    // save the link to the image
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
    else{ 
        next();
    }
}
imageUploader.roomCreation = (req, res, next) => {
    const files = req.files;
    if(files && (Object.keys(files).includes("room_image"))){
        try{
            cloudinary.uploader.upload(
                req.files.room_image.tempFilePath, 
                { folder: `winners-c8-bn-be/${process.env.NODE_ENV}/accommodations/rooms/` },
                (error, result) => {
    
                    // save the link to the image
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
    else{ 
        next();
    }
}
imageUploader.roomUpdate = (req, res, next) => {
    const files = req.files;
    if(files && (Object.keys(files).includes("room_image"))){
        try{
            cloudinary.uploader.upload(
                req.files.room_image.tempFilePath, 
                { folder: `winners-c8-bn-be/${process.env.NODE_ENV}/accommodations/rooms/` },
                (error, result) => {
    
                    // save the link to the image
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
    else{ 
        next();
    }
}

export default imageUploader; 