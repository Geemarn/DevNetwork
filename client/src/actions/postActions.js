import axios from "axios";
import {
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  ADD_POST,
  DELETE_POST,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";

//add post
export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/apis/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//get post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/apis/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

//get posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/apis/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

//add likes
export const addLike = id => dispatch => {
  axios
    .post(`/apis/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//remove likes
export const removeLike = id => dispatch => {
  axios
    .post(`/apis/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//delete post
export const deletePost = id => dispatch => {
  axios
    .delete(`/apis/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//add comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/apis/posts/comments/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//delete comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/apis/posts/comments/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// set post loading
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
