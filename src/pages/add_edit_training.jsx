import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Sidebar } from '../Navigation/Sidebar'
import ReactPaginate from 'react-paginate';
import Moment from 'moment';
import { Button,Modal, ModalBody, Table} from 'react-bootstrap'
import  Select  from 'react-select'
import { Topbar } from '../Navigation/Topbar'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getToken } from '../libs/departmentSlice';
import { GetTrainingsById, GetTrainingsMemberById, addMember, deleteMember, fetchApiTrainingGroup, fetchApiTrainingResults, fetchApiTrainingTitle, getAllTrainingGroup, getAllTrainingGroupStatus, getAllTrainingResults, getAllTrainingResultsStatus, getAllTrainingTitle, getAllTrainingTitleStatus, getAllmemberChoose, getInputTraingState, getTrain, getTrainMember, getTrainState, getTrainingById, getTrainingMemberById, removeMember, saveMemberToTrain, saveTrainingThunk, setDocument, setResultRemark, setTeacher, setTrainEnd, setTrainGroup, setTrainResults, setTrainStart, setTrainTitle, setTraingState, setTrainingName, updatePassMember } from '../libs/utilitySlice';
import { fetchEmployee, getEmployeeError, getEmployeeStatus, selectAllEmployee, setEmpState } from '../libs/employeeSlice';

