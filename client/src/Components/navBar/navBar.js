import React, {useState} from 'react'
import {AppBar,Avatar, Toolbar, Typography, Button} from '@material-ui/core';
import useStyles from "./styles";
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';


function NavBar() {
  const dispatch = useDispatch();
  const MemoriesURL = "https://raw.githubusercontent.com/adrianhajdin/project_mern_memories/master/client/src/images/memories.png?token=AF56X74XONEUGZ4FD2FUIA27UURPI"
  const classes = useStyles();
  const [user, setUser] = useState(localStorage.getItem("profile") ? JSON.parse(localStorage.getItem("profile")) : null);

  const logout = () => {
    dispatch({type: "LOGOUT"});

    setUser(null);

    window.location.replace('/');
  }

  return (
    <AppBar className={classes.appBar} position= "static" color= "inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>Memories</Typography>
        <img className={classes.image} src={MemoriesURL} alt="memories" height="60" /> 
      </div>
        <Toolbar className={classes.toolbar}> 
          {
            user? (
              <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.given_name} src={user.picture}>{user.given_name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant="h6">{user.given_name}</Typography>
                <Button variant='contained' className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
              </div>
            ) : (
              <Button component={Link} to="/Auth" variant='contained' color="primary">Sign in</Button>
            )
          }
          
        </Toolbar>
      
    </AppBar>
  )
}

export default NavBar;