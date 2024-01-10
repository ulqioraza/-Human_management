import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Sidebar } from '../Navigation/Sidebar'
import ReactPaginate from 'react-paginate';
import Moment from 'moment';
import  Select  from 'react-select'
import { Topbar } from '../Navigation/Topbar'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getToken } from '../libs/departmentSlice';
import { GetTrainingTitleById, fetchApiTrainingGroup, getAllTrainingGroup, getAllTrainingGroupStatus, getInputTrTState, getTrainTitle, getTrainTitleState, getTrainingTitleById, saveTrainingTitleThunk, setTrTGroup, setTrTName, setTrTPlace, setTrainTitleState } from '../libs/utilitySlice';

export function Add_Edit_Training_Title() {
  const history = useNavigate();
  const location = useLocation();
  const menu = useSelector((state) => state.counter.menu)
  const dispatch = useDispatch()
  const tr_title = useSelector(getTrainingTitleById);
  const ttState = useSelector(getTrainTitleState);
  const inputTtState = useSelector(getInputTrTState);
  const tr_group = useSelector(getAllTrainingGroup)
  const train_group_status = useSelector(getAllTrainingGroupStatus)
  const date = Date.now()
  //const [todoTitle, setTodoTitle] = useState('')

  let training_group = tr_group.map(function (pd) {
    return { value: pd.id, label: pd.name };
  }) 

  React.useEffect(() => {
    dispatch(getToken())
    if (train_group_status === 'idle') {
      dispatch(fetchApiTrainingGroup());
    }
  }, [train_group_status, dispatch]);


  React.useEffect(() => {
    dispatch(getToken())
    if (ttState === 'idle') {
      if(location.state.id !== 0){
        //alert(JSON.stringify(location.state.id))
        dispatch(GetTrainingTitleById(location.state.id))
      }else{
        dispatch(getTrainTitle())
      }
    }else if(ttState === 'succeeded'){
        alert("บันทึกเรียบร้อย")
        dispatch(setTrainTitleState())
        window.location.replace('#/training_title')
    }
  }, [ttState, dispatch, inputTtState]);

  const setTG = selectedOption => {
    dispatch(setTrTGroup(selectedOption.value))
  }

  const saveTrainingTitle = (e) => {
    dispatch(saveTrainingTitleThunk({'data':tr_title,'id':tr_title.id}));
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
                            <li class="breadcrumb-item active">Add Edit Training Title</li>
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
                                                value = {training_group.filter(obj=>obj.value === tr_title.training_group_id)}
                                                onChange={setTG}
                                                labelKey='prefix'
                                                valueKey='id'
                                                options={training_group}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                selectedOption={tr_title.training_group_id}                
                                            /> 
                                        </div>
                                        
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>หลักสูตร : </b></label>
                                        <div class="col-lg-6">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={tr_title.name}
                                                onChange={e => dispatch(setTrTName(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>สถานที่ฝึกอบรม : </b></label>
                                        <div class="col-lg-6">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={tr_title.place}
                                                onChange={e => dispatch(setTrTPlace(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        
                                    </div>
                                    <hr/>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"> </label>
                                        <div class="col-lg-5">
                                           
                                        </div>
                                        <div class="col-lg-3">  
                                            <button className='btn btn-primary' onClick={saveTrainingTitle}>SAVE</button>
                                            &nbsp;<Link className='btn btn-warning' to="/training_title">BACK</Link>
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