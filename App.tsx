import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import React, { useState, FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentDetailsPage from './Components/StudentDetailsPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddNewPost from './Components/AddNewPost';
import GoogleSigninComp from './Components/GoogleSigninComp';
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import Start from './Components/Start';
import Profile from './Components/Profile';
import PostListPage from './Components/PostListPage';
import UserPostList from './Components/UserPostList';
import Ionicons from '@expo/vector-icons/Ionicons';


const Tab = createBottomTabNavigator();
const PostsListStack = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

type IconName = 'home' | 'home-outline' | 'person-circle' | 'person-circle-outline';

const PostsListScreen: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: IconName; // Declare iconName with specific type

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'; // Use type assertion here if necessary
          } else if (route.name === 'UserPostList') {
            iconName = focused ? 'person-circle' : 'person-circle-outline'; // Use type assertion here if necessary
          } else {
            iconName = 'home'; // Default case, should not typically happen, adjust as necessary
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={PostListPage} options={{ title: 'Home' }} />
      <Tab.Screen name="UserPostList" component={UserPostList} options={{ title: 'My Posts' }} />
    </Tab.Navigator>
  );
};





export default function App() {

 

  return (
   
    <NavigationContainer>
      
    <Stack.Navigator
    initialRouteName="Start"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Start" component={Start} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="AddNewPost" component={AddNewPost} />
    <Stack.Screen name="PostsListScreen" component={PostsListScreen} />
    
    
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