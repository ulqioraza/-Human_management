import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import checkExpireToken from "../pages/service/auth_service";

//const server = 'http://localhost:8000'
const server = 'http://192.168.10.248:8000'
const DEP_URL = server + '/hr_all_department/?page='
const ALL_DEP = server + '/api_all_department'
const SAVE_DEP = server + '/save_hr_department'
const DEP_BY_ID = server + '/hr_department_by_id'
const token = localStorage.getItem('accessToken')
const getOptions = {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' +  token}
};

const postOption = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +  token
    },
}
export const fetchRockets = createAsyncThunk(
  'rockets/fetchRockets',

  async (search) => {
    const response = await axios.post(DEP_URL + search.offset, search.search, postOption);
    return response.data.department;
  }
);

export const fetchGetDep = createAsyncThunk(
  'rockets/fetchGetDep',

  async () => {
    const response = await axios.get(ALL_DEP , getOptions);
    return response.data.department;
  }
);

export const saveDepartmentThunk = createAsyncThunk(
  'department/saveDepartment',

  async (data)=>{
    const response = await axios.post(SAVE_DEP, data, postOption);
    return response.data;
  }
)

export const GetDepById = createAsyncThunk(
  'department/getDepById',

  async (id)=>{
    const response = await axios.post(DEP_BY_ID, id, postOption);
    return response.data.department[0];
  }
)

const initialState = {
  rockets: [],
  dep:[],
  department: {'id':null, 'name':''},
  status: 'idle',
  dep_state: 'idle',
  all_status: 'idle',
  input:'idle',
  error: null,
};


const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    setDepName: (state, action) => {
      state.department.name = action.payload
    },
    getDep:(state)=>{
      state.department = {'id':null, 'name':''}
    },
    setDepState:(state)=>{
      state.dep_state = 'idle'
    },
    getToken:(state)=>{
      checkExpireToken(token)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRockets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRockets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rockets = action.payload;
      })
      .addCase(fetchRockets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(saveDepartmentThunk.fulfilled, (state, action)=> {
        state.department = action.payload;
        state.dep_state = 'succeeded'
      })
      .addCase(GetDepById.fulfilled, (state,action)=>{
        state.department = action.payload;
        state.input = 'succeeded'
      })
      .addCase(fetchGetDep.pending, (state) =>{
        state.all_status = 'loading'
      })
      .addCase(fetchGetDep.fulfilled, (state, action) => {
        state.all_status = 'succeeded';
        state.dep = action.payload;
      })
      .addCase(fetchGetDep.rejected, (state, action) => {
        state.all_status = 'failed';
        state.error = action.error.message
      })
  },
});

export const selectAllRockets = (state) => state.rockets.rockets;
export const getAllDep = (state) => state.rockets.dep;
export const getAllStatus = (state) => state.rockets.all_status
export const getRocketsStatus = (state) => state.rockets.status;
export const getRocketsError = (state) => state.rockets.error;
export const getDepState = (state) => state.rockets.dep_state;
export const getInputState = (state) => state.rockets.input;
export const getDepartmentById = (state) => state.rockets.department;
export const { setDepName, getDep, setDepState, getToken } = rocketsSlice.actions

export default rocketsSlice.reducer;