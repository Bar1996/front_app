import { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet, Button } from "react-native";
import PostListRow from "./PostListRow";
import PostModel, { Post } from "../Model/PostModel";

const UserPostList: FC<{ navigation: any }> = ({ navigation }) => {
    const [data, setData] = useState<Post[]>([]);
  

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            let posts: Post[] = [];
            try {
                posts = await PostModel.getUserPosts();
            } catch (err) {
                console.log("Failed fetching posts: " + err);
                setData([]);
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
    );
};

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
    },
});

export default UserPostList;
