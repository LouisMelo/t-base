const transactionReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return [action.data.transaction, ...state]
    default:
      return state
  }
}

export default transactionReducer
