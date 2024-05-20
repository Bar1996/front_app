import { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet, Button, View, ActivityIndicator } from "react-native";
import PostListRow from "./PostListRow";
import PostModel, { Post } from "../Model/PostModel";

const UserPostList: FC<{ navigation: any }> = ({ navigation }) => {
    const [data, setData] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
  

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            setIsLoading(true);
            let posts: Post[] = [];
            try {
                posts = await PostModel.getUserPosts();
            } catch (err) {
                console.log("Failed fetching posts: " + err);
                setData([]);
            }finally {
                setIsLoading(false);
              }
            setData(posts);
        });
        return () => unsubscribe();
    }, [navigation]);

    const handleEditPress = (postId: string, postImage: string, postText: string) => {
        // Pass parameters as a single object for consistency
        navigation.navigate('EditPostScreen', { post: { postId, postText, postImage } });
        console.log("Edit post with id: " + postId, postImage, postText);
    };
    

      return (
        <View style={styles.container}>
        {isLoading ? (
            <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
        ) : (
        <FlatList
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
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        marginRight: 8,
        color: "#007BFF",
      },
});


export default UserPostList;
