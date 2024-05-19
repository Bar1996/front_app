import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
  } from "react-native";
  import React, { FC } from "react";
  
  const PostListRow: FC<{
    text: string;
    imgUrl: string;
    userName?: string;
    timestamp: string;
    userProfileImage?: string;
    id?: string;
  }> = ({ text, imgUrl, userName, timestamp, userProfileImage }) => {

  
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Image style={styles.profilePic} source={{ uri: userProfileImage }} />
            <View style={styles.headerText}>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.timestamp}>{timestamp}</Text>
            </View>
          </View>
          <Text style={styles.postText}>{text}</Text>
          {imgUrl && <Image style={styles.postImage} source={{ uri: imgUrl }} />}
        </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 10,
      marginVertical: 8,
      borderRadius: 10,
      elevation: 1,
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowColor: 'black',
      shadowOffset: { height: 0, width: 0 },
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    profilePic: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    headerText: {
      flexDirection: "column",
    },
    userName: {
      fontWeight: "bold",
    },
    timestamp: {
      color: "#555",
      fontSize: 12,
    },
    postText: {
      marginBottom: 10,
    },
    postImage: {
      width: "100%",
      height: 200,
      borderRadius: 10,
    }
  });
  
  export default PostListRow;
  