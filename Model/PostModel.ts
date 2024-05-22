import PostApi from "../api/PostApi";
import UserApi from "./UserModel";
import ClientApi from "../api/ClientApi";

interface User {
    name: string;
    imgUrl: string;
  }
  
  export interface Post {
    id?: string;
    text: string;
    imgUrl: string;
    timestamp: string;
    userName?: string;
    userProfileImage?: string;
  }

  const data: Post[] = [
];

  
  const getUser = async (id: string): Promise<User> => {
      const res = await ClientApi.get(`/auth/${id}`);
      return res.data;
  }
  
  const getAllPosts = async (): Promise<Post[]> => {
      console.log("getAllPosts()");
      const res: any = await PostApi.getAllPosts();
      let posts: Post[] = [];
      if (res.data) {
        for (const obj of res.data) {
          const user: User = await getUser(obj.owner); // Fetch user data for each post owner
          const post: Post = {
            id: obj._id,
            text: obj.text,
            imgUrl: obj.imgUrl,
            timestamp: obj.timestamp,
            userName: user.name,
            userProfileImage: user.imgUrl
          };
          posts.push(post);
        }
      }
      return posts;
  };

const getPost = (id: string): Post | undefined => {
    return data.find((post) => post.id == id);
}

const addPost = async (post: Post) => {
    console.log("addPost() deatils: ", post);
    const res = await PostApi.addPost(post);
    const newPost: Post = {
        id: res.data._id,
        text: post.text,
        imgUrl: post.imgUrl,
        timestamp: post.timestamp
    };
    console.log("newPost", newPost);
    
    data.push(newPost);
    return newPost;
}

const deletePost = async (id: string) => {
  try {
    console.log("deletePost() id: ", id);
    PostApi.deletePost(id);
  } catch (error) {
    console.error("Failed to delete post:", error);
    throw new Error("Failed to delete post");
  }
}

const getUserPosts = async (): Promise<Post[]> => {
    console.log("getUserPosts()");
   const res = await ClientApi.get("/auth/posts");
   const user = await UserApi.getUserById(); 
   console.log("user", user.name);
   
    const posts: Post[] = [];
    for (const obj of res.data) {
        const post: Post = {
            id: obj._id,
            text: obj.text,
            imgUrl: obj.imgUrl,
            timestamp: obj.timestamp,
            userName: user.name,
            userProfileImage: user.imgUrl
        };
        posts.push(post);
    }
    
    return posts;
}
const updatePost = async (post: Post) => {
    console.log("updatePost() deatils: ", post);
    await PostApi.updatePost(post);
    const index = data.findIndex((p) => p.id === post.id);
    if (index !== -1) {
        data[index] = post;
    }
}

export default { getAllPosts, getPost, addPost, deletePost, getUserPosts, updatePost};