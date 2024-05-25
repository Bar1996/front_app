import { FC, useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Button,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import PostListRow from "./PostListRow";
import PostModel, { Post } from "../Model/PostModel";
import { Facebook } from "react-content-loader/native";

const UserPostList: FC<{ navigation: any }> = ({ navigation }) => {
  const [data, setData] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      PostPosts();
    });
    return () => unsubscribe();
  }, [navigation]);

  const PostPosts = async () => {
    setIsLoading(true);
    let posts: Post[] = [];
    try {
      posts = await PostModel.getUserPosts();
    } catch (err) {
      console.log("Failed fetching posts: " + err);
      setData([]);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
    setData(posts);
  };

  const handleEditPress = (
    postId: string,
    postImage: string,
    postText: string
  ) => {
    // Pass parameters as a single object for consistency
    navigation.navigate("EditPostScreen", {
      post: { postId, postText, postImage },
    });
    console.log("Edit post with id: " + postId, postImage, postText);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    PostPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <View style={styles.loader}>
            <Facebook />
          </View>
          <View style={styles.loader}>
            <Facebook />
          </View>
          <View style={styles.loader}>
            <Facebook />
          </View>
        </View>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.flatList}
          data={data}
          keyExtractor={(item, index) => item.id || `temp-post-${index}`}
          renderItem={({ item }) => (
            <PostListRow
              text={item.text}
              imgUrl={item.imgUrl}
              userName={item.userName}
              userProfileImage={item.userProfileImage}
              id={item.id}
              timestamp={item.timestamp}
              onEditPress={handleEditPress}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
  },
  loader: {
    margin: 50, // Adjust the margin as needed
  },
  icon: {
    marginRight: 8,
    color: "#007BFF",
  },
});

export default UserPostList;
