import cloudinary from "cloudinary";
import fs from "fs";

const uploadImage = async(locaFilePath: any) => {
    const mainFolderName = "main"
    const filePathOnCloudinary = mainFolderName + "/" + locaFilePath
  return cloudinary.v2.uploader.upload(locaFilePath, {"public_id":filePathOnCloudinary}
 ).then((result) => {
     fs.unlinkSync(locaFilePath)

     fs.unlinkSync(locaFilePath)

     return{
         message: "Success",
         url: result.url
     }
 }).catch((error) => {
     fs.unlinkSync(locaFilePath)
     return {message: "Fail"}
 });
}

export default uploadImage