import apiClient from "../api/ClientApi";
import { removeToken, getRefreshToken, getToken } from '../common/tokenStorage';
import { IUser } from '../Model/UserModel';

const registerUser = async (user: IUser) => {
    return apiClient.post("/auth/register", user);
};

const signInWithGoogle = async (credentialToken: any) => {
    const data = {
        credentialResponse: credentialToken
    };
    return apiClient.post("/auth/google", data);
};

const login = async (email: string, password: string) => {
    const data = {
        email: email,
        password: password
    };
    return apiClient.post("/auth/login", data);
};



const logout = async () => {
    try {
        const token = await getToken();
        if (token) {
            await apiClient.get('/auth/logout', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await removeToken();
        }
    } catch (err) {
        console.log("Logout fail " + err);
        throw err; // Rethrow the error to handle it in UserModel
    }
};


const check = async () => {
    return apiClient.get("/post");
};

const getUserById = async () => {   
    return apiClient.get('/auth/getById');
};

const updateUserDetails = async (editedName: string, editedImgUrl: string) => {
    return apiClient.put('/auth/update', { name: editedName, imgUrl: editedImgUrl });
};

const changePassword = async (oldPassword: string, newPassword: string) => {
    return apiClient.put('/auth/changePassword', { oldPassword, newPassword });
};

export default { registerUser, signInWithGoogle, login, logout, check, getUserById, updateUserDetails, changePassword };
