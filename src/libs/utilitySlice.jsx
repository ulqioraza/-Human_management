import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//const server = 'http://localhost:8000'
const server = 'http://192.168.10.248:8000'
const TRA_URL = server + '/hr_all_training/?page='
const TRAG_URL = server + '/hr_all_training_group/?page='
const TRAT_URL = server + '/hr_all_training_title/?page='
const ALL_TRAG = server + '/api_training_group'
const ALL_TRAG_TYPE = server + '/api_training_group_type'
const ALL_TRA_RESULT = server + '/api_training_results'
const ALL_TRAT = server + '/api_training_title'
const SAVE_TRA = server + '/save_hr_training'
const SAVE_TRAG = server + '/save_hr_training_group'
const SAVE_TRAT = server + '/save_hr_training_title'
const TRA_BY_ID = server + '/train_by_id'
const TRAG_BY_ID = server + '/train_group_by_id'
const TRAT_BY_ID = server + '/train_title_by_id'
const DEL_MEM = server + '/delete_training_member'
const SAV_MEM = server + '/save_training_member'
const UP_MEM = server + '/update_training_pass'
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

export const fetchApiTrainingGroup = createAsyncThunk(
  'utility/fetchApiTrainingGroup',

  async () => {
    const response = await axios.get(ALL_TRAG , getOptions);
    return response.data.training_group;
  }
);

export const fetchApiTrainingGroupType = createAsyncThunk(
  'utility/fetchApiTrainingGroupType',

  async () => {
    const response = await axios.get(ALL_TRAG_TYPE , getOptions);
    return response.data.training_group_type;
  }
);

export const fetchApiTrainingResults = createAsyncThunk(
  'utility/fetchApiTrainingResults',

  async () => {
    const response = await axios.get(ALL_TRA_RESULT, getOptions);
    //alert(JSON.stringify(response.data.training_results))
    return response.data.training_results;
  }
);

export const fetchApiTrainingTitle = createAsyncThunk(
  'utility/fetchApiTrainingTitle',
  async () => {
    const response = await axios.get(ALL_TRAT , getOptions);
    return response.data.training_title;
  }
);

export const fetchTraining = createAsyncThunk(
  'utility/fetchTraining',

  async (search) => {
    const response = await axios.post(TRA_URL + search.offset, search.search, postOption);
    return response.data;
  }
);

export const fetchTrainingGroup = createAsyncThunk(
  'utility/fetchTrainingGroup',

  async (search) => {
    const response = await axios.post(TRAG_URL + search.offset, search.search, postOption);
    return response.data;
  }
);

export const fetchTrainingTitle = createAsyncThunk(
  'utility/fetchTrainingTitle',

  async (search) => {
    const response = await axios.post(TRAT_URL + search.offset, search.search, postOption);
    return response.data;
  }
);

export const saveTrainingThunk = createAsyncThunk(
  'utility/saveTraining',

  async (data)=>{
    const response = await axios.post(SAVE_TRA, data, postOption);
    return response.data;
  }
)

export const GetTrainingsById = createAsyncThunk(
  'utility/getTrainingsById',

  async (id)=>{
    const response = await axios.post(TRA_BY_ID, id, postOption);
    return response.data.training[0];
  }
)

export const GetTrainingsMemberById = createAsyncThunk(
  'utility/getTrainingsMemberById',

  async (id)=>{
    const response = await axios.post(TRA_BY_ID, id, postOption);
    return response.data.training_member;
  }
)

export const GetTrainingGroupById = createAsyncThunk(
  'utility/getTrainingGroupById',

  async (id)=>{
    const response = await axios.post(TRAG_BY_ID, id, postOption);
    return response.data.training_group[0];
  }
)

export const saveTrainingGroupThunk = createAsyncThunk(
  'utility/saveTrainingGroup',

  async (data)=>{
    const response = await axios.post(SAVE_TRAG, data, postOption);
    return response.data;
  }
)

export const GetTrainingTitleById = createAsyncThunk(
  'utility/getTrainingTitleById',

  async (id)=>{
    const response = await axios.post(TRAT_BY_ID, id, postOption);
    return response.data.training_title[0];
  }
)

export const saveTrainingTitleThunk = createAsyncThunk(
  'utility/saveTrainingTitle',

  async (data)=>{
    const response = await axios.post(SAVE_TRAT, data, postOption);
    return response.data;
  }
)

export const deleteMember = createAsyncThunk(
  'utility/deleteMember',

  async (data)=>{
    const response = await axios.post(DEL_MEM, data, postOption);
    return response.data;
  }
) 

export const saveMemberToTrain = createAsyncThunk(
  'utility/saveMemberToTrain',

  async (data)=>{
    const response = await axios.post(SAV_MEM, data, postOption);
    return response.data;
  }
) 

export const updatePassMember = createAsyncThunk(
  'utility/deleteMember',

  async (data)=>{
    const response = await axios.post(UP_MEM, data, postOption);
    return response.data;
  }
) 

