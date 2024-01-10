import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Sidebar } from '../Navigation/Sidebar'
import Moment from 'moment';
import  Select  from 'react-select'
import { Topbar } from '../Navigation/Topbar'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GetAbsendEmpByEmpId, GetEmpById, GetExmEmpByEmpId, GetFileEmpByEmpId, GetOffenceEmpByEmpId, GetTrainEmpByEmpId, fetchGetEmpWorkDay, fetchGetGender, fetchGetNationality, fetchGetPrefix, getAbsendEmployeeById, getAllGender, getAllNationality, getAllPrefix, getEmp, getEmpError, getEmpState, getEmpleyeeById, getExmEmpByEmpId, getFileEmpleyeeById, getGenStatus, getInputState, getNaError, getNaStatus, getOffenceEmployeeById, getPreError, getPreStatus, getTrainEmpleyeeById, saveEmployeeThunk, setAddress, setBirthDate, setBloodGroup, setDepartment, setDistrict, setEmpName, setEmpState, setGender, setIdentityID, setLastName, setNationality, setNickName, setPosition, setPostCode, setPrefix, setReligion, setStd, setSubDepartment, setSubDistrict, setTel } from '../libs/employeeSlice';
import { fetchGetDep, getAllDep, getAllStatus, getRocketsError, getToken } from '../libs/departmentSlice';
import { fetchGetPos, getAllPos, getAllPosStatus } from '../libs/positionSlice';

import { fetchGetSubDep, getAllSubDep, getAllSubStatus } from '../libs/sub_departmentSlice';
import jwt_decode from "jwt-decode";

