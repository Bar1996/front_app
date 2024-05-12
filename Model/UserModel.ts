import apiClient from "../api/ClientApi";


export interface IUser {
    name: string;
    email: string;
    _id?: string;
    password?: string;
    imageUrl?: string;
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
        console.log("SignInWithGoogle()" + credentialToken);
        const data = {
            credentialResponse: credentialToken
        };
        try{
        const response = await apiClient.post("/auth/google", data);
        console.log("response: " + response.data.accessToken);
        
        return response;
        }catch(err){
        console.log("fail registering user " + err);
        }
         
    }


    export default { registerUser, SignInWithGoogle };