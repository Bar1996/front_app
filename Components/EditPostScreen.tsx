import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, StatusBar, Alert, ActivityIndicator } from 'react-native';
import React, { useState, FC, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import PostModel, { Post } from '../Model/PostModel';
import Ionicons from "@expo/vector-icons/Ionicons";
import Modal from 'react-native-modal';
import StudentModel from '../Model/StudentModel';

const EditPostScreen: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const { post } = route.params; // Expecting post details to be passed in when navigating to this screen

    const [text, onChangeText] = useState(post.postText);
    const [imgUrl, onChangeImgUrl] = useState(post.postImage);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!post) {
            Alert.alert("Post not found");
            navigation.goBack();
        }
    }, [post]);

    const onSave = async () => {
        if (text === ""){
            Alert.alert("Please enter text");
            return;
        }
        if (imgUrl === ""){
            Alert.alert("Please select an image");
            return;
        }

        setIsLoading(true); // Start loading
        try {
            console.log("before update", imgUrl);
            const url = imgUrl.startsWith('http') ? imgUrl : await StudentModel.uploadImage(imgUrl);
            console.log("url", url);

            const updatedPost: Post = {
                ...post,
                text,
                imgUrl: url,
                timestamp: new Date().toLocaleString("en-US", {
                    year: 'numeric',  day: 'numeric', month: 'numeric',
                    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
                })
            };
            await PostModel.updatePost(updatedPost); // Assume updatePost is a function to update the post
            navigation.navigate('PostsListScreen');
        } catch (error) {
            console.error("Failed to update post:", error);
            Alert.alert("Failed to update post. Please try again.");
        } finally {
            setIsLoading(false); // End loading
        }
    };

    const openCamera = async () => {
        try {
            const res = await ImagePicker.launchCameraAsync();
            if (!res.canceled && res.assets.length > 0) {
                const uri = res.assets[0].uri;
                onChangeImgUrl(uri);
                setModalVisible(false);
            }
        } catch (error) {
            console.error("Failed to open camera:", error);
            Alert.alert("Failed to open camera. Please try again.");
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
        } catch (error) {
            console.error("Failed to open gallery:", error);
            Alert.alert("Failed to open gallery. Please try again.");
        }
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.headerText}>Edit Post</Text>
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
                <TouchableOpacity style={styles.button} onPress={onSave} disabled={isLoading}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                        <Text style={styles.buttonText}>Update Post</Text>
                    )}
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

export default EditPostScreen;
