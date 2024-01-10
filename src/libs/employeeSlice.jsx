import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { error } from "jquery"
import Moment from 'moment';

//const server = 'http://localhost:8000'
const server = 'http://192.168.10.248:8000'
const EMP_URL = server + '/hr_employee/?page='
const EMP_BDEP = server + '/employee_by_dep/?page='
const AB_STC = server + '/absend_status_check'
const EMP_AB_DEP = server + '/hr_employee_absend/?page='
const EMP_NA = server + '/api_nationality'
const EMP_PREFIX = server + '/api_prefix'
const EMP_GENDER = server + '/api_gender'
const EMP_BY_ID = server + '/emp_by_id'
const EMP_BY_CODE = server + '/emp_by_code'
const SAVE_EMP = server + '/save_employee'
const SAVE_ABS = server + '/save_absend'
const ABS_TYPE = server + '/api_absend_type'
const UP_PRO = server + '/update_probation'
const RE_EMP = server + '/resign_emp'
const EMP_PRO = server + '/employee_probation'
const EMP_NATI = server + '/emp_nationality'
const AB_TODAY = server + '/absend_today'
const EMP_WORK = server + '/emp_work_day'
const CON_FRM = server + '/confirm_absend'
const REJ_FRM = server + '/reject_absend'
const VACATION_D = server + '/api_vacation_day'
const token = localStorage.getItem('accessToken')
const dep = localStorage.getItem('dep')

const getOptions = {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' +  token}
};

const postOption = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
}

export const fetchGetEmpPro = createAsyncThunk(
    'employee/fetchGetEmpPro',
  
    async () => {
      const response = await axios.get(EMP_PRO , getOptions);
      return response.data;
    }
);

export const fetchGetEmpNational = createAsyncThunk(
    'employee/fetchGetEmpNational',
  
    async () => {
      const response = await axios.get(EMP_NATI , getOptions);
      return response.data;
    }
);

export const fetchGetEmpWorkDay = createAsyncThunk(
    'employee/fetchGetEmpWorkDay',
  
    async () => {
      const response = await axios.get(EMP_WORK , getOptions);
      return response.data;
    }
);

export const toDayAbsend = createAsyncThunk(
    'employee/toDayAbsend',
  
    async (dep) => {
      const response = await axios.post(AB_TODAY , dep, postOption);
      return response.data;
    }
);

export const fetchEmployee = createAsyncThunk(
    'employee/fetchEmployee',

    async(search) => {
        const response = await axios.post(EMP_URL + search.offset, search, postOption);
        return response.data;
    }
);


export const fetchEmployeeByDep = createAsyncThunk(
    'employee/fetchEmployeeByDep',

    async(search) => {
        const response = await axios.post(EMP_BDEP + search.offset, search, postOption);
        return response.data;
    }
);


export const absendStatusCheck = createAsyncThunk(
    'employee/absendStatusCheck',

    async(search) => {
        const response = await axios.post(AB_STC, search, postOption);
        return response.data;
    }
);

export const fetchEmployeeAbsendByDep = createAsyncThunk(
    'employee/fetchEmployeeAbsendByDep',

    async(data) => {
        const response = await axios.post(EMP_AB_DEP + data.offset, data, postOption);
        return response.data;
    }
);

export const fetchGetNationality = createAsyncThunk(
    'rockets/fetchGetNationality',
  
    async () => {
      const response = await axios.get(EMP_NA , getOptions);
      return response.data.nationality;
    }
);

export const fetchGetVacationDay = createAsyncThunk(
    'rockets/fetchGetVacationDay',
  
    async () => {
      const response = await axios.get(VACATION_D , getOptions);
      return response.data.vacation_day;
    }
);

export const fetchGetAbsendType = createAsyncThunk(
    'rockets/fetchGetAbsendType',
  
    async () => {
      const response = await axios.get(ABS_TYPE , getOptions);
      return response.data.absend_type;
    }
);

export const fetchGetPrefix = createAsyncThunk(
    'rockets/fetchGetPrefix',
  
    async () => {
      const response = await axios.get(EMP_PREFIX , getOptions);
      return response.data.prefix;
    }
);

