import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Sidebar } from '../Navigation/Sidebar'
import ReactPaginate from 'react-paginate';
import Moment from 'moment';
import  Select  from 'react-select'
import { Topbar } from '../Navigation/Topbar'
import { Link } from 'react-router-dom';
import { fetchEmployeeByDep, getEmployeeError, getEmployeeStatus, selectAllEmployee, setEmpState } from '../libs/employeeSlice';
import { getToken } from '../libs/departmentSlice';
import { fetchSubDepByDep, getAllSubDep, getAllSubStatus } from '../libs/sub_departmentSlice';

export function Admin_Dep_Employeee() {
  const human = "/human_management"
  const menu = useSelector((state) => state.counter.menu)
  const dispatch = useDispatch()
  const employee = useSelector(selectAllEmployee)
  const employeeStatus = useSelector(getEmployeeStatus);
  const sub_dep = useSelector(getAllSubDep)
  const sub_dep_status = useSelector(getAllSubStatus)
  const error = useSelector(getEmployeeError)
  const [search, setSearch] = useState('')
  const [sub_depart, setSubDepart] = useState(1)
  const [dep, setDep] = useState(localStorage.getItem('dep'))
  const [offset, setOffset] = useState();
  const date = Date.now()
  const username = localStorage.getItem('username')

  let sub_department = sub_dep.map(function (pd) {
    return { value: pd.id, label: pd.name };
  }) 
  useEffect(() => {
    dispatch(getToken())
    dispatch(setEmpState())
    if (employeeStatus === 'idle') {
      dispatch(fetchEmployeeByDep({'search':search, 'dep':dep, 'sub_dep':sub_depart, 'offset':offset}));
    }
  }, [employeeStatus, dispatch, search, offset]);
  const searchClick = (e) => {
    dispatch(fetchEmployeeByDep({'search':search, 'dep':dep, 'sub_dep':sub_depart, 'offset':offset}));
  };

  React.useEffect(() => {
    if (sub_dep_status === 'idle') {
      dispatch(fetchSubDepByDep({'search':search, 'dep':dep, 'sub_dep':sub_depart, 'offset':offset}));
    }
  }, [sub_dep_status, dispatch]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
    dispatch(fetchEmployeeByDep({'search':search, 'dep':dep, 'sub_dep':sub_depart, 'offset':selectedPage + 1}));
  };

  const setSubDep = selectedOption => {
    setSubDepart(selectedOption.value)
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
                                <li class="breadcrumb-item active">บันทึกการลา Admin แผนก</li>
                        </ol>
                        <hr/>
                        <div id="content">
                            {/* <!-- Topbar --> */}
                                {/* <!-- End of Topbar --> */}
                            <div className="container-fluid">
                                {/* <!-- Page Heading --> */}
                                <div className="col-lg-12 form-group">
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>SEARCH : </b></label>
                                        <div class="col-lg-6">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                defaultValue={search}
                                                onChange={e => setSearch(e.target.value)}
                                                autoFocus/>
                                        </div>
                                        <div class="col-lg-3">  
                                            <button className='btn btn-primary' onClick={searchClick}>SEARCH</button>
                                        </div> 
                                        <div class="col-lg-2">  

                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>SUB DEPARTMENT : </b></label>
                                        <div class="col-lg-3">
                                            <Select 
                                                value = {sub_department.filter(obj=>obj.value === sub_depart)}
                                                onChange={setSubDep}
                                                labelKey='position'
                                                valueKey='id'
                                                options={sub_department}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                selectedOption={sub_depart}                
                                            />  
                                        </div>
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
                                                    <th>Status</th>
                                                    <th>Action</th>
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
                                                    <td> {pd.employee_id}</td>
                                                    <td>
                                                        {pd.prefix === 'MR.' ? 
                                                        'นาย'
                                                        :pd.prefix === 'MRS.' ?
                                                        'นาง'
                                                        :pd.prefix === 'Miss.' ?
                                                        'นางสาว'
                                                        :null} {pd.name} {pd.last_name}</td>
                                                    <td>{pd.department}</td>
                                                    <td>{pd.sub_department}</td>
                                                    <td>{pd.position}</td>
                                                    <td>{pd.emp_status === 1 ?
                                                        <nav aria-label="breadcrumb">
                                                            <ol style={{backgroundColor: "skyblue"}} class="breadcrumb">
                                                                <li class="breadcrumb-item active" aria-current="page">พนักงาน</li>
                                                            </ol>
                                                        </nav> 
                                                    :pd.emp_status === 2 ?
                                                        <nav aria-label="breadcrumb">
                                                            <ol style={{backgroundColor: "red"}} class="breadcrumb">
                                                                <li class="breadcrumb-item active" aria-current="page">ลาออก</li>
                                                            </ol>
                                                        </nav> 
                                                    :pd.emp_status === 0 ?
                                                        <nav aria-label="breadcrumb">
                                                            <ol style={{backgroundColor: "yellow"}} class="breadcrumb">
                                                                <li class="breadcrumb-item active" aria-current="page">ทดลองงาน</li>
                                                            </ol>
                                                        </nav> 
                                                    :null}
                                                        
                                                    </td>
                                                    <td>
                                                    {pd.sum_absend > 0 ? 
                                                        <button className='btn btn-warning'>รอการอนุมัติ</button>
                                                    :
                                                        <Link  to="/add_absend" className='btn btn-primary' state={{id:pd.employee_id}}>เพิ่มการลา
                                                        </Link>
                                                    }
                                                    </td>
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