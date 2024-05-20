import StudentApi from "../api/StudentApi";
import FormData from "form-data";

export type Student = {
  name: string;
  id: string;
  imgUrl: string;
};

interface UploadImageResponse {
  message: string;
  url: string;
}

const students: Student[] = [];

const getAllStudents = async () => {
  console.log("getAllStudents()");
  const res: any = await StudentApi.getAllStudents();
  let students = Array<Student>();
  if (res.data) {
    res.data.forEach((obj: any) => {
      const st: Student = {
        name: obj.name,
        id: obj._id,
        imgUrl: obj.imgUrl,
      };
      students.push(st);
    });
  }
  return students;
};

const getStudent = (id: string): Student | undefined => {
  return students.find((student) => student.id == id);
};

const addStudent = async (student: Student) => {
  const data = {
    _id: student.id,
    name: student.name,
    imgUrl: student.imgUrl,
  };
  try {
    const res = StudentApi.addStudent(data);
  } catch (err) {
    console.log("fail adding student " + err);
  }
};

const deleteStudent = (id: string) => {
  const index = students.findIndex((student) => student.id === id);
  if (index !== -1) {
    students.splice(index, 1);
  }
};

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

    const res = await StudentApi.uploadImage(formData);
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

export default {
  getAllStudents,
  getStudent,
  addStudent,
  deleteStudent,
  uploadImage,
};
