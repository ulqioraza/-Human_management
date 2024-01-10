import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Sidebar } from '../Navigation/Sidebar'
import ReactPaginate from 'react-paginate';
import Moment from 'moment';
import { Topbar } from '../Navigation/Topbar'
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { GetOffenceTitleById, getOffenceInputState, getOffenceTitle, getOffenceTitleById, saveOffenceTitleThunk, setOffenceTitleInputState, setOffenceTitleName, setOffencetitleState } from '../libs/examinationSlice';
import { getToken } from '../libs/departmentSlice';

var firstload = true
export function Add_Edit_Offence_title() {
  const history = useNavigate();
  const location = useLocation();
  const menu = useSelector((state) => state.counter.menu)
  const dispatch = useDispatch()
  const offence_title = useSelector(getOffenceTitleById);
  const oftState = useSelector(getOffenceInputState);
  const date = Date.now()
  //const [todoTitle, setTodoTitle] = useState('')

  React.useEffect(() => {
    if (oftState === 'idle') {
      dispatch(getToken())
      if(location.state.id !== 0){
        //alert(JSON.stringify(location.state.id))
        dispatch(GetOffenceTitleById(location.state.id))
      }else{
        dispatch(getOffenceTitle())
      }
    }else if(oftState === 'succeeded'){
        alert("บันทึกเรียบร้อย")
        dispatch(setOffenceTitleInputState())
        window.location.replace('#/offence_title')
        
    }
  }, [oftState, dispatch]);

  const saveOffenceTitle = async e => {
    await dispatch(saveOffenceTitleThunk({'data':offence_title,'id':offence_title.id}));
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
                                <li class="breadcrumb-item active">จัดการหัวข้อการกระทำผิด</li>
                        </ol>
                        <hr/>
                        <div id="content">
                            {/* <!-- Topbar --> */}
                                {/* <!-- End of Topbar --> */}
                            <div className="container-fluid">
                                {/* <!-- Page Heading --> */}
                                <div className="col-lg-12 form-group">
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>หัวข้อการกระทำผิด : </b></label>
                                        <div class="col-lg-6">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={offence_title.name}
                                                onChange={e => dispatch(setOffenceTitleName(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        
                                    </div>
                                    <hr/>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"> </label>
                                        <div class="col-lg-5">
                                           
                                        </div>
                                        <div class="col-lg-3">  
                                            <button className='btn btn-primary' onClick={saveOffenceTitle}>SAVE</button>
                                            &nbsp;<Link className='btn btn-warning' to="/offence_title">BACK</Link>
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