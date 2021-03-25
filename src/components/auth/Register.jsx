import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { signUp } from "../../store/actions/authActions";

import brand from '../../images/brand.png'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: '#fff'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  console.log(auth)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(signUp(user))
    setUser({ name: '', email: '', password: '' })
  }

  if (auth._id) {
    return <Redirect to='/' />
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Container maxWidth='xs'>
      <div className={classes.paper}>
        <img src={brand} alt='brand' width='210px' />
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                name="nickname"
                variant="outlined"
                required
                fullWidth
                label="昵称"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                variant="outlined"
                required
                fullWidth
                label="邮箱地址"
                name="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="密码"
                type="password"
              />
            </Grid>
          </Grid>
          <Button
            onClick={handleSubmit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            立即注册
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link variant="body2" component={RouterLink} to='/login'>
                已经有账号了？立即登陆
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      </Container>
    </Grid>
  );
}

export default Register;
