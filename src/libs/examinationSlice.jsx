import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//const server = 'http://localhost:8000'
const server = 'http://192.168.10.248:8000'
const EXM_URL = server + '/hr_all_examination/?page='
const EXMG_URL = server + '/hr_all_examination_group/?page='
const EXMT_URL = server + '/hr_all_examination_title/?page='
const ALL_EXMG = server + '/api_examination_group'
const ALL_EXMT = server + '/api_examination_title'
const SAVE_EXM = server + '/save_hr_examination'
const SAVE_EXMG = server + '/save_hr_examination_group'
const SAVE_EXMT = server + '/save_hr_examination_title'
const EXM_BY_ID = server + '/examination_by_id'
const EXMG_BY_ID = server + '/examination_group_by_id'
const EXMT_BY_ID = server + '/examination_title_by_id'
const DEL_MEM = server + '/delete_examination_member'
const SAV_MEM = server + '/save_examination_member'
const UP_MEM = server + '/update_examination_pass'
const API_OFFTI = server + '/api_offence_title'
const All_OFFTI = server + '/all_offence_title'
const All_OFFRE = server + '/api_offence_results'
const OFT_BY_ID = server + '/offence_title_by_id'
const OF_BY_ID = server + '/offence_by_id'
const SAVE_OFFC = server + '/save_offence'
const SAVE_OFT = server + '/save_offence_title'
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

export const fetchAllOffenceResult = createAsyncThunk(
  'examination/fetchAllOffenceResult',

  async () => {
    const response = await axios.get(All_OFFRE , getOptions);
    return response.data.offence_result;
  }
);

export const fetchAllOffenceTitle = createAsyncThunk(
  'examination/fetchAllOffenceTitle',

  async () => {
    const response = await axios.get(All_OFFTI , getOptions);
    return response.data.offence_title;
  }
);

export const fetchApiOffenceTitle = createAsyncThunk(
  'examination/fetchApiOffenceTitle',

  async (search) => {
    const response = await axios.post(API_OFFTI , search, postOption);
    return response.data;
  }
);

export const GetOffenceTitleById = createAsyncThunk(
  'examination/getOffenceTitleById',

  async (id)=>{
    const response = await axios.post(OFT_BY_ID, id, postOption);
    return response.data.offence_title[0];
  }
)

export const GetOffenceById = createAsyncThunk(
  'examination/getOffenceById',

  async (id)=>{
    const response = await axios.post(OF_BY_ID, id, postOption);
    return response.data.offence[0];
  }
)

export const fetchApiExaminationGroup = createAsyncThunk(
  'examination/fetchApiExaminationGroup',

  async () => {
    const response = await axios.get(ALL_EXMG , getOptions);
    return response.data.examination_group;
  }
);

export const fetchApiExaminationTitle = createAsyncThunk(
  'examination/fetchApiExaminationTitle',
  async () => {
    const response = await axios.get(ALL_EXMT , getOptions);
    return response.data.examination_title;
  }
);

export const fetchExamination = createAsyncThunk(
  'examination/fetchExamination',

  async (search) => {
    const response = await axios.post(EXM_URL + search.offset, search.search, postOption);
    return response.data;
  }
);

export const fetchExaminationGroup = createAsyncThunk(
  'examination/fetchExaminationGroup',

  async (search) => {
    const response = await axios.post(EXMG_URL + search.offset, search.search, postOption);
    return response.data;
  }
);

export const fetchExaminationTitle = createAsyncThunk(
  'examination/fetchExaminationTitle',

  async (search) => {
    const response = await axios.post(EXMT_URL + search.offset, search.search, postOption);
    return response.data;
  }
);

export const saveExaminationThunk = createAsyncThunk(
  'examination/saveExamination',

  async (data)=>{
    const response = await axios.post(SAVE_EXM, data, postOption);
    return response.data;
  }
)

