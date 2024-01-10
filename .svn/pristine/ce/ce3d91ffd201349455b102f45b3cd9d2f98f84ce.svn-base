import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Sidebar } from '../Navigation/Sidebar'
import ReactPaginate from 'react-paginate';
import Moment from 'moment';
import { Topbar } from '../Navigation/Topbar'
import { GetDepById, fetchRockets, getDep, getDepState, getDepartmentById, getInputState, getRocketsError, getRocketsStatus, getToken, saveDepartmentThunk, selectAllRockets, setDepName, setDepState } from '../libs/departmentSlice';
import { Link, useLocation, useNavigate} from 'react-router-dom';

var firstload = true
export function Add_Edit_Department() {
  const history = useNavigate();
  const location = useLocation();
  const menu = useSelector((state) => state.counter.menu)
  const dispatch = useDispatch()
  const department = useSelector(getDepartmentById);
  const depState = useSelector(getDepState);
  const inputState = useSelector(getInputState);
  const error = useSelector(getRocketsError);
  const date = Date.now()
  //const [todoTitle, setTodoTitle] = useState('')

  React.useEffect(() => {
    if (depState === 'idle') {
      dispatch(getToken())
      if(location.state.id !== 0){
        //alert(JSON.stringify(location.state.id))
        dispatch(GetDepById(location.state.id))
      }else{
        dispatch(getDep())
      }
    }else if(depState === 'succeeded'){
        alert("บันทึกเรียบร้อย")
        dispatch(setDepState())
        window.location.replace('#/department')
    }
  }, [depState, dispatch, inputState]);

  const saveDepartment = (e) => {
    dispatch(saveDepartmentThunk({'name':department.name,'id':department.id}));
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
                                <li class="breadcrumb-item active">Add Edit Department</li>
                        </ol>
                        <hr/>
                        <div id="content">
                            {/* <!-- Topbar --> */}
                                {/* <!-- End of Topbar --> */}
                            <div className="container-fluid">
                                {/* <!-- Page Heading --> */}
                                <div className="col-lg-12 form-group">
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>Department Name : </b></label>
                                        <div class="col-lg-6">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={department.name}
                                                onChange={e => dispatch(setDepName(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        
                                    </div>
                                    <hr/>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"> </label>
                                        <div class="col-lg-5">
                                           
                                        </div>
                                        <div class="col-lg-3">  
                                            <button className='btn btn-primary' onClick={saveDepartment}>SAVE</button>
                                            &nbsp;<Link className='btn btn-warning' to="/department">BACK</Link>
                                        </div> 
                                    </div>  
                                </div>
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