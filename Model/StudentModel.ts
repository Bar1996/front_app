import StudentApi from "../api/StudentApi";

export type Student = {
  name: string;
  id: string;
  imgUrl: string;
};

const students: Student[] = [];

const getAllStudents = async () => {
  console.log("getAllStudents()");
  const res: any = await StudentApi.getAllStudents();
  let students = Array<Student>();
  if (res.data) {
    res.data.forEach((obj: any) => {
      console.log("element: " + obj._id);
      const st: Student = {
        name: obj.name,
        id: obj._id,
        imgUrl: "",
      };
      students.push(st);
    });
  }
  return students;
};

const getStudent = (id: string): Student | undefined => {
  return students.find((student) => student.id == id);
};

const addStudent = (student: Student) => {
    const data = {
        _id: student.id,
        name: student.name, 
        imgUrl: student.imgUrl
    }
    try{
        const res = StudentApi.addStudent(data)
    }catch(err){
        console.log("fail adding student " + err)
    }
};

const deleteStudent = (id: string) => {
  const index = students.findIndex((student) => student.id === id);
  if (index !== -1) {
    students.splice(index, 1);
  }
};

export default { getAllStudents, getStudent, addStudent, deleteStudent };