export const GetExaminationById = createAsyncThunk(
  'examination/getExaminationById',

  async (id)=>{
    const response = await axios.post(EXM_BY_ID, id, postOption);
    return response.data.examination[0];
  }
)

export const GetExaminationMemberById = createAsyncThunk(
  'examination/getExaminationMemberById',

  async (id)=>{
    const response = await axios.post(EXM_BY_ID, id, postOption);
    return response.data.examination_member;
  }
)

export const GetExaminationGroupById = createAsyncThunk(
  'examination/getExaminationGroupById',

  async (id)=>{
    const response = await axios.post(EXMG_BY_ID, id, postOption);
    return response.data.examination_group[0];
  }
)

export const saveExaminationGroupThunk = createAsyncThunk(
  'examination/saveExaminationGroup',

  async (data)=>{
    const response = await axios.post(SAVE_EXMG, data, postOption);
    return response.data;
  }
)

export const GetExaminationTitleById = createAsyncThunk(
  'examination/getExaminationTitleById',

  async (id)=>{
    const response = await axios.post(EXMT_BY_ID, id, postOption);
    return response.data.examination_title[0];
  }
)

export const saveExaminationTitleThunk = createAsyncThunk(
  'examination/saveExamintaionTitle',

  async (data)=>{
    const response = await axios.post(SAVE_EXMT, data, postOption);
    return response.data;
  }
)

export const deleteMember = createAsyncThunk(
  'examination/deleteMember',

  async (data)=>{
    const response = await axios.post(DEL_MEM, data, postOption);
    return response.data;
  }
) 

export const saveMemberToExam = createAsyncThunk(
  'examination/saveMemberToExam',

  async (data)=>{
    const response = await axios.post(SAV_MEM, data, postOption);
    return response.data;
  }
) 

export const updatePassMember = createAsyncThunk(
  'examination/updatePassMember',

  async (data)=>{
    const response = await axios.post(UP_MEM, data, postOption);
    return response.data;
  }
) 
export const saveOffenceThunk = createAsyncThunk(
  'examination/saveOffence',

  async (data)=>{
    const response = await axios.post(SAVE_OFFC, data, postOption);
    return response.data;
  }
)

export const saveOffenceTitleThunk = createAsyncThunk(
  'examination/saveOffenceTitle',

  async (data)=>{
    const response = await axios.post(SAVE_OFT, data, postOption);
    return response.data;
  }
)

const initialState = {
  member_choose: [{'id':null, 'name':'', 'last_name':'', 'department': '', 
                   'position': '', 'emp_id':null, 'employee_id':'', 'results':false, 'remark': ''}],
  examination: [],
  examination_group: [],
  exmg: [],
  exm :{'id':null,'name':'', 'examination_date':'', 'inspector':'', 'examination_title_id':null, 'examination_group_id': null, 'remark': ''},
  exm_group: {'id':null, 'name': ''},
  examination_title: [],
  exm_title: {'id':null, 'name': '', 'examination_group_id': null, 'place': ''},
  exmt: [],
  offence :{'id':null, 'offence_date':null, 'create_datetime':null, 'offence_detail':'', 'offence_results': '',
             'create_user':'', 'remark':'', 'place':'', 'offence_title_id': null, 'offence_result_id': null, 'furlough_start': null, 'furlough_end': null, 'fire_date': null},
  offence_status:[],
  oft_title: {'id':null, 'name': ''},
  all_oft:[],
  of_result:[],
  status: 'idle',
  eg_status: 'idle',
  et_status: 'idle',
  exm_state: 'idle',
  oft_status: 'idle',
  of_result_state: 'idle',
  all_status: 'idle',
  of_state: 'idle',
  exmg_status: 'idle',
  exmt_status: 'idle',
  all_et_status: 'idle',
  all_oft_state: 'idle',
  input : 'idle',
  exmg_input : 'idle',
  exmt_input : 'idle',
  oft_input : 'idle',
  error: null,
  eg_error: null,
  et_error: null,
  all_et_error: null,
  all_oft_error: null,
  oft_error:null,
  of_result_error:null
};


