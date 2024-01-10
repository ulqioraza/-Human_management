import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Sidebar } from '../Navigation/Sidebar'
import ReactPaginate from 'react-paginate';
import Moment from 'moment';
import { Topbar } from '../Navigation/Topbar'
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { GetSubDepById, getInputState, getSubDep, getSubDepError, getSubDepState, getSubDepartmentById, getToken, saveSubDepartmentThunk, setSubDepName, setSubDepState } from '../libs/sub_departmentSlice';

var firstload = true
export function Add_Edit_Sub_Department() {
  const history = useNavigate();
  const location = useLocation();
  const menu = useSelector((state) => state.counter.menu)
  const dispatch = useDispatch()
  const sub_department = useSelector(getSubDepartmentById);
  const depState = useSelector(getSubDepState);
  const inputState = useSelector(getInputState);
  const error = useSelector(getSubDepError);
  const date = Date.now()
  //const [todoTitle, setTodoTitle] = useState('')

  React.useEffect(() => {
    if (depState === 'idle') {
      dispatch(getToken())
      if(location.state.id !== 0){
        //alert(JSON.stringify(location.state.id))
        dispatch(GetSubDepById(location.state.id))
      }else{
        dispatch(getSubDep())
      }
    }else if(depState === 'succeeded'){
        alert("บันทึกเรียบร้อย")
        dispatch(setSubDepState())
        window.location.replace('#/sub_department')
    }
  }, [depState, dispatch, inputState]);

  const saveSubDepartment = (e) => {
    dispatch(saveSubDepartmentThunk({'name':sub_department.name,'id':sub_department.id}));
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
                                <li class="breadcrumb-item active">Add Edit Sub Department</li>
                        </ol>
                        <hr/>
                        <div id="content">
                            {/* <!-- Topbar --> */}
                                {/* <!-- End of Topbar --> */}
                            <div className="container-fluid">
                                {/* <!-- Page Heading --> */}
                                <div className="col-lg-12 form-group">
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>Sub Department Name : </b></label>
                                        <div class="col-lg-6">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={sub_department.name}
                                                onChange={e => dispatch(setSubDepName(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        
                                    </div>
                                    <hr/>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"> </label>
                                        <div class="col-lg-5">
                                           
                                        </div>
                                        <div class="col-lg-3">  
                                            <button className='btn btn-primary' onClick={saveSubDepartment}>SAVE</button>
                                            &nbsp;<Link className='btn btn-warning' to="/sub_department">BACK</Link>
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