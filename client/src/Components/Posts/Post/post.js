import React from 'react';
import useStyles from "./styles"
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { Link } from 'react-router-dom'


const Post = ({ post, setCurrentid }) =>{
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem("profile"));

    const Likes = () => {
        if (post?.likes?.length > 0) {
          return post.likes.find((like) => like === (user?.sub || user?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpOffAltIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;Like</>;
      };

    return (
        <Card className={classes.card} elevation={6} raised>
            {/* <CardMedia image={Post.selectedImage} className={classes.media} title={post.title} /> */}
            <CardMedia component={Link} to={`/posts/${post._id}`} className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2" className='time'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.sub === post?.creator || user?._id === post?.creator) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentid(post._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
        )}
            <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">{post.tags.map((tag) =>`#${tag} `)}</Typography>
            
            </div>
            <Typography variant="h5" className={classes.title} gutterBottom>{post.title}</Typography>
            <CardContent>
            <Typography variant="body2" color='textSecondary' gutterBottom component="p">{post.message.split(' ').splice(0, 15).join(' ')}...</Typography>
            </CardContent>

            <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user} onClick={() => {dispatch(likePost(post._id))}}> <Likes /> </Button>
        {/* <Button size="small" color="primary" onClick={() => {dispatch(deletePost(post._id))}}><DeleteIcon fontSize="small" /> Delete</Button> */}
        {(user?.sub === post?.creator || user?._id === post?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
        </Card>
    );
}

export default Post;