const examinationSlice = createSlice({
  name: 'examination',
  initialState,
  reducers: {
    setExaminationName: (state, action) => {
      state.exm.name = action.payload
    },
    setExaminationDate: (state, action) => {
      state.exm.examination_date = action.payload
    },
    setInspector: (state, action) => {
      state.exm.inspector = action.payload
    },
    setExaminationTitle:(state, action) =>{
      state.exm.examination_title_id = action.payload
    },
    setExaminationGroup:(state, action) =>{
      state.exm.examination_group_id = action.payload
    },
    getExm:(state) =>{
      state.exm = {'id':null,'name':'', 'examination_date':'', 'inspector':'','examination_title_id': null,'examination_group_id': null, 'remark': ''}
    },
    getExmMember:(state) =>{
      state.member_choose.length = 0
    },
    setExmState:(state)=>{
      state.exm_state = 'idle'
    },
    getExmGroup:(state) =>{
      state.exm_group = {'id':null,'name':''}
    },
    setExmGName: (state, action) => {
      state.exm_group.name = action.payload
    },
    setExmGroupState:(state)=>{
      state.exmg_status = 'idle'
    },
    getExmTitle:(state) =>{
      state.exm_title = {'id':null, 'name': '', 'examination_group_id': null}
    },
    setExmTitleState:(state)=>{
      state.exmt_status = 'idle'
    },
    setExmTName: (state, action) => {
      state.exm_title.name = action.payload
    },
    setExmTPlace: (state, action) => {
      state.exm_title.place = action.payload
    },
    setExmTGroup: (state, action) => {
      state.exm_title.examination_group_id = action.payload
    },
    addMember:(state, action)=>{
      state.member_choose.push({...action.payload,
                                emp_id: action.payload.id})
    },
    removeMember:(state, action)=>{
      state.member_choose.splice(action.payload, 1)
    },
    setOffenceDate: (state, action)=>{
      state.offence.offence_date = action.payload
    },
    setOffenceDetail: (state, action)=>{
      state.offence.offence_detail = action.payload
    },
    setOffenceResult: (state, action)=>{
      state.offence.offence_results = action.payload
    },
    setOffenceResultID: (state, action)=>{
      state.offence.offence_result_id = action.payload
    },
    setOffenceCreateUser: (state, action)=>{
      state.offence.create_user = action.payload
    },
    setOffenceRemark:(state, action)=>{
      state.offence.remark = action.payload
    },
    setOffenceTitle: (state, action)=>{
      state.offence.offence_title_id = action.payload
    },
    setOffencePlace: (state, action)=>{
      state.offence.place = action.payload
    },
    setOffenceFurStart:(state, action)=>{
      state.offence.furlough_start = action.payload
    },
    setOffenceFurEnd:(state, action)=>{
      state.offence.furlough_end = action.payload
    },
    setFireDate:(state, action)=>{
      state.offence.fire_date = action.payload
    },
    getOffence:(state) =>{
      state.offence = {'id':null, 'offence_date':null, 'create_datetime':null, 'offence_detail':'', 'offence_results': '',
      'create_user':'', 'remark':'', 'place': '', 'offence_title_id': null, 'offence_result_id': null, 'furlough_start': null, 'furlough_end': null, 'fire_date': null}
    },
    setOffenceTitleName: (state, action)=>{
      state.oft_title.name = action.payload
    },
    setOffencetitleState:(state)=>{
      state.oft_status = 'idle'
    },
    getOffenceTitle:(state) =>{
      state.oft_title = {'id':null, 'name': ''}
    },
    setOffenceTitleInputState:(state)=>{
      state.oft_input = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExamination.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExamination.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.examination = action.payload;
      })
      .addCase(fetchExamination.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchExaminationGroup.pending, (state) => {
        state.eg_status = 'loading';
      })
      .addCase(fetchExaminationGroup.fulfilled, (state, action) => {
        state.eg_status = 'succeeded';
        state.examination_group = action.payload;
      })
      .addCase(fetchExaminationGroup.rejected, (state, action) => {
        state.eg_status = 'failed';
        state.eg_error = action.error.message;
      })
      .addCase(saveExaminationThunk.fulfilled, (state, action)=> {
        state.exm = action.payload;
        state.exm_state = 'succeeded'
      })
      .addCase(GetExaminationById.fulfilled, (state,action)=>{
        state.exm = action.payload;
        state.input = 'succeeded'
      })
      .addCase(GetExaminationMemberById.fulfilled, (state,action)=>{
        state.member_choose = action.payload;
        state.input = 'succeeded'
      })
      .addCase(GetExaminationGroupById.fulfilled, (state,action)=>{
        state.exm_group = action.payload;
        state.exmg_input = 'succeeded'
      })
      .addCase(saveExaminationGroupThunk.fulfilled, (state, action)=> {
        state.exm_group = action.payload;
        state.exmg_status = 'succeeded'
      })
      .addCase(fetchExaminationTitle.pending, (state) => {
        state.et_status = 'loading';
      })
      .addCase(fetchExaminationTitle.fulfilled, (state, action) => {
        state.et_status = 'succeeded';
        state.examination_title = action.payload;
      })
      .addCase(fetchExaminationTitle.rejected, (state, action) => {
        state.et_status = 'failed';
        state.et_error = action.error.message;
      })
      .addCase(fetchApiExaminationGroup.pending, (state) =>{
        state.all_status = 'loading'
      })
      .addCase(fetchApiExaminationGroup.fulfilled, (state, action) => {
        state.all_status = 'succeeded';
        state.exmg = action.payload;
      })
      .addCase(fetchApiExaminationGroup.rejected, (state, action) => {
        state.all_status = 'failed';
        state.error = action.error.message
      })
      .addCase(GetExaminationTitleById.fulfilled, (state,action)=>{
        state.exm_title = action.payload;
        state.exmt_input = 'succeeded'
      })
      .addCase(saveExaminationTitleThunk.fulfilled, (state, action)=> {
        state.exm_title = action.payload;
        state.exmt_status = 'succeeded'
      })
      .addCase(fetchApiExaminationTitle.pending, (state) =>{
        state.all_et_status = 'loading'
      })
      .addCase(fetchApiExaminationTitle.fulfilled, (state, action) => {
        state.all_et_status = 'succeeded';
        state.exmt = action.payload;
      })
      .addCase(fetchApiExaminationTitle.rejected, (state, action) => {
        state.all_et_status = 'failed';
        state.all_et_error = action.error.message
      })
      .addCase(fetchApiOffenceTitle.pending, (state) =>{
        state.oft_status = 'loading'
      })
      .addCase(fetchApiOffenceTitle.fulfilled, (state, action) => {
        state.oft_status = 'succeeded';
        state.offence_title = action.payload;
      })
      .addCase(fetchApiOffenceTitle.rejected, (state, action) => {
        state.oft_status = 'failed';
        state.oft_error = action.error.message
      })
      .addCase(GetOffenceTitleById.fulfilled, (state,action)=>{
        state.oft_title = action.payload;
        state.oft_input = 'succeeded'
      })
      .addCase(saveOffenceTitleThunk.fulfilled, (state, action)=> {
        state.oft_title = action.payload;
        state.oft_input = 'succeeded'
      })      
      .addCase(fetchAllOffenceTitle.pending, (state) =>{
        state.all_oft_state = 'loading'
      })
      .addCase(fetchAllOffenceTitle.fulfilled, (state, action) => {
        state.all_oft_state = 'succeeded';
        state.all_oft = action.payload;
      })
      .addCase(fetchAllOffenceTitle.rejected, (state, action) => {
        state.all_oft_state = 'failed';
        state.all_oft_error = action.error.message
      })
      .addCase(GetOffenceById.fulfilled, (state,action)=>{
        state.offence = action.payload;
        state.of_state = 'succeeded'
      })
      .addCase(fetchAllOffenceResult.pending, (state) =>{
        state.of_result_state = 'loading'
      })
      .addCase(fetchAllOffenceResult.fulfilled, (state, action) => {
        state.of_result_state = 'succeeded';
        state.of_result = action.payload;
      })
      .addCase(fetchAllOffenceResult.rejected, (state, action) => {
        state.of_result_state = 'failed';
        state.of_result_error = action.error.message
      })
  },
});
export const getAllmemberChoose = (state) => state.examination.member_choose;
export const getAllExaminationGroup = (state) => state.examination.exmg;
export const getAllExaminationGroupStatus = (state) => state.examination.all_status;
export const getAllExaminationTitle = (state) => state.examination.exmt;
export const getAllExaminationTitleStatus = (state) => state.examination.all_et_status;
export const selectAllExamination = (state) => state.examination.examination;
export const getExaminationStatus = (state) => state.examination.status;
export const getExaminationError = (state) => state.examination.error;
export const getInputExmState = (state) => state.examination.input;
export const getInputExmGState = (state) => state.examination.exmg_input;
export const getExmState = (state) => state.examination.exm_state;
export const getExaminationById = (state) => state.examination.exm;
export const getExaminationMemberById = (state) => state.examination.member_choose;
export const getExaminationGroupById = (state) => state.examination.exm_group;
export const selectAllExaminationGroup = (state) => state.examination.examination_group;
export const getOffencebyId = (state) => state.examination.offence 
export const getExmGroupState = (state) => state.examination.exmg_status;
export const getExaminationGroupStatus = (state) => state.examination.eg_status;
export const getExaminationGroupError = (state) => state.examination.eg_error;
export const selectAllExaminationTitle = (state) => state.examination.examination_title;
export const getExaminationTitleStatus = (state) => state.examination.et_status;
export const getExaminationTitleError = (state) => state.examination.et_error;
export const getExaminationTitleById = (state) => state.examination.exm_title;
export const getExmTitleState = (state) => state.examination.exmt_status;
export const getInputExmTState = (state) => state.examination.exmt_input;
export const getAllOffenceTitle = (state) => state.examination.offence_title;
export const getOffenceTitleStatus = (state) => state.examination.oft_status;
export const getOffenceTitleError = (state) => state.examination.oft_error;
export const getOffenceTitleById = (state) => state.examination.oft_title;
export const getOffenceInputState = (state) => state.examination.oft_input;
export const getAllOftTitle = (state) => state.examination.all_oft;
export const getAllOftTitleState = (state) => state.examination.all_oft_state;
export const getOffenceById = (state) => state.examination.offence;
export const getOffenceByIdState = (state) => state.examination.of_state;
export const getAllOftResult = (state) => state.examination.of_result;
export const getAllOftResultState = (state) => state.examination.of_result_state;

export const { setExaminationName, getExmGroup, setExmGroupState, setExmGName,
              getExmTitle, setExmTitleState, setExmTName, setExmTPlace, setExmTGroup,
              getExm, getExmMember, setExaminationDate, setInspector, setExaminationTitle,
              setExmState, setExaminationGroup, addMember, removeMember,
              setOffenceDate, setOffenceDetail, setOffenceResult, setOffenceCreateUser,
              setOffenceRemark, setOffenceTitleName, setOffencetitleState, getOffenceTitle, 
              setOffenceTitleInputState, setOffenceTitle, setOffencePlace, setOffenceResultID,
              setOffenceFurStart, setOffenceFurEnd, setFireDate, getOffence } = examinationSlice.actions

export default examinationSlice.reducer;