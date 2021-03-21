import React, { useState } from 'react';
import Transactions from './transactions/Transactions'
import Mergers from './mergers/Mergers'
import NavBar from './navBar/NavBar'
import { CssBaseline, Container, Tabs, Tab, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3)
  }
}));

const Home = () => {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <Container className={classes.layout}>
        <Paper className={classes.paper}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            centered
          >
            <Tab label='成交记录'></Tab>
            <Tab label='合并记录'></Tab>
          </Tabs>
        </Paper>
        { value === 0 && <Transactions /> }
        { value === 1 && <Mergers /> }
      </Container>
    </React.Fragment>
  );
}

export default Home;