export const fetchGetGender = createAsyncThunk(
    'rockets/fetchGetGender',
  
    async () => {
      const response = await axios.get(EMP_GENDER , getOptions);
      return response.data.gender;
    }
);

export const GetEmpById = createAsyncThunk(
    'employee/getEmpById',

    async (id)=>{
        const response = await axios.post(EMP_BY_ID, id, postOption);
        return response.data.employee[0];
        
    }
)

export const GetEmpByCode = createAsyncThunk(
    'employee/getEmpByCode',

    async (code)=>{
        const response = await axios.post(EMP_BY_CODE, code, postOption);
        if(response.data.employee[0] === undefined){
            return error
        }else{
            return response.data.employee[0];   
        }     
    }
)

export const GetFileEmpByEmpId = createAsyncThunk(
    'employee/getFileEmpByEmpId',

    async (id)=>{
        const response = await axios.post(EMP_BY_ID, id, postOption);
        return response.data.file_employee;
        
    }
)

export const GetAbsendEmpByEmpId = createAsyncThunk(
    'employee/getAbsendEmpByEmpId',

    async (id)=>{
        const response = await axios.post(EMP_BY_ID, id, postOption);
        return response.data.absend_history;
        
    }
)

export const GetTrainEmpByEmpId = createAsyncThunk(
    'employee/getTrainEmpByEmpId',

    async (id)=>{
        const response = await axios.post(EMP_BY_ID, id, postOption);
        return response.data.train_history;
        
    }
)

export const GetExmEmpByEmpId = createAsyncThunk(
    'employee/getExmEmpByEmpId',

    async (id)=>{
        const response = await axios.post(EMP_BY_ID, id, postOption);
        return response.data.exm_history;
        
    }
)
export const GetOffenceEmpByEmpId = createAsyncThunk(
    'employee/getOffenceEmpByEmpId',

    async (id)=>{
        const response = await axios.post(EMP_BY_ID, id, postOption);
        return response.data.off_history;
        
    }
)
export const saveEmployeeThunk = createAsyncThunk(
    'employee/saveEmployee',
  
    async (data)=>{
      const response = await axios.post(SAVE_EMP, data, postOption);
      alert("บันทึกเรียบร้อย")
      return response.data;
    }
)

export const saveAbsendThunk = createAsyncThunk(
    'employee/saveAbsend',
  
    async (data)=>{
      const response = await axios.post(SAVE_ABS, data, postOption);
      return response.data;
    }
) 

export const updateProbationThunk = createAsyncThunk(
    'employee/updateProbation',
  
    async (data)=>{
      const response = await axios.post(UP_PRO, data, postOption);
      return response.data;
    }
) 

export const resignEmpThunk = createAsyncThunk(
    'employee/resignEmp',
  
    async (data)=>{
      const response = await axios.post(RE_EMP, data, postOption);
      return response.data;
    }
) 

export const confirmAbsend = createAsyncThunk(
    'employee/confirmAbsend',
  
    async (data)=>{
      const response = await axios.post(CON_FRM, data, postOption);
      return response.data;
    }
) 

export const rejectAbsend = createAsyncThunk(
    'employee/rejectAbsend',
  
    async (data)=>{
      const response = await axios.post(REJ_FRM, data, postOption);
      return response.data;
    }
) 

