import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, StatusBar, Alert } from 'react-native';
import React, { useState, FC } from 'react';
import * as ImagePicker from 'expo-image-picker';
import PostModel, { Post } from '../Model/PostModel';
import Ionicons from "@expo/vector-icons/Ionicons";
import Modal from 'react-native-modal';
import StudentModel from '../Model/StudentModel';

const AddNewPost: FC<{ navigation: any }> = ({ navigation }) => {
    const [text, onChangeText] = useState('');
    const [imgUrl, onChangeImgUrl] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const onSave = async () => {
        if (text === ""){
            Alert.alert("Please enter text");
            return;
        }
        if (imgUrl === ""){
            Alert.alert("Please select an image");
            return;
        }
        console.log("before back", imgUrl);
        const url = await StudentModel.uploadImage(imgUrl);
        console.log("url", url);

        const post: Post = { text, imgUrl: url, timestamp:  new Date().toLocaleString("en-US", {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
          })};
        await PostModel.addPost(post);
        navigation.navigate('PostsListScreen');
    };

    const openCamera = async () => {
        try {
          const res = await ImagePicker.launchCameraAsync();
          if (!res.canceled && res.assets.length > 0) {
            const uri = res.assets[0].uri;
            onChangeImgUrl(uri);
            setModalVisible(false);
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
            onChangeImgUrl(uri);
            setModalVisible(false);
          }
        } catch (err) {
          console.log("fail opening camera " + err);
        }
      };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.headerText}>Create Post</Text>
            </View>
            <TextInput
                style={styles.input}
                multiline
                numberOfLines={4}
                onChangeText={onChangeText}
                value={text}
                placeholder="What's on your mind?"
            />
            <TouchableOpacity onPress={toggleModal} style={styles.avatarContainer}>
                <Image source={imgUrl ? { uri: imgUrl } : require("../assets/placeholder.png")} style={styles.avatar} />
            </TouchableOpacity>
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={openCamera} style={styles.iconRow}>
                        <Ionicons name={"camera"} size={20} style={styles.icon} />
                        <Text style={styles.iconText}>Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openGallery} style={styles.iconRow}>
                        <Ionicons name={"image"} size={20} style={styles.icon} />
                        <Text style={styles.iconText}>Choose from Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleModal} style={styles.iconRow}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={onSave}>
                    <Text style={styles.buttonText}>Post</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#f8f9fa",
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 20,
    },
    input: {
        padding: 15,
        fontSize: 18,
        textAlignVertical: "top",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 10,
        margin: 12,
        backgroundColor: "#fff",
    },
    avatarContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    avatar: {
        height: 200,
        width: "90%",
        margin: 10,
        borderRadius: 10,
    },
    modalContent: {
        backgroundColor: "white",
        padding: 22,
        borderRadius: 4,
        width: "80%",
    },
    iconRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    icon: {
        marginRight: 10,
    },
    iconText: {
        fontSize: 16,
    },
    buttons: {
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    button: {
        backgroundColor: "#007BFF",
        borderRadius: 6,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default AddNewPost;
