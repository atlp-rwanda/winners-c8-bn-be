/* eslint-disable */
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import Util from './utils';

dotenv.config();
const util = new Util();
cloudinary.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});
export const uploadToCloud = async (file, res) => {
  try {
    const profilePicture = await cloudinary.uploader.upload(file.path, {
      folder: 'Barefoot',
      use_filename: true,
    });
    return profilePicture;
  } catch (error) {
    util.setError(500, error.message);
    return util.send(res);
  }
};
