import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import checkExpireToken from "../pages/service/auth_service";

//const server = 'http://localhost:8000'
const server = 'http://192.168.10.248:8000'
const DEP_URL = server + '/sub_department/?page='
const ALL_DEP = server + '/api_sub_department'
const SAVE_DEP = server + '/save_sub_department'
const DEP_BY_ID = server + '/sub_department_by_id'
const EMP_BDEP = server + '/employee_by_dep/?page='
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
export const fetchSubDep = createAsyncThunk(
  'sub_department/fetchSubDep',

  async (search) => {
    const response = await axios.post(DEP_URL + search.offset, search.search, postOption);
    return response.data;
  }
);

export const fetchGetSubDep = createAsyncThunk(
  'sub_department/fetchGetSubDep',

  async () => {
    const response = await axios.get(ALL_DEP , getOptions);
    return response.data.sub_department;
  }
);

export const fetchSubDepByDep = createAsyncThunk(
  'sub_department/fetchSubDepByDep',
  
  async(search) => {
    
      const response = await axios.post(EMP_BDEP + search.offset, search, postOption);
      return response.data.sub_department;
  }
);


export const saveSubDepartmentThunk = createAsyncThunk(
  'sub_department/saveSubDepartment',

  async (data)=>{
    const response = await axios.post(SAVE_DEP, data, postOption);
    return response.data;
  }
)

export const GetSubDepById = createAsyncThunk(
  'sub_department/getSubDepById',

  async (id)=>{
    const response = await axios.post(DEP_BY_ID, id, postOption);
    return response.data.sub_department[0];
  }
)

const initialState = {
  sub_dep: [],
  sub:[],
  sub_department: {'id':null, 'name':''},
  status: 'idle',
  sub_state: 'idle',
  all_status: 'idle',
  input:'idle',
  error: null,
};


const subDepartmentSlice = createSlice({
  name: 'sub_department',
  initialState,
  reducers: {
    setSubDepName: (state, action) => {
      state.sub_department.name = action.payload
    },
    getSubDep:(state)=>{
      state.sub_department = {'id':null, 'name':''}
    },
    setSubDepState:(state)=>{
      state.sub_state = 'idle'
    },
    getToken:(state)=>{
      checkExpireToken(token)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubDep.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubDep.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sub_dep = action.payload;
      })
      .addCase(fetchSubDep.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(saveSubDepartmentThunk.fulfilled, (state, action)=> {
        state.sub_department = action.payload;
        state.sub_state = 'succeeded'
      })
      .addCase(GetSubDepById.fulfilled, (state,action)=>{
        state.sub_department = action.payload;
        state.input = 'succeeded'
      })
      .addCase(fetchGetSubDep.pending, (state) =>{
        state.all_status = 'loading'
      })
      .addCase(fetchGetSubDep.fulfilled, (state, action) => {
        state.all_status = 'succeeded';
        state.sub = action.payload;
      })
      .addCase(fetchGetSubDep.rejected, (state, action) => {
        state.all_status = 'failed';
        state.error = action.error.message
      })
      .addCase(fetchSubDepByDep.pending, (state) => {
        state.all_status = 'loading';
     })
     .addCase(fetchSubDepByDep.fulfilled, (state, action) => {
        state.all_status = 'succeeded';
        state.sub = action.payload;
     })
     .addCase(fetchSubDepByDep.rejected, (state, action)=>{
        state.all_status = 'failed';
        state.error = action.error.message;
     })
  },
});

export const selectAllSubDep = (state) => state.sub_department.sub_dep;
export const getAllSubDep = (state) => state.sub_department.sub;
export const getAllSubStatus = (state) => state.sub_department.all_status
export const getSubDepStatus = (state) => state.sub_department.status;
export const getSubDepError = (state) => state.sub_department.error;
export const getSubDepState = (state) => state.sub_department.sub_state;
export const getInputState = (state) => state.sub_department.input;
export const getSubDepartmentById = (state) => state.sub_department.sub_department;
export const { setSubDepName, getSubDep, setSubDepState, getToken } = subDepartmentSlice.actions

export default subDepartmentSlice.reducer;