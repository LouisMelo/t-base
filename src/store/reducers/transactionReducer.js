import { toast } from 'react-toastify'

const transactionReducer = (transactions = [], action) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return action.transactions.data
    case 'ADD_TRANSACTION':
      toast.success("交易记录添加成功🎉...", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return [action.transaction.data, ...transactions]
    case 'DELETE_TRANSACTION':
      toast.success("交易记录已删除...", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return transactions.filter((t) => t._id !== action.id)
    default:
      return transactions
  }
}

export default transactionReducer
