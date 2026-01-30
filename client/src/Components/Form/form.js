import React, {useState, useEffect} from 'react';
import useStyles from "./styles"
import { TextField, Typography, Paper, Button } from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch} from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useSelector } from 'react-redux';
import { getPosts } from '../../actions/posts';
const Form = ({currentid, setCurrentid}) =>{
  let post = useSelector((state)=> currentid? state.posts.posts.find((p)=> p._id === currentid) : null );
  let user =   JSON.parse(localStorage.getItem("profile"));
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({ 
       title: "",
       message: "",
       tags: "",
       selectedFile: "" 
    });
    const classes = useStyles();
    
    useEffect(()=>{
      if(post) setPostData(post);
    }, [post])

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (currentid) {
          console.log("before"+ currentid);
          dispatch(updatePost(currentid, {...postData, name: user?.given_name}));
          clear();
        }
        else{
        dispatch(createPost({...postData, name: user?.given_name}));
        clear();
        }
        
      }
    const clear = () =>{
      dispatch(getPosts());
      setCurrentid(null);
      // console.log(currentid);
      setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "" })
      console.log("after:"+ currentid);
    }

    if (!user?.given_name) {
      console.log(user);
        return(
          <Paper className={classes.paper}>
            <Typography variant='h6' align='center'>
              Please sign-in to create your own Memories
            </Typography>
          </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentid ? "Editing" : "Creating"} a Memory</Typography>
        {/* <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} /> */}
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline minRows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
    );
}

export default Form;