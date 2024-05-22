import UserApi from "../api/UserApi";
import { setToken, removeToken } from '../common/tokenStorage';

export interface IUser {
    name: string;
    email: string;
    _id?: string;
    password?: string;
    imgUrl?: string;
    userType?: string;
    accessToken?: string;
    refreshToken?: string;
}

const registerUser = async (user: IUser) => {
    try {
        const response = await UserApi.registerUser(user);
        console.log("response: " + response);
        return response;
    } catch (err) {
      console.log("fail registering user " + err);
      throw err;
    }
};

const signInWithGoogle = async (credentialToken: any) => {
    try {
        const response = await UserApi.signInWithGoogle(credentialToken);
        console.log("response: " + response.data.accessToken);
        await setToken(response.data.accessToken, response.data.refreshToken);
        return response;
    } catch (err) {
        console.log("fail registering user " + err);
        throw err;
    }
};

const login = async (email: string, password: string) => {
    try {
        const response = await UserApi.login(email, password);
        console.log("response: " + response.data.message);
        await setToken(response.data.accessToken, response.data.refreshToken);
        return response;
    } catch (err) {
        console.log("Login fail " + err);
        throw err;
    }
};

const logout = async () => {
    try {
        await UserApi.logout();
    } catch (err) {
        console.log("Logout fail " + err);
    }
};

const check = async () => {
    try {
        const response = await UserApi.check();
        console.log("response here: " + response.data);
        return response.data;
    } catch (err) {
        console.log("fail checking user " + err);
    }
};

const getUserById = async () => {   
    try {
        const res = await UserApi.getUserById();
        const userData = res.data;
        console.log("user:", userData.imgUrl);
        return userData;
    } catch (error) {
        console.error("Failed to fetch user data:", error);
    }
};

const updateUserDetails = async (editedName: string, editedImgUrl: string) => {
    try {
        await UserApi.updateUserDetails(editedName, editedImgUrl);
        return;
    } catch (error) {
        console.error("Failed to update user details:", error);
    }
};

const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
        await UserApi.changePassword(oldPassword, newPassword);
        return;
    } catch (error) {
        console.error("Failed to change password:", error);
    } 
};

export default { registerUser, signInWithGoogle, login, logout, check, getUserById, updateUserDetails, changePassword };
