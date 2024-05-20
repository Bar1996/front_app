import apiClient from "./ClientApi";

const getAllPosts = async () => {
  return apiClient.get("/post");
};

const addPost = async (post: any) => {
    console.log("addPost()2");
  return apiClient.post("/post/post", post);
};

const deletePost = async (id: string) => {
  return apiClient.delete(`/post/${id}`);
};

const updatePost = async (post: any) => {
  console.log("updatePost()2", post.postId);
  return apiClient.put(`/post/${post.postId}`, post);
}

export default { getAllPosts, addPost, deletePost, updatePost};