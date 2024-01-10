import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Sidebar } from '../Navigation/Sidebar'
import ReactPaginate from 'react-paginate';
import  Select  from 'react-select'
import Moment from 'moment';
import { Topbar } from '../Navigation/Topbar'
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { GetEmpByCode, getEmpState, getEmpleyeeById, getEmployeeError, getSaveAbsState } from '../libs/employeeSlice';
import { fetchAllOffenceResult, fetchAllOffenceTitle, getAllOftResult, getAllOftResultState, getAllOftTitle, getAllOftTitleState, getOffence, getOffencebyId, saveOffenceThunk, setFireDate, setOffenceCreateUser, setOffenceDate, setOffenceDetail, setOffenceFurEnd, setOffenceFurStart, setOffencePlace, setOffenceRemark, setOffenceResult, setOffenceResultID, setOffenceTitle } from '../libs/examinationSlice';

var firstload = true
export function Add_Offence() {
  const history = useNavigate();
  const location = useLocation();
  const menu = useSelector((state) => state.counter.menu)
  const dispatch = useDispatch()
  const emp = useSelector(getEmpleyeeById);
  const empState = useSelector(getEmpState);
  const saveAbsState = useSelector(getSaveAbsState)
  const error = useSelector(getEmployeeError);
  const offence = useSelector(getOffencebyId)
  const [search, setSearch] = useState('');
  const [showLoader, setShowLoader] = useState(false)
  const [search_state, setSearchState] = useState(0);
  const all_oft_status = useSelector(getAllOftTitleState)
  const oft_title = useSelector(getAllOftTitle)
  const oft_result = useSelector(getAllOftResult)
  const oft_result_status = useSelector(getAllOftResultState)
  const date = Date.now()
  //const [todoTitle, setTodoTitle] = useState('')

  let all_oft = oft_title.map(function (pd) {
    return { value: pd.id, label: pd.name };
  }) 

  let offence_result = oft_result.map(function (pd) {
    return { value: pd.id, label: pd.name };
  }) 

  React.useEffect(() => {
    if (all_oft_status === 'idle') {
      dispatch(fetchAllOffenceTitle());
    }
  }, [all_oft_status, dispatch]);

  React.useEffect(() => {
    if (oft_result_status === 'idle') {
      dispatch(fetchAllOffenceResult());
    }
  }, [oft_result_status, dispatch]);

  const searchEmp = (e) => {
    dispatch(GetEmpByCode(search));
    dispatch(getOffence())
    setSearchState(1)
  }

  const setOFT = selectedOption => {
    dispatch(setOffenceTitle(selectedOption.value))
  }
  const setOFR = selectedOption => {
    dispatch(setOffenceResultID(selectedOption.value))
  }
  const saveOffence = (e) => {
    dispatch(saveOffenceThunk({'offence':offence, 'emp_id': emp.id}));
    alert("บันทึกเรียบร้อย")
    window.location.replace('#/employee')
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
                            <li class="breadcrumb-item active">บันทึกการกระทำผิด</li>
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
                                                autoFocus/>
                                        </div>
                                        <div class="col-lg-2">  
                                            <button className='btn btn-primary' onClick={searchEmp}>SEARCH</button>
                                        </div> 
                                    </div>
                                    <hr/>
                                </div>
                                {search_state === 1 ?
                                <div className="col-lg-12 form-group">
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>ชื่อ นามสกุล : </b></label>
                                        <div class="col-lg-4 mt-2">
                                            {emp.prefix_name}  {emp.name} {emp.last_name}
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>ชื่อเล่น : </b></label>
                                        <div class="col-lg-2 mt-2">
                                            {emp.nickname}
                                        </div>
                                        <label class="col-lg-2 col-form-label"><b>รหัสบัตรประชาชน : </b></label>
                                        <div class="col-lg-2 mt-2">
                                            {emp.identity_id}
                                        </div>  
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>ประเภทพนักงาน : </b></label>
                                        <div class="col-lg-2 mt-2">
                                            {emp.nationality_name}
                                        </div>
                                        <label class="col-lg-2 col-form-label"><b>แผนก : </b></label>
                                        <div class="col-lg-2 mt-2">
                                            {emp.department_name}
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>ตำแหน่ง : </b></label>
                                        <div class="col-lg-2 mt-2">
                                            {emp.position_name}
                                        </div>
                                        
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>วันที่เข้าทำงาน : </b></label>
                                        <div class="col-lg-2 mt-2">
                                            {Moment(emp.std).format('DD-MM-YYYY')} (วัน-เดือน-ปี)
                                        </div>
                                        <div class="col-lg-2 mt-2">
                                          อายุงาน: {emp.years} ปี {emp.month} เดือน {emp.days} วัน
                                        </div>
                                    </div>
                                    <hr/>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label">หัวข้อการกระทำผิด :</label>
                                        <div class="col-lg-4">
                                            <Select 
                                                value = {all_oft.filter(obj=>obj.value === offence.offence_title_id)}
                                                onChange={setOFT}
                                                labelKey='gender_list'
                                                valueKey='id'
                                                options={all_oft}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                selectedOption={emp.offence_title_id}                 
                                            /> 
                                        </div>
                                        
                                        <div class="col-lg-3">  
                                           
                                        </div> 
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label">สถานที่ :</label>
                                        <div class="col-lg-4">
                                          <input type='text' 
                                                class="form-control" 
                                                name="search" 
                                                value={offence.place}
                                                onChange={e => dispatch(setOffencePlace(e.target.value))}
                                            />
                                        </div>
                                        
                                        <div class="col-lg-3">  
                                           
                                        </div> 
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label">วันที่กระทำผิด :</label>
                                        <div class="col-lg-4">
                                          <input type="date" 
                                                class="form-control" 
                                                name="search" 
                                                value={Moment(offence.offence_date).format('yyyy-MM-DD')}
                                                onChange={e => dispatch(setOffenceDate(e.target.value))}
                                            />
                                        </div>
                                        
                                        <div class="col-lg-3">  
                                           
                                        </div> 
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label">รายละเอียดการกระทำผิด :</label>
                                        <div class="col-lg-4">
                                          <textarea 
                                                class="form-control" 
                                                name="search" 
                                                value={offence.offence_detail}
                                                onChange={e => dispatch(setOffenceDetail(e.target.value))}
                                            />
                                        </div>
                                        
                                        <div class="col-lg-3">  
                                           
                                        </div> 
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label">ผลการลงโทษ :</label>
                                        <div class="col-lg-4">
                                            <Select 
                                                value = {offence_result.filter(obj=>obj.value === offence.offence_result_id)}
                                                onChange={setOFR}
                                                labelKey='gender_list'
                                                valueKey='id'
                                                options={offence_result}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                selectedOption={emp.offence_result_id}                 
                                            /> 
                                        </div>
                                        
                                        <div class="col-lg-3">  
                                           
                                        </div> 
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label">รายละเอียดการลงโทษ :</label>
                                        {offence.offence_result_id === 4 ?
                                        <div class="col-lg-4">
                                            จำนวนวัน
                                            <input type='text' 
                                                class="form-control" 
                                                name="search" 
                                                value={offence.result_remark}
                                                onChange={e => dispatch(setOffenceResult(e.target.value))}
                                            />
                                            ตั้งแต่วันที่ :
                                            <input type='date' 
                                                class="form-control" 
                                                name="search" 
                                                value={offence.furlough_start}
                                                onChange={e => dispatch(setOffenceFurStart(e.target.value))}
                                            />
                                            ถึง :    
                                          <input type='date' 
                                                class="form-control" 
                                                name="search" 
                                                value={offence.furlough_end}
                                                onChange={e => dispatch(setOffenceFurEnd(e.target.value))}
                                            />
                                        </div>
                                        :offence.offence_result_id === 6 ?
                                            <div class="col-lg-4">
                                                รวมเป็นเงิน
                                                <input type='text' 
                                                    class="form-control" 
                                                    name="search" 
                                                    value={offence.result_remark}
                                                    onChange={e => dispatch(setOffenceResult(e.target.value))}
                                                />
                                                บาท
                                            </div>
                                        :offence.offence_result_id === 7 ?
                                            <div class="col-lg-4">
                                                ตั้งแต่วันที่
                                                <input type='date' 
                                                    class="form-control" 
                                                    name="search" 
                                                    value={offence.fire_date}
                                                    onChange={e => dispatch(setFireDate(e.target.value))}
                                                />
                                            </div>
                                        :null}
                                        <div class="col-lg-3">  
                                           
                                        </div> 
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label">ผู้บันทึก :</label>
                                        <div class="col-lg-2">
                                          <input type='text' 
                                                class="form-control" 
                                                name="search" 
                                                value={offence.create_user}
                                                onChange={e => dispatch(setOffenceCreateUser(e.target.value))}
                                            />
                                        </div>
                                        
                                        <div class="col-lg-3">  
                                           
                                        </div> 
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label">หมายเหตุ :</label>
                                        <div class="col-lg-4">
                                          <input type='text' 
                                                class="form-control" 
                                                name="search" 
                                                value={offence.remark}
                                                onChange={e => dispatch(setOffenceRemark(e.target.value))}
                                            />
                                        </div>
                                        
                                        <div class="col-lg-3">  
                                          <button className='btn btn-primary' onClick={saveOffence} loading={showLoader} disabled={showLoader}>
                                                {!showLoader ? 'SAVE' : 'Loading'}</button>&nbsp;
                                          
                                        </div> 
                                    </div>
                                </div>
                                :
                                null
                                }
                                {/* <!-- Content Row --> */}

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