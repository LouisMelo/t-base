const mergerReducer = (mergers = [], action) => {
  switch (action.type) {
    case 'GET_MERGERS':
      return action.mergers.data
    default:
      return mergers
  }
}

export default mergerReducer
