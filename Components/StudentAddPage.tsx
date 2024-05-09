import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, StatusBar } from 'react-native';
import React, { useState, FC } from 'react';
import StudentModel, { Student } from '../Model/StudentModel';


const StudentAddPage: FC<{ navigation: any }> = ({ navigation }) => {
    const [name, onChangeName] = React.useState('');
    const [id, onChangeId] = React.useState('');
    const [address, onChangeAddress] = React.useState('');

    const onCancel = () => {
        console.log('Cancel');
        navigation.navigate('StudentListPage');
    }
    const onSave = async () => {
        console.log('Save');
        const student: Student = {
            name: name,
            id: id,
            imgUrl: '../assets/avatar.jpeg'
        }
        try{
            await StudentModel.addStudent(student);
        }catch(err){
            console.log("fail adding student " + err)
        }
        navigation.navigate('StudentListPage');
    }
    return (
        <View style={styles.container}>
            <Image style={styles.avatar} source={require('../assets/avatar.jpeg')} />
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


export default StudentAddPage;