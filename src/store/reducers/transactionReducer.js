import { toast } from 'react-toastify'

const transactionReducer = (transactions = [], action) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return action.transactions.data
    case 'ADD_TRANSACTION':
      toast.success("交易记录添加成功🎉...", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return [action.transaction.data, ...transactions]
    default:
      return transactions
  }
}

export default transactionReducer
