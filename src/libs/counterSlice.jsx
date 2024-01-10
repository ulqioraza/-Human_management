import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    items: [],
    number: 0,
    menu: localStorage.getItem('menu')
  },
  reducers: {
    increment: (state) => {
      state.number += 1
    },
    decrement: (state) => {
      state.number -= 1
    },
    incrementByAmount: (state, action) => {
      state.number += action.payload
    },
    addItem: (state, action) => {
      state.items.push(action.payload)
    },
    updateMenu: (state,action)=>{
      localStorage.setItem('menu', action.payload)
      state.menu = action.payload
    },
    setComplete: (state, action) => {
      const todo = state.items.find(todo => todo.id === action.payload)
      if (todo) {    
        todo.completed = !todo.completed
      }
    }
  },
})

export const { increment, decrement, incrementByAmount, addItem, setComplete, updateMenu } = counterSlice.actions

export default counterSlice.reducer