import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../src/libs/counterSlice'
import rocketReducer from '../src/libs/departmentSlice'
import subDepReducer from '../src/libs/sub_departmentSlice'
import positionReducer from '../src/libs/positionSlice'
import employeeReducer from '../src/libs/employeeSlice'
import utilityReducer from '../src/libs/utilitySlice'
import examinationReducer from '../src/libs/examinationSlice'

export const store = configureStore({
    reducer: {
      counter: counterReducer,
      rockets: rocketReducer,
      position: positionReducer,
      employee: employeeReducer,
      sub_department : subDepReducer,
      utility : utilityReducer,
      examination: examinationReducer
    },
  })
  
  