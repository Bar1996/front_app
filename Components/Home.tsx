import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Switch,
    ToastAndroid,
    ActivityIndicator,
  } from "react-native";
  import React, { FC, useState,useContext } from "react";
  import { theme } from "../core/theme";
  import UserModel from "../Model/UserModel";
  import { removeToken } from "../common/tokenStorage";

  
  const Logout: FC<{ navigation: any }> = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);

    const onLogoutPress = async () => {
      console.log("Logout Button Pressed");
      try {
          setIsLoading(true);
          await UserModel.logout();
          navigation.navigate("Start");
          ToastAndroid.show("Goodbye 👋, See you again soon 😊", ToastAndroid.SHORT);
      } catch (err) {
          console.log("Logout failed " + err);
      }finally {
          setIsLoading(false);
      }
  };

        const Check = async () => {
          removeToken();
        }
  
  
  
    return (
     <View style={styles.container}>
        <View style={styles.buttons}>
        {isLoading ? (
    <ActivityIndicator size="large" color={theme.colors.primary} /> // Display the loading indicator
  ) : (

        <TouchableOpacity style={styles.button} onPress={onLogoutPress}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        )}
      </View>
      <View style={styles.buttons}>
           <TouchableOpacity style={styles.button} onPress={Check}>
             <Text style={styles.buttonText}>Check</Text>
           </TouchableOpacity>
         </View>
      </View>
    
    );
  };
  
  const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingHorizontal: 10,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      },
      title: {
        fontSize: 21,
        color: theme.colors.primary,
        fontWeight: 'bold',
        paddingVertical: 12,
      },
      input: {
        width: 350,
        height: 45,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
      buttons: {
        flexDirection: "row",
        marginTop: 20,
      },
      button: {
        width: "50%",
        marginVertical: 10,
        paddingVertical: 12,
        alignItems: "center",
        backgroundColor: "#007BFF",
        borderRadius: 20,
      },
      buttonText: {
        fontWeight: "bold",
        fontSize: 15,
        lineHeight: 26,
        color: "#FFFFFF",
      },
      errorText: {
        color: "#b22222",
        marginLeft: 12,
      },
      iconButton: {
        position: "absolute",
        right: 10,
        bottom: 12,
      },
      row: {
        flexDirection: "row",
        marginTop: 4,
        justifyContent: "center", // This centers the text and link horizontally if your text is short
      },
      link: {
        fontWeight: "bold",
        color: theme.colors.primary,
      },
    });
    
  
  export default Logout;
  