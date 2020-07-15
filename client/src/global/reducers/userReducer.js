const initialUser = null

export default (state = initialUser, action) => {
  if (action.type === 'SET_USER') {
    return action.payload
  }
  return state
}
