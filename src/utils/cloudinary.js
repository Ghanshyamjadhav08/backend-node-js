
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from 'fs'

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        // Check if file path exists
        if (!localFilePath) {
            return null;
        }

        // Upload file to Cloudinary
        const response = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: "auto",
            }
        );

       // console.log("File uploaded successfully:", response.url);
           fs.unlinkSync(localFilePath)
        // Return Cloudinary response
        return response;

    } catch (error) {
        // Print the actual Cloudinary error
        console.error("Cloudinary upload failed:", error.message);

        // Keep local file so you can retry the upload
        return null;
    }
};

export { uploadOnCloudinary };