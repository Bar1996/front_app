import { StyleSheet } from "react-native";
import React, { useState, FC, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddNewPost from "./Components/AddNewPost";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./Components/Settings";
import Start from "./Components/Start";
import Profile from "./Components/Profile";
import PostListPage from "./Components/PostListPage";
import UserPostList from "./Components/UserPostList";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getToken } from "./common/tokenStorage";
import clientApi from "./api/ClientApi";
import LoadingScreen from "./LoadingScreen";
import EditPostScreen from "./Components/EditPostScreen";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { CLIENT_ID } from "./core/config";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

type IconName =
  | "home"
  | "home-outline"
  | "person-circle"
  | "person-circle-outline"
  | "reader"
  | "reader-outline"
  | "cog"
  | "cog-outline";

const PostsListScreen: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: IconName; // Declare iconName with specific type

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"; // Use type assertion here if necessary
          } else if (route.name === "UserPostList") {
            iconName = focused ? "reader" : "reader-outline"; // Use type assertion here if necessary
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline"; // Use type assertion here if necessary
          } else if (route.name === "Settings") {
            iconName = focused ? "cog" : "cog-outline"; // Use type assertion here if necessary
          } else {
            iconName = "home"; // Default case, should not typically happen, adjust as necessary
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007BFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={PostListPage}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="UserPostList"
        component={UserPostList}
        options={{ title: "My recipes" }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Profile", headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={Home}
        options={{ title: "Settings" }}
      />
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
          console.log("No token found");
          return;
        }
        console.log("Checking token...");
        const valid = await clientApi.get("/auth/check");
        console.log("Valid:", valid?.data.message);
        if (valid?.data.message === "Authenticated") {
          console.log("User is authenticated");
          setIsAuthenticated(true);

          // Check if user is signed in with Google
          const isSignedInWithGoogle = await GoogleSignin.isSignedIn();
          if (isSignedInWithGoogle) {
            // Reconfigure Google Sign-In if necessary
            console.log("User is signed in with Google, reconfiguring...");
            GoogleSignin.configure({
              // Add your Google Sign-In configuration parameters here
              webClientId: CLIENT_ID,
              offlineAccess: true,
              // any other configuration you need
            });
          }
        }
      } catch (error) {
        console.error("Error checking token:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    return <LoadingScreen />;
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
        <Stack.Screen name="EditPostScreen" component={EditPostScreen} />
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
