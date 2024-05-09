export type Post = {
    title: string,
    id: string,
    text: string,
    imgUrl: string
}

const data: Post[] = [
];

const getAllPosts = (): Post[] => {
    return data;
}

const getPost = (id: string): Post | undefined => {
    return data.find((post) => post.id == id);
}

const addPost = (post: Post) => {
    data.push(post);
}

const deletePost = (id: string) => {
    const index = data.findIndex((post) => post.id === id);
    if (index !== -1) {
        data.splice(index, 1);
    }
}

export default { getAllPosts, getPost, addPost, deletePost};