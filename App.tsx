import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddNewPost from './Components/AddNewPost';
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Settings';
import Start from './Components/Start';
import Profile from './Components/Profile';
import PostListPage from './Components/PostListPage';
import UserPostList from './Components/UserPostList';
import Ionicons from '@expo/vector-icons/Ionicons';
import LoadingScreen from './LoadingScreen';
import EditPostScreen from './Components/EditPostScreen';
import { AuthProvider, useAuth } from './AuthContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

type IconName = 'home' | 'home-outline' | 'person-circle' | 'person-circle-outline' | 'reader' | 'reader-outline' | 'cog' | 'cog-outline';

const PostsListScreen: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: IconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'UserPostList') {
            iconName = focused ? 'reader' : 'reader-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'cog' : 'cog-outline';
          } else {
            iconName = 'home';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={PostListPage} options={{ title: 'Home' }} />
      <Tab.Screen name="UserPostList" component={UserPostList} options={{ title: 'My recipes' }} />
      <Tab.Screen name="Profile" component={Profile} options={{ title: 'Profile', headerShown: false }} />
      <Tab.Screen name="Settings" component={Home} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
};

const AuthStack: FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PostsListScreen" component={PostsListScreen} />
    <Stack.Screen name="AddNewPost" component={AddNewPost} />
    <Stack.Screen name="EditPostScreen" component={EditPostScreen} />
    <Stack.Screen name="Profile" component={Profile} />
  </Stack.Navigator>
);

const UnauthStack: FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Start" component={Start} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
);

const App: FC = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthStack /> : <UnauthStack />}
    </NavigationContainer>
  );
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

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