const initialState = {
    employee: [],
    employee_ab: [],
    emp_pro:[],
    emp_nation:[],
    emp_work:[],
    today_abs:[],
    nationality: [],
    prefix: [],
    gender: [],
    file_emp: [],
    absend_his: [],
    train_his: [],
    exm_his:[],
    offence_his:[],
    absend_type:[],
    vacation_day:[],
    emp :{'id':null,'prefix':null, 'name':'', 'last_name': '', 'birth_date' : null,
          'blood_group':'', 'gender': null, 'religion': '',
          'nickname': '','identity_id':'', 'nationality':null, 'tel': '',
          'department':null, 'position':null, 'std':null, 'address':'', 
          'district': '', 'sub_district': '', 'post_code': '', 'sub_department': null},
    absend :{'start_date':'', 'end_date':'', 'work_date':'', 'date_amount': null,
             'motive':'', 'absend_type_id':null},
    status: 'idle',
    ab_status: 'idle',
    emp_state: 'idle',
    input: 'idle',
    na_state: 'idle',
    pre_state:'idle',
    abs_state: 'idle',
    gen_state:'idle',
    va_state: 'idle',
    save_abs: 'idle',
    update_pro:'idle',
    update_ab:'idle',
    emp_pro_state: 'idle',
    emp_nation_state: 'idle',
    emp_work_state: 'idle',
    today_abs_state: 'idle',
    error: null,
    va_error:null,
    ab_error: null,
    emp_error:null,
    na_error:null,
    pre_error:null,
    gen_error:null,
    abs_error:null,
    emp_pro_error: null,
    emp_nation_error:null,
    emp_work_error:null,
    today_abs_error: null
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers:{
        setEmpName: (state, action) => {
            state.emp.name = action.payload
        },
        setPrefix: (state, action) => {
            state.emp.prefix = action.payload
        },
        setLastName: (state, action) =>{
            state.emp.last_name = action.payload
        },
        setNickName: (state, action) =>{
            state.emp.nickname = action.payload
        },
        setIdentityID: (state, action) =>{
            state.emp.identity_id = action.payload
        },
        setNationality: (state, action) =>{
            state.emp.nationality = action.payload
        },
        setDepartment: (state, action) =>{
            state.emp.department = action.payload
        },
        setPosition: (state, action) =>{
            state.emp.position = action.payload
        },
        setStd: (state, action) =>{
            state.emp.std = action.payload
        },
        setAddress:(state, action) =>{
            state.emp.address = action.payload
        },
        setDistrict:(state, action) =>{
            state.emp.district = action.payload
        },
        setSubDistrict:(state, action) =>{
            state.emp.sub_district = action.payload
        },
        setPostCode:(state, action) =>{
            state.emp.post_code = action.payload
        },
        setSubDepartment:(state, action) =>{
            state.emp.sub_department = action.payload
        },
        setTel:(state, action)=>{
            state.emp.tel = action.payload
        },
        setBloodGroup:(state, action)=>{
            state.emp.blood_group = action.payload
        },
        setBirthDate:(state, action)=>{
            state.emp.birth_date = action.payload
        },
        setGender:(state, action)=>{
            state.emp.gender = action.payload
        },
        setReligion:(state, action)=>{
            state.emp.religion = action.payload
        },
        getEmp:(state)=>{
            state.emp = {'id':null,'prefix':null, 'name':'', 'last_name': '', 'employee_id':'',
            'nickname': '','identity_id':'', 'nationality':null, tel: '', 'blood_group': '', 'gender': null,
            'department':null, 'position':null, 'std':null, 'address':'', 'birth_date': null, 'religion': '',
            'district': '', 'sub_district': '', 'post_code': '', 'sub_department': null}
        },
        getAbsend:(state)=>{
            state.absend = {'start_date':'', 'end_date':'', 'work_date':'', 'date_amount': null,
            'motive':'', 'absend_type_id':null}
        },
        setStartDate: (state, action) =>{
            const startDate = Moment(action.payload, 'yyyy-MM-DD');
            const now = new Date()
            now.setHours(0,0,0,0)
            if (startDate.isBefore(now) && dep !== '15') {
                if(startDate.isSame(now)){
                    state.absend.start_date = action.payload
                }else{
                     alert('ไม่สามารถเลือกวันย้อนหลังได้')
                }
            }else{
                 state.absend.start_date = action.payload
            }
        },
        setEndDate: (state, action) =>{
            const startDate = Moment(state.absend.start_date, 'yyyy-MM-DD');
            const rangeStart = Moment(state.absend.start_date).add(1, 'M');
            const endDate = Moment(action.payload, 'yyyy-MM-DD');
            if (endDate.isBefore(startDate)) {
                alert('ไม่สามารถเลือกวันน้อยกว่าวันเริ่มลาได้')
            }else if (endDate.isAfter(rangeStart)){
                alert('ไม่สามารถลาเกิน 1 เดือนได้')
            }else{
                 state.absend.end_date = action.payload
            }
        },
        setWorkDate: (state, action) =>{
            const endDate = Moment(state.absend.end_date, 'yyyy-MM-DD');
            const workDate = Moment(action.payload, 'yyyy-MM-DD');
            if (workDate.isBefore(endDate)) {
                alert('ไม่สามารถเลือกวันน้อยกว่าวันสิ้นสุดการลาได้')
            }else{
                 state.absend.work_date = action.payload
            }
        },
        setStartDateHR: (state, action) =>{
            state.absend.start_date = action.payload
        },
        setDateAmount:(state, action)=>{
            state.absend.date_amount = action.payload
        },
        setMotive: (state, action) =>{
            state.absend.motive = action.payload
        },
        setAbsendType: (state, action) =>{
            state.absend.absend_type_id = action.payload
        },
        setEmpState:(state, action)=>{
            state.emp_state = 'idle'
        },
        setSaveAbsState:(state, action)=>{
            state.save_abs = 'idle'
        },
        setUpdateProState:(state, action)=>{
            state.update_pro = 'idle'
        },
        setAbstCheckState:(state, action)=>{
            state.ab_status = 'idle'
        },
        setUpdateAb:(state, action)=>{
            state.update_ab = 'idle'
        },
    },
    extraReducers:(builder) => {
        builder
         .addCase(fetchEmployee.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(fetchEmployee.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.employee = action.payload;
         })
         .addCase(fetchEmployee.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
         })
         .addCase(fetchEmployeeByDep.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(fetchEmployeeByDep.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.employee = action.payload;
         })
         .addCase(fetchEmployeeByDep.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
         })
         .addCase(fetchEmployeeAbsendByDep.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(fetchEmployeeAbsendByDep.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.employee = action.payload;
         })
         .addCase(fetchEmployeeAbsendByDep.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
         })
         .addCase(absendStatusCheck.pending, (state) => {
            state.ab_status = 'loading';
         })
         .addCase(absendStatusCheck.fulfilled, (state, action) => {
            state.ab_status = 'succeeded';
            state.employee_ab = action.payload;
         })
         .addCase(absendStatusCheck.rejected, (state, action)=>{
            state.ab_status = 'failed';
            state.ab_error = action.error.message;
         })
         .addCase(GetEmpById.fulfilled, (state,action) =>{
            state.emp = action.payload;
            state.emp_state = 'idle'
            state.input = 'succeeded'
         })
         .addCase(GetEmpById.rejected, (state, action)=>{
            state.emp_state = 'failed';
            state.emp_error = action.error.message;
         })
         .addCase(GetFileEmpByEmpId.fulfilled, (state,action) =>{
            state.file_emp= action.payload;
         })
         .addCase(GetAbsendEmpByEmpId.fulfilled, (state,action) =>{
            state.absend_his= action.payload;
         })
         .addCase(GetTrainEmpByEmpId.fulfilled, (state,action) =>{
            state.train_his= action.payload;
         })
         .addCase(GetExmEmpByEmpId.fulfilled, (state,action) =>{
            state.exm_his= action.payload;
         })
         .addCase(GetOffenceEmpByEmpId.fulfilled, (state,action) =>{
            state.offence_his= action.payload;
         })
         .addCase(fetchGetNationality.pending, (state) => {
            state.na_state = 'loading';
         })
         .addCase(fetchGetNationality.fulfilled, (state, action) => {
            state.na_state = 'succeeded';
            state.nationality = action.payload
         })
         .addCase(fetchGetNationality.rejected, (state, action)=>{
            state.na_state = 'failed';
            state.na_error = action.error.message
         })
         .addCase(fetchGetVacationDay.pending, (state) => {
            state.va_state = 'loading';
         })
         .addCase(fetchGetVacationDay.fulfilled, (state, action) => {
            state.va_state = 'succeeded';
            state.vacation_day = action.payload
         })
         .addCase(fetchGetVacationDay.rejected, (state, action)=>{
            state.va_state = 'failed';
            state.va_error = action.error.message
         })
         .addCase(fetchGetPrefix.pending, (state) => {
            state.pre_state = 'loading';
         })
         .addCase(fetchGetPrefix.fulfilled, (state, action) => {
            state.pre_state = 'succeeded';
            state.prefix = action.payload
         })
         .addCase(fetchGetPrefix.rejected, (state, action)=>{
            state.pre_state = 'failed';
            state.pre_error = action.error.message
         })
         .addCase(saveEmployeeThunk.fulfilled, (state, action)=> {
            //state.employee = action.payload;
            state.emp_state = 'succeeded'
         })
         .addCase(GetEmpByCode.fulfilled, (state, action)=>{
            state.emp = action.payload;
            state.emp_state = 'succeeded'
         })
         .addCase(GetEmpByCode.rejected, (state, action)=>{
            state.emp_state = 'failed';
            state.error = action.error.message
         })
         .addCase(fetchGetAbsendType.pending, (state)=>{
            state.abs_state = 'loading'
         })
         .addCase(fetchGetAbsendType.fulfilled, (state, action) => {
            state.abs_state = 'succeeded'
            state.absend_type = action.payload
         })
         .addCase(fetchGetAbsendType.rejected, (state, action)=>{
            state.abs_state = 'failed';
            state.abs_error = action.error.message
         })
         .addCase(saveAbsendThunk.fulfilled, (state, action)=>{
            state.absend = action.payload;
            state.save_abs = 'succeeded'
         })
         .addCase(updateProbationThunk.fulfilled, (state, action)=>{
            state.employee = action.payload;
            state.update_pro = 'succeeded'
         })
         .addCase(resignEmpThunk.fulfilled, (state, action)=>{
            state.employee = action.payload;
            state.update_pro = 'succeeded'
         })
         .addCase(confirmAbsend.fulfilled, (state, action)=>{
            state.employee_ab = action.payload;
            state.update_ab = 'succeeded'
         })
         .addCase(rejectAbsend.fulfilled, (state, action)=>{
            state.employee_ab = action.payload;
            state.update_ab = 'succeeded'
         })
         .addCase(fetchGetEmpPro.pending, (state) =>{
            state.emp_pro_state = 'loading'
         })
         .addCase(fetchGetEmpPro.fulfilled, (state, action) => {
            state.emp_pro_state = 'succeeded';
            state.emp_pro = action.payload;
         })
         .addCase(fetchGetEmpPro.rejected, (state, action) => {
            state.emp_pro_state = 'failed';
            state.emp_pro_error = action.error.message
         })
         .addCase(fetchGetEmpNational.pending, (state) =>{
            state.emp_nation_state = 'loading'
         })
         .addCase(fetchGetEmpNational.fulfilled, (state, action) => {
            state.emp_nation_state = 'succeeded';
            state.emp_nation = action.payload;
         })
         .addCase(fetchGetEmpNational.rejected, (state, action) => {
            state.emp_nation_state = 'failed';
            state.emp_nation_error = action.error.message
         })
         .addCase(fetchGetEmpWorkDay.pending, (state) =>{
            state.emp_work_state = 'loading'
         })
         .addCase(fetchGetEmpWorkDay.fulfilled, (state, action) => {
            state.emp_work_state = 'succeeded';
            state.emp_work = action.payload;
         })
         .addCase(fetchGetEmpWorkDay.rejected, (state, action) => {
            state.emp_work_state = 'failed';
            state.emp_work_error = action.error.message
         })
         .addCase(toDayAbsend.pending, (state) =>{
            state.today_abs_state = 'loading'
         })
         .addCase(toDayAbsend.fulfilled, (state, action) => {
            state.today_abs_state = 'succeeded';
            state.today_abs = action.payload;
         })
         .addCase(toDayAbsend.rejected, (state, action) => {
            state.today_abs_state = 'failed';
            state.today_abs_error = action.error.message
         })
         .addCase(fetchGetGender.pending, (state) => {
            state.gen_state = 'loading';
         })
         .addCase(fetchGetGender.fulfilled, (state, action) => {
            state.gen_state = 'succeeded';
            state.gender = action.payload
         })
         .addCase(fetchGetGender.rejected, (state, action)=>{
            state.gen_state = 'failed';
            state.gen_error = action.error.message
         })
    }
});

