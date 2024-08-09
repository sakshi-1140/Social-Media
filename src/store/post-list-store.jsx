import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id != action.payload.postId
    );
  }else if(action.type=="ADD_POST")
  {
    newPostList=[action.payload,...currPostList]
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    console.log(
      `create post called for these details: ${userId} ${postTitle} ${postBody} ${reactions} ${tags}`
    );
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userId: userId,
        tags: tags,
      },
    });
  };

  const deletePost = (postId) => {
    //console.log("delete post called for post id: "+postId);
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <PostList.Provider
      value={{
        postList,
        addPost,
        deletePost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Go to goa",
    body: "Hi , I am going to goa",
    reactions: 2,
    userId: "user-2",
    tags: ["vacation", "Mumbai", "Enjoying"],
  },
  {
    id: "2",
    title: "I got 1st rank in University Exam",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi earum quisquam non sapiente ducimus cupiditate",
    reactions: 15,
    userId: "user-1",
    tags: ["Exams", "Party", "New Begining"],
  },
];

export default PostListProvider;
