import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

function sortEntries(entries) {
  entries.sort((a, b) => {
    if (a.priority > b.priority) return 1
    if (a.priority < b.priority) return -1

    return a.name > b.name ? 1 : -1
  })
}

const groceryListSlice = createSlice({
  name: 'groceryList',
  initialState: { entries: [] },
  reducers: {
    addEntry: (state, action) => {
      state.entries.push({
        id: uuid(),
        name: action.payload.name,
        history: [{ timeStamp: Date.now() }],
        status: false,
        priority: action.payload.priority,
      })

      sortEntries(state.entries)
    },
    removeEntry: (state, { payload }) => {
      const removeIndex = state.entries.findIndex(
        (entry) => entry.id === payload
      )
      state.entries.splice(removeIndex, 1)
    },
    toggleSataus: (state, { payload }) => {
      const entry = state.entries.find((entry) => entry.id === payload)
      entry.history.push({
        timeStamp: Date.now(),
        from: entry.status,
        to: !entry.status,
      })
      entry.status = !entry.status
    },
    updatePriority: (state, { payload }) => {
      const entry = state.entries.find((entry) => entry.id === payload.id)
      entry.priority = payload.priority
      sortEntries(state.entries)
    },
  },
})

export const { addEntry, removeEntry, toggleSataus, updatePriority } =
  groceryListSlice.actions

export default groceryListSlice.reducer
