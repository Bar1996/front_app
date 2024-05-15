import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import React, { useState, FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentDetailsPage from './Components/StudentDetailsPage';
import StudentListPage from './Components/StudentListPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddNewPost from './Components/AddNewPost';
import GoogleSigninComp from './Components/GoogleSigninComp';
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const StudentsListStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

const StudentsListScreen: FC = () => {
  return (
    <StudentsListStack.Navigator>
      <StudentsListStack.Screen name="StudentListPage" component={StudentListPage} options={{ title: 'Students List' }} />
      <StudentsListStack.Screen name="StudentDetailsPage" component={StudentDetailsPage} options={{ title: 'Student Details' }} />
      <StudentsListStack.Screen name="Register" component={Register} options={{ title: 'Register', headerShown: false }} />
    </StudentsListStack.Navigator>
  );
}





export default function App() {

 

  return (
   
    <NavigationContainer>
    <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Home" component={Home} />
     </Stack.Navigator>
     </NavigationContainer>
  
    // <NavigationContainer>
    //   <Tab.Navigator>
    //     <Tab.Screen name="StudentsListScreen" component={StudentsListScreen} options={{ headerShown: false }} />
    //     <Tab.Screen name="Register" component={Register} options={{ title: 'Register', headerShown: false }} />
    //     <Tab.Screen name="Login" component={Login} options={{ title: 'Login', headerShown: false }} />
    //   </Tab.Navigator>
    // </NavigationContainer >
   
//     <View style={styles.container}>
// <View style={styles.container}>
     
//       <GoogleSigninComp />
//     </View>
//   </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});