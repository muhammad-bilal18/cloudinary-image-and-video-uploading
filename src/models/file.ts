import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    fileName: String,
    fileSize: Number,
    fileType: String,
    fileURL: String
});

export const File = mongoose.model('File', fileSchema);