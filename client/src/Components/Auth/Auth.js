import React, {useState, useEffect} from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import useStyles from './styles';
import Input from './Input';
import {useDispatch} from 'react-redux';
import jwt_decode from "jwt-decode";
import {signin, signup} from '../../actions/auth';

const initialData = {firstname: "", lastname: "", email: "", password: "", confirmPassword: ""};

function Auth() {
  const [formData, setFormData] = useState(initialData);
  const google = window.google;
  const dispatch = useDispatch();
  const [isSignup, setisSignup] = useState(true);
  const [showpassword, setShowpassword] = useState(false);
  const classes = useStyles();

  const handleCallback = (res) => {
    var decoded = jwt_decode(res.credential);
    dispatch({type: "AUTH", payload: decoded});
    // redirect to home screen
    window.location.replace('/');
  }
  
  useEffect(()=> {
    // /* global google */
    google.accounts.id.initialize({
      client_id: "733138908471-saedp0jrb7h82ite16o7ijkbi5fvbbfs.apps.googleusercontent.com",
      callback: handleCallback,
    });

    google.accounts.id.renderButton(
      document.getElementById("google"),
      {theme: "filled_blue", size: "large", }
    )
  }, [])

  

  
  function handleClick(e){
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData));
    }else{
      dispatch(signin(formData));
    }
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleShowPassword = () => {
     return setShowpassword((prevshowpassword)=> !prevshowpassword);
  }

  const switchMode = () => {
    return setisSignup((prev)=> !prev);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          {/* <LockOutlined /> */}
        </Avatar>
        <Typography variant='h5'>{isSignup? "Sign up" : "Sign in"}</Typography>
        <form className={classes.form} onSubmit={handleClick}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Input name="firstname" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastname" label="Last Name" handleChange={handleChange} half />
                </>
              )
            }
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showpassword? "text" : "password"} handleShowPassword={handleShowPassword}/>
            {isSignup && <Input name="confirmPassword" label="Re-Type Password" handleChange={handleChange} type="password"/>}
            <Button type='submit' fullWidth variant='contained' color="primary" className={classes.submit}>
              {isSignup? "Sign Up" : "Sign In"}
            </Button>
            
            <Button id="google" className={classes.googleButton} color="primary" fullWidth variant="contained">Sign in with Google</Button>
          </Grid>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? "Already have Account? Sign In!" : "Don't have account? Sign Up!"}
              </Button>
              
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
// return (
//   <div className="App">
//     <div id='google'></div>
//   </div>
// );
}

export default Auth;