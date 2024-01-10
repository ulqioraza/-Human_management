import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Sidebar } from '../Navigation/Sidebar'
import Moment from 'moment';
import  Select  from 'react-select'
import { Topbar } from '../Navigation/Topbar'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GetAbsendEmpByEmpId, GetEmpById, GetExmEmpByEmpId, GetFileEmpByEmpId, 
        GetOffenceEmpByEmpId, 
        GetTrainEmpByEmpId, 
        fetchGetGender, fetchGetNationality, fetchGetPrefix, 
        getAbsendEmployeeById, getAllGender, getAllNationality, 
        getAllPrefix, getEmp, getEmpState, getEmpleyeeById, 
        getExmEmpByEmpId, 
        getFileEmpleyeeById, getGenStatus, getInputState, getNaError, 
        getNaStatus, getOffenceEmployeeById, getPreError, getPreStatus, getTrainEmpleyeeById, rejectAbsend, 
        saveEmployeeThunk, setAddress, setBirthDate, setBloodGroup, setDepartment, 
        setDistrict, setEmpName, setEmpState, setGender, setIdentityID, 
        setLastName, setNationality, setNickName, setPosition, setPostCode, 
        setPrefix, setReligion, setStd, setSubDepartment, setSubDistrict, setTel } from '../libs/employeeSlice';
import { fetchGetDep, getAllDep, getAllStatus, getRocketsError, getToken } from '../libs/departmentSlice';
import { fetchGetPos, getAllPos, getAllPosStatus } from '../libs/positionSlice';
import fileDownload from 'js-file-download'
import axios from 'axios';
import { Button,Modal } from 'react-bootstrap'
import { fetchGetSubDep, getAllSubDep, getAllSubStatus } from '../libs/sub_departmentSlice';
import Print_Offence_Data from './service/print_service/print_offece_data';
import Print_Absend_History from './service/print_service/print_absend_history';
import Print_Training_by_Emp from './service/print_service/print_training_by_emp';
import Print_Examination_by_Emp from './service/print_service/print_examination_by_emp';
import Print_Offence_by_Emp from './service/print_service/print_offence_by_emp';

