import cloudinary from "cloudinary";
import fs from "fs";

const uploadImage = async(locaFilePath: any) => {
    //Path of image which was last uploaded to cloudinary
    const mainFolderName = "main"
    const filePathOnCloudinary = mainFolderName + "/" + locaFilePath
    //FilePathOnCloudinary
    //Path of Image We Want when it is uploaded to cloudinary
  return cloudinary.v2.uploader.upload(locaFilePath, {"public_id":filePathOnCloudinary}
 ).then((result) => {
    //Image has been successfully uploaded on cloudinary
    //Remove file from local uploads folder
     fs.unlinkSync(locaFilePath)


     return{
         message: "Success",
         url:result.url
     }
 }).catch((error) => {
     fs.unlinkSync(locaFilePath)
     return {message: "Fail"}
 });
}

export default uploadImage