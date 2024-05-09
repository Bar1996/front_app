import apiClient from "./ClientApi";

const getAllStudents = async () => {
return apiClient.get('/student')
}

const addStudent = async (student: any) => {
return apiClient.post('/student', student)
}


export default {
getAllStudents,
addStudent
}