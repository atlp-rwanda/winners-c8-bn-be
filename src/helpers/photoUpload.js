import uploader from '../database/config/cloudinary';


const profileImage = async (req) => {
    try {
        const tmp = req.files.image.tempFilePath;
        const Result = await uploader.upload(
            tmp,
            { folder: 'winners-c8-bn-be' },
            (_, result) => result
        );
        return Result;
    } catch (error) {
        console.log(error);
    }
};


export default profileImage;
