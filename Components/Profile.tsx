import React, { useState, useEffect, FC } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Modal, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { theme } from "../core/theme";
import { IUser } from "../Model/UserModel";
import UserModel from "../Model/UserModel";
import Ionicons from "@expo/vector-icons/Ionicons";
import { IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import StudentModel from "../Model/StudentModel";
import ImageModel from '../Model/ImageModel';


const Profile: FC<{ navigation: any }> = ({ navigation }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedImgUrl, setEditedImgUrl] = useState('');
  const [userType, setUserType] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
    const getStudent = async () => {
      setIsLoading(true);
      try {
        const userData = await UserModel.getUserById();
        setUser(userData);
        setEditedName(userData.name);
        setEditedEmail(userData.email);
        setEditedImgUrl(userData.imgUrl);
        setUserType(userData.userType);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }finally {
        setIsLoading(false);
      }
    };
    getStudent();
  })
    return () => unsubscribe();
  }, [navigation]);

  const openImagePicker = async (type: any) => {
    let pickerResult;
    if (type === 'camera') {
      pickerResult = await ImagePicker.launchCameraAsync();
    } else {
      pickerResult = await ImagePicker.launchImageLibraryAsync();
    }

    if (!pickerResult.canceled && pickerResult.assets) {
      setEditedImgUrl(pickerResult.assets[0].uri);
      setImageModalVisible(false);
    }
  };

  const updateUserDetails = async () => {
    try {
      
      const url = await ImageModel.uploadImage(editedImgUrl);
      if (url !== user?.imgUrl){
        await UserModel.updateUserDetails(editedName, url);
        setUser(prevState => ({ ...prevState, name: editedName, email: editedEmail, imgUrl: url }));
        setModalVisible(false);
      }
      else{
        await UserModel.updateUserDetails(editedName, editedImgUrl);
        setUser(prevState => ({ ...prevState, name: editedName, email: editedEmail, imgUrl: editedImgUrl }));
        setModalVisible(false);
      }
      
      // if (url !== editedImgUrl) {
      //   await UserModel.updateUserDetails(editedName, url);
      // setUser(prevState => ({ ...prevState, name: editedName, email: editedEmail, imgUrl: url }));
      // setModalVisible(false);
      // }
      // else{
      //   console.log("enter else");
      //   await UserModel.updateUserDetails(editedName, editedImgUrl);
      //   setUser(prevState => ({ ...prevState, name: editedName, email: editedEmail, imgUrl: editedImgUrl }));
    
      // }
    } catch (error) {
      console.error("Failed to update user details:", error);
    }
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
    try {
      await UserModel.changePassword(currentPassword, newPassword);
      alert("Password changed successfully!");
      setPasswordModalVisible(false);
    } catch (error) {
      console.error("Failed to change password:", error);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleToggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  }

  if (!user) {
    return <View style={styles.loader}><ActivityIndicator size="large" color={theme.colors.primary} /></View>;
  }

  if (!user) {
    return <View style={styles.loader}><ActivityIndicator size="large" color={theme.colors.primary} /></View>;
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
       <View style={styles.centeredView}>
  <View style={styles.modalView}>
    <TouchableOpacity onPress={() => setImageModalVisible(true)} style={styles.imageUploadButton}>
      {editedImgUrl ? (
        <Image source={{ uri: editedImgUrl }} style={styles.avatar} />
      ) : (
        <Image source={require("../assets/avatar.jpeg")} style={styles.avatar} />
      )}
      <Text style={styles.uploadText}>Update Image Here</Text>
    </TouchableOpacity>
    <TextInput
      style={styles.input}
      onChangeText={setEditedName}
      value={editedName}
      placeholder="Edit Name"
    />
    <View style={styles.emailContainer}>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.emailText}>{user.email}</Text>
    </View>
    <Button onPress={() => updateUserDetails()} mode="contained" style={styles.saveButton}>Save</Button>
    <Button onPress={() => setModalVisible(false)} mode="text">Cancel</Button>
  </View>
</View>

      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={imageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => openImagePicker('camera')} style={styles.iconRow}>
              <Ionicons name="camera" size={24} style={styles.icon} />
              <Text style={styles.iconText}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openImagePicker('gallery')} style={styles.iconRow}>
              <Ionicons name="image" size={24} style={styles.icon} />
              <Text style={styles.iconText}>Open -Gallery</Text>
            </TouchableOpacity>
            <Button onPress={() => setImageModalVisible(false)} mode="text">Cancel</Button>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={passwordModalVisible}
        onRequestClose={() => setPasswordModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={setCurrentPassword}
              value={currentPassword}
              placeholder="Enter your password"
              secureTextEntry={!showCurrentPassword}
            />
             <IconButton
              icon={showCurrentPassword ? "eye-off" : "eye"}
              onPress={handleToggleCurrentPasswordVisibility}
              style={[
                styles.iconButton,
                { position: "absolute", right: -10, bottom: 18 },
              ]}
            />
            </View>
            <View>
            <TextInput
              style={styles.input}
              onChangeText={setNewPassword}
              value={newPassword}
              placeholder="Enter new password"
              secureTextEntry={!showPassword}
            />
               <IconButton
              icon={showPassword ? "eye-off" : "eye"}
              onPress={handleTogglePasswordVisibility}
              style={[
                styles.iconButton,
                { position: "absolute", right: -10, bottom: 18 },
              ]}
            />
            </View>
            <View>
            <TextInput
              style={styles.input}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              placeholder="Confirm new password"
              secureTextEntry={!showConfirmPassword}
            />
               <IconButton
              icon={showConfirmPassword ? "eye-off" : "eye"}
              onPress={handleToggleConfirmPasswordVisibility}
              style={[
                styles.iconButton,
                { position: "absolute", right: -10, bottom: 18 },
              ]}
            />
            </View>
            <Button onPress={changePassword} mode="contained" style={styles.saveButton}>Change Password</Button>
            <Button onPress={() => setPasswordModalVisible(false)} mode="text">Cancel</Button>
          </View>
        </View>
      </Modal>


      <View style={styles.profileCard}>
  {isLoading ? (
    <ActivityIndicator size="large" color={theme.colors.primary} /> // Display the loading indicator
  ) : (
    <>
      {editedImgUrl ? (
        <Image source={{ uri: editedImgUrl }} style={styles.avatar} />
      ) : (
        <Image source={require("../assets/avatar.jpeg")} style={styles.avatar} />
      )}
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.emailText}>{user.email}</Text>
     
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="pencil-outline" size={20} color="white" />
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      {userType === 'local' && (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setPasswordModalVisible(true)}
        >
          <Ionicons name="key-outline" size={20} color="white" />
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      )}
    </>
  )}
</View>

    </View>
  );
};

const styles = StyleSheet.create({


  

  imageUploadButton: {
    backgroundColor: theme.colors.surface,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  uploadText: {
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 20,
    borderBottomWidth: 2,
  },
  saveButton: {
    width: '100%',
    marginTop: 20,
  },
  icon: {
    marginRight: 8,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  iconText: {
    fontSize: 16,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  emailText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start", // Align to the top
    backgroundColor: theme.colors.surface,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  profileCard: {
    width: '100%',
    alignItems: "flex-start",
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginVertical: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 12,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.surface,
  },
  editButton: {
    flexDirection: "row",
    marginTop: 12,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    marginLeft: 10,
    color: 'white',
    fontSize: 18,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    margin: 0, // Adjust position of icon
  },
});
  


export default Profile;
