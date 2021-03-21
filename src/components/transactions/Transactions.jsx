import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TransactionCreator from './TransactionCreator'
import Container from '@material-ui/core/Container'
import NavBar from '../navBar/NavBar'

import { makeStyles } from '@material-ui/core/styles';
import TransactionList from './TransactionList';

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
  }
}));

const Transactions = () => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <Container className={classes.layout}>
        <TransactionCreator />
        <TransactionList />
      </Container>
    </React.Fragment>
  );
}

export default Transactions;

