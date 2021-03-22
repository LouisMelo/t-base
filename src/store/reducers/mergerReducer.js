import { toast } from 'react-toastify'

const mergerReducer = (mergers = [], action) => {
  switch (action.type) {
    case 'GET_MERGERS':
      return action.mergers.data
    case 'ADD_MERGER':
      toast('恭喜，又成功T了一笔🎉...', {
        position: toast.POSITION.TOP_RIGHT
      })
      return [action.merger.data, ...mergers]
    default:
      return mergers
  }
}

export default mergerReducer
