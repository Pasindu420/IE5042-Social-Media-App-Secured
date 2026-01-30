import React from 'react';
import Post from './Post/post'
import useStyles from "./styles"
import { useSelector } from 'react-redux';
import {Grid, CircularProgress} from '@material-ui/core';

const Posts = ({setCurrentid}) =>{
    let posts = useSelector((state)=> state.posts.posts);
    // console.log(posts);
 const classes = useStyles();

    

 return(
    
        !posts.length ? <CircularProgress /> :
         (
         <Grid className={classes.container} container alignItems="stretch" spacing={3} >
           {posts.map((post) => (
             <Grid key={post._id} item xs={12} sm={6} md={3}>
               <Post post={post} setCurrentid={setCurrentid}/>
             </Grid>
           ))}
         </Grid>
       )
  );
}

export default Posts;