var firstload = true
export function Add_Edit_Employee() {
  const media = window.server + "/media/employee/"
  const history = useNavigate();
  const location = useLocation();
  const menu = useSelector((state) => state.counter.menu)
  const dispatch = useDispatch()
  const emp = useSelector(getEmpleyeeById);
  const file_emp = useSelector(getFileEmpleyeeById)
  const absend_his = useSelector(getAbsendEmployeeById)
  const train_his = useSelector(getTrainEmpleyeeById)
  const exm_his = useSelector(getExmEmpByEmpId)
  const offence_his = useSelector(getOffenceEmployeeById)
  const dep = useSelector(getAllDep)
  const sub_dep = useSelector(getAllSubDep)
  const pos = useSelector(getAllPos)
  const national = useSelector(getAllNationality)
  const pre = useSelector(getAllPrefix)
  const national_status = useSelector(getNaStatus)
  const pre_status = useSelector(getPreStatus)
  const na_error = useSelector(getNaError)
  const pre_error = useSelector(getPreError)
  const dep_status = useSelector(getAllStatus)
  const sub_dep_status = useSelector(getAllSubStatus)
  const pos_status = useSelector(getAllPosStatus)
  const error = useSelector(getRocketsError)
  const empState = useSelector(getEmpState);
  const inputState = useSelector(getInputState);
  const [tab_state, setTabState] =useState(0)
  const [filename , setfileName] = useState('')
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState();
  const [currentFile, setCurrentFile] = useState(undefined);
  const date = Date.now()
  const [showModal, setShowModal] = useState(0)
  const [empChoose, setEmpChoose] = useState([])
  const [image, setImage] = useState();
  const gender = useSelector(getAllGender)
  const gen_status = useSelector(getGenStatus)
  const username = localStorage.getItem('username')
  const token = localStorage.getItem('accessToken')

  let gender_list = gender.map(function (pd) {
    return { value: pd.id, label: pd.name };
  })

  //const [todoTitle, setTodoTitle] = useState('')
  let department = dep.map(function (pd) {
    return { value: pd.id, label: pd.name };
  }) 

  let sub_department = sub_dep.map(function (pd) {
    return { value: pd.id, label: pd.name };
  }) 

  let position = pos.map(function (pd) {
    return { value: pd.id, label: pd.name };
  }) 

  let nationality = national.map(function (pd) {
    return { value: pd.id, label: pd.name };
  }) 

  let prefix = pre.map(function (pd) {
    return { value: pd.id, label: pd.name };
  }) 
  
  React.useEffect(() => {
    if (gen_status === 'idle') {
      dispatch(fetchGetGender());
    }
  }, [gen_status, dispatch]);

  React.useEffect(() => {
    dispatch(getToken())
    if (sub_dep_status === 'idle') {
      dispatch(fetchGetSubDep());
    }
  }, [sub_dep_status, dispatch]);

  React.useEffect(() => {
    dispatch(getToken())
    if (dep_status === 'idle') {
      dispatch(fetchGetDep());
    }
  }, [dep_status, dispatch]);

  React.useEffect(() => {
    if (pos_status === 'idle') {
      dispatch(fetchGetPos());
    }
  }, [pos_status, dispatch]);

  React.useEffect(() => {
    if (national_status === 'idle') {
      dispatch(fetchGetNationality());
    }
  }, [national_status, dispatch]);

  React.useEffect(() => {
    if (pre_status === 'idle') {
      dispatch(fetchGetPrefix());
    }
  }, [pre_status, dispatch]);

  React.useEffect(() => {
      if (empState === 'idle') {
        dispatch(getEmp())
        if(location.state.id !== 0){
          //alert(JSON.stringify(location.state.id))
          dispatch(GetEmpById(location.state.id))
          dispatch(GetFileEmpByEmpId(location.state.id))
          dispatch(GetAbsendEmpByEmpId(location.state.id))
          dispatch(GetTrainEmpByEmpId(location.state.id))
          dispatch(GetExmEmpByEmpId(location.state.id))
          dispatch(GetOffenceEmpByEmpId(location.state.id))
        }else{
          dispatch(getEmp())
        }
      }else if(empState === 'succeeded'){
          alert("บันทึกเรียบร้อย")
          dispatch(setEmpState())
          dispatch(getEmp())
          window.location.replace('#/employee')
      }
  }, [empState, dispatch, inputState]);

  const setDep = selectedOption => {
    dispatch(setDepartment(selectedOption.value))
  }

  const setSubDep = selectedOption => {
    dispatch(setSubDepartment(selectedOption.value))
  }

  const setPos = selectedOption => {
    dispatch(setPosition(selectedOption.value))
  }

  const setNa = selectedOption => {
    dispatch(setNationality(selectedOption.value))
  }

  const setPre = selectedOption => {
    dispatch(setPrefix(selectedOption.value))
  }

  const setTabSwap =  value => () =>{
    setTabState(value)  
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  };

  const handleSubmit = async e => {
      e.preventDefault();
      let form_data = new FormData();
      setProgress(0);
      setCurrentFile(file);
      let file_type = file.name.split(".")[file.name.split(".").length-1]
      let ori_file_name = filename + '_' + emp.employee_id + '.' + file_type
      let file_name = filename + '.' + file_type 
      form_data.append('original_filename', file, ori_file_name);
      form_data.append('filename', file_name);
      form_data.append('ori_file_name', ori_file_name);
      form_data.append('emp_id', location.state.id);
      await fetch(window.server + '/upload_file_employee', { // Your POST endpoint
              method: 'POST',
              headers: {
                'Authorization': 'Bearer ' +  token,
              },
              body: form_data
            }).then(
              response => response.json() // if the response is a JSON object
            ).then(
              setProgress(100) // Handle the success response object
            ).catch(
              error => console.log(error) // Handle the error response object
            );
      dispatch(GetFileEmpByEmpId(location.state.id))
  }

  const handlePDFDownload = value => e => {
    axios.post(window.server + '/download_fileEmp', value,{ 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  token
      },
        responseType: 'blob',
    }).then(res => {
        fileDownload(res.data, value);
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
  }

  const setGen = selectedOption => {
    dispatch(setGender(selectedOption.value))
  }

  const saveEmployee = (e) => {
    dispatch(saveEmployeeThunk({'emp':emp, 'username': username}));
  }

  const uploadShowModal = value =>() => {
    setShowModal(1)
    setEmpChoose(value)
  }

  const closeUploadModal = () => {
    setShowModal(0)
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  };

  const handleImageSubmit = async e => {
    e.preventDefault();
    let form_data = new FormData();
    setProgress(0);
    setCurrentFile(form_data);
    form_data.append('image', image, emp.employee_id + '.jpg');
    form_data.append('title', emp.employee_id);
    form_data.append('content', emp.id);
    await fetch(window.server + '/upload_emp_image', { // Your POST endpoint
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' +  token,
            },
            body: form_data
          }).then(
            response => response.json() // if the response is a JSON object
          ).then(
            setProgress(100) // Handle the success response object
          ).catch(
            error => console.log(error) // Handle the error response object
          );
    setShowModal(0)
    window.location.replace('#/employee')
  }

  const deleteFile = value=> async e => {
    if (window.confirm('ต้องลบไฟล์นี้ ใช่ หรือ ไม่')) {
      await fetch(window.server + '/delete_file_employee', { // Your POST endpoint
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' +  token,
        },
        body: JSON.stringify({'file_id':value.id, 'file_name': value.file_name})
      }).then(
        response => response.json() // if the response is a JSON object
      ).then(
        setProgress(100) // Handle the success response object
      ).catch(
        error => console.log(error) // Handle the error response object
      );
      dispatch(GetFileEmpByEmpId(location.state.id))
    }else{

    }
    
  }
  const reject = value=> async e => {
    if (window.confirm('ยกเลิกการลา ใช่ หรือ ไม่')) {
        alert(JSON.stringify(value.id))
        await dispatch(rejectAbsend({'id':value.id, 'status': value.status_id, 'username': username}));
        dispatch(absendStatusCheck());
    }else{

    }
    
  }
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
                            <li class="breadcrumb-item active">Add Edit Employee</li>
                        </ol>
                        <hr/>
                        <div id="content">
                            {/* <!-- Topbar --> */}
                                {/* <!-- End of Topbar --> */}
                            <div className="container-fluid">
                                {/* <!-- Page Heading --> */}
                                <div className="col-lg-12 form-group">  
                                    <div class="form-group row">
                                        <div class="col-lg-2">
                                            <a href={media + emp.image_path } download={media + emp.image_path }><img src={media + emp.image_path } width={250} height={300} ></img></a>
                                        </div>
                                        <div class="col-lg-8">
                                        {location.state.id !== 0 ?
                                        <Button variant="primary" onClick={uploadShowModal(emp)}>
                                          UPLOAD IMAGE
                                        </Button>
                                        :null}
                                        <Modal size="xl" show={showModal === 1} onHide={closeUploadModal}>
                                            <Modal.Header >
                                                <Modal.Title>UPLOAD IMAGE</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                            {currentFile && (
                                              <div className="progress">
                                                <div
                                                  className="progress-bar progress-bar-info progress-bar-striped"
                                                  role="progressbar"
                                                  aria-valuenow={progress}
                                                  aria-valuemin="0"
                                                  aria-valuemax="100"
                                                  style={{ width: progress + "%" }}
                                                >
                                                  {progress}%
                                                </div>
                                              </div>
                                            )}
                                            <div class="form-group row">
                                              <label class="col-lg-2 col-form-label"><b>Employee ID : </b></label>
                                                  <div class="col-lg-3">
                                                      <input type="text" 
                                                          class="form-control" 
                                                          name="search" 
                                                          defaultValue={empChoose.employee_id}
                                                          readOnly/>
                                                  </div>
                                            </div>
                                            <div class="form-group row">
                                              <label class="col-lg-2 col-form-label"><b>NAME : </b></label>
                                                  <div class="col-lg-3">
                                                      <input type="text" 
                                                          class="form-control" 
                                                          name="search" 
                                                          defaultValue={empChoose.name + ' ' + empChoose.last_name}
                                                          readOnly/>
                                                  </div>
                                            </div>
                                            <form onSubmit={handleImageSubmit}>
                                            <div class="form-group row">
                                              <label class="col-lg-2 col-form-label"><b>UPLOAD IMAGE : </b></label>
                                                  <div class="col-lg-3">
                                                    <input type="file"
                                                            id="image"
                                                            accept="image/png, image/jpeg"  onChange={handleImageChange} required/>
                                                  
                                                  </div>
                                                  <div class="col-lg-3">
                                                      <input className='btn btn-primary' type="submit"/>
                                                  </div>
                                            </div>
                                            </form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                              <Button variant="secondary" onClick={closeUploadModal}>
                                                          Close
                                              </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        </div>
                                        <div className='col-lg-2'>
                                        <Link className='btn btn-danger' to="/employee">BACK</Link>
                                        </div>
                                    </div>
                                </div>
                                <ul class="nav nav-tabs">
                                    <li class="nav-item">
                                      {tab_state === 0 ?
                                        <a class="nav-link active" aria-current="page" >Information</a>
                                      :
                                        <a class="nav-link" onClick={setTabSwap(0)}>Information</a>
                                      }
                                        
                                    </li>
                                    {location.state.id !== 0 ?
                                    <li class="nav-item">
                                      {tab_state === 1 ?
                                        <a class="nav-link active" aria-current="page" >File List</a>
                                      :
                                        <a class="nav-link" onClick={setTabSwap(1)}>File List</a>
                                      }
                                    </li>
                                    :
                                    null}
                                     {location.state.id !== 0 ?
                                    <li class="nav-item">
                                      {tab_state === 2 ?
                                        <a class="nav-link active" aria-current="page" >Absend History</a>
                                      :
                                        <a class="nav-link" onClick={setTabSwap(2)}>Absend History</a>
                                      }
                                    </li>
                                    :null}
                                    {location.state.id !== 0 ?
                                    <li class="nav-item">
                                      {tab_state === 3 ?
                                        <a class="nav-link active" aria-current="page" >ประวัติการฝึกอบรม</a>
                                      :
                                        <a class="nav-link" onClick={setTabSwap(3)}>ประวัติการฝึกอบรม</a>
                                      }
                                    </li>
                                    :null}
                                    {location.state.id !== 0 ?
                                    <li class="nav-item">
                                      {tab_state === 4 ?
                                        <a class="nav-link active" aria-current="page" >ประวัติการตรวจสารเสพติด</a>
                                      :
                                        <a class="nav-link" onClick={setTabSwap(4)}>ประวัติการตรวจสารเสพติด</a>
                                      }
                                    </li>
                                    :null}
                                    {location.state.id !== 0 ?
                                    <li class="nav-item">
                                      {tab_state === 5 ?
                                        <a class="nav-link active" aria-current="page" >ประวัติการกระทำผิด</a>
                                      :
                                        <a class="nav-link" onClick={setTabSwap(5)}>ประวัติการกระทำผิด</a>
                                      }
                                    </li>
                                    :null}
                                </ul>
                                <br/>
                                {tab_state === 0 ?
                                <div className="col-lg-12 form-group">
                                    <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>Employee ID : </b></label>
                                        <div class="col-lg-6">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={emp.employee_id}
                                                onChange={e => dispatch(setNickName(e.target.value))}
                                                readOnly/>
                                        </div>
                                        
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>Name : </b></label>
                                        <div class="col-lg-1">
                                            <Select 
                                                value = {prefix.filter(obj=>obj.value === emp.prefix)}
                                                onChange={setPre}
                                                labelKey='prefix'
                                                valueKey='id'
                                                options={prefix}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                selectedOption={emp.prefix}                
                                            /> 
                                        </div>
                                        <div class="col-lg-3">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={emp.name}
                                                onChange={e => dispatch(setEmpName(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        <div class="col-lg-2">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={emp.last_name}
                                                onChange={e => dispatch(setLastName(e.target.value))}
                                                autoFocus/>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>Nick Name : </b></label>
                                        <div class="col-lg-2">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={emp.nickname}
                                                onChange={e => dispatch(setNickName(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        <label class="col-lg-1 col-form-label"><b>Birth Date : </b></label>
                                        <div class="col-lg-3">
                                            <input type="date" 
                                                class="form-control" 
                                                name="search" 
                                                value={Moment(emp.birth_date).format('yyyy-MM-DD')}
                                                onChange={e => dispatch(setBirthDate(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        <div class="col-lg-4">
                                          อายุ: {emp.birth_years} ปี {emp.birth_month} เดือน {emp.birth_days} วัน
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>Address : </b></label>
                                        <div class="col-lg-8">
                                            <textarea
                                                class="form-control" 
                                                name="search" 
                                                value={emp.address}
                                                onChange={e => dispatch(setAddress(e.target.value))}
                                                autoFocus/>
                                        </div>

                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>District : </b></label>
                                        <div class="col-lg-2">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={emp.district}
                                                onChange={e => dispatch(setDistrict(e.target.value))}
                                                autoFocus/>
                                        </div>

                                        <label class="col-lg-1 col-form-label"><b>Sub District : </b></label>
                                        <div class="col-lg-2">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={emp.sub_district}
                                                onChange={e => dispatch(setSubDistrict(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        <label class="col-lg-1 col-form-label"><b>Post Code : </b></label>
                                        <div class="col-lg-2">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={emp.post_code}
                                                onChange={e => dispatch(setPostCode(e.target.value))}
                                                autoFocus/>
                                        </div>
                                      </div>
                                      <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>Gender : </b></label>
                                        <div class="col-lg-2">
                                          <Select 
                                                value = {gender_list.filter(obj=>obj.value === emp.gender)}
                                                onChange={setGen}
                                                labelKey='gender_list'
                                                valueKey='id'
                                                options={gender_list}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                selectedOption={emp.gender}                 
                                            /> 
                                        </div>
                                        <label class="col-lg-1 col-form-label"><b>Blood Group : </b></label>
                                        <div class="col-lg-2">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={emp.blood_group}
                                                onChange={e => dispatch(setBloodGroup(e.target.value))}     
                                                autoFocus/>
                                        </div>
                                        <label class="col-lg-1 col-form-label"><b>Religion : </b></label>
                                        <div class="col-lg-2">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={emp.religion}
                                                onChange={e => dispatch(setReligion(e.target.value))}    
                                                autoFocus/>
                                        </div>
                                    </div>
                                      <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>Identity ID : </b></label>
                                        <div class="col-lg-2">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={emp.identity_id}
                                                onChange={e => dispatch(setIdentityID(e.target.value))}
                                                autoFocus/>
                                        </div>
                                        <label class="col-lg-1 col-form-label"><b>Tel : </b></label>
                                        <div class="col-lg-2">
                                            <input type="text" 
                                                class="form-control" 
                                                name="search" 
                                                value={emp.tel}
                                                onChange={e => dispatch(setTel(e.target.value))}
                                                autoFocus/>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>Nationality : </b></label>
                                        <div class="col-lg-3">
                                            <Select 
                                                value = {nationality.filter(obj=>obj.value === emp.nationality)}
                                                onChange={setNa}
                                                labelKey='nationality'
                                                valueKey='id'
                                                options={nationality}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                selectedOption={emp.nationality}                
                                            /> 
                                        </div>
                                        <label class="col-lg-2 col-form-label"><b>Department : </b></label>
                                        <div class="col-lg-3">
                                            <Select 
                                                value = {department.filter(obj=>obj.value === emp.department)}
                                                onChange={setDep}
                                                labelKey='department'
                                                valueKey='id'
                                                options={department}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                selectedOption={emp.department}                
                                            /> 
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>Position : </b></label>
                                        <div class="col-lg-3">
                                            <Select 
                                                value = {position.filter(obj=>obj.value === emp.position)}
                                                onChange={setPos}
                                                labelKey='position'
                                                valueKey='id'
                                                options={position}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                selectedOption={emp.position}                
                                            /> 
                                        </div>
                                        <label class="col-lg-2 col-form-label"><b>Sub Department : </b></label>
                                        <div class="col-lg-3">
                                            <Select 
                                                value = {sub_department.filter(obj=>obj.value === emp.sub_department)}
                                                onChange={setSubDep}
                                                labelKey='position'
                                                valueKey='id'
                                                options={sub_department}
                                                menuPlacement="auto"
                                                menuPosition="fixed" 
                                                selectedOption={emp.sub_department}                
                                            /> 
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>Start Work : </b></label>
                                        <div class="col-lg-2">
                                            <input type="date" 
                                                class="form-control" 
                                                name="search" 
                                                value={Moment(emp.std).format('yyyy-MM-DD')}
                                                onChange={e => dispatch(setStd(e.target.value))}
                                                />
                                        </div>
                                        <div class="col-lg-4">
                                          อายุงาน: {emp.years} ปี {emp.month} เดือน {emp.days} วัน
                                        </div>
                                    </div>
                                    <hr/>
                                    <div class="form-group row">
                                        <label class="col-lg-2 col-form-label"> </label>
                                        <div class="col-lg-5">
                                           
                                        </div>
                                        <div class="col-lg-3">  
                                            <button className='btn btn-primary' onClick={saveEmployee}>SAVE</button>
                                            &nbsp;
                                            <Link className='btn btn-warning' to="/employee">BACK</Link>
                                        </div> 
                                    </div>  
                                </div>
                                :tab_state === 1 ?
                                <div className="table-responsive">
                                  <form onSubmit={handleSubmit}>
                                    <div className="form-group row">
                                      <div className="col-sm-2 ml-3 mb-3 mb-sm-0">
                                        <label>FILE NAME : </label>
                                      </div>
                                      <div className="col-sm-6">
                                        <input type="text" 
                                               value={filename}
                                               className="form-control form-control-user" 
                                               id="exampleLastName" 
                                               onChange={e=>setfileName(e.target.value)}
                                               required
                                        />
                                      </div>
                                    </div>
                                    <div class="form-group row">
                                      <label class="col-lg-2 ml-3 mb-3 mb-sm-0">
                                          <b>UPLOAD FILE : </b>
                                      </label>
                                      <div class="col-lg-3">
                                          <input type="file"
                                                 id="file"
                                                 onChange={handleFileChange} required/>
                                      </div>
                                      <div class="col-lg-3">
                                        <input className='btn btn-primary' type="submit"/>
                                      </div>
                                    </div>
                                  </form>                                   
                                  <table className="table table-bordered">
                                      <thead class='thead-dark'>
                                          <tr>
                                              <th>#</th>
                                              <th>Description</th>
                                              <th>File Name</th>
                                              <th>Action</th>
                                          </tr>  
                                      </thead>
                                      {file_emp?.map((pd,index) =>
                                          <tbody>
                                              <td>{pd.id}</td>
                                              <td>{pd.description}</td>
                                              <td>{pd.file_name}</td>
                                              <td>
                                                <button type="button" class='btn btn-primary' onClick={handlePDFDownload(pd.file_name)}>
                                                                                    DOWNLOAD
                                                </button>
                                                &nbsp;
                                                <button type="button" class='btn btn-danger' onClick={deleteFile(pd)}>
                                                                                    DELETE
                                                </button>
                                              </td>
                                          </tbody>
                                      )}
                                  </table>
                              </div>
                              :tab_state === 2 ?
                              <div className="table-responsive">
                                <div className="form-group row">
                                      <div className="col-sm-9 ml-3 mb-3 mb-sm-0">
                                        <Print_Absend_History value={emp} user={'username'}></Print_Absend_History>
                                      </div>
                                      <div className="col-sm-2 ml-3 mb-3 mb-sm-0">
                                        <Link className='btn btn-primary' to="/add_absend" state={{id:emp.employee_id}}>บันทึกลา
                                        </Link>
                                      </div>
                                </div>
                                
                                 <br/>
                                <table className="table table-bordered">
                                  <thead class='thead-dark'>
                                    <tr>
                                        <th>#</th>
                                        <th>ประเภทการลา</th>
                                        <th>สาเหตุ</th>
                                        <th>จำนวนวัน</th>
                                        <th>วันที่เริ่มลา</th>
                                        <th>วันที่สิ้นสุดการลา</th>
                                        <th>สถานะ</th>
                                        <th>Action</th>
                                    </tr>  
                                  </thead>
                                  {absend_his?.map((pd,index) =>
                                  <tbody>
                                        <td>{index+1}</td>
                                        <td>{pd.absend_type}</td>
                                        <td>{pd.motive}</td>
                                        <td>{pd.date_amount}</td>
                                        <td>{Moment(pd.start_date).format('DD-MM-yyyy')}</td>
                                        <td>{Moment(pd.end_date).format('DD-MM-yyyy')}</td>
                                        <td>{pd.absend_status_name}</td>
                                        <td>
                                        {pd.absend_status_name === 'ถูกยกเลิก' ? 
                                        null
                                        :
                                          Moment(Date.now()).isBefore(pd.end_date) ?
                                            <button class='btn btn-danger' onClick={reject(pd)} title='พนักงานลาออก'>
                                              ยกเลิกการลา
                                            </button>
                                          :
                                            null
                                        }
                                        </td>
                                  </tbody>
                                      )}
                                </table>
                              </div>
                              :tab_state === 3 ?
                              <div className="table-responsive">
                                <div className="form-group row">
                                      <div className="col-sm-9 ml-3 mb-3 mb-sm-0">
                                        <Print_Training_by_Emp value={emp} user={'username'}></Print_Training_by_Emp>
                                      </div>
                                      <div className="col-sm-2 ml-3 mb-3 mb-sm-0">
                                        
                                      </div>
                                </div>
                                <table className="table table-bordered">
                                  <thead class='thead-dark'>
                                    <tr>
                                        <th>#</th>
                                        <th>ประเภท</th>
                                        <th>หัวข้อการฝึกอบรม</th>
                                        <th>สถานที่</th>
                                        <th>วันที่ฝึกอบรม</th>
                                        <th>วิทยากร</th>
                                        <th>ผลการประเมิน</th>
                                        <th>หมายเหตุ</th>
                                    </tr>  
                                  </thead>
                                  {train_his?.map((pd,index) =>
                                  <tbody>
                                        <td>{index+1}</td>
                                        <td>{pd.training_group}</td>
                                        <td>{pd.training_title}</td>
                                        <td>{pd.place}</td>
                                        <td>{Moment(pd.start_datetime).format('DD-MM-yyyy')}</td>
                                        <td>{pd.teacher}</td>
                                        <td>{pd.results === true ?
                                              <i class="fa fa-check" style={{color:'green'}} aria-hidden="true"></i>
                                            :pd.results === false ?
                                              <i class="fa fa-times" style={{color:'red'}} aria-hidden="true"></i>
                                            :null}
                                        </td>
                                        <td>{pd.remark}</td>
                                  </tbody>
                                      )}
                                </table>
                              </div>
                              :tab_state === 4 ?
                              <div className="table-responsive">
                                <div className="form-group row">
                                      <div className="col-sm-9 ml-3 mb-3 mb-sm-0">
                                        <Print_Examination_by_Emp value={emp} user={'username'}></Print_Examination_by_Emp>
                                      </div>
                                      <div className="col-sm-2 ml-3 mb-3 mb-sm-0">
                                        
                                      </div>
                                </div>
                                <table className="table table-bordered">
                                  <thead class='thead-dark'>
                                    <tr>
                                        <th>#</th>
                                        <th>ประเภทการตรวจ</th>
                                        <th>หัวข้อการตรวจ</th>
                                        <th>สถานที่</th>
                                        <th>วันที่ตรวจ</th>
                                        <th>ผู้ตรวจ</th>
                                        <th>ผลการตรวจ</th>
                                        <th>หมายเหตุ</th>
                                    </tr>  
                                  </thead>
                                  {exm_his?.map((pd,index) =>
                                  <tbody>
                                        <td>{index+1}</td>
                                        <td>{pd.examination_group}</td>
                                        <td>{pd.examination_title}</td>
                                        <td>{pd.place}</td>
                                        <td>{Moment(pd.examination_date).format('DD-MM-yyyy')}</td>
                                        <td>{pd.inspector}</td>
                                        <td>{pd.results === true ?
                                              <i class="fa fa-check" style={{color:'green'}} aria-hidden="true"></i>
                                            :pd.results === false ?
                                              <i class="fa fa-times" style={{color:'red'}} aria-hidden="true"></i>
                                            :null}
                                        </td>
                                        <td>{pd.remark}</td>
                                  </tbody>
                                      )}
                                </table>
                              </div>
                              :
                              <div className="table-responsive">
                                <div className="form-group row">
                                      <div className="col-sm-9 ml-3 mb-3 mb-sm-0">
                                        <Print_Offence_by_Emp value={emp} user={'username'}></Print_Offence_by_Emp>
                                      </div>
                                      <div className="col-sm-2 ml-3 mb-3 mb-sm-0">
                                        
                                      </div>
                                </div>
                                <table className="table table-bordered">
                                  <thead class='thead-dark'>
                                    <tr>
                                        <th>#</th>
                                        <th>วัน-เดือน-ปี</th>
                                        <th>หัวข้อการกระทำผิด</th>
                                        <th>สถานที่</th>
                                        <th>รายละเอียดการกระทำผิด</th>
                                        <th>ผลการลงโทษ</th>
                                        <th>ผู้บันทึก</th>
                                        <th>หมายเหตุ</th>
                                        <th>พิมพ์</th>
                                    </tr>  
                                  </thead>
                                  {offence_his?.map((pd,index) =>
                                  <tbody>
                                        <td>{index+1}</td>
                                        <td>{Moment(pd.offence_date).format('DD-MM-yyyy')}</td>
                                        <td>{pd.offence_title}</td>
                                        <td>{pd.place}</td>
                                        <td>{pd.offence_detail}</td>
                                        <td>
                                          {pd.offence_result_name} &nbsp;
                                          {pd.result_remark}</td>
                                        <td>{pd.create_user}</td>
                                        <td>{pd.remark}</td>
                                        <td>
                                          <Print_Offence_Data  value={pd} user={'username'}></Print_Offence_Data>
                                        </td>
                                  </tbody>
                                      )}
                                </table>
                              </div>
                              }
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