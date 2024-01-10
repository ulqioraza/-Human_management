import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Sidebar } from '../Navigation/Sidebar'
import ReactPaginate from 'react-paginate';
import Moment from 'moment';
import  Select  from 'react-select'
import { Topbar } from '../Navigation/Topbar'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getToken } from '../libs/departmentSlice';
import { GetTrainingGroupById, fetchApiTrainingGroupType, getAllTrainingGroupType, getAllTrainingGroupTypeStatus, getInputTrGState, getTrainGroup, getTrainGroupState, getTrainingGroupById, getTrainingGroupStatus, saveTrainingGroupThunk, setTrGName, setTrGType, setTraingGroupState } from '../libs/utilitySlice';

export function Add_Edit_Training_Group() {
  const history = useNavigate();
  const location = useLocation();
  const menu = useSelector((state) => state.counter.menu)
  const dispatch = useDispatch()
  const tr_group = useSelector(getTrainingGroupById);
  const trgState = useSelector(getTrainGroupState);
  const inputTrgState = useSelector(getInputTrGState);
  const tr_group_type = useSelector(getAllTrainingGroupType)
  const tgroup_type_status = useSelector(getAllTrainingGroupTypeStatus)
  const date = Date.now()
  //const [todoTitle, setTodoTitle] = useState('')

  let training_group_type = tr_group_type.map(function (pd) {
    return { value: pd.id, label: pd.name };
  }) 

  React.useEffect(() => {
    dispatch(getToken())
    if (tgroup_type_status === 'idle') {
      dispatch(fetchApiTrainingGroupType());
    }
  }, [tgroup_type_status, dispatch]);

  React.useEffect(() => {
    dispatch(getToken())
    if (trgState === 'idle') {
      if(location.state.id !== 0){
        //alert(JSON.stringify(location.state.id))
        dispatch(GetTrainingGroupById(location.state.id))
      }else{
        dispatch(getTrainGroup())
      }
    }else if(trgState === 'succeeded'){
        alert("บันทึกเรียบร้อย")
        dispatch(setTraingGroupState())
        window.location.replace('#/training_group')
    }
  }, [trgState, dispatch, inputTrgState]);

  const setTGT = selectedOption => {
    dispatch(setTrGType(selectedOption.value))
  }

  const saveTrainingGroup = (e) => {
    dispatch(saveTrainingGroupThunk({'data':tr_group,'id':tr_group.id}));
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
                            <li class="breadcrumb-item active">Add Edit Training Group</li>
                        </ol>
                        <hr/>
                        <div id="content">
                            {/* <!-- Topbar --> */}
                                {/* <!-- End of Topbar --> */}
                            <div className="container-fluid">
                                {/* <!-- Page Heading --> */}
                                <div className="col-lg-12 form-group">
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>Training Group Type : </b></label>
                                        <div class="col-lg-4">
                                            <Select 
                                                value = {training_group_type.filter(obj=>obj.value === tr_group.training_group_type_id)}
                                                onChange={setTGT}
                                                labelKey='prefix'
                                                valueKey='id'
                                                options={training_group_type}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                selectedOption={tr_group.training_group_type_id}                
                                            /> 
                                        </div>
                                        
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>Training Group Name : </b></label>
                                        <div class="col-lg-6">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={tr_group.name}
                                                onChange={e => dispatch(setTrGName(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        
                                    </div>
                                    <hr/>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"> </label>
                                        <div class="col-lg-5">
                                           
                                        </div>
                                        <div class="col-lg-3">  
                                            <button className='btn btn-primary' onClick={saveTrainingGroup}>SAVE</button>
                                            &nbsp;<Link className='btn btn-warning' to="/training_group">BACK</Link>
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