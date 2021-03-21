import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import { signOut } from '../../store/actions/authActions'
import grey from '@material-ui/core/colors/grey'
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../images/logo.png'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: '#fff'
  },
  divider: {
    width: '1px',
    height: theme.spacing(1.5),
    margin: theme.spacing(0, 1),
    backgroundColor: grey[500]
  },
  link: {
    cursor: 'pointer'
  }
}));

const NavBar = () => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const history = useHistory()

  const handleSignOut = () => {
    dispatch(signOut())
    history.push('/login')
  }

  return (
    <AppBar position='absolute' color='default' className={classes.appBar}>
      <Toolbar>
        <Grid container>
          <Grid item xs={6} md={6} style={{ display: 'flex', alignItems: 'center'}}>
            <img src={logo} alt="logo" height='40px'/>
            <Typography variant='h6' color='inherit' noWrap>
              <Box fontWeight={600}>
                T-Base
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
            <Typography variant="subtitle2" className={classes.title}>
              你好，{user.name}
            </Typography>
            <div className={classes.divider}></div>
            <Link variant="body2" className={classes.link} onClick={handleSignOut}>
              退出登陆
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
