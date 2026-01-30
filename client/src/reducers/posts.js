function app(state = { isLoading: true, posts: []}, action){
    switch(action.type){
        case 'STARTLOADING':
            return {...state, isLoading:true};
        case 'STOPLOADING':
            return {...state, isLoading:false};
        case 'FETCH_POST':
            return {...state, post:action.payload};        
        case 'FETCH_ALL':
            return {...state,  posts: action.payload};
        case "FETCH_POST_SEARCH":
            return {...state,  posts: action.payload};    
        case "CREATE":
            return {...state, posts: [...state.posts, action.payload] };
        case "UPDATE":
            return {...state, posts: state.posts.map((post)=> post._id === action.payload._id? action.payload : post)}; 
        case "DELETE":
            return {...state, posts:state.posts.filter((post)=> post._id !== action.payload)};        
        case "LIKE":
            // return posts.map((post)=> post._id === action.payload? {...post, likeCount: post.likeCount + 1} : post);
            // console.log(posts);
            return {...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))};     
        default:
            return state;
    }
}

export default app;