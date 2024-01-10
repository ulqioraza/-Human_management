import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//const server = 'http://localhost:8000'
const server = 'http://192.168.10.248:8000'
const POS_URL = server + '/hr_all_position/?page='
const ALL_POS = server + '/api_all_position'
const SAVE_POS = server + '/save_hr_position'
const POS_BY_ID = server + '/hr_position_by_id'
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
export const fetchPosition = createAsyncThunk(
  'position/fetchPosition',

  async (search) => {
    const response = await axios.post(POS_URL + search.offset, search.search, postOption);
    return response.data;
  }
);


export const fetchGetPos = createAsyncThunk(
  'position/fetchGetPos',

  async () => {
    const response = await axios.get(ALL_POS, getOptions);
    return response.data.position;
  }
);

export const savePositionThunk = createAsyncThunk(
  'position/savePosition',

  async (data)=>{
    const response = await axios.post(SAVE_POS, data, postOption);
    return response.data;
  }
)

export const GetPosById = createAsyncThunk(
  'position/getPosById',

  async (id)=>{
    const response = await axios.post(POS_BY_ID, id, postOption);
    return response.data.position[0];
  }
)
const initialState = {
  position: [],
  posz: [],
  pos :{'id':null,'name':''},
  status: 'idle',
  pos_state: 'idle',
  all_status: 'idle',
  input : 'idle',
  error: null,
};


const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    setPosName: (state, action) => {
      state.pos.name = action.payload
    },
    getPos:(state) =>{
      state.pos = {'id':null,'name':''}
    },
    setPosState:(state)=>{
      state.pos_state = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosition.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosition.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.position = action.payload;
      })
      .addCase(fetchPosition.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(savePositionThunk.fulfilled, (state, action)=> {
        state.pos = action.payload;
        state.pos_state = 'succeeded'
      })
      .addCase(GetPosById.fulfilled, (state,action)=>{
        state.pos = action.payload;
        state.input = 'succeeded'
      })
      .addCase(fetchGetPos.pending, (state) =>{
        state.all_status = 'loading'
      })
      .addCase(fetchGetPos.fulfilled, (state, action) => {
        state.all_status = 'succeeded';
        state.posz = action.payload;
      })
      .addCase(fetchGetPos.rejected, (state, action) => {
        state.all_status = 'failed';
        state.error = action.error.message
      })
  },
});

export const selectAllPosition = (state) => state.position.position;
export const getAllPos = (state) => state.position.posz;
export const getAllPosStatus = (state) => state.position.all_status
export const getPositionStatus = (state) => state.position.status;
export const getPositionError = (state) => state.position.error;
export const getPosState = (state) => state.position.pos_state;
export const getInputPosState = (state) => state.position.input;
export const getPositionById = (state) => state.position.pos;
export const { setPosName, getPos, setPosState } = positionSlice.actions

export default positionSlice.reducer;