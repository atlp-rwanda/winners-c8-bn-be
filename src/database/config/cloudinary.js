import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'duaym10fi', 
    api_key: '137329397428676', 
    api_secret: '1EHbOJRXuIVO4sb6P67H-YqmsII' 
  });


export default cloudinary.uploader;
