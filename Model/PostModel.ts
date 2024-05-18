import PostApi from "../api/PostApi";

export type Post = {
    id?: string,
    text: string,
    imgUrl: string
}

const data: Post[] = [
];

const getAllPosts = async () => {
    console.log("getAllStudents()");
    const res: any = await PostApi.getAllPosts();
    let posts = Array<Post>();
    if (res.data) {
      res.data.forEach((obj: any) => {
        const post: Post = {
          id: obj._id,
          text: obj.text,
          imgUrl: obj.imgUrl,
        };
        posts.push(post);
      });
    }
    return posts;
  };

const getPost = (id: string): Post | undefined => {
    return data.find((post) => post.id == id);
}

const addPost = async (post: Post) => {
    console.log("addPost()");
    const res = await PostApi.addPost(post);
    const newPost: Post = {
        id: res.data._id,
        text: post.text,
        imgUrl: post.imgUrl,
    };
    console.log("newPost", newPost);
    
    data.push(newPost);
    return newPost;
}

const deletePost = (id: string) => {
    const index = data.findIndex((post) => post.id === id);
    if (index !== -1) {
        data.splice(index, 1);
    }
}

export default { getAllPosts, getPost, addPost, deletePost};