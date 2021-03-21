import React from 'react';
import TransactionCreator from './TransactionCreator'

import TransactionList from './TransactionList';

const Transactions = () => {

  return (
    <React.Fragment>
      <TransactionCreator />
      <TransactionList />
    </React.Fragment>
  );
}

export default Transactions;

