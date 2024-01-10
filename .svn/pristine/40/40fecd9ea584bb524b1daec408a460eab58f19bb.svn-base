import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactPaginate from 'react-paginate';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import { Sidebar } from '../../Navigation/Sidebar';
import { Topbar } from '../../Navigation/Topbar';
import { fetchGetDep, getAllDep, getAllStatus, getToken } from '../../libs/departmentSlice';
import { fetchEmployeeAbsendByDep, getEmployeeError, getEmployeeStatus, selectAllEmployee, setEmpState } from '../../libs/employeeSlice';
import  Select  from 'react-select'
import { fetchGetSubDep, getAllSubDep, getAllSubStatus } from '../../libs/sub_departmentSlice';

var firstload = true
export function Employee_Absend_by_date() {
  const human = "/human_management"
  const menu = useSelector((state) => state.counter.menu)
  const dispatch = useDispatch()
  const dep = useSelector(getAllDep)
  const sup = useSelector(getAllSubDep)
  const employee = useSelector(selectAllEmployee)
  const employeeStatus = useSelector(getEmployeeStatus);
  const error = useSelector(getEmployeeError)
  const [dep_id, setDepID] = useState(parseInt(localStorage.getItem('dep')))
  const [sup_id, setSubID] = useState(parseInt(99))
  const [search, setSearch] = useState('')
  const [offset, setOffset] = useState();
  const dep_status = useSelector(getAllStatus)
  const sub_status = useSelector(getAllSubStatus)
  const [start_date, setStartDate] = useState(Moment().startOf('year').format('yyyy-MM-DD'))
  const [end_date, setEndDate] = useState(Moment().endOf('year').format('yyyy-MM-DD'))
  const date = Date.now()
  const username = localStorage.getItem('username')
  const user_dep = localStorage.getItem('dep')

  let department = dep.map(function (pd) {
    return { value: pd.id, label: pd.name };
  }) 

  let sup_department = sup.map(function (pd) {
    return { value: pd.id, label: pd.name };
  }) 

  useEffect(() => {
    if (dep_status === 'idle') {
      dispatch(fetchGetDep());
    }
  }, [dep_status, dispatch]);

  useEffect(() => {
    if (sub_status === 'idle') {
      dispatch(fetchGetSubDep());
    }
  }, [sub_status, dispatch]);

  useEffect(() => {
    dispatch(getToken())
    dispatch(setEmpState())
    if(!firstload){
        if (employeeStatus === 'idle') {
            dispatch(fetchEmployeeAbsendByDep({'dep_id':dep_id, 'sup_dep':sup_id, 'search' : search, 'offset':offset, 'start_date' : start_date, 'end_date': end_date}));
        }
    }
    else{

    }
  }, [employeeStatus, dispatch, dep_id, offset, start_date, end_date]);

  const searchClick = (e) => {
    //alert(end_date)
    dispatch(fetchEmployeeAbsendByDep({'dep_id':dep_id, 'sup_dep':sup_id, 'search' : search, 'offset':offset, 'start_date' : start_date, 'end_date': end_date}));
  };

  const setDep = selectedOption => {
    setDepID(selectedOption.value)
  }

  const setSubDep = selectedOption => {
    setSubID(selectedOption.value)
  }

  const handlePageClick = (e) => {
   
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
    dispatch(fetchEmployeeAbsendByDep({'dep_id':dep_id, 'search' : search, 'offset':offset, 'start_date' : start_date, 'end_date': end_date}));
  };

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
                                <li class="breadcrumb-item active">{menu}</li>
                        </ol>
                        <hr/>
                        <div id="content">
                            {/* <!-- Topbar --> */}
                                {/* <!-- End of Topbar --> */}
                            <div className="container-fluid">
                                {/* <!-- Page Heading --> */}
                                <div className="col-lg-12 form-group">
                                    {user_dep === '15' ? 
                                    <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>Department : </b></label>
                                        <div class="col-lg-4">
                                            <Select 
                                                value = {department.filter(obj=>obj.value === dep_id)}
                                                onChange={setDep}
                                                labelKey='department'
                                                valueKey='id'
                                                options={department}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                selectedOption={dep_id}                
                                            /> 
                                        </div>
                                        <div class="col-lg-4">
                                            <Select 
                                                value = {sup_department.filter(obj=>obj.value === sup_id)}
                                                onChange={setSubDep}
                                                labelKey='department'
                                                valueKey='id'
                                                options={sup_department}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                selectedOption={sup_id}                
                                            /> 
                                        </div>
                                        <div class="col-lg-3">  
                                            <button className='btn btn-primary' onClick={searchClick}>SEARCH</button>
                                        </div> 
                                        <div class="col-lg-2">  
                                        
                                        </div>
                                    </div> 
                                    :
                                    <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>SEARCH : </b></label>
                                        <div class="col-lg-6">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={search}
                                                onChange={e => setSearch(e.target.value)}
                                                />
                                        </div>
                                        <div class="col-lg-3">  
                                            <button className='btn btn-primary' onClick={searchClick}>SEARCH</button>
                                        </div> 
                                        <div class="col-lg-2">  
                                        
                                        </div>
                                    </div> 
                                    }
                                    
                                </div>
                                <div class="form-group row">
                                    <label class="col-lg-1 col-form-label"><b>Start Date : </b></label>
                                    <div class="col-lg-3">
                                        <input type="date" 
                                                class="form-control" 
                                                name="search" 
                                                value={start_date}
                                                onChange={e => setStartDate(e.target.value)}
                                                />
                                    </div>
                                    <label class="col-lg-1 col-form-label"><b>End Date : </b></label>
                                    <div class="col-lg-3">
                                        <input type="date" 
                                                class="form-control" 
                                                name="search" 
                                                defaultValue={end_date}
                                                onChange={e => setEndDate(e.target.value)}
                                                />
                                    </div>
                                </div>
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
                                                    <th>Position</th>
                                                    <th>ลาป่วย</th>
                                                    <th>ลากิจ</th>
                                                    <th>ลาพักร้อน</th>
                                                </tr>  
                                            </thead>
                                            {employee.employee?.map((pd,index) =>
                                                <tbody>
                                                    <td>{offset === 1 ? 
                                                        index+1 :
                                                    offset > 1 ?
                                                        index+((offset-1)*15)+1
                                                    :
                                                        index+1}</td>
                                                    <td> <Link  to="/add_absend" state={{id:pd.employee_id}}>{pd.employee_id}
                                                        </Link></td>
                                                    <td>
                                                        {pd.prefix === 'MR.' ? 
                                                        'นาย'
                                                        :pd.prefix === 'MRS.' ?
                                                        'นาง'
                                                        :pd.prefix === 'Miss.' ?
                                                        'นางสาว'
                                                        :null}
                                                        {pd.name} {pd.last_name}</td>
                                                    <td>{pd.department}</td>
                                                    <td>{pd.sub_department}</td>
                                                    <td>{pd.position}</td>
                                                    <td>{pd.sick_ab}</td>
                                                    <td>{pd.affair_ab}</td>
                                                    <td>{pd.vacation_ab}</td>
                                                </tbody>
                                            )}
                                        </table>
                                    </div>
                                    :
                                    <p>{error}</p>}
                                    <ReactPaginate
                                        breakClassName={'page-item'}
                                        breakLinkClassName={'page-link'}
                                        containerClassName={'pagination'}
                                        pageClassName={'page-item'}
                                        pageLinkClassName={'page-link'}
                                        previousClassName={'page-item'}
                                        previousLinkClassName={'page-link'}
                                        nextClassName={'page-item'}
                                        nextLinkClassName={'page-link'}
                                        activeClassName={'active'}
                                        previousLabel={"prev"}
                                        nextLabel={"next"}
                                        breakLabel={"..."}
                                        pageCount={employee.total_page_count}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageClick}
                                        subContainerClassName={"pages pagination"}
                                        initialPage={offset-1}/>          
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