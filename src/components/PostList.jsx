import React, { useContext } from 'react'
import Post from './Post'
import {PostList as PostListData} from '../store/post-list-store'
function PostList() {
  const {postList} = useContext(PostListData);
  return (
    <>
    {postList.map((post,index)=> 
    <Post key={post.id} post={post}/>)}
    
    </>
  )
}

export default PostList