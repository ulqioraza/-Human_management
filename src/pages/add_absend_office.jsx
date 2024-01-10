import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Sidebar } from '../Navigation/Sidebar'
import ReactPaginate from 'react-paginate';
import  Select  from 'react-select'
import Moment from 'moment';
import { Topbar } from '../Navigation/Topbar'
import { useLocation, useNavigate} from 'react-router-dom';
import { GetEmpByCode, fetchGetAbsendType, fetchGetVacationDay, getAbsendById, getAbsendTStatus, getAllAbsType, getAllVacationDay, getEmp, getEmpState, getEmpleyeeById, getEmployeeError, getSaveAbsState, getVaStatus, saveAbsendThunk, setAbsendType, 
         setDateAmount, setEmpState, setEndDate, setMotive, setSaveAbsState, setStartDate, setStartDateHR, setWorkDate} from '../libs/employeeSlice';
import { getToken } from '../libs/departmentSlice';

var firstload = true
export function Add_Absend_office() {
  const history = useNavigate();
  const location = useLocation();
  const menu = useSelector((state) => state.counter.menu)
  const dispatch = useDispatch()
  const emp = useSelector(getEmpleyeeById);
  const empState = useSelector(getEmpState);
  const saveAbsState = useSelector(getSaveAbsState)
  const error = useSelector(getEmployeeError);
  const absend = useSelector(getAbsendById)
  const abs_type = useSelector(getAllAbsType)
  const abs_state = useSelector(getAbsendTStatus)
  const vacation_day = useSelector(getAllVacationDay)
  const va_state = useSelector(getVaStatus)
  const date = Date.now()
  const [search, setSearch] = useState('');
  const [search_state, setSearchState] = useState(0);
  const dep = localStorage.getItem('dep')
  const username = localStorage.getItem('username')
  const emp_id = localStorage.getItem('emp_code')
  const [showLoader, setShowLoader] = useState(false)
  //const [todoTitle, setTodoTitle] = useState('')

  let absend_type = abs_type.map(function (pd) {
    return { value: pd.id, label: pd.name, gen: pd.gender, dep: pd.department };
  }) 

  React.useEffect(() => {
    dispatch(getToken())
    dispatch(setStartDate(''))
    dispatch(setStartDateHR(''))
    dispatch(setEndDate(''))
    dispatch(setWorkDate(''))
    dispatch(setDateAmount(''))
    dispatch(setAbsendType(''))
    dispatch(setMotive(''))
    if (saveAbsState === 'idle') {
        setSearch(emp_id)
        dispatch(GetEmpByCode(emp_id));
        setSearchState(1)
    }else if(saveAbsState === 'succeeded'){
        alert("บันทึกเรียบร้อย")
        dispatch(setEmpState())
        dispatch(setSaveAbsState())
        window.location.replace('#/employee_info')
    }
  }, [saveAbsState, dispatch]);

  React.useEffect(() => {
    if (abs_state === 'idle') {
      dispatch(fetchGetAbsendType());
    }
  }, [abs_state, dispatch]);

  React.useEffect(() => {
    if (va_state === 'idle') {
      dispatch(fetchGetVacationDay());
    }
  }, [va_state, dispatch]);

  const setABT = selectedOption => {
    dispatch(setAbsendType(selectedOption.value))
  }

  const saveAbsend = (e) =>{
    setShowLoader(true)
    setTimeout(() => setShowLoader(false), 1000)
    
    if(absend.motive === null || absend.motive === '' || absend.start_date === null || absend.end_date === null || absend.work_date === null || absend.absend_type_id === null){
        alert("ใส่ข้อมูลไม่ครบ")
    }else{ 
        if(absend.absend_type_id === 3){
            for(var i =0; i< vacation_day.length; i++){
                if(emp.years >= 7){
                    if(vacation_day[i].condition === 3){
                        if(vacation_day[i].day_amount <= emp.vacation_ab && dep !== '15'){
                            alert("ไม่สามารถลาพักร้อนเพิ่มได้ กรุณาติดต่อ HR")
                            break;
                        }else{
                            dispatch(saveAbsendThunk({'absend':absend, 'emp_id': emp.id, 'department':dep, 'username': username}));
                            break;
                        }
                    }
                }else if(emp.years >= 4 && emp.years < 7){
                    if(vacation_day[i].condition === 2){
                        if(vacation_day[i].day_amount <= emp.vacation_ab && dep !== '15'){
                            alert("ไม่สามารถลาพักร้อนเพิ่มได้ กรุณาติดต่อ HR")
                            break;
                        }else{
                            dispatch(saveAbsendThunk({'absend':absend, 'emp_id': emp.id, 'department':dep, 'username': username}));
                            break;
                        }
                    }
                }else if(emp.years == 1 && emp.years < 4){
                    if(parseInt(Moment(emp.std).format('MM')) > 4){
                        if(parseInt(Moment(emp.std).format('MM')) > 8){
                            if(vacation_day[i].condition === 5){
                                if(vacation_day[i].day_amount <= emp.vacation_ab && dep !== '15'){
                                    alert("ไม่สามารถลาพักร้อนเพิ่มได้ กรุณาติดต่อ HR")
                                    break;
                                }else{
                                    dispatch(saveAbsendThunk({'absend':absend, 'emp_id': emp.id, 'department':dep, 'username': username}));
                                    break;
                                }
                            }
                        }else{
                            if(vacation_day[i].condition === 4){
                                if(vacation_day[i].day_amount <= emp.vacation_ab && dep !== '15'){
                                    alert("ไม่สามารถลาพักร้อนเพิ่มได้ กรุณาติดต่อ HR")
                                    break;
                                }else{
                                    dispatch(saveAbsendThunk({'absend':absend, 'emp_id': emp.id, 'department':dep, 'username': username}));
                                    break;
                                }
                            }
                        }
                    }else{
                        if(vacation_day[i].condition === 1){
                            if(vacation_day[i].day_amount <= emp.vacation_ab && dep !== '15'){
                                alert("ไม่สามารถลาพักร้อนเพิ่มได้ กรุณาติดต่อ HR")
                                break;
                            }else{
                                dispatch(saveAbsendThunk({'absend':absend, 'emp_id': emp.id, 'department':dep, 'username': username}));
                                break;
                            }
                        }
                    }
                }else{
                    if(vacation_day[i].condition === 1){
                        if(vacation_day[i].day_amount <= emp.vacation_ab && dep !== '15'){
                            alert("ไม่สามารถลาพักร้อนเพิ่มได้ กรุณาติดต่อ HR")
                            break;
                        }else{
                            dispatch(saveAbsendThunk({'absend':absend, 'emp_id': emp.id, 'department':dep, 'username': username}));
                            break;
                        }
                    }
                }
            }
        }else if(absend.absend_type_id === 2){
            if(emp.affair_ab >= 3){
                alert("ไม่สามารถลากิจเพิ่มได้ กรุณาติดต่อ HR");
            }else{
                dispatch(saveAbsendThunk({'absend':absend, 'emp_id': emp.id, 'department':dep, 'username': username}));
            }
        }else if(absend.absend_type_id === 1){
            if(emp.sick_ab >= 30){
                alert("ไม่สามารถลาป่วยเพิ่มได้ กรุณาติดต่อ HR");
            }else{
                dispatch(saveAbsendThunk({'absend':absend, 'emp_id': emp.id, 'department':dep, 'username': username}));
            }
        }else{
            dispatch(saveAbsendThunk({'absend':absend, 'emp_id': emp.id, 'department':dep, 'username': username}));
        }
    } 
    
  }

  const back = (e) =>{
    dispatch(GetEmpByCode(search));
    setSearchState(0)
    window.location.replace('#/admin_dep_employee')
  }
  //alert(JSON.stringify(department))
  return (
    
    <body class="page-top">
        
        <div id="wrapper">
            <Sidebar/>
            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    <Topbar/>
                    <div class="container-fluid">
                        {/* <!-- Main Content --> */}
                        <h1 class="mt-4">{menu}</h1>
                        <ol class="breadcrumb mb-4">
                                <li class="breadcrumb-item active">Add Absend</li>
                        </ol>
                        <hr/>
                        <div id="content">
                            {/* <!-- Topbar --> */}
                                {/* <!-- End of Topbar --> */}
                            <div className="container-fluid">
                                {/* <!-- Page Heading --> */}
                                <div className="col-lg-12 form-group">
                                    <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>Employee ID : </b></label>
                                        <div class="col-lg-2">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={search}
                                                onChange={e => setSearch(e.target.value)}
                                                readOnly
                                                autoFocus/>
                                        </div>
                                        <div class="col-lg-2">  
                                            {/*<button className='btn btn-primary' onClick={searchEmp}>SEARCH</button>*/}
                                        </div> 
                                    </div>
                                    <hr/>
                                </div>
                                {/* <!-- Content Row --> */}
                                {emp.name === 'error'?
                                <nav aria-label="breadcrumb">
                                  <ol class="breadcrumb" style={{background:'LightCoral'}}>
                                    <li class="breadcrumb-item active" aria-current="page" style={{color:'white'}}>ไม่พบ รหัสพนักงานนี้</li>
                                  </ol>
                                </nav>
                                :
                                search_state === 1 ?
                                <div className="col-lg-12 form-group">
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>Employee ID : </b></label>
                                        <div class="col-lg-2 mt-2">
                                            {emp.employee_id}
                                        </div>
                                        <div className="col-lg-6 form-group">
                                        {va_state === 'loading' ?
                                            <h2>Loading...</h2>
                                        :va_state === 'succeeded' ?
                                        <div className="table-responsive"> 
                                            <table className="table table-bordered">
                                                {vacation_day?.map((pd,index) =>
                                                    <tbody>
                                                    {emp.years >= 7 ?
                                                        pd.condition === 3 ?
                                                        <tr>
                                                            <td style={{backgroundColor:'lightblue'}}>
                                                                    วันหยุดพักร้อน
                                                            </td>
                                                            <td style={{backgroundColor:'lightblue'}}>{emp.vacation_ab} / {pd.day_amount} วัน</td> 
                                                            <td style={{backgroundColor:'lightsalmon'}}>วันลาป่วย</td> 
                                                            <td style={{backgroundColor:'lightsalmon'}}>{emp.sick_ab} / 30 วัน</td> 
                                                            <td style={{backgroundColor:'lightgreen'}}>วันลากิจ</td> 
                                                            <td style={{backgroundColor:'lightgreen'}}>{emp.affair_ab} / 3 วัน</td> 
                                                        </tr>
                                                        :null
                                                    :emp.years >= 4 && emp.years < 7 ?
                                                        pd.condition === 2 ?
                                                        <tr>
                                                            <td style={{backgroundColor:'lightblue'}}>
                                                                    วันหยุดพักร้อน
                                                            </td>
                                                            <td style={{backgroundColor:'lightblue'}}>{emp.vacation_ab} / {pd.day_amount} วัน</td> 
                                                            <td style={{backgroundColor:'lightsalmon'}}>วันลาป่วย</td> 
                                                            <td style={{backgroundColor:'lightsalmon'}}>{emp.sick_ab} / 30 วัน</td> 
                                                            <td style={{backgroundColor:'lightgreen'}}>วันลากิจ</td> 
                                                            <td style={{backgroundColor:'lightgreen'}}>{emp.affair_ab} / 3 วัน</td> 
                                                        </tr>
                                                        :null
                                                        :emp.years == 1 && emp.years < 4 ?
                                                        parseInt(Moment(emp.std).format('MM')) > 4 ?
                                                            parseInt(Moment(emp.std).format('MM')) > 8 ?
                                                                pd.condition === 5 ?
                                                                <tr>
                                                                    <td style={{backgroundColor:'lightblue'}}>
                                                                        วันหยุดพักร้อน
                                                                    </td>
                                                                    <td style={{backgroundColor:'lightblue'}}>{emp.vacation_ab} / {pd.day_amount} วัน</td> 
                                                                    <td style={{backgroundColor:'lightsalmon'}}>วันลาป่วย</td> 
                                                                    <td style={{backgroundColor:'lightsalmon'}}>{emp.sick_ab} / 30 วัน</td> 
                                                                    <td style={{backgroundColor:'lightgreen'}}>วันลากิจ</td> 
                                                                    <td style={{backgroundColor:'lightgreen'}}>{emp.affair_ab} / 3 วัน</td> 
                                                                </tr>
                                                                :null
                                                            :
                                                                pd.condition === 4 ?
                                                                <tr>
                                                                    <td style={{backgroundColor:'lightblue'}}>
                                                                        วันหยุดพักร้อน
                                                                    </td>
                                                                    <td style={{backgroundColor:'lightblue'}}>{emp.vacation_ab} / {pd.day_amount} วัน</td> 
                                                                    <td style={{backgroundColor:'lightsalmon'}}>วันลาป่วย</td> 
                                                                    <td style={{backgroundColor:'lightsalmon'}}>{emp.sick_ab} / 30 วัน</td> 
                                                                    <td style={{backgroundColor:'lightgreen'}}>วันลากิจ</td> 
                                                                    <td style={{backgroundColor:'lightgreen'}}>{emp.affair_ab} / 3 วัน</td> 
                                                                </tr>
                                                                :null
                                                        :
                                                            pd.condition === 1 ?
                                                            <tr>
                                                                <td style={{backgroundColor:'lightblue'}}>
                                                                    วันหยุดพักร้อน
                                                                </td>
                                                                <td style={{backgroundColor:'lightblue'}}>{emp.vacation_ab} / {pd.day_amount} วัน</td> 
                                                                <td style={{backgroundColor:'lightsalmon'}}>วันลาป่วย</td> 
                                                                <td style={{backgroundColor:'lightsalmon'}}>{emp.sick_ab} / 30 วัน</td> 
                                                                <td style={{backgroundColor:'lightgreen'}}>วันลากิจ</td> 
                                                                <td style={{backgroundColor:'lightgreen'}}>{emp.affair_ab} / 3 วัน</td> 
                                                            </tr>
                                                            :
                                                            null
                                                        :emp.years > 1 && emp.years < 4 ?
                                                            pd.condition === 1 ?
                                                            <tr>
                                                                <td style={{backgroundColor:'lightblue'}}>
                                                                วันหยุดพักร้อน
                                                                </td>
                                                                <td style={{backgroundColor:'lightblue'}}>{emp.vacation_ab} / {pd.day_amount} วัน</td> 
                                                                <td style={{backgroundColor:'lightsalmon'}}>วันลาป่วย</td> 
                                                                <td style={{backgroundColor:'lightsalmon'}}>{emp.sick_ab} / 30 วัน</td> 
                                                                <td style={{backgroundColor:'lightgreen'}}>วันลากิจ</td> 
                                                                <td style={{backgroundColor:'lightgreen'}}>{emp.affair_ab} / 3 วัน</td> 
                                                            </tr>
                                                            :
                                                            null
                                                    :null}
                                                  </tbody>   
                                                )}
                                            </table>
                                        </div>
                                        :
                                        <p>{error}</p>}      
                                    </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>Employee Name : </b></label>
                                        <div class="col-lg-4 mt-2">
                                            {emp.prefix_name}  {emp.name} {emp.last_name}
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>Nick Name : </b></label>
                                        <div class="col-lg-2 mt-2">
                                            {emp.nickname}
                                        </div>
                                        <label class="col-lg-2 col-form-label"><b>Identity ID : </b></label>
                                        <div class="col-lg-2 mt-2">
                                            {emp.identity_id}
                                        </div>  
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>Nationality : </b></label>
                                        <div class="col-lg-2 mt-2">
                                            {emp.nationality_name}
                                        </div>
                                        <label class="col-lg-2 col-form-label"><b>Department : </b></label>
                                        <div class="col-lg-2 mt-2">
                                            {emp.department_name}
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>Position : </b></label>
                                        <div class="col-lg-2 mt-2">
                                            {emp.position_name}
                                        </div>
                                        
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>Start Work : </b></label>
                                        <div class="col-lg-2 mt-2">
                                        {Moment(emp.std).format('DD-MM-YYYY')} (วัน-เดือน-ปี)
                                        </div>
                                        <div class="col-lg-2 mt-2">
                                          อายุงาน: {emp.years} ปี {emp.month} เดือน {emp.days} วัน
                                        </div>
                                    </div>
                                    <hr/>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label">START DATE :</label>
                                        <div class="col-lg-2">
                                          {dep === 15 ?
                                          <input type="date" 
                                                class="form-control" 
                                                name="search" 
                                                value={Moment(absend.start_date).format('yyyy-MM-DD')}
                                                onChange={e => dispatch(setStartDateHR(e.target.value))}
                                            />
                                          :
                                          <input type="date" 
                                                class="form-control" 
                                                name="search" 
                                                value={Moment(absend.start_date).format('yyyy-MM-DD')}
                                                onChange={e => dispatch(setStartDate(e.target.value))}
                                            />
                                          }
                                        </div>
                                        <label class="col-lg-2 col-form-label">END DATE :</label>
                                        <div class="col-lg-2">
                                          <input type="date" 
                                                class="form-control" 
                                                name="search" 
                                                value={Moment(absend.end_date).format('yyyy-MM-DD')}
                                                onChange={e => dispatch(setEndDate(e.target.value))}
                                                />
                                        </div>
                                        <div class="col-lg-3">  
                                           
                                        </div> 
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label">WORK DATE :</label>
                                        <div class="col-lg-2">
                                          <input type="date" 
                                                class="form-control" 
                                                name="search" 
                                                value={Moment(absend.work_date).format('yyyy-MM-DD')}
                                                onChange={e => dispatch(setWorkDate(e.target.value))}
                                                />
                                        </div>
                                        <label class="col-lg-2 col-form-label">DATE AMOUNT :</label>
                                        <div class="col-lg-2">
                                          <input type="number" 
                                                class="form-control" 
                                                name="search" 
                                                value={absend.date_amount}
                                                onChange={e => dispatch(setDateAmount(e.target.value))}
                                                />
                                        </div>วัน
                                        <div class="col-lg-3">  
                                           
                                        </div> 
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label">ABSEND TYPE :</label>
                                        <div class="col-lg-2">
                                          <Select 
                                                value = {absend_type.filter(obj=>obj.value === absend.absend_type_id)}
                                                onChange={setABT}
                                                labelKey='prefix'
                                                valueKey='id'
                                                options={absend_type.filter(obj=>obj.gen === emp.gender || obj.gen === 3 && obj.dep !== 15)}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                selectedOption={absend.absend_type_id}                
                                            /> 
                                        </div>
                                        <div class="col-lg-3">  
                                           
                                        </div> 
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label">MOTIVE :</label>
                                        <div class="col-lg-5">
                                          <textarea 
                                                class="form-control" 
                                                name="search" 
                                                value={absend.motive}
                                                onChange={e => dispatch(setMotive(e.target.value))}
                                                />
                                        </div>
                                        
                                        <div class="col-lg-3">  
                                            <button className='btn btn-primary' onClick={saveAbsend}>SAVE</button>&nbsp;
                                            <button className='btn btn-warning' onClick={back}>BACK</button>
                                        </div> 
                                    </div>               
                                </div>
                                :null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/* <!-- Sidebar --> */}
        </div>
    </body>
  )
}