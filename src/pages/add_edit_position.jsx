import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Sidebar } from '../Navigation/Sidebar'
import ReactPaginate from 'react-paginate';
import Moment from 'moment';
import { Topbar } from '../Navigation/Topbar'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GetPosById, getInputPosState, getPos, getPosState, getPositionById, savePositionThunk, setPosName, setPosState } from '../libs/positionSlice';
import { getToken } from '../libs/departmentSlice';

export function Add_Edit_Position() {
  const history = useNavigate();
  const location = useLocation();
  const menu = useSelector((state) => state.counter.menu)
  const dispatch = useDispatch()
  const pos = useSelector(getPositionById);
  const posState = useSelector(getPosState);
  const inputPosState = useSelector(getInputPosState);
  const date = Date.now()
  //const [todoTitle, setTodoTitle] = useState('')

  React.useEffect(() => {
    dispatch(getToken())
    if (posState === 'idle') {
      if(location.state.id !== 0){
        //alert(JSON.stringify(location.state.id))
        dispatch(GetPosById(location.state.id))
      }else{
        dispatch(getPos())
      }
    }else if(posState === 'succeeded'){
        alert("บันทึกเรียบร้อย")
        dispatch(setPosState())
        window.location.replace('#/position')
    }
  }, [posState, dispatch, inputPosState]);

  const savePosition = (e) => {
    dispatch(savePositionThunk({'name':pos.name,'id':pos.id}));
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
                            <li class="breadcrumb-item active">Add Edit Position</li>
                        </ol>
                        <hr/>
                        <div id="content">
                            {/* <!-- Topbar --> */}
                                {/* <!-- End of Topbar --> */}
                            <div className="container-fluid">
                                {/* <!-- Page Heading --> */}
                                <div className="col-lg-12 form-group">
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>Position Name : </b></label>
                                        <div class="col-lg-6">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={pos.name}
                                                onChange={e => dispatch(setPosName(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        
                                    </div>
                                    <hr/>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"> </label>
                                        <div class="col-lg-5">
                                           
                                        </div>
                                        <div class="col-lg-3">  
                                            <button className='btn btn-primary' onClick={savePosition}>SAVE</button>
                                            &nbsp;<Link className='btn btn-warning' to="/position">BACK</Link>
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