var firstload = true
export function Add_Edit_Training() {
  const history = useNavigate();
  const location = useLocation();
  const menu = useSelector((state) => state.counter.menu)
  const dispatch = useDispatch()
  const training = useSelector(getTrainingById);
  const trainState = useSelector(getTrainState);
  const inputTrainState = useSelector(getInputTraingState);
  const tr_group = useSelector(getAllTrainingGroup)
  const tt_group = useSelector(getAllTrainingTitle)
  const tr_results = useSelector(getAllTrainingResults)
  const train_group_status = useSelector(getAllTrainingGroupStatus)
  const train_title_status = useSelector(getAllTrainingTitleStatus)
  const train_results_status = useSelector(getAllTrainingResultsStatus)
  const [showModal, setShowModal] = useState(0)
  const employee = useSelector(selectAllEmployee)
  const employeeStatus = useSelector(getEmployeeStatus);
  const [search, setSearch] = useState('')
  const [offset, setOffset] = useState();
  const member_choose = useSelector(getTrainingMemberById)
  const [pro, setEmpPro] = useState(true);
  const [active, setEmpActive] = useState(true);
  const [out, setEmpOut] = useState(false);
  const [remark, setRemark] = useState('');
  const [emp_id, setEmpID] = useState();
  const [rejectModal, setRejectModal] = useState(0);
  const error = useSelector(getEmployeeError)
  const [checked, setChecked] = useState([{'status': '0' , 'value': pro},
                                          {'status': '1' , 'value': active},
                                          {'status': '2' , 'value': out},])
  const date = Date.now()
  //const [todoTitle, setTodoTitle] = useState('')
  
  let training_group = tr_group.map(function (pd) {
    return { value: pd.id, label: pd.name };
  }) 

  let training_title = tt_group.map(function (pd) {
    return { value: pd.id, label: pd.name, group: pd.training_group_id };
  }) 

  let training_results = tr_results.map(function (pd) {
    return { value: pd.id, label: pd.name };
  }) 

  useEffect(() => {
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

  React.useEffect(() => {
    dispatch(getToken())
    if (train_results_status === 'idle') {
      dispatch(fetchApiTrainingResults());
    }
  }, [train_results_status, dispatch]);

  React.useEffect(() => {
    dispatch(getToken())
    if (train_group_status === 'idle') {
      dispatch(fetchApiTrainingGroup());
    }
  }, [train_group_status, dispatch]);

  React.useEffect(() => {
    dispatch(getToken())
    if (train_title_status === 'idle') {
      dispatch(fetchApiTrainingTitle());
    }
  }, [train_title_status, dispatch]);

  React.useEffect(() => {
    dispatch(getToken())
    if (trainState === 'idle') {
      if(location.state.id !== 0){
        //alert(JSON.stringify(location.state.id))
        dispatch(GetTrainingsById(location.state.id))
        dispatch(GetTrainingsMemberById(location.state.id))
      }else{
        dispatch(getTrain())
        dispatch(getTrainMember())
        dispatch(setTrainStart(''))
        dispatch(setTrainEnd(''))
        dispatch(setTeacher(''))
        dispatch(setTrainGroup(null))
        dispatch(setTrainTitle(null))
      }
    }else if(trainState === 'succeeded'){
        alert("บันทึกเรียบร้อย")
        dispatch(setTraingState())
        window.location.replace('#/training')
    }
  }, [trainState, dispatch, inputTrainState]);

  const searchClick = (e) => {
    dispatch(fetchEmployee({'search':search,'offset':offset, 'stat' : checked}));
  };

  const setTG = selectedOption => {
    dispatch(setTrainGroup(selectedOption.value))
  }

  const setTT = selectedOption => {
    dispatch(setTrainTitle(selectedOption.value))
  }

  const setTR = selectedOption => {
    dispatch(setTrainResults(selectedOption.value))
  }

  const addmember = () => {
    setShowModal(1)
  }

  const addMemberToList = value=> () => {
    if(member_choose.find(obj=>obj.id === value.id)){
      alert("พนักงานอยู่ในลิสแล้ว")
    }else{
      dispatch(addMember(value))
    }
  }
  const removeMemberFromList = value=> () => {
    dispatch(removeMember(value))
  }
  const deleteMemberFromList = value=> async e => {
    if (window.confirm('ลบพนักงานนี้ออกจากการอบรม ใช่ หรือ ไม่')) {
      await dispatch(deleteMember(value.id));
      dispatch(GetTrainingsMemberById(location.state.id))
    }else{

    }
  }
  const saveMember = value=> async e => {
    //alert(JSON.stringify(value))
    if (window.confirm('เพิ่มพนักงานในการอบรมนี้ ใช่ หรือ ไม่')) {
      if(member_choose.find(obj=>obj.emp_id === value.id)){
        alert("พนักงานอยู่ในลิสแล้ว")
      }else{
        await dispatch(saveMemberToTrain({'emp_id':value.id, 'train_id':location.state.id}));
        dispatch(GetTrainingsMemberById(location.state.id))
      }
    }else{

    }
  }

  const accept = value=> async e => {
    if (window.confirm('ผ่านการอบรม ใช่ หรือ ไม่')) {
      await dispatch(updatePassMember({'id':value.id, 'status': true}));
      dispatch(GetTrainingsMemberById(location.state.id))
    }else{

    }
  }

  const openRejectModal = value=> () => {
    setRejectModal(1)
    setEmpID(value.id)
  
  }
  const closeRejectModal = () => {
    setRejectModal(0)
  
  }
  const reject = async e => {
    if (window.confirm('ไม่ผ่านการอบรม ใช่ หรือ ไม่')) {
      setRejectModal(0)
      await dispatch(updatePassMember({'id':emp_id, 'status': false, 'remark': remark}));
      dispatch(GetTrainingsMemberById(location.state.id))
    }else{

    }
  }
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
    dispatch(fetchEmployee({'search':search,'offset':selectedPage + 1, 'stat' : checked}));
  };

  const saveTraining = (e) => {
    dispatch(saveTrainingThunk({'data':training,'id':training.id, 'data_item': member_choose}));
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
                            <li class="breadcrumb-item active">Add Edit Training</li>
                        </ol>
                        <hr/>
                        <div id="content">
                            {/* <!-- Topbar --> */}
                                {/* <!-- End of Topbar --> */}
                            <div className="container-fluid">
                                {/* <!-- Page Heading --> */}
                                <div className="col-lg-12 form-group">
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>Training Group : </b></label>
                                        <div class="col-lg-6">
                                            <Select 
                                                value = {training_group.filter(obj=>obj.value === training.training_group_id)}
                                                onChange={setTG}
                                                labelKey='prefix'
                                                valueKey='id'
                                                options={training_group}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                selectedOption={training.training_group_id}                
                                            /> 
                                        </div>
                                        
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>Training title : </b></label>
                                        <div class="col-lg-6">
                                          {training.training_group_id !== null ? 
                                            <Select 
                                              value = {training_title.filter(obj=>obj.value === training.training_title_id)}
                                              onChange={setTT}
                                              labelKey='prefix'
                                              valueKey='id'
                                              options={training_title.filter(obj=>obj.group === training.training_group_id)}
                                              menuPlacement="auto"
                                              menuPosition="fixed" 
                                              selectedOption={training.training_group_id}                
                                          /> 
                                          :
                                            <Select 
                                              labelKey='prefix'
                                              valueKey='id'
                                              menuPlacement="auto"
                                              menuPosition="fixed"             
                                            /> 
                                          }  
                                        </div>
                                        
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>Training Results : </b></label>
                                        <div class="col-lg-6">
                                            <Select 
                                                value = {training_results.filter(obj=>obj.value === training.training_results_id)}
                                                onChange={setTR}
                                                labelKey='prefix'
                                                valueKey='id'
                                                options={training_results}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                selectedOption={training.training_results_id}                
                                            /> 
                                        </div>
                                        
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>รายละเอียดเกณฑ์ผ่านการอบรม : </b></label>
                                        <div class="col-lg-5">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={training.result_remark}
                                                onChange={e => dispatch(setResultRemark(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>เอกสารที่เกี่ยวข้อง : </b></label>
                                        <div class="col-lg-5">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={training.document}
                                                onChange={e => dispatch(setDocument(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>วันที่เริ่มอบรม : </b></label>
                                        <div class="col-lg-5">
                                            <input type="date" 
                                                class="form-control" 
                                                name="search" 
                                                value={Moment(training.start_datetime).format('yyyy-MM-DD')}
                                                onChange={e => dispatch(setTrainStart(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>วันที่สิ้นสุดการอบรม : </b></label>
                                        <div class="col-lg-5">
                                            <input type="date" 
                                                class="form-control" 
                                                name="search" 
                                                value={Moment(training.end_datetime).format('yyyy-MM-DD')}
                                                onChange={e => dispatch(setTrainEnd(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>ผู้ฝึกอบรม : </b></label>
                                        <div class="col-lg-5">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={training.teacher}
                                                onChange={e => dispatch(setTeacher(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>ผู้บันทึก : </b></label>
                                        <div class="col-lg-5">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={training.name}
                                                onChange={e => dispatch(setTrainingName(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"> </label>
                                        <div class="col-lg-4">
                                           
                                        </div>
                                        <div class="col-lg-3">  
                                            <button className='btn btn-primary' onClick={saveTraining}>SAVE</button>
                                            &nbsp;<Link className='btn btn-warning' to="/training">BACK</Link>
                                        </div> 
                                    </div>  
                                    <hr/>
                                    <div class="form-group row">
                                      <label class="col-lg-10 col-form-label"> 
                                        <h2 style={{color:'blue'}}>พนักงานที่เข้าฝึกอบรม </h2>
                                      </label>
                                      <div class="col-lg-2 mt-4">
                                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-xl" onClick={addmember}>
                                            ADD MEMBER
                                        </button>
                                      </div>
                                    </div>
                                    <div class="modal fade bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
                                      <div class="modal-dialog modal-xl" role="document">
                                        <div class="modal-content">
                                          <div class="modal-header">
                                              <h5 class="modal-title" id="exampleModalLabel">ADDMEMBER</h5>
                                              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                  <span aria-hidden="true">&times;</span>
                                              </button>
                                          </div>
                                          <div class="modal-body">
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
                                                </div> 
                                            </div>
                                            {employeeStatus === 'loading' ?
                                                <h2>Loading...</h2>
                                            :employeeStatus === 'succeeded' ?
                                            <table class="table table-bordered">
                                                <thead class="thead-dark">
                                                  <tr>
                                                    <th>#</th>
                                                    <th>EMPLOYEE ID</th>
                                                    <th>NAME</th>
                                                    <th>DEPARTMENT</th>
                                                    <th>POSITION</th>
                                                    <th>ADD</th>
                                                  </tr>
                                                </thead>
                                                {employee.employee?.map((pd,index) =>
                                                <tbody>
                                                  <tr>
                                                    <td>
                                                        {offset === 1 ? 
                                                            index+1 :
                                                        offset > 1 ?
                                                            index+((offset-1)*15)+1
                                                        :
                                                        index+1}
                                                    </td>
                                                    <td>{pd.employee_id}</td>
                                                    <td> {pd.prefix === 'MR.' ? 
                                                        'นาย'
                                                        :pd.prefix === 'MRS.' ?
                                                        'นาง'
                                                        :pd.prefix === 'Miss.' ?
                                                        'นางสาว'
                                                        :null} {pd.name} {pd.last_name}
                                                    </td>
                                                    <td>
                                                      {pd.department}
                                                    </td>
                                                    <td>{pd.position}</td>
                                                    <td>
                                                    {location.state.id !== 0 ?
                                                      <button type="button" class="btn btn-info" data-dismiss="modal" onClick={saveMember(pd)}>เพิ่ม</button>
                                                    :
                                                      <button type="button" class="btn btn-info" data-dismiss="modal" onClick={addMemberToList(pd)}>ADD</button>
                                                    }
                                                    </td>
                                                  </tr>
                                                </tbody>
                                                 )}
                                            </table>
                                            :<p>{error}</p>}
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
                                          <div class="modal-footer">
                                              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <br />
                                    <div className="table-responsive"> 
                                        <table className="table table-bordered">
                                            <thead class='thead-dark'>
                                                <tr>
                                                    <th>#</th>
                                                    <th>ชื่อ - สกุล</th>
                                                    <th>แผนก</th>
                                                    <th>ตำแหน่ง</th>
                                                    <th>ผลการประเมิน</th>
                                                    <th>หมายเหตุ</th>
                                                    <th>Remove</th>
                                                </tr>  
                                            </thead>
                                            {member_choose.map((pd,index) =>
                                              <tbody>
                                                <tr>
                                                  <td>{pd.emp_id}</td>
                                                  <td>{pd.name} {pd.last_name}</td>
                                                  <td>{pd.department}</td>
                                                  <td>{pd.position}</td>
                                                  <td>
                                                    {pd.results === null ?
                                                    <p>
                                                      <button type="button" class="btn btn-primary" onClick={accept(pd)}>ผ่าน</button>&nbsp;
                                                      <button type="button" class="btn btn-danger" onClick={openRejectModal(pd)}>ไม่ผาน</button>
                                                      <Modal size="xl" show={rejectModal === 1} onHide={closeRejectModal}>
                                                        <Modal.Header >
                                                        <Modal.Title>ไม่ผ่านการอบรม เนื่องจาก</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>                           
                                                        <div className="col-lg-12 form-group">
                                                            <div class="form-group row">
                                                                <label class="col-lg-2 col-form-label"><b>หมายเหตุ : </b></label>
                                                                <div class="col-lg-6">
                                                                    <input type="text" 
                                                                        class="form-control" 
                                                                        name="search" 
                                                                        value={remark}
                                                                        onChange={e => setRemark(e.target.value)}
                                                                        autoFocus/>
                                                                </div>
                                                                <div class="col-lg-3">  
                                                                    <button className='btn btn-primary' onClick={reject}>SAVE</button>
                                                                </div> 
                                                            </div> 
                                                        </div>    
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                        <Button variant="secondary" onClick={closeRejectModal}>
                                                            Close
                                                        </Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                    </p>
                                                    :
                                                      pd.results === true ?
                                                        <i class="fa fa-check" style={{color:'green'}} aria-hidden="true"></i>
                                                      :
                                                      <i class="fa fa-times" style={{color:'red'}} aria-hidden="true"></i>
                                                    }
                                                    
                                                  </td>
                                                  <td>{pd.remark}</td>
                                                  <td>
                                                    {location.state.id !== 0 ?
                                                      pd.results === null ?
                                                        <button type="button" class="btn btn-danger" onClick={deleteMemberFromList(pd)}>Delete</button>
                                                      :
                                                        null  
                                                    :
                                                      <button type="button" class="btn btn-danger" onClick={removeMemberFromList(index)}>Remove</button>
                                                    }
                                                  </td>
                                                </tr>
                                              </tbody>
                                            )}
                                        </table>
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