import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { signIn } from '../../store/actions/authActions'
import brand from '../../images/brand.png';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/daily?water)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const Login = () => {
  const classes = useStyles()
  const [creds, setCreds] = useState({
    email: '',
    password: ''
  })
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleChangeEmail = (e) => {
    setCreds({ ...creds, email: e.target.value })
  }
  const handleChangePwd = (e) => {
    setCreds({ ...creds, password: e.target.value })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(signIn(creds.email, creds.password))
    setCreds({ email: '', password: '' })
  }

  if (auth._id) {
    return <Redirect to='/' />
  }

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img src={brand} alt='brand' width='210px' />
          <form className={classes.form} noValidate>
            <TextField
              value={creds.email}
              onChange={handleChangeEmail}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='邮箱地址'
              autoFocus
            />
            <TextField
              value={creds.password}
              onChange={handleChangePwd}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='密码'
              type='password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={handleLogin}
            >
              登陆
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  忘记密码？
                </Link>
              </Grid>
              <Grid item>
                <Link href='/register' variant='body2'>
                  还没有账号？立即注册
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Login;
