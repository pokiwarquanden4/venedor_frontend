// src/components/ImageUpload.js

import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "./fireBase";

export const uploadFirebaseImage = async (info, file) => {
    if (!file) throw new Error("No file provided");

    const imageRef = ref(storage, `Product/${info.location}/${uuidv4()}-${file.name}`);

    await uploadBytes(imageRef, file);

    const url = await getDownloadURL(imageRef);
    return url;
};

export const deleteFirebaseImage = async (imageUrl, location) => {
    try {
        // Tạo reference từ URL ảnh (hoặc thông tin location nếu cần)
        const imageRef = ref(storage, imageUrl); // Hoặc ref(storage, `Product/${location}/${fileName}`)

        // Xóa ảnh
        await deleteObject(imageRef);
        console.log("File deleted successfully");
    } catch (error) {
        console.error("Error deleting file:", error);
        throw new Error("Failed to delete image");
    }
};
