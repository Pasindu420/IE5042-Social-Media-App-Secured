function app(
  state = {
    isLoading: false,   // safer than true (prevents “stuck loading” on first load)
    posts: [],
    post: null,
    currentPage: 1,
    numberOfPages: 1,
  },
  action
) {
  switch (action.type) {
    case "STARTLOADING":
      return { ...state, isLoading: true };

    case "STOPLOADING":
      return { ...state, isLoading: false };

    case "FETCH_POST":
      return { ...state, post: action.payload };

    case "FETCH_ALL": {
      // supports payload = []  OR payload = { data: [], currentPage, numberOfPages }
      const posts = Array.isArray(action.payload)
        ? action.payload
        : action.payload?.data || [];

      return {
        ...state,
        posts: posts,
        currentPage: action.payload?.currentPage ?? state.currentPage,
        numberOfPages: action.payload?.numberOfPages ?? state.numberOfPages,
      };
    }

    case "FETCH_POST_SEARCH": {
      // supports payload = []  OR payload = { data: [] }
      const posts = Array.isArray(action.payload)
        ? action.payload
        : action.payload?.data || [];

      return { ...state, posts: posts };
    }

    case "CREATE":
      return { ...state, posts: [...state.posts, action.payload] };

    case "UPDATE":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case "DELETE":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    case "LIKE":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    default:
      return state;
  }
}

export default app;
