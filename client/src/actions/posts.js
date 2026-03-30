
import * as api from '../api';
export const getPosts = () => async (dispatch) => {
    try {
      
      const { data } = await api.fetchPosts();
      dispatch({ type: "FETCH_ALL", payload: data });

    } catch (error) {
      console.log(error.message);
    }
  };

  export const getPost = (id) => async (dispatch) => {
    try {
      dispatch({type:"STARTLOADING"});
      const { data } = await api.fetchPost(id);
      console.log(data);
      dispatch({ type: "FETCH_POST", payload: data });
      dispatch({type:"STOPLOADING"});
    } catch (error) {
      console.log(error.message);
    }
  };


  export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try {
      const { data } = await api.fetchPostBySearch(searchQuery);
      console.log(data);
      dispatch({ type: "FETCH_POST_SEARCH", payload: data });
  }catch (error) {
    console.log(error.message);
  }
}
export const createPost = (post) => async (dispatch) =>{
    try {
        const {data}  = await api.createPost(post);
        dispatch({type: "CREATE", payload: data})
        
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, updatedPost) => async (dispatch)=>{
  try {
    const {data} = await api.updatePost(id, updatedPost);
    dispatch({type: "UPDATE", payload: data});
  } catch (error) {
    console.log(error.message);
  }
}

export const deletePost = (id) => async (dispatch)=>{
  try {
    await api.deletePost(id);
    dispatch({type:"DELETE", payload: id});
  } catch (error) {
    console.log(error);
  }
}

export const likePost = (id) => async (dispatch)=>{
  try {
    const {data} = await api.likePost(id);
    dispatch({type: "LIKE", payload: data});
  } catch (error) {
    console.log(error);
  }
}