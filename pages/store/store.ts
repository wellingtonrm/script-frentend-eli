import { Action, configureStore, ThunkAction  } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import jsonStore from './jsonStore'

export const store = configureStore({
    reducer: {
        data:jsonStore
    },
  })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
export const useAppDispatch = () => useDispatch<AppDispatch>()