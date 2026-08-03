import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  posts: [],

  drafts: [],

  platforms: [
    "Twitter",
    "Facebook",
    "Instagram",
    "LinkedIn",
  ],

};

const postsSlice = createSlice({

  name: "posts",

  initialState,

  reducers: {

    addPost: (state, action) => {

      const newPost = {

        id: Date.now(),

        content: action.payload.content,

        platform: action.payload.platform,

        createdAt: new Date().toLocaleString(),

      };

      state.posts.push(newPost);

    },


    deletePost: (state, action) => {

      state.posts = state.posts.filter(

        (post) => post.id !== action.payload

      );

    },


    updatePost: (state, action) => {

      const post = state.posts.find(

        (post) =>
          post.id === action.payload.id

      );

      if (post) {

        post.content =
          action.payload.content;

        post.platform =
          action.payload.platform;

      }

    },


    saveDraft: (state, action) => {

      const draft = {

        id: Date.now(),

        content: action.payload.content,

        platform: action.payload.platform,

      };

      state.drafts.push(draft);

    },


    clearPosts: (state) => {

      state.posts = [];

    },

  },

});


export const {

  addPost,

  deletePost,

  updatePost,

  saveDraft,

  clearPosts,

} = postsSlice.actions;


export default postsSlice.reducer;