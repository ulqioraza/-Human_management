import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Sidebar } from '../Navigation/Sidebar'
import ReactPaginate from 'react-paginate';
import Moment from 'moment';
import  Select  from 'react-select'
import { Topbar } from '../Navigation/Topbar'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getToken } from '../libs/departmentSlice';
import { GetExaminationTitleById, fetchApiExaminationGroup, getAllExaminationGroup, getAllExaminationGroupStatus, getExaminationTitleById, getExmTitle, getExmTitleState, getInputExmTState, saveExaminationTitleThunk, setExmTGroup, setExmTName, setExmTPlace, setExmTitleState } from '../libs/examinationSlice';

export function Add_Edit_Examination_Title() {
  const history = useNavigate();
  const location = useLocation();
  const menu = useSelector((state) => state.counter.menu)
  const dispatch = useDispatch()
  const et_title = useSelector(getExaminationTitleById);
  const etState = useSelector(getExmTitleState);
  const inputEtState = useSelector(getInputExmTState);
  const eg_group = useSelector(getAllExaminationGroup)
  const exam_group_status = useSelector(getAllExaminationGroupStatus)
  const date = Date.now()
  //const [todoTitle, setTodoTitle] = useState('')

  let examination_group = eg_group.map(function (pd) {
    return { value: pd.id, label: pd.name };
  }) 

  React.useEffect(() => {
    dispatch(getToken())
    if (exam_group_status === 'idle') {
      dispatch(fetchApiExaminationGroup());
    }
  }, [exam_group_status, dispatch]);


  React.useEffect(() => {
    dispatch(getToken())
    if (etState === 'idle') {
      if(location.state.id !== 0){
        //alert(JSON.stringify(location.state.id))
        dispatch(GetExaminationTitleById(location.state.id))
      }else{
        dispatch(getExmTitle())
      }
    }else if(etState === 'succeeded'){
        alert("บันทึกเรียบร้อย")
        dispatch(setExmTitleState())
        window.location.replace('#/examination_title')
    }
  }, [etState, dispatch, inputEtState]);

  const setEG = selectedOption => {
    dispatch(setExmTGroup(selectedOption.value))
  }

  const saveExaminationTitle = (e) => {
    dispatch(saveExaminationTitleThunk({'data':et_title,'id':et_title.id}));
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
                            <li class="breadcrumb-item active">Add Edit Examination Title</li>
                        </ol>
                        <hr/>
                        <div id="content">
                            {/* <!-- Topbar --> */}
                                {/* <!-- End of Topbar --> */}
                            <div className="container-fluid">
                                {/* <!-- Page Heading --> */}
                                <div className="col-lg-12 form-group">
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>ประเภท : </b></label>
                                        <div class="col-lg-6">
                                            <Select 
                                                value = {examination_group.filter(obj=>obj.value === et_title.examination_group_id)}
                                                onChange={setEG}
                                                labelKey='prefix'
                                                valueKey='id'
                                                options={examination_group}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                selectedOption={et_title.examination_group_id}                
                                            /> 
                                        </div>
                                        
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>หลักสูตร : </b></label>
                                        <div class="col-lg-6">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={et_title.name}
                                                onChange={e => dispatch(setExmTName(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>สถานที่ฝึกอบรม : </b></label>
                                        <div class="col-lg-6">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={et_title.place}
                                                onChange={e => dispatch(setExmTPlace(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        
                                    </div>
                                    <hr/>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"> </label>
                                        <div class="col-lg-5">
                                           
                                        </div>
                                        <div class="col-lg-3">  
                                            <button className='btn btn-primary' onClick={saveExaminationTitle}>SAVE</button>
                                            &nbsp;<Link className='btn btn-warning' to="/examination_title">BACK</Link>
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