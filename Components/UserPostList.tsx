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
