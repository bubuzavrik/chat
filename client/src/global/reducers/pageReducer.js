let initialPage = 'home'

export default (state = initialPage, action) => {
  if (action.type === 'SET_PAGE') {
    return action.payload
  }
  return state
}
