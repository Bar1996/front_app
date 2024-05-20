import { FC, useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Button, TouchableOpacity, View, RefreshControl, ScrollView } from "react-native";
import PostListRow from "./PostListRow";
import PostModel, { Post } from "../Model/PostModel";
import Ionicons from "@expo/vector-icons/Ionicons";
import ContentLoader, { Facebook } from 'react-content-loader/native';

const PostListPage: FC<{ navigation: any }> = ({ navigation }) => {
    const [data, setData] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            
            PostPosts();
            // setIsLoading(true);
            // let posts: Post[] = [];
            // try {
            //     posts = await PostModel.getAllPosts();
            // } catch (err) {
            //     console.log("Failed fetching posts: " + err);
            //     setData([]);
            // } finally {
            //     setTimeout(() => {
            //         setIsLoading(false);
            //     }, 1500);
            // }
            // setData(posts);
        });

        return () => unsubscribe();
    }, [navigation]);

    const PostPosts = async () => {
        setIsLoading(true);
        let posts: Post[] = [];
        try {
            posts = await PostModel.getAllPosts();
        } catch (err) {
            console.log("Failed fetching posts: " + err);
            setData([]);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        }
        setData(posts);
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('AddNewPost')} >
                    <Ionicons name="add-circle" size={30} style={styles.icon} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        PostPosts();
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <View style={styles.loader}><Facebook /></View>
                    <View style={styles.loader}><Facebook /></View>
                    <View style={styles.loader}><Facebook /></View>
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
        justifyContent: 'center',
    },
    loader: {
        margin: 50,  // Adjust the margin as needed
    },
    icon: {
        marginRight: 8,
        color: "#007BFF",
    },
});

export default PostListPage;
