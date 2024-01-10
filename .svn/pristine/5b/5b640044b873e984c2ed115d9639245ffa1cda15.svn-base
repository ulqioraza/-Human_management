import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import  Select  from 'react-select'
import { Sidebar } from '../Navigation/Sidebar'
import Moment from 'moment';
import { Topbar } from '../Navigation/Topbar'
import { fetchGetEmpNational, fetchGetEmpPro, fetchGetEmpWorkDay, getEmpNationError, getEmpNationStatus, getEmpProError, getEmpProStatus, getEmpWorkError, getEmpWorkStatus, getTodayAbsError, getTodayAbsStatus, selectAllEmpNation, selectAllEmpPro, selectAllEmpWork, selectAllTodayAbs, toDayAbsend, updateProbationThunk } from '../libs/employeeSlice';
import moment from 'moment';
import { fetchGetDep, getAllDep, getAllStatus, getToken } from '../libs/departmentSlice';
import jwt_decode from "jwt-decode";

export function Dashboard() {
  const menu = useSelector((state) => state.counter.menu)
  const emp_pro = useSelector(selectAllEmpPro)
  const emp_pro_state = useSelector(getEmpProStatus)
  const emp_pro_error = useSelector(getEmpProError)
  const emp_nation = useSelector(selectAllEmpNation)
  const emp_nation_state = useSelector(getEmpNationStatus)
  const emp_nation_error = useSelector(getEmpNationError)
  const emp_work = useSelector(selectAllEmpWork)
  const emp_work_state = useSelector(getEmpWorkStatus)
  const emp_work_error = useSelector(getEmpWorkError)
  const today_abs = useSelector(selectAllTodayAbs)
  const today_abs_state = useSelector(getTodayAbsStatus);
  const today_abs_error = useSelector(getTodayAbsError)
  const [show_emp_pro, setShowEmpPro] = useState(0)
  const [show_today_abs, setShowTodayAbs] = useState(0)
  const [show_emp_nation, setShowEmpNation] = useState(0)
  const [show_emp_work, setShowEmpWork] = useState(0)
  const dep_status = useSelector(getAllStatus)
  const dep = useSelector(getAllDep)
  const [depm, setDepm] = useState(99)
  const dispatch = useDispatch()
  const username = localStorage.getItem('username')
  const date = Date.now()
  const token = localStorage.getItem('accessToken')
  const pos_id = localStorage.getItem('position')
  const group = localStorage.getItem('group')
  const department = localStorage.getItem('dep')

  let department_list = dep.map(function (pd) {
    return { value: pd.id, label: pd.name };
  }) 


  useEffect(() => { 
    if(token === null){
        dispatch(getToken())
    }else{
        const exp = jwt_decode(token)
    }
    if(emp_pro_error === 'Request failed with status code 401'){
        var exp = jwt_decode(token)
        var expirationTime = (exp.exp * 1000) - 60000   
        if (Date.now() >= expirationTime) {
            localStorage.setItem('accessToken', null);
            window.location.replace('/human_management')
        }else if(token === null){
            window.location.replace('/human_management')
        }else{
            window.location.reload()
        }
    }
    if (emp_pro_state === 'idle') {
      
      dispatch(fetchGetEmpPro());
    }
  }, [emp_pro_state, dispatch]);

  React.useEffect(() => {
    dispatch(getToken())
    if (dep_status === 'idle') {
      dispatch(fetchGetDep());
    }
  }, [dep_status, dispatch]);

  useEffect(() => {
    if (today_abs_state === 'idle') {
      dispatch(toDayAbsend(depm));
    }
  }, [today_abs_state, dispatch, depm]);

  useEffect(() => {
    if (emp_nation_state === 'idle') {
      dispatch(fetchGetEmpNational());
    }
  }, [emp_nation_state, dispatch]);

  useEffect(() => {
    if (emp_work_state === 'idle') {
      dispatch(fetchGetEmpWorkDay());
    }
  }, [emp_work_state, dispatch]);


  const showEmpPro = () => {
    setShowEmpPro(1)
  }

  const closeEmpPro = () => {
    setShowEmpPro(0)
  }

  const showTAbs = () => {
    setShowTodayAbs(1)
  }

  const showEmpNa = () => {
    setShowEmpNation(1)
  }

  const closeEmpNa = () => {
    setShowEmpNation(0)
  }

  const showEmpWd = () => {
    setShowEmpWork(1)
  }

  const closeEmpWd = () => {
    setShowEmpWork(0)
  }
  
  const setDep = selectedOption => {
   setDepm(selectedOption.value)
  }
  const closeTAbs = () => {
    setShowTodayAbs(0)
  }

  const searchClick = (e) => {
    dispatch(toDayAbsend(depm));
  };
  const updatePro = value=> (e) => {
    if (window.confirm('ต้องการให้พนักงานคนนี้ ผ่านโปร ใช่ หรือ ไม่')) {
        dispatch(updateProbationThunk({'emp_id':value, 'username': username}));
        window.location.reload()
    }else{

    }
    
  }

  return (
    
    <body class="page-top">
        
        <div id="wrapper">
            <Sidebar/>
            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    <Topbar/>
                    <div class="container-fluid px-4">
                        {/* <!-- Main Content --> */}
                        <h1 class="mt-4">{menu}</h1>
                        <ol class="breadcrumb mb-4">
                                <li class="breadcrumb-item active">{menu}</li>
                        </ol>
                        <hr/>
                        <div id="content">
                            {/* <!-- Topbar --> */}
                                {/* <!-- End of Topbar --> */}
                            <div className="container-fluid">
                                    {/* <!-- Page Heading --> */}
                                {/* <!-- Content Row --> */}
                                <div className="col-lg-12 form-group">
                                <ol class="breadcrumb mb-4">    
                                    <li class="breadcrumb-item active" style={{color:'salmon'}}>
                                        ประจำวันที่ {Moment(date).format('DD-MM-yyyy')}
                                    </li>
                                </ol>
                                    <div className="form-group row">
                                      <div className="col-sm-12">
                                        <div class="card text-center">
                                            <div class="card-header">
                                                Notification
                                            </div>
                                            <div class="card-body">
                                                {/*<p class="card-text">
                                                    <a onClick={showEmpPro} class="btn btn-primary">จำนวน&nbsp;
                                                        {emp_pro.count?.map((c) =>
                                                        <span class="badge badge-danger badge-counter">{c.count}</span>
                                                        )}
                                                    &nbsp; คน {pos_id}
                                                   </a>
                                                </p>*/}
                                                <hr/>
                                                <ul class="list-group">
                                                    <li class="list-group-item">
                                                    <div className="col-lg-12 form-group">
                                                        <div className="form-group row">
                                                            <div className="col-lg-10" style={{textAlign:'left'}}>
                                                                พนักงานที่ยังไม่อนุมัติผ่านโปร
                                                            </div>
                                                            <div className="col-lg-2">
                                                                <a onClick={showEmpPro} >
                                                                    {emp_pro.count?.map((c) =>
                                                                    <span class="badge badge-danger badge-counter">{c.count}</span>
                                                                    )}
                                                                &nbsp; คน
                                                            </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {show_emp_pro === 1 ?
                                                    <div className="table-responsive"> 
                                                        <table className="table table-bordered">
                                                            <thead class='thead-dark'>
                                                                <tr>
                                                                    <th>Employee ID</th>
                                                                    <th>Name</th>
                                                                    <th>Department</th>
                                                                    <th>Position</th>
                                                                    <th>Day of Work</th>
                                                                    <th>Pass Probation</th>
                                                                </tr>  
                                                            </thead>
                                                            {emp_pro.employee?.map((em,index) =>
                                                                <tbody>
                                                                    <td>{em.employee_id}</td>
                                                                    <td>{em.name} {em.last_name}</td>
                                                                    <td>{em.department_name}</td>
                                                                    <td>{em.position_name}</td>
                                                                    <td>{em.days} วัน</td>
                                                                    <td>
                                                                        {group === 'Admin' || department === '15' ?
                                                                            <a style={{color: 'salmon'}} onClick={updatePro(em.id)} title='พนักงานผ่านโปร'>
                                                                                <i class="fa fa-reply" aria-hidden="true"></i>
                                                                            </a>
                                                                        :null}
                                                                    </td>
                                                                </tbody>
                                                            )}
                                                        </table>
                                                    </div>
                                                    :null}
                                                    {show_emp_pro === 1 ?  
                                                    <p class="card-text">
                                                        <a onClick={closeEmpPro} class="btn btn-warning">
                                                        Close
                                                        </a>
                                                    </p>
                                                    :null}
                                                    </li>
                                                    <li class="list-group-item">
                                                        <div className="col-lg-12 form-group">
                                                            <div className="form-group row">
                                                                <div className="col-lg-10" style={{textAlign:'left'}}>
                                                                    พนักงานที่แจ้งลาวันปัจจุบัน
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <a onClick={showTAbs}>
                                                                        {today_abs.ab_count?.map((c) =>
                                                                        <span class="badge badge-danger badge-counter">{c.count}</span>
                                                                        )}
                                                                    &nbsp;คน
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {show_today_abs === 1 ?
                                                        
                                                        <div className="table-responsive"> 
                                                        <div className="col-lg-12 form-group">
                                                            <div className="form-group row">
                                                                <div className="col-lg-2" style={{textAlign:'left'}}>
                                                                    แผนก
                                                                </div>
                                                                <div className="col-lg-2">
                                                                <Select 
                                                                            value = {department_list.filter(obj=>obj.value === depm)}
                                                                            onChange={setDep}
                                                                            labelKey='department'
                                                                            valueKey='id'
                                                                            options={department_list}
                                                                            menuPlacement="auto"
                                                                            menuPosition="fixed" 
                                                                            selectedOption={depm}                
                                                                        /> 
                                                                </div>
                                                                <div class="col-lg-3">  
                                                                    <button className='btn btn-primary' onClick={searchClick}>SEARCH</button>
                                                                </div> 
                                                            </div>
                                                        </div>
                                                            <table className="table table-bordered">
                                                                <thead class='thead-dark'>
                                                                    <tr>
                                                                        <th>Employee ID</th>
                                                                        <th>Name</th>
                                                                        <th>Employee Detail</th>
                                                                        <th>Absend Date</th>
                                                                        <th>Absend Details</th>
                                                                    </tr>  
                                                                </thead>
                                                                {today_abs.ab_today?.map((em,index) =>
                                                                    <tbody>
                                                                        <td>{em.employee_id}</td>
                                                                        <td>{em.name} {em.last_name}</td>
                                                                        <td>{em.position_name} แผนก {em.department_name}</td>
                                                                        <td>เริ่ม {moment(em.start_date).format('DD-MM-yyyy')} ถึง {moment(em.end_date).format('DD-MM-yyyy')}</td>
                                                                        <td>
                                                                            {em.absend_type} ({em.motive}) {em.date_amount} วัน
                                                                        </td>
                                                                    </tbody>
                                                                )}
                                                            </table>
                                                        </div>
                                                        :null}
                                                        {show_today_abs === 1 ?  
                                                        <p class="card-text">
                                                            <a onClick={closeTAbs} class="btn btn-warning">
                                                            Close
                                                            </a>
                                                        </p>
                                                        :null}                                                 
                                                    </li>
                                                    <li class="list-group-item">
                                                        <div className="col-lg-12 form-group">
                                                            <div className="form-group row">
                                                                <div className="col-lg-10" style={{textAlign:'left'}}>
                                                                    จำนวนพนักงานทั้งหมด
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <a onClick={showEmpNa}>
                                                                        {emp_nation.emp_count?.map((c) =>
                                                                        <span class="badge badge-danger badge-counter">{c.count}</span>
                                                                        )}
                                                                    &nbsp;คน
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {show_emp_nation === 1 ?
                                                        <div className="table-responsive"> 
                                                            <table className="table table-bordered">
                                                                <thead class='thead-dark'>
                                                                    <tr>
                                                                        <th>Employee Type</th>
                                                                        <th>จำนวน</th>
                                                                    </tr>  
                                                                </thead>
                                                                {emp_nation.emp_all?.map((em,index) =>
                                                                    <tbody>
                                                                        <td style={{textAlign:'left'}}>{em.nationality}</td>
                                                                        <td>{em.count} คน</td>         
                                                                    </tbody>
                                                                )}
                                                            </table>
                                                        </div>
                                                        :null}
                                                        {show_emp_nation === 1 ?  
                                                        <p class="card-text">
                                                            <a onClick={closeEmpNa} class="btn btn-warning">
                                                            Close
                                                            </a>
                                                        </p>
                                                        :null}                                             
                                                    </li>
                                                    <li class="list-group-item">
                                                        <div className="col-lg-12 form-group">
                                                            <div className="form-group row">
                                                                <div className="col-lg-10" style={{textAlign:'left'}}>
                                                                    จำนวนพนักงานที่มาทำงาน
                                                                </div>
                                                                <div className="col-lg-2">
                                                                    <a onClick={showEmpWd}>
                                                                        {emp_work.emp_count?.map((c) =>
                                                                        <span class="badge badge-danger badge-counter">{c.emp_count- c.ab_count}</span>
                                                                        )}
                                                                    &nbsp;คน
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {show_emp_work === 1 ?
                                                        <div className="table-responsive"> 
                                                            <table className="table table-bordered">
                                                                <thead class='thead-dark'>
                                                                    <tr>
                                                                        <th>Employee Type</th>
                                                                        <th>จำนวน</th>
                                                                    </tr>  
                                                                </thead>
                                                                {emp_work.emp_work?.map((em,index) =>
                                                                    <tbody>
                                                                        <td style={{textAlign:'left'}}>{em.nationality}</td>
                                                                        <td>{em.emp_count - em.ab_count} คน</td>         
                                                                    </tbody>
                                                                )}
                                                            </table>
                                                        </div>
                                                        :null}
                                                        {show_emp_work === 1 ?  
                                                        <p class="card-text">
                                                            <a onClick={closeEmpWd} class="btn btn-warning">
                                                            Close
                                                            </a>
                                                        </p>
                                                        :null}                                             
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="card-footer text-muted">
                                                {Moment(date).format('DD-MM-yyyy')}
                                            </div>
                                        </div>
                                      </div>
                                    </div>
                                </div> 
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