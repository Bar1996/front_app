import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  TextInput,
  StatusBar,
} from "react-native";
import React, { useState, FC, useEffect } from "react";
import StudentModel, { Student } from "../Model/StudentModel";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";

const StudentAddPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [name, onChangeName] = React.useState("");
  const [id, onChangeId] = React.useState("");
  const [imgUri, onChangeImgUri] = React.useState("");

  const askForCameraPermission = async () => {
    try {
      const permissionResult = await ImagePicker.getCameraPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Permission to access camera is required!");
        return;
      }
    } catch (err) {
      console.log("fail getting permission " + err);
    }
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const onCancel = () => {
    console.log("Cancel");
    navigation.navigate("StudentListPage");
  };

  const onSave = async () => {
    console.log("Save");
    const student: Student = {
      name: name,
      id: id,
      imgUrl: "url",
    };
    try {
      console.log("imgUri: " + imgUri);
      if (imgUri !== "") {
        const url = await StudentModel.uploadImage(imgUri);
        student.imgUrl = url;
        console.log("url: " + student.imgUrl);
      }
      await StudentModel.addStudent(student);
    } catch (err) {
      console.log("fail adding student " + err);
    }
    navigation.navigate("StudentListPage");
  };

  const openCamera = async () => {
    try {
      const res = await ImagePicker.launchCameraAsync();
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        onChangeImgUri(uri);
      }
    } catch (err) {
      console.log("fail opening camera " + err);
    }
  };

  const openGallery = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync();
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        onChangeImgUri(uri);
      }
    } catch (err) {
      console.log("fail opening camera " + err);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        {imgUri === "" && (
          <Image
            style={styles.avatar}
            source={require("../assets/avatar.jpeg")}
          />
        )}
        {imgUri !== "" && (
          <Image style={styles.avatar} source={{ uri: imgUri }} />
        )}

        <TouchableOpacity onPress={openCamera}>
          <Ionicons name={"camera"} style={styles.cameraButton} size={50} />
        </TouchableOpacity>
        <TouchableOpacity onPress={openGallery}>
          <Ionicons name={"image"} style={styles.galleryButton} size={50} />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder="Enter your name"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeId}
        value={id}
        placeholder="Enter your id"
      />
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={onCancel}>
          <Text style={styles.buttonText}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSave}>
          <Text style={styles.buttonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: "blue",
  },
  avatar: {
    alignSelf: "center",
    height: 200,
    width: 200,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    margin: 10,
    alignItems: "center",
  },
  buttonText: {
    padding: 10,
  },
  cameraButton: {
    position: "absolute",
    bottom: -10,
    left: 10,
    width: 50,
    height: 50,
  },
  galleryButton: {
    position: "absolute",
    bottom: -10,
    right: 10,
    width: 50,
    height: 50,
  },
});

export default StudentAddPage;
