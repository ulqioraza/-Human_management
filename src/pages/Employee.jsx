import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Sidebar } from '../Navigation/Sidebar'
import ReactPaginate from 'react-paginate';
import Moment from 'moment';
import { Topbar } from '../Navigation/Topbar'
import { Link } from 'react-router-dom';
import { fetchEmployee, getEmployeeError, getEmployeeStatus, resignEmpThunk, selectAllEmployee, setEmpState, updateProbationThunk } from '../libs/employeeSlice';
import { getToken } from '../libs/departmentSlice';

var firstload = true
export function Employee() {
  const human = "/human_management"
  const menu = useSelector((state) => state.counter.menu)
  const dispatch = useDispatch()
  const employee = useSelector(selectAllEmployee)
  const employeeStatus = useSelector(getEmployeeStatus);
  const error = useSelector(getEmployeeError)
  const [search, setSearch] = useState('')
  const [offset, setOffset] = useState();
  const [pro, setEmpPro] = useState(true);
  const [active, setEmpActive] = useState(true);
  const [out, setEmpOut] = useState(false);
  const [checked, setChecked] = useState([{'status': '0' , 'value': pro},
                                                {'status': '1' , 'value': active},
                                                {'status': '2' , 'value': out},])
  const date = Date.now()
  const username = localStorage.getItem('username')

  useEffect(() => {
    dispatch(getToken())
    dispatch(setEmpState())
    if(!firstload){
        if (employeeStatus === 'idle') {
        dispatch(fetchEmployee({'search':search,'offset':offset, 'stat' : checked}));
        }
    }
    else{
        firstload = false
    }
  }, [employeeStatus, dispatch, search, offset, checked]);
  
  const searchClick = (e) => {
    dispatch(fetchEmployee({'search':search,'offset':offset, 'stat' : checked}));
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
    dispatch(fetchEmployee({'search':search,'offset':selectedPage + 1, 'stat' : checked}));
  };

  const changeChecked = value => () =>{   
    if(value === 0){
        setEmpPro(!pro)
        setChecked([{'status': '0' , 'value': !pro},
                    {'status': '1' , 'value': active},
                    {'status': '2' , 'value': out}])
    }else if(value === 1){
        setEmpActive(!active)
        setChecked([{'status': '0' , 'value': pro},
                    {'status': '1' , 'value': !active},
                    {'status': '2' , 'value': out}])
    }else if(value === 2){
        setEmpOut(!out)
        setChecked([{'status': '0' , 'value': pro},
                    {'status': '1' , 'value': active},
                    {'status': '2' , 'value': !out}])
    }
  }

  const updatePro = value=> async e => {
    if (window.confirm('ต้องการให้พนักงานคนนี้ ผ่านโปร ใช่ หรือ ไม่')) {
        await dispatch(updateProbationThunk({'emp_id':value, 'username': username}));
        dispatch(fetchEmployee({'search':search,'offset':offset, 'stat' : checked}));
    }else{

    }
    
  }
  const resignEMp = value=> async e => {
    if (window.confirm('ต้องการเปลี่ยนสถานะพนักงานเป็นลาออก ใช่ หรือ ไม่')) {
        await dispatch(resignEmpThunk({'emp_id':value, 'username': username}));
        dispatch(fetchEmployee({'search':search,'offset':offset, 'stat' : checked}));
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
                                <li class="breadcrumb-item active">{menu}</li>
                        </ol>
                        <hr/>
                        <div id="content">
                            {/* <!-- Topbar --> */}
                                {/* <!-- End of Topbar --> */}
                            <div className="container-fluid">
                                {/* <!-- Page Heading --> */}
                                <div className="col-lg-12 form-group">
                                    <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>SEARCH : </b></label>
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
                                        {/*<Link class="btn btn-info" to={{
                                                                    pathname: human +"/add_edit_employee",
                                                                        id: 0,
                                                                     }} >ADD NEW EMPLOYEE
                                                                    </Link>*/}
                                        <Link className='btn btn-info' to="/add_edit_employee" state={{id:0}}>ADD NEW EMPLOYEE
                                        </Link>
                                        </div>
                                    </div> 
                                </div>
                                <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b></b></label>
                                        <label class="col-lg-1 col-form-label"><b>ยังไม่ผ่านโปร:</b></label>
                                        <div class="col-lg-1 mt-2">
                                            <input
                                                type="checkbox"
                                                checked={pro}
                                                onChange={changeChecked(0)}
                                            />
                                        </div>
                                        <label class="col-lg-1 col-form-label"><b>พนักงาน:</b></label>
                                        <div class="col-lg-1 mt-2">
                                            <input
                                                type="checkbox"
                                                checked={active}
                                                onChange={changeChecked(1)}
                                            />
                                        </div>  
                                        <label class="col-lg-2 col-form-label"><b>ลาออก:</b></label>
                                        <div class="col-lg-1 mt-2">
                                            <input
                                                type="checkbox"
                                                checked={out}
                                                onChange={changeChecked(2)}
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
                                                    <td> <Link  to="/add_absend" state={{id:pd.employee_id}}>{pd.employee_id}
                                                        </Link></td>
                                                    <td>
                                                        {pd.prefix === 'MR.' ? 
                                                        'นาย'
                                                        :pd.prefix === 'MRS.' ?
                                                        'นาง'
                                                        :pd.prefix === 'Miss.' ?
                                                        'นางสาว'
                                                        :null} {pd.name} {pd.last_name}</td>
                                                    <td>{pd.department}</td>
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
                                                    {/*<Link to={{
                                                                    pathname: human + "/add_edit_employee",
                                                                        id: pd.id,
                                                                     }} ><i class="fa fa-cog" aria-hidden="true"></i>
                                                    </Link>*/}
                                                    
                                                    
                                                    <Link  to="/add_edit_employee" state={{id:pd.id}}><i class="fa fa-cog" aria-hidden="true"></i>
                                                    </Link>&nbsp;
                                                    {pd.emp_status === 0 ?
                                                    <a style={{color: 'salmon'}} onClick={updatePro(pd.id)} title='พนักงานผ่านโปร'>
                                                        <i class="fa fa-reply" aria-hidden="true"></i>
                                                    </a>
                                                    :null}&nbsp;
                                                    {pd.emp_status !== 2 ?
                                                    <a style={{color: 'red'}} onClick={resignEMp(pd.id)} title='พนักงานลาออก'>
                                                        <i class="fa fa-reply" aria-hidden="true"></i>
                                                    </a>
                                                    :null}
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