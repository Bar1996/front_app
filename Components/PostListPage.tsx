import { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet, Button, TouchableOpacity } from "react-native";
import PostListRow from "./PostListRow";
import PostModel, { Post } from "../Model/PostModel";
import Ionicons from "@expo/vector-icons/Ionicons";

const PostListPage: FC<{ navigation: any }> = ({ navigation }) => {
    const [data, setData] = useState<Post[]>([]);
  

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            let posts: Post[] = [];
            try {
                posts = await PostModel.getAllPosts();
            } catch (err) {
                console.log("Failed fetching posts: " + err);
                setData([]);
            }
            setData(posts);
        });
        return () => unsubscribe();
    }, [navigation]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                // <Button
                //     onPress={() => navigation.navigate('AddNewPost')}
                //     title="Add"
                // />
                <TouchableOpacity onPress={() => navigation.navigate('AddNewPost')} >
                <Ionicons name="add-circle" size={30} style={styles.icon} />
              </TouchableOpacity>
            ),
        });
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
    icon: {
        marginRight: 8,
        color: "#007BFF",
      },
});

export default PostListPage;
