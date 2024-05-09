import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, StatusBar } from 'react-native';
import React, { useState, FC } from 'react';
import PostModel, { Post } from '../Model/PostModel';


const AddNewPost: FC<{ navigation: any }> = ({ navigation }) => {
    const [title, onChangeTitle] = React.useState('');
    const [id, onChangeId] = React.useState('');
    const [address, onChangeAddress] = React.useState('');
    const [text, onChangeText] = React.useState('');

    const onCancel = () => {
        console.log('Cancel');
        navigation.navigate('StudentListPage');
    }
    const onSave = () => {
        console.log('Save');
        const post: Post = {
            title: title,
            id: id,
            text: text,
            imgUrl: address,
        }
  
        PostModel.addPost(post);
        navigation.navigate('HomePage');
    }
    return (
        <View style={styles.container}>
            <Image style={styles.avatar} source={require('../assets/avatar.jpeg')} />
            <TextInput
                style={styles.input}
                onChangeText={onChangeTitle}
                value={title}
                placeholder="Enter title"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Enter post details"
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
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        flexDirection: 'column',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        backgroundColor: 'blue',
    },
    avatar: {
        alignSelf: 'center',
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
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
    },
    buttonText: {
        padding: 10
    }

});


export default AddNewPost;