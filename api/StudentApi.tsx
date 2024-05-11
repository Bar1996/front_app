import apiClient from "./ClientApi";

const getAllStudents = async () => {
  return apiClient.get("/student");
};

const addStudent = async (student: any) => {
  return apiClient.post("/student", student);
};

const uploadImage = async (image: any) => {
  console.log("get in uploadImage() " + image);
  try {
    const response = await apiClient.post("/file/upload", image, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error: any) {
    console.error("Error uploading image:", error);
    if (error.response) {
      console.error("Response error:", error.response);
    } else if (error.request) {
      console.error("Request was made but no response was received");
    } else {
      console.error("Error in setting up the request");
    }
    throw new Error("Error uploading image");
  }
};

export default {
  getAllStudents,
  addStudent,
  uploadImage,
};
