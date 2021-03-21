const transactionReducer = (transactions = [], action) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return action.transactions.data
    case 'ADD_TRANSACTION':
      return [action.data.transaction, ...transactions]
    default:
      return transactions
  }
}

export default transactionReducer