export const selectAllEmployee = (state) => state.employee.employee;
export const selectAllEmployeeAb = (state) => state.employee.employee;
export const selectAbsendStatCheck = (state) => state.employee.employee_ab;
export const getAllNationality = (state) => state.employee.nationality;
export const getNaStatus = (state) => state.employee.na_state;
export const getAllVacationDay = (state) => state.employee.vacation_day;
export const getVaStatus = (state) => state.employee.va_state;
export const getUpdateAbStatus = (state) => state.employee.update_ab;
export const getAbCheckStatus = (state) => state.employee.ab_status;
export const getVaError = (state) => state.employee.va_error;
export const getNaError = (state) => state.employee.na_error;
export const getAllPrefix = (state) => state.employee.prefix;
export const getAllGender = (state) => state.employee.gender;
export const getPreStatus = (state) => state.employee.pre_state;
export const getGenStatus = (state) => state.employee.gen_state;
export const getPreError = (state) => state.employee.pre_error;
export const getGenError = (state) => state.employee.gen_error;
export const getAllAbsType = (state) => state.employee.absend_type;
export const getAbsendTStatus = (state) => state.employee.abs_state;
export const getAbsendTError = (state) => state.employee.abs_error;
export const getEmployeeStatus = (state) => state.employee.status;
export const getEmployeeError = (state) => state.employee.errorr;
export const getAbStCheckError = (state) => state.employee.ab_errorr;
export const getEmpState = (state) => state.employee.emp_state;
export const getSaveAbsState = (state) => state.employee.save_abs;
export const getInputState = (state) => state.employee.input;
export const getEmpleyeeById = (state) => state.employee.emp 
export const getAbsendById = (state) => state.employee.absend 
export const getFileEmpleyeeById = (state) => state.employee.file_emp 
export const getTrainEmpleyeeById = (state) => state.employee.train_his 
export const getAbsendEmployeeById = (state) => state.employee.absend_his 
export const getExmEmpByEmpId = (state) => state.employee.exm_his
export const getOffenceEmployeeById = (state) => state.employee.offence_his 
export const selectAllEmpPro= (state) => state.employee.emp_pro;
export const getEmpProStatus = (state) => state.employee.emp_pro_state;
export const getEmpProError = (state) => state.employee.emp_pro_error;
export const getEmpError = (state) => state.employee.emp_error;
export const selectAllEmpNation= (state) => state.employee.emp_nation;
export const getEmpNationStatus = (state) => state.employee.emp_nation_state;
export const getEmpNationError = (state) => state.employee.emp_nation_error;
export const selectAllTodayAbs = (state) => state.employee.today_abs;
export const getTodayAbsStatus = (state) => state.employee.today_abs_state;
export const getTodayAbsError = (state) => state.employee.today_abs_error;
export const selectAllEmpWork = (state) => state.employee.emp_work;
export const getEmpWorkStatus = (state) => state.employee.emp_work_state;
export const getEmpWorkError = (state) => state.employee.emp_work_error;
export const { setEmpName, setPrefix, setLastName, setNickName, setIdentityID, setNationality, setDepartment, setPosition, setStd, getEmp,
               setAddress, setDistrict, setSubDistrict, setPostCode, setSubDepartment, setAbstCheckState, setUpdateAb,
               setStartDate, setTel, setStartDateHR, setEndDate, setWorkDate, setDateAmount, setMotive, setAbsendType, setEmpState, setSaveAbsState, setUpdateProState,
               setBirthDate, setBloodGroup, setGender, setReligion } = employeeSlice.actions

export default employeeSlice.reducer;