import ImageApi from "../api/ImageApi";
import StudentApi from "../api/StudentApi";
import FormData from "form-data";



interface UploadImageResponse {
  message: string;
  url: string;
}


const uploadImage = async (imageUri: string): Promise<string> => {
    try {
      const formData = new FormData();
      const uriParts = imageUri.split(".");
      const fileType = uriParts[uriParts.length - 1];
      const filename = "photo" + Date.now().toString() + "." + fileType;
  
      formData.append("file", {
        uri: imageUri,
        type: `image/${fileType}`,
        name: filename,
      });
  
      const res = await ImageApi.uploadImage(formData);
      if (!res || !res.data) {
        console.error("Failed to receive valid response or data.");
        return ""; // Return early if response is not valid
      }
      const data = res.data as UploadImageResponse;
      if (data.message !== "Uploaded successfully") {
        console.error("save failed", res.status);
        return ""; // Return early if upload is not successful
      } else {
        console.log("save passed");
        return data.url;
      }
    } catch (err) {
      console.error("save failed", err);
      return "";
    }
  }


  export default {uploadImage};