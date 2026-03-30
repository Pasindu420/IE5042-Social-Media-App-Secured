import React, {useState, useEffect} from 'react'
import {Container, Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core';
import Posts from '../../Components/Posts/Post';
import Form from '../Form/form';
import { getPosts, getPostBySearch } from "../../actions/posts"
import {useLocation, useNavigate} from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'
// this is used to add styling to the material-ui component.
import useStyles from "./index";
import {useDispatch} from 'react-redux'
import Paginate from '../Paginate/Pagination';


function useQuery(){
  return new URLSearchParams(useLocation().search);
}

function Home() {
    const query = useQuery();
    const page = query.get("page") || 1;
    const navigate = useNavigate();
    const searchQuery = query.get("searchQuery");
    const [currentid, setCurrentId] = useState(null);
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);
    const classes = useStyles();
    const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getPosts());
  },[dispatch, currentid])

  const handlekeyPress = (e) => {
    if (e.keyCode === 13) {
      // search for post
    }
  }

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (deletedTag) => setTags(tags.filter((tag)=> tag !== deletedTag));

  const searchPost = () => {
    if(search[0] || tags){
      //dispatch -> get search post
      dispatch(getPostBySearch({search, tags: tags.join(",")}));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(",")}`);
    } else{
      navigate("/");
    }
  }
  return (
    // <div>Home</div>
    <Grow in >
        <Container maxWidth="xl">
          <Grid className={classes.Main_Container} container justifyContent="space-between" alignItems='stretch'spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentid = {setCurrentId}></Posts>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color='inherit'>
              <TextField 
                value={search}
                onChange={(e)=> {setSearch(e.target.value)}}
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyPress={handlekeyPress}
                
              />
              <ChipInput 
                style={{margin: '10px 0'}}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                name="Tags"
                label="Search Tags"
                variant='outlined'
              />
              <Button onClick={searchPost} color="primary" className={classes.Button} variant="contained"> 
                Search Post
              </Button>
            </AppBar>
              <Form currentid = {currentid} setCurrentid = {setCurrentId}></Form>
              <Paper elevation={6}>
                <Paginate />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home;