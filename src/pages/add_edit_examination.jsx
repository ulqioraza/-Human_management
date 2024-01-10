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
import { fetchEmployee, getEmployeeError, getEmployeeStatus, selectAllEmployee, setEmpState } from '../libs/employeeSlice';
import { GetExaminationById, GetExaminationMemberById, addMember, deleteMember, fetchApiExaminationGroup, fetchApiExaminationTitle, getAllExaminationGroup, getAllExaminationGroupStatus, getAllExaminationTitle, getAllExaminationTitleStatus, getExaminationById, getExaminationMemberById, getExm, getExmMember, getExmState, getInputExmState, removeMember, saveExaminationThunk, saveMemberToExam, setExaminationDate, setExaminationGroup, setExaminationTitle, setExmState, setInspector, updatePassMember } from '../libs/examinationSlice';

var firstload = true
export function Add_Edit_Examination() {
  const history = useNavigate();
  const location = useLocation();
  const menu = useSelector((state) => state.counter.menu)
  const dispatch = useDispatch()
  const examination = useSelector(getExaminationById);
  const exmState = useSelector(getExmState);
  const inputExmState = useSelector(getInputExmState);
  const eg_group = useSelector(getAllExaminationGroup)
  const et_group = useSelector(getAllExaminationTitle)
  const exm_group_status = useSelector(getAllExaminationGroupStatus)
  const exm_title_status = useSelector(getAllExaminationTitleStatus)
  const [showModal, setShowModal] = useState(0)
  const employee = useSelector(selectAllEmployee)
  const employeeStatus = useSelector(getEmployeeStatus);
  const [search, setSearch] = useState('')
  const [offset, setOffset] = useState();
  const member_choose = useSelector(getExaminationMemberById)
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
  
  let examination_group = eg_group.map(function (pd) {
    return { value: pd.id, label: pd.name };
  }) 

  let examination_title = et_group.map(function (pd) {
    return { value: pd.id, label: pd.name, group: pd.examination_group_id };
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
    if (exm_group_status === 'idle') {
      dispatch(fetchApiExaminationGroup());
    }
  }, [exm_group_status, dispatch]);

  React.useEffect(() => {
    dispatch(getToken())
    if (exm_title_status === 'idle') {
      dispatch(fetchApiExaminationTitle());
    }
  }, [exm_title_status, dispatch]);

  React.useEffect(() => {
    dispatch(getToken())
    if (exmState === 'idle') {
      if(location.state.id !== 0){
        //alert(JSON.stringify(location.state.id))
        dispatch(GetExaminationById(location.state.id))
        dispatch(GetExaminationMemberById(location.state.id))
      }else{
        dispatch(getExm())
        dispatch(getExmMember())
        dispatch(setExaminationDate(''))
        dispatch(setInspector(''))
        dispatch(setExaminationTitle(null))
        dispatch(setExaminationGroup(null))
      }
    }else if(exmState === 'succeeded'){
        alert("บันทึกเรียบร้อย")
        dispatch(setExmState())
        window.location.replace('#/examination')
    }
  }, [exmState, dispatch, inputExmState]);

  const searchClick = (e) => {
    dispatch(fetchEmployee({'search':search,'offset':offset, 'stat' : checked}));
  };

  const setEG = selectedOption => {
    dispatch(setExaminationGroup(selectedOption.value))
  }

  const setET = selectedOption => {
    dispatch(setExaminationTitle(selectedOption.value))
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
    if (window.confirm('ลบพนักงานนี้ออกจากการตรวจ ใช่ หรือ ไม่')) {
      await dispatch(deleteMember(value.id));
      dispatch(GetExaminationMemberById(location.state.id))
    }else{

    }
  }
  const saveMember = value=> async e => {
    //alert(JSON.stringify(value))
    if (window.confirm('เพิ่มพนักงานในการตรวจนี้ ใช่ หรือ ไม่')) {
      if(member_choose.find(obj=>obj.emp_id === value.id)){
        alert("พนักงานอยู่ในลิสแล้ว")
      }else{
        await dispatch(saveMemberToExam({'emp_id':value.id, 'exam_id':location.state.id}));
        dispatch(GetExaminationMemberById(location.state.id))
      }
      
    }else{

    }
  }

  const accept = value=> async e => {
    if (window.confirm('ผลตรวจผ่าน ใช่ หรือ ไม่')) {
      await dispatch(updatePassMember({'id':value.id, 'status': true}));
      dispatch(GetExaminationMemberById(location.state.id))
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
    if (window.confirm('ผลตรวจไม่ผ่าน ใช่ หรือ ไม่')) {
      setRejectModal(0)
      await dispatch(updatePassMember({'id':emp_id, 'status': false, 'remark': remark}));
      dispatch(GetExaminationMemberById(location.state.id))
    }else{

    }
  }
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
    dispatch(fetchEmployee({'search':search,'offset':selectedPage + 1, 'stat' : checked}));
  };

  const saveExamination = (e) => {
    dispatch(saveExaminationThunk({'data':examination,'id':examination.id, 'data_item': member_choose}));
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
                            <li class="breadcrumb-item active">Add Edit Examination</li>
                        </ol>
                        <hr/>
                        <div id="content">
                            {/* <!-- Topbar --> */}
                                {/* <!-- End of Topbar --> */}
                            <div className="container-fluid">
                                {/* <!-- Page Heading --> */}
                                <div className="col-lg-12 form-group">
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>ประเภทการตรวจ : </b></label>
                                        <div class="col-lg-6">
                                            <Select 
                                                value = {examination_group.filter(obj=>obj.value === examination.examination_group_id)}
                                                onChange={setEG}
                                                labelKey='prefix'
                                                valueKey='id'
                                                options={examination_group}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                selectedOption={examination.examination_group_id}                
                                            /> 
                                        </div>
                                        
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>หัวข้อการตรวจ : </b></label>
                                        <div class="col-lg-6">
                                          {examination.examination_group_id !== null ? 
                                            <Select 
                                              value = {examination_title.filter(obj=>obj.value === examination.examination_title_id)}
                                              onChange={setET}
                                              labelKey='prefix'
                                              valueKey='id'
                                              options={examination_title.filter(obj=>obj.group === examination.examination_group_id)}
                                              menuPlacement="auto"
                                              menuPosition="fixed" 
                                              selectedOption={examination.examination_group_id}                
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
                                        <label class="col-lg-2 col-form-label"><b>วันที่ตรวจ : </b></label>
                                        <div class="col-lg-5">
                                            <input type="date" 
                                                class="form-control" 
                                                name="search" 
                                                value={Moment(examination.examination_date).format('yyyy-MM-DD')}
                                                onChange={e => dispatch(setExaminationDate(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        
                                    </div>
                                   
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"><b>ผู้ตรวจ : </b></label>
                                        <div class="col-lg-5">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={examination.inspector}
                                                onChange={e => dispatch(setInspector(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"> </label>
                                        <div class="col-lg-4">
                                           
                                        </div>
                                        <div class="col-lg-3">  
                                            <button className='btn btn-primary' onClick={saveExamination}>SAVE</button>
                                            &nbsp;<Link className='btn btn-warning' to="/examination">BACK</Link>
                                        </div> 
                                    </div>  
                                    <hr/>
                                    <div class="form-group row">
                                      <label class="col-lg-10 col-form-label"> 
                                        <h2 style={{color:'blue'}}>พนักงานที่เข้าตรวจ </h2>
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
                                                    <th>ผลการตรวจ</th>
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
                                                        <Modal.Title>เนื่องจาก</Modal.Title>
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