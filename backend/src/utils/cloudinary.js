import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null
        }

        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" })

        return response

    } catch (error) {
        return null;
    }
}

const deleteFromCloudinary = async (oldUrl) => {
    try {
        const extractPublicId = (url) => {
            const urlParts = url.split("/");
            const fileWithExtension = urlParts[urlParts.length - 1];
            const publicId = fileWithExtension.split(".")[0]; 
            return publicId;
        };
        const publicId = extractPublicId(oldUrl);
        const response = await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        return null;
    }
}

export { uploadOnCloudinary, deleteFromCloudinary }