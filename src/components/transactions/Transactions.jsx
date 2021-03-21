import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TransactionCreator from './TransactionCreator'
import NavBar from '../navBar/NavBar'

import { makeStyles } from '@material-ui/core/styles';
import TransactionList from './TransactionList';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
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
      <main className={classes.layout}>
        <TransactionCreator />
        <TransactionList />
      </main>
    </React.Fragment>
  );
}

export default Transactions;