export function Employee_info() {
  const media = window.server + "/media/employee/"
  const location = useLocation();
  const menu = useSelector((state) => state.counter.menu)
  const dispatch = useDispatch()
  const emp = useSelector(getEmpleyeeById);
  const file_emp = useSelector(getFileEmpleyeeById)
  const absend_his = useSelector(getAbsendEmployeeById)
  const train_his = useSelector(getTrainEmpleyeeById)
  const exm_his = useSelector(getExmEmpByEmpId)
  const offence_his = useSelector(getOffenceEmployeeById)
  const dep = useSelector(getAllDep)
  const sub_dep = useSelector(getAllSubDep)
  const pos = useSelector(getAllPos)
  const national = useSelector(getAllNationality)
  const pre = useSelector(getAllPrefix)
  const national_status = useSelector(getNaStatus)
  const pre_status = useSelector(getPreStatus)
  const dep_status = useSelector(getAllStatus)
  const sub_dep_status = useSelector(getAllSubStatus)
  const pos_status = useSelector(getAllPosStatus)
  const empState = useSelector(getEmpState);
  const empError = useSelector(getEmpError)
  const inputState = useSelector(getInputState);
  const [tab_state, setTabState] =useState(0)
  const gender = useSelector(getAllGender)
  const gen_status = useSelector(getGenStatus)
  const emp_id = localStorage.getItem('emp_id')
  const token = localStorage.getItem('accessToken')
  const username = localStorage.getItem('username')
  
  //const [todoTitle, setTodoTitle] = useState('')
  let department = dep.map(function (pd) {
    return { value: pd.id, label: pd.name };
  }) 

  let gender_list = gender.map(function (pd) {
    return { value: pd.id, label: pd.name };
  }) 

  let sub_department = sub_dep.map(function (pd) {
    return { value: pd.id, label: pd.name };
  }) 

  let position = pos.map(function (pd) {
    return { value: pd.id, label: pd.name };
  }) 

  let nationality = national.map(function (pd) {
    return { value: pd.id, label: pd.name };
  }) 

  let prefix = pre.map(function (pd) {
    return { value: pd.id, label: pd.name };
  }) 
  
  React.useEffect(() => {
    
    if (sub_dep_status === 'idle') {
      dispatch(fetchGetSubDep());
    }
  }, [sub_dep_status, dispatch]);

  React.useEffect(() => {
    if (gen_status === 'idle') {
      dispatch(fetchGetGender());
    }
  }, [gen_status, dispatch]);


  React.useEffect(() => {
    if (dep_status === 'idle') {
      dispatch(fetchGetDep());
    }
  }, [dep_status, dispatch]);

  React.useEffect(() => {
    if (pos_status === 'idle') {
      dispatch(fetchGetPos());
    }
  }, [pos_status, dispatch]);

  React.useEffect(() => {
    if (national_status === 'idle') {
      dispatch(fetchGetNationality());
    }
  }, [national_status, dispatch]);

  React.useEffect(() => {
    if (pre_status === 'idle') {
      dispatch(fetchGetPrefix());
    }
  }, [pre_status, dispatch]);

  React.useEffect(() => {
        //alert(JSON.stringify(location.state.id))
      
      if(token === null){
          dispatch(getToken())
      }else{
          const exp = jwt_decode(token)
      }
      if(empError === 'Request failed with status code 401'){
          var exp = jwt_decode(token)
          var expirationTime = (exp.exp * 1000) - 60000   
          if (Date.now() >= expirationTime) {
              localStorage.setItem('accessToken', null);
              window.location.replace('/')
          }else if(token === null){
              window.location.replace('/')
          }else{
              window.location.reload()
          }
      }
        dispatch(GetEmpById(emp_id))
        dispatch(GetFileEmpByEmpId(emp_id))
        dispatch(GetAbsendEmpByEmpId(emp_id))
        dispatch(GetTrainEmpByEmpId(emp_id))
        dispatch(GetExmEmpByEmpId(emp_id))
        dispatch(GetOffenceEmpByEmpId(emp_id))
  }, [empState, dispatch, inputState]);

  const setTabSwap =  value => () =>{
    setTabState(value)  
  }

  const setGen = selectedOption => {
    dispatch(setGender(selectedOption.value))
  }

  const saveEmployee = (e) => {
    dispatch(saveEmployeeThunk({'emp':emp, 'username': username}));
  }


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
                            <li class="breadcrumb-item active">Employee Data</li>
                        </ol>
                        <hr/>
                        <div id="content">
                            {/* <!-- Topbar --> */}
                                {/* <!-- End of Topbar --> */}
                            <div className="container-fluid">
                                {/* <!-- Page Heading --> */}
                                <div className="col-lg-12 form-group">  
                                    <div class="form-group row">
                                        <div class="col-lg-2">
                                            <a href={media + emp.image_path } download={media + emp.image_path }><img src={media + emp.image_path } width={250} height={300} ></img></a>
                                        </div>
                                       
                                        <div className='col-lg-2'>
                                       
                                        </div>
                                    </div>
                                </div>
                                <ul class="nav nav-tabs">
                                    <li class="nav-item">
                                      {tab_state === 0 ?
                                        <a class="nav-link active" aria-current="page" >Information</a>
                                      :
                                        <a class="nav-link" onClick={setTabSwap(0)}>Information</a>
                                      }
                                        
                                    </li>
                                    <li class="nav-item">
                                      {tab_state === 1 ?
                                        <a class="nav-link active" aria-current="page" >File List</a>
                                      :
                                        <a class="nav-link" onClick={setTabSwap(1)}>File List</a>
                                      }
                                    </li>
                                    <li class="nav-item">
                                      {tab_state === 2 ?
                                        <a class="nav-link active" aria-current="page" >Absend History</a>
                                      :
                                        <a class="nav-link" onClick={setTabSwap(2)}>Absend History</a>
                                      }
                                    </li>
                                    <li class="nav-item">
                                      {tab_state === 3 ?
                                        <a class="nav-link active" aria-current="page" >ประวัติการฝึกอบรม</a>
                                      :
                                        <a class="nav-link" onClick={setTabSwap(3)}>ประวัติการฝึกอบรม</a>
                                      }
                                    </li>
                                    <li class="nav-item">
                                      {tab_state === 4 ?
                                        <a class="nav-link active" aria-current="page" >ประวัติการตรวจสารเสพติด</a>
                                      :
                                        <a class="nav-link" onClick={setTabSwap(4)}>ประวัติการตรวจสารเสพติด</a>
                                      }
                                    </li>
                                    <li class="nav-item">
                                      {tab_state === 5 ?
                                        <a class="nav-link active" aria-current="page" >ประวัติการกระทำผิด</a>
                                      :
                                        <a class="nav-link" onClick={setTabSwap(5)}>ประวัติการกระทำผิด</a>
                                      }
                                    </li>
                                </ul>
                                <br/>
                                {tab_state === 0 ?
                                <div className="col-lg-12 form-group">
                                    <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>Employee ID : </b></label>
                                        <div class="col-lg-6">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={emp.employee_id}
                                                onChange={e => dispatch(setNickName(e.target.value))}
                                                readOnly/>
                                        </div>
                                        
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>Name : </b></label>
                                        <div class="col-lg-1">
                                            <Select 
                                                value = {prefix.filter(obj=>obj.value === emp.prefix)}
                                                labelKey='prefix'
                                                valueKey='id'
                                                options={prefix}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                selectedOption={emp.prefix}
                                                isDisabled                
                                            /> 
                                        </div>
                                        <div class="col-lg-3">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={emp.name}
                                                onChange={e => dispatch(setEmpName(e.target.value))}
                                                readOnly
                                                autoFocus/>
                                        </div>
                                        <div class="col-lg-2">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={emp.last_name}
                                                onChange={e => dispatch(setLastName(e.target.value))}
                                                readOnly
                                                autoFocus/>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>Nick Name : </b></label>
                                        <div class="col-lg-2">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={emp.nickname}
                                                onChange={e => dispatch(setNickName(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        <label class="col-lg-1 col-form-label"><b>Birth Date : </b></label>
                                        <div class="col-lg-3">
                                            <input type="date" 
                                                class="form-control" 
                                                name="search" 
                                                value={Moment(emp.birth_date).format('yyyy-MM-DD')}
                                                onChange={e => dispatch(setBirthDate(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        <div class="col-lg-4">
                                          อายุ: {emp.birth_years} ปี {emp.birth_month} เดือน {emp.birth_days} วัน
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>Address : </b></label>
                                        <div class="col-lg-8">
                                            <textarea
                                                class="form-control" 
                                                name="search" 
                                                value={emp.address}
                                                onChange={e => dispatch(setAddress(e.target.value))}
                                                autoFocus/>
                                        </div>

                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>District : </b></label>
                                        <div class="col-lg-2">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={emp.district}
                                                onChange={e => dispatch(setDistrict(e.target.value))}
                                                autoFocus/>
                                        </div>

                                        <label class="col-lg-1 col-form-label"><b>Sub District : </b></label>
                                        <div class="col-lg-2">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={emp.sub_district}
                                                onChange={e => dispatch(setSubDistrict(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        <label class="col-lg-1 col-form-label"><b>Post Code : </b></label>
                                        <div class="col-lg-2">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={emp.post_code}
                                                onChange={e => dispatch(setPostCode(e.target.value))}
                                                autoFocus/>
                                        </div>
                                      </div>
                                      <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>Gender : </b></label>
                                        <div class="col-lg-2">
                                          <Select 
                                                value = {gender_list.filter(obj=>obj.value === emp.gender)}
                                                onChange={setGen}
                                                labelKey='gender_list'
                                                valueKey='id'
                                                options={gender_list}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                selectedOption={emp.gender}                 
                                            /> 
                                        </div>
                                        <label class="col-lg-1 col-form-label"><b>Blood Group : </b></label>
                                        <div class="col-lg-2">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={emp.blood_group}
                                                onChange={e => dispatch(setBloodGroup(e.target.value))}     
                                                autoFocus/>
                                        </div>
                                        <label class="col-lg-1 col-form-label"><b>Religion : </b></label>
                                        <div class="col-lg-2">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={emp.religion}
                                                onChange={e => dispatch(setReligion(e.target.value))}    
                                                autoFocus/>
                                        </div>
                                    </div>
                                      <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>Identity ID : </b></label>
                                        <div class="col-lg-2">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={emp.identity_id}
                                                onChange={e => dispatch(setIdentityID(e.target.value))}
                                                readOnly
                                                autoFocus/>
                                        </div>
                                        <label class="col-lg-1 col-form-label"><b>Tel : </b></label>
                                        <div class="col-lg-2">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={emp.tel}
                                                onChange={e => dispatch(setTel(e.target.value))}
                                                autoFocus/>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>Nationality : </b></label>
                                        <div class="col-lg-3">
                                            <Select 
                                                value = {nationality.filter(obj=>obj.value === emp.nationality)}
                                                labelKey='nationality'
                                                valueKey='id'
                                                options={nationality}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                selectedOption={emp.nationality}     
                                                isDisabled           
                                            /> 
                                        </div>
                                        <label class="col-lg-2 col-form-label"><b>Department : </b></label>
                                        <div class="col-lg-3">
                                            <Select 
                                                value = {department.filter(obj=>obj.value === emp.department)}
                                                labelKey='department'
                                                valueKey='id'
                                                options={department}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                isDisabled
                                                selectedOption={emp.department}     
                                                           
                                            /> 
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>Position : </b></label>
                                        <div class="col-lg-3">
                                            <Select 
                                                value = {position.filter(obj=>obj.value === emp.position)}
                                                labelKey='position'
                                                valueKey='id'
                                                options={position}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                selectedOption={emp.position}   
                                                isDisabled             
                                            /> 
                                        </div>
                                        <label class="col-lg-2 col-form-label"><b>Sub Department : </b></label>
                                        <div class="col-lg-3">
                                            <Select 
                                                value = {sub_department.filter(obj=>obj.value === emp.sub_department)}
                                                labelKey='position'
                                                valueKey='id'
                                                options={sub_department}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                selectedOption={emp.sub_department} 
                                                isDisabled               
                                            /> 
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>Start Work : </b></label>
                                        <div class="col-lg-2 mt-2">
                                          {Moment(emp.std).format('DD-MM-YYYY')} (วัน-เดือน-ปี)
                                        </div>
                                        <div class="col-lg-4 mt-2">
                                          อายุงาน: {emp.years} ปี {emp.month} เดือน {emp.days} วัน
                                        </div>
                                    </div>
                                    <hr/>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"> </label>
                                        <div class="col-lg-5">
                                           
                                        </div>
                                        <div class="col-lg-3">  
                                            <button className='btn btn-primary' onClick={saveEmployee}>SAVE</button>
                                        </div> 
                                    </div>  
                                </div>
                                :tab_state === 1 ?
                                <div className="table-responsive">
                                  <table className="table table-bordered">
                                      <thead class='thead-dark'>
                                          <tr>
                                              <th>#</th>
                                              <th>Description</th>
                                              <th>File Name</th>
                                              
                                          </tr>  
                                      </thead>
                                      {file_emp?.map((pd,index) =>
                                          <tbody>
                                              <td>{pd.id}</td>
                                              <td>{pd.description}</td>
                                              <td>{pd.file_name}</td>
                                              
                                          </tbody>
                                      )}
                                  </table>
                              </div>
                              :tab_state === 2 ?
                              <div className="table-responsive">
                                <table className="table table-bordered">
                                  <thead class='thead-dark'>
                                    <tr>
                                        <th>#</th>
                                        <th>ประเภทการลา</th>
                                        <th>สาเหตุ</th>
                                        <th>จำนวนวัน</th>
                                        <th>วันที่เริ่มลา</th>
                                        <th>วันที่สิ้นสุดการลา</th>
                                        <th>สถานะ</th>
                                        <th>Action</th>
                                    </tr>  
                                  </thead>
                                  {absend_his?.map((pd,index) =>
                                  <tbody>
                                        <td>{index+1}</td>
                                        <td>{pd.absend_type}</td>
                                        <td>{pd.motive}</td>
                                        <td>{pd.date_amount}</td>
                                        <td>{Moment(pd.start_date).format('DD-MM-yyyy')}</td>
                                        <td>{Moment(pd.end_date).format('DD-MM-yyyy')}</td>
                                        <td>{pd.absend_status_name}</td>
                                        <td></td>
                                  </tbody>
                                      )}
                                </table>
                              </div>
                              :tab_state === 3 ?
                                <div className="table-responsive">
                                <table className="table table-bordered">
                                  <thead class='thead-dark'>
                                    <tr>
                                        <th>#</th>
                                        <th>ประเภท</th>
                                        <th>หัวข้อการฝึกอบรม</th>
                                        <th>สถานที่</th>
                                        <th>วันที่ฝึกอบรม</th>
                                        <th>วิทยากร</th>
                                        <th>ผลการประเมิน</th>
                                        <th>หมายเหตุ</th>
                                    </tr>  
                                  </thead>
                                  {train_his?.map((pd,index) =>
                                  <tbody>
                                        <td>{index+1}</td>
                                        <td>{pd.training_group}</td>
                                        <td>{pd.training_title}</td>
                                        <td>{pd.place}</td>
                                        <td>{Moment(pd.start_datetime).format('DD-MM-yyyy')}</td>
                                        <td>{pd.teacher}</td>
                                        <td>{pd.results === true ?
                                              <i class="fa fa-check" style={{color:'green'}} aria-hidden="true"></i>
                                            :pd.results === false ?
                                              <i class="fa fa-times" style={{color:'red'}} aria-hidden="true"></i>
                                            :null}
                                        </td>
                                        <td>{pd.remark}</td>
                                  </tbody>
                                      )}
                                </table>
                              </div>
                              :tab_state === 4 ?
                              <div className="table-responsive">
                                <table className="table table-bordered">
                                  <thead class='thead-dark'>
                                    <tr>
                                        <th>#</th>
                                        <th>ประเภทการตรวจ</th>
                                        <th>หัวข้อการตรวจ</th>
                                        <th>สถานที่</th>
                                        <th>วันที่ตรวจ</th>
                                        <th>ผู้ตรวจ</th>
                                        <th>ผลการตรวจ</th>
                                        <th>หมายเหตุ</th>
                                    </tr>  
                                  </thead>
                                  {exm_his?.map((pd,index) =>
                                  <tbody>
                                        <td>{index+1}</td>
                                        <td>{pd.examination_group}</td>
                                        <td>{pd.examination_title}</td>
                                        <td>{pd.place}</td>
                                        <td>{Moment(pd.examination_date).format('DD-MM-yyyy')}</td>
                                        <td>{pd.inspector}</td>
                                        <td>{pd.results === true ?
                                              <i class="fa fa-check" style={{color:'green'}} aria-hidden="true"></i>
                                            :pd.results === false ?
                                              <i class="fa fa-times" style={{color:'red'}} aria-hidden="true"></i>
                                            :null}
                                        </td>
                                        <td>{pd.remark}</td>
                                  </tbody>
                                      )}
                                </table>
                              </div>
                              :
                              <div className="table-responsive">
                                <table className="table table-bordered">
                                  <thead class='thead-dark'>
                                    <tr>
                                        <th>#</th>
                                        <th>วัน-เดือน-ปี</th>
                                        <th>หัวข้อการกระทำผิด</th>
                                        <th>สถานที่</th>
                                        <th>รายละเอียดการกระทำผิด</th>
                                        <th>ผลการลงโทษ</th>
                                        <th>ผู้บันทึก</th>
                                        <th>หมายเหตุ</th>
                                    </tr>  
                                  </thead>
                                  {offence_his?.map((pd,index) =>
                                  <tbody>
                                        <td>{index+1}</td>
                                        <td>{Moment(pd.offence_date).format('DD-MM-yyyy')}</td>
                                        <td>{pd.offence_title}</td>
                                        <td>{pd.place}</td>
                                        <td>{pd.offence_detail}</td>
                                        <td>{pd.offence_results}</td>
                                        <td>{pd.create_user}</td>
                                        <td>{pd.remark}</td>
                                  </tbody>
                                      )}
                                </table>
                              </div>
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