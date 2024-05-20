import { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet, Button, TouchableOpacity, ActivityIndicator, View } from "react-native";
import PostListRow from "./PostListRow";
import PostModel, { Post } from "../Model/PostModel";
import Ionicons from "@expo/vector-icons/Ionicons";

const PostListPage: FC<{ navigation: any }> = ({ navigation }) => {
    const [data, setData] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
  

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            setIsLoading(true);
            let posts: Post[] = [];
            try {
                posts = await PostModel.getAllPosts();
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

export default PostListPage;
