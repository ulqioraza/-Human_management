import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Sidebar } from '../Navigation/Sidebar'
import ReactPaginate from 'react-paginate';
import Moment from 'moment';
import { Topbar } from '../Navigation/Topbar'
import  Select  from 'react-select'
import { absendStatusCheck, confirmAbsend, getAbCheckStatus, getAbStCheckError, getUpdateAbStatus, rejectAbsend, selectAbsendStatCheck, setAbstCheckState, setUpdateAb } from '../libs/employeeSlice';
import { fetchGetDep, getAllDep, getAllStatus, getToken } from '../libs/departmentSlice';

export function Absend_status_check() {
  const human = "/human_management"
  const menu = useSelector((state) => state.counter.menu)
  const dispatch = useDispatch()
  const employee = useSelector(selectAbsendStatCheck)
  const employeeStatus = useSelector(getAbCheckStatus);
  const updateAb = useSelector(getUpdateAbStatus);
  const error = useSelector(getAbStCheckError)
  const date = Date.now()
  const [search, setSearch] = useState(99)
  const dep_status = useSelector(getAllStatus)
  const username = localStorage.getItem('emp_name')
  const depart = useSelector(getAllDep)
  const dep = localStorage.getItem('dep')
  const group = localStorage.getItem('group')

  let department_list = depart.map(function (pd) {
    return { value: pd.id, label: pd.name };
  }) 

  React.useEffect(() => {
    dispatch(getToken())
    if (dep_status === 'idle') {
      dispatch(fetchGetDep());
    }
  }, [dep_status, dispatch]);

  useEffect(() => {
    dispatch(getToken())
    //alert(employeeStatus)
    if (employeeStatus === 'idle') {
      dispatch(absendStatusCheck(search));
    }else if(updateAb === 'succeeded'){
        alert("บันทึกเรียบร้อย")
        dispatch(setUpdateAb())
        dispatch(setAbstCheckState());
        dispatch(absendStatusCheck(search));
        //window.location.replace('#/absend_status_check')
    }
  }, [employeeStatus, dispatch]);

  const setDep = selectedOption => {
    setSearch(selectedOption.value)
  }

  const searchClick = (e) => {
    dispatch(absendStatusCheck(search));
  };

  const confirm = value=> async e => {
    if (window.confirm('อนุมัติการลา ใช่ หรือ ไม่')) {
        await dispatch(confirmAbsend({'id':value.id, 'status': value.status_id, 'username': username}));
        dispatch(absendStatusCheck(search));
    }else{

    }
    
  }

  const reject = value=> async e => {
    if (window.confirm('ไม่อนุมัติการลา ใช่ หรือ ไม่')) {
        await dispatch(rejectAbsend({'id':value.id, 'status': value.status_id, 'username': username}));
        dispatch(absendStatusCheck(search));
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
                    <div class="container-fluid">
                        {/* <!-- Main Content --> */}
                        <h1 class="mt-4">{menu}</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item active">ตรวจสอบสถานะการลา</li>
                        </ol>
                        <hr/>
                        <div id="content">
                            {/* <!-- Topbar --> */}
                                {/* <!-- End of Topbar --> */}
                            <div className="container-fluid">
                                <div className="form-group row">
                                    <div className="col-lg-2" style={{textAlign:'left'}}>
                                        แผนก
                                    </div>
                                    <div className="col-lg-2">
                                        <Select 
                                                value = {department_list.filter(obj=>obj.value === search)}
                                                onChange={setDep}
                                                labelKey='department'
                                                valueKey='id'
                                                options={department_list}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                selectedOption={search}                
                                        /> 
                                    </div>
                                    <div class="col-lg-3">  
                                        <button className='btn btn-primary' onClick={searchClick}>SEARCH</button>
                                    </div> 
                                </div>
                                {/* <!-- Page Heading --> */}
                                {/* <!-- Content Row --> */}
                                <div className="col-lg-12 form-group">
                                    {employeeStatus === 'loading' ?
                                        <h2>Loading...</h2>
                                    :employeeStatus === 'succeeded' ?
                                    <div className="table-responsive"> 
                                        <table className="table table-bordered">
                                            <thead class='thead-dark'>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Employee ID</th>
                                                    <th>Name</th>
                                                    <th>Department</th>
                                                    <th>Sub Department</th>
                                                    <th>ประเภท</th>
                                                    <th>วันที่เริ่มลา</th>
                                                    <th>วันสิ้นสุดการลา</th>
                                                    <th>จำนวนวัน</th>
                                                    <th>สาเหตุ</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>  
                                            </thead>
                                            {employee.employee?.map((pd,index) =>
                                                <tbody>
                                                    {parseInt(dep) === pd.department || dep === '15' || group === 'Admin'?
                                                    <tr>
                                                        <td>{index+1}</td>
                                                        <td> {pd.employee_id}</td>
                                                        <td>
                                                            {pd.prefix === 'MR.' ? 
                                                            'นาย'
                                                            :pd.prefix === 'MRS.' ?
                                                            'นาง'
                                                            :pd.prefix === 'Miss.' ?
                                                            'นางสาว'
                                                            :null} {pd.name} {pd.last_name}</td>
                                                        <td>{pd.department_name}</td>
                                                        <td>{pd.sub_department}</td>
                                                        <td>{pd.absend_type}</td>
                                                        <td>{Moment(pd.start_date).format('DD-MM-YYYY')}</td>
                                                        <td>{Moment(pd.end_date).format('DD-MM-YYYY')}</td>
                                                        <td>{pd.date_amount} วัน</td>
                                                        <td>{pd.motive}</td>
                                                        <td>{pd.status_id === 2 ?
                                                            <nav aria-label="breadcrumb">
                                                                <ol style={{backgroundColor: "skyblue"}} class="breadcrumb">
                                                                    <li class="breadcrumb-item active" aria-current="page">{pd.absend_status}</li>
                                                                </ol>
                                                            </nav> 
                                                        :pd.status_id === 3 ?
                                                            <nav aria-label="breadcrumb">
                                                                <ol style={{backgroundColor: "yellow"}} class="breadcrumb">
                                                                    <li class="breadcrumb-item active" aria-current="page">{pd.absend_status}</li>
                                                                </ol>
                                                            </nav> 
                                                        :null}
                                                            
                                                        </td>
                                                        <td style={{width: '15%'}}>
                                                            <div className="col-lg-12 form-group">
                                                                <div class="form-group row">
                                                                    <div className='col-lg-6'>
                                                                        {pd.status_id === 3 && dep === '15'?
                                                                            <button class='btn btn-primary' onClick={confirm(pd)} title='ยืนยันการลา'>
                                                                                ยืนยันการลา
                                                                            </button>
                                                                        :pd.status_id !== 3 ?
                                                                            <button class='btn btn-primary' onClick={confirm(pd)} title='อนุมัติการลา'>
                                                                                อนุมติ
                                                                            </button>
                                                                        :null}
                                                                    </div>
                                                                    <div className='col-lg-6'>
                                                                        {pd.status_id !== 3 ?
                                                                            <button class='btn btn-danger' onClick={reject(pd)} title='ไม่อนุมัติ'>
                                                                                ไม่อนุมัติ
                                                                            </button>
                                                                        :null}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    :null}
                                                    
                                                </tbody>
                                            )}
                                        </table>
                                    </div>
                                    :
                                    <p>{error}</p>}
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