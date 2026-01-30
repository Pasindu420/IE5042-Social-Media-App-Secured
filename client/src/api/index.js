import axios from "axios"

// const url = "http://localhost:5000/posts";
// const userUrl = "http://localhost:5000/user"

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.sub = JSON.parse(localStorage.getItem("profile")).sub ? JSON.parse(localStorage.getItem("profile")).sub : JSON.parse(localStorage.getItem("profile"))._id
    }
  
    return req;
  });
export const fetchPostBySearch = (searchQuery) => API.get(`/posts/search?search=${searchQuery.search}&tags=${searchQuery.tags}`);
export const fetchPosts = () => API.get(`/posts`);
export const fetchPost = (id) => API.get(`/posts/getPost/${id}`);
// export const fetchPosts = () => fetch(url)
// .then((response) => response.json())
// .then((data) => console.log(data));
export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id)=> API.patch(`/posts/${id}/likePost`);
// export const getProfile = (token)=> API.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`)

export const signin = (data) => API.post(`user/signin`, data);
export const signup = (data) => API.post(`user/signup`, data);