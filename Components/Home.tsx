import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
  } from "react-native";
  import React, { FC } from "react";
  import { theme } from "../core/theme";
  import UserModel from "../Model/UserModel";

  
  const Logout: FC<{ navigation: any }> = ({ navigation }) => {
    const OnLogoutPress = async () => {
        console.log("Logout Button Pressed");
        try {
            const response = await UserModel.logout();
            navigation.navigate("Start");
        } catch (err) {
            console.log("Logout failed " + err);
        }
        }

        const Check = async () => {

            navigation.navigate("Profile");
            // try {
            //     const response = await UserModel.Check();
            //     console.log("response here 2: " + response);
            // } catch (err) {
            //     console.log("Check failed " + err);
            // }
            // }
        }
  
  
  
    return (
     <View style={styles.container}>
        <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={OnLogoutPress}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
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
  