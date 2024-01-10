import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Sidebar } from '../Navigation/Sidebar'
import ReactPaginate from 'react-paginate';
import Moment from 'moment';
import { Topbar } from '../Navigation/Topbar'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getToken } from '../libs/departmentSlice';
import { GetExaminationGroupById, getExaminationGroupById, getExmGroup, getExmGroupState, getInputExmGState, saveExaminationGroupThunk, setExaminationName, setExmGName, setExmGroupState } from '../libs/examinationSlice';

export function Add_Edit_Examination_Group() {
  const history = useNavigate();
  const location = useLocation();
  const menu = useSelector((state) => state.counter.menu)
  const dispatch = useDispatch()
  const eg_group = useSelector(getExaminationGroupById);
  const exmgState = useSelector(getExmGroupState);
  const inputExmgState = useSelector(getInputExmGState);

  const date = Date.now()
  //const [todoTitle, setTodoTitle] = useState('')

  React.useEffect(() => {
    dispatch(getToken())
    if (exmgState === 'idle') {
      if(location.state.id !== 0){
        //alert(JSON.stringify(location.state.id))
        dispatch(GetExaminationGroupById(location.state.id))
      }else{
        dispatch(getExmGroup())
      }
    }else if(exmgState === 'succeeded'){
        alert("บันทึกเรียบร้อย")
        dispatch(setExmGroupState())
        window.location.replace('#/examination_group')
    }
  }, [exmgState, dispatch, inputExmgState]);

  const saveExaminationGroup = (e) => {
    dispatch(saveExaminationGroupThunk({'data':eg_group,'id':eg_group.id}));
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
                            <li class="breadcrumb-item active">Add Edit Examination Group</li>
                        </ol>
                        <hr/>
                        <div id="content">
                            {/* <!-- Topbar --> */}
                                {/* <!-- End of Topbar --> */}
                            <div className="container-fluid">
                                {/* <!-- Page Heading --> */}
                                <div className="col-lg-12 form-group">
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>Examination Group Name : </b></label>
                                        <div class="col-lg-6">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={eg_group.name}
                                                onChange={e => dispatch(setExmGName(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        
                                    </div>
                                    <hr/>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"> </label>
                                        <div class="col-lg-5">
                                           
                                        </div>
                                        <div class="col-lg-3">  
                                            <button className='btn btn-primary' onClick={saveExaminationGroup}>SAVE</button>
                                            &nbsp;<Link className='btn btn-warning' to="/examination_group">BACK</Link>
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