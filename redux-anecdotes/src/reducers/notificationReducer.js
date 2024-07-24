import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Notification will be displayed here'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return 'Notification will be displayed here'
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (message, time) => {
  return dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
