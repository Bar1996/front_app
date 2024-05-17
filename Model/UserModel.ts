import apiClient from "../api/ClientApi";
import { setToken, removeToken } from '../api/tokenStorage';


export interface IUser {
    name: string;
    email: string;
    _id?: string;
    password?: string;
    imgUrl?: string;
    accsessToken?: string;
    refreshToken?: string;
    }

    const registerUser = async (user: IUser) => {
        try{
        const response = await apiClient.post("/auth/register", user);
        console.log("response: " + response);
        return response;
        }catch(err){
        console.log("fail registering user " + err);
        }
         
    }
    const SignInWithGoogle = async (credentialToken: any) => {
        const data = {
            credentialResponse: credentialToken
        };
        try{
        const response = await apiClient.post("/auth/google", data);
        console.log("response: " + response.data.accessToken);
        await setToken(response.data.accessToken, response.data.refreshToken);
        return response;
        }catch(err){
        console.log("fail registering user " + err);
        }
         
    }

    const Login = async (email: string, password: string) => {
        const data = {
            email: email,
            password: password
        };
        try{
        const response = await apiClient.post("/auth/login", data);
        console.log("response: " + response.data.message);
        await setToken(response.data.accessToken, response.data.refreshToken);
      

        
        return response;
        }catch(err){
        console.log("Login fail " + err);
        }
         
    }

    const Logout = async () => {
        try{
        await removeToken()
        }catch(err){
        console.log("Loguot fail " + err);
        }
    }

    const Check = async () => {
        try{
        // console.log("Check Button Pressed",await getToken());
        const response = await apiClient.get("/post");
        console.log("response here: " + response.data);
        return response.data;
        }catch(err: any){
        console.log("fail checking user " + err);
        console.log("fail checking user " + err.response.data);
        
        }
    }

    const getUserById = async () => {   
        try {
          const res = await apiClient.get('/auth/getById'); // Make sure this endpoint returns the necessary data
          const userData = res.data; // Assuming the response has the user data in 'data'
          console.log("user:", userData.imgUrl); // Debugging
          return userData;
        } catch (error) {
          console.error("Failed to fetch user data:", error); // Error handling
        }
      };

      const updateUserDetails = async (editedName: string, editedImgUrl: string) => {
        try {
          await apiClient.put('/auth/update', { name: editedName, imgUrl: editedImgUrl }); // Removed email from the update payload
          return;
        } catch ( error) {
          console.error("Failed to update user details:", error); // Error handling
        }
      };
      


       
        
         

    export default { registerUser, SignInWithGoogle, Login, Logout, Check, getUserById, updateUserDetails};