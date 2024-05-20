import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import React, { useState, FC, useEffect } from 'react';
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
import { getToken, removeToken } from './common/tokenStorage';
import clientApi from './api/ClientApi';
import LoadingScreen from './LoadingScreen';



const Tab = createBottomTabNavigator();

const PostsListStack = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



type IconName = 'home' | 'home-outline' | 'person-circle' | 'person-circle-outline' | 'folder' | 'folder-outline';

const PostsListScreen: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: IconName; // Declare iconName with specific type

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'; // Use type assertion here if necessary
          } else if (route.name === 'UserPostList') {
            iconName = focused ? 'folder' : 'folder-outline'; // Use type assertion here if necessary
          } else if (route.name === 'Profile') {
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
      <Tab.Screen name="Profile" component={Profile} options={{ title: 'Profile', headerShown: false }} />
      <Tab.Screen name="Home2" component={Home} options={{ title: 'Home' }} />
    </Tab.Navigator>
  );
};









export default function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await getToken();
        if (!token) {
          console.log('No token found');
          return;
        }
        console.log('Checking token...');
        const valid = await clientApi.get('/auth/check');
        console.log('Valid:', valid?.data.message);
        if (valid?.data.message === 'Authenticated') {
          console.log('User is authenticated');
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking token:', error);
      } finally {
        setTimeout(() => { setLoading(false); }, 3000);
      }
    };
    

    checkToken();
  }, []);

  if (loading) {
    return <LoadingScreen />;  // Show a loading screen or null while checking token
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "PostsListScreen" : "Start"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="AddNewPost" component={AddNewPost} />
        <Stack.Screen name="PostsListScreen" component={PostsListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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