const initialState = {
  member_choose: [{'id':null, 'name':'', 'last_name':'', 'department': '', 
                   'position': '', 'emp_id':null, 'employee_id':'', 'results':false, 'remark': ''}],
  training: [],
  training_group: [],
  trg: [],
  trg_type: [],
  train :{'id':null,'name':'', 'start_datetime':'', 'end_datetime':'', 'teacher':'', 'result_remark': '', 'document': '',
          'training_group_id':null, 'training_title_id': null, 'training_results_id':null},
  train_group: {'id':null, 'name': '', 'training_group_type_id': null},
  training_title: [],
  train_title: {'id':null, 'name': '', 'training_group_id': null, 'place': ''},
  trt: [],
  tr_results: [],
  status: 'idle',
  tg_status: 'idle',
  tt_status: 'idle',
  train_state: 'idle',
  all_status: 'idle',
  gtype_status: 'idle',
  trg_status: 'idle',
  trt_status: 'idle',
  tr_results_status: 'idle',
  all_tt_status: 'idle',
  input : 'idle',
  trg_input : 'idle',
  trt_input : 'idle',
  error: null,
  tg_error: null,
  tt_error: null,
  all_tt_error: null,
  tgt_error:null,
  tr_results_error:null
};


const utilitySlice = createSlice({
  name: 'utility',
  initialState,
  reducers: {
    setTrainingName: (state, action) => {
      state.train.name = action.payload
    },
    setTrainStart: (state, action) => {
      state.train.start_datetime = action.payload
    },
    setTrainEnd: (state, action) => {
      state.train.end_datetime = action.payload
    },
    setTeacher: (state, action) => {
      state.train.teacher = action.payload
    },
    setResultRemark: (state, action) =>{
      state.train.result_remark = action.payload
    },
    setDocument: (state, action) =>{
      state.train.document = action.payload
    },
    setTrainGroup:(state, action) =>{
      state.train.training_group_id = action.payload
    },
    setTrainTitle:(state, action) =>{
      state.train.training_title_id = action.payload
    },
    setTrainResults:(state, action) =>{
      state.train.training_results_id = action.payload
    },
    getTrain:(state) =>{
      state.train = {'id':null,'name':'', 'start_datetime':'', 'end_datetime':'', 'result_remark': '', 'document': '',
                     'teacher':'','training_group_id':null, 'training_title_id': null, 'training_results_id':null}
    },
    getTrainMember:(state) =>{
      state.member_choose.length = 0
    },
    setTraingState:(state)=>{
      state.train_state = 'idle'
    },
    getTrainGroup:(state) =>{
      state.train_group = {'id':null,'name':'', 'training_group_type_id': null }
    },
    setTrGName: (state, action) => {
      state.train_group.name = action.payload
    },
    setTrGType: (state, action) =>{
      state.train_group.training_group_type_id = action.payload
    },
    setTraingGroupState:(state)=>{
      state.trg_status = 'idle'
    },
    getTrainTitle:(state) =>{
      state.train_title = {'id':null, 'name': '', 'training_group_id': null}
    },
    setTrainTitleState:(state)=>{
      state.trt_status = 'idle'
    },
    setTrTName: (state, action) => {
      state.train_title.name = action.payload
    },
    setTrTPlace: (state, action) => {
      state.train_title.place = action.payload
    },
    setTrTGroup: (state, action) => {
      state.train_title.training_group_id = action.payload
    },
    addMember:(state, action)=>{
      state.member_choose.push({...action.payload,
                                emp_id: action.payload.id})
    },
    removeMember:(state, action)=>{
      state.member_choose.splice(action.payload, 1)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTraining.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTraining.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.training = action.payload;
      })
      .addCase(fetchTraining.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchTrainingGroup.pending, (state) => {
        state.tg_status = 'loading';
      })
      .addCase(fetchTrainingGroup.fulfilled, (state, action) => {
        state.tg_status = 'succeeded';
        state.training_group = action.payload;
      })
      .addCase(fetchTrainingGroup.rejected, (state, action) => {
        state.tg_status = 'failed';
        state.tg_error = action.error.message;
      })
      .addCase(saveTrainingThunk.fulfilled, (state, action)=> {
        state.train = action.payload;
        state.train_state = 'succeeded'
      })
      .addCase(GetTrainingsById.fulfilled, (state,action)=>{
        state.train = action.payload;
        state.input = 'succeeded'
      })
      .addCase(GetTrainingsMemberById.fulfilled, (state,action)=>{
        state.member_choose = action.payload;
        state.input = 'succeeded'
      })
      .addCase(GetTrainingGroupById.fulfilled, (state,action)=>{
        state.train_group = action.payload;
        state.trg_input = 'succeeded'
      })
      .addCase(saveTrainingGroupThunk.fulfilled, (state, action)=> {
        state.train_group = action.payload;
        state.trg_status = 'succeeded'
      })
      .addCase(fetchTrainingTitle.pending, (state) => {
        state.tt_status = 'loading';
      })
      .addCase(fetchTrainingTitle.fulfilled, (state, action) => {
        state.tt_status = 'succeeded';
        state.training_title = action.payload;
      })
      .addCase(fetchTrainingTitle.rejected, (state, action) => {
        state.tt_status = 'failed';
        state.tt_error = action.error.message;
      })
      .addCase(fetchApiTrainingGroup.pending, (state) =>{
        state.all_status = 'loading'
      })
      .addCase(fetchApiTrainingGroup.fulfilled, (state, action) => {
        state.all_status = 'succeeded';
        state.trg = action.payload;
      })
      .addCase(fetchApiTrainingGroup.rejected, (state, action) => {
        state.all_status = 'failed';
        state.error = action.error.message
      })
      .addCase(GetTrainingTitleById.fulfilled, (state,action)=>{
        state.train_title = action.payload;
        state.trt_input = 'succeeded'
      })
      .addCase(saveTrainingTitleThunk.fulfilled, (state, action)=> {
        state.train_title = action.payload;
        state.trt_status = 'succeeded'
      })
      .addCase(fetchApiTrainingTitle.pending, (state) =>{
        state.all_tt_status = 'loading'
      })
      .addCase(fetchApiTrainingTitle.fulfilled, (state, action) => {
        state.all_tt_status = 'succeeded';
        state.trt = action.payload;
      })
      .addCase(fetchApiTrainingTitle.rejected, (state, action) => {
        state.all_tt_status = 'failed';
        state.all_tt_error = action.error.message
      })
      .addCase(fetchApiTrainingGroupType.pending, (state) =>{
        state.gtype_status = 'loading'
      })
      .addCase(fetchApiTrainingGroupType.fulfilled, (state, action) => {
        state.gtype_status = 'succeeded';
        state.trg_type = action.payload;
      })
      .addCase(fetchApiTrainingGroupType.rejected, (state, action) => {
        state.gtype_status = 'failed';
        state.tgt_error = action.error.message
      })
      .addCase(fetchApiTrainingResults.pending, (state) =>{
        state.tr_results_status = 'loading'
      })
      .addCase(fetchApiTrainingResults.fulfilled, (state, action) => {
        state.tr_results_status = 'succeeded';
        state.tr_results = action.payload;
      })
      .addCase(fetchApiTrainingResults.rejected, (state, action) => {
        state.tr_results_status = 'failed';
        state.tr_results_error = action.error.message
      })
  },
});
export const getAllmemberChoose = (state) => state.utility.member_choose;
export const getAllTrainingGroup = (state) => state.utility.trg;
export const getAllTrainingGroupStatus = (state) => state.utility.all_status;
export const getAllTrainingTitle = (state) => state.utility.trt;
export const getAllTrainingTitleStatus = (state) => state.utility.all_tt_status;
export const selectAllTraining = (state) => state.utility.training;
export const getTrainingStatus = (state) => state.utility.status;
export const getTrainingError = (state) => state.utility.error;
export const getInputTraingState = (state) => state.utility.input;
export const getInputTrGState = (state) => state.utility.trg_input;
export const getTrainState = (state) => state.utility.train_state;
export const getTrainingById = (state) => state.utility.train;
export const getTrainingMemberById = (state) => state.utility.member_choose;
export const getTrainingGroupById = (state) => state.utility.train_group;
export const selectAllTrainingGroup = (state) => state.utility.training_group;
export const getTrainGroupState = (state) => state.utility.trg_status;
export const getTrainingGroupStatus = (state) => state.utility.tg_status;
export const getTrainingGroupError = (state) => state.utility.tg_error;
export const selectAllTrainingTitle = (state) => state.utility.training_title;
export const getTrainingTitleStatus = (state) => state.utility.tt_status;
export const getTrainingTitleError = (state) => state.utility.tt_error;
export const getTrainingTitleById = (state) => state.utility.train_title;
export const getTrainTitleState = (state) => state.utility.trt_status;
export const getInputTrTState = (state) => state.utility.trt_input;
export const getAllTrainingGroupType = (state) => state.utility.trg_type
export const getAllTrainingGroupTypeStatus = (state) => state.utility.gtype_status;
export const getTrainingGroupTypeError = (state) => state.utility.tgt_error;
export const getAllTrainingResults = (state) => state.utility.tr_results;
export const getAllTrainingResultsStatus = (state) => state.utility.tr_results_status;
export const getAllTrainingResultsError = (state) => state.utility.tr_results_error;
export const { setTrainingName, setTrainStart, setTrainEnd, setTrGName, setTraingGroupState,
               setTeacher, setTraingState, getTrain, getTrainGroup, getTrainTitle, setTrTPlace,
              setTrainTitleState,setTrTName,  setTrTGroup, addMember, removeMember, getTrainMember,
              setTrainGroup, setTrainTitle, setTrGType, setTrainResults, setResultRemark, setDocument } = utilitySlice.actions

export default utilitySlice.reducer;