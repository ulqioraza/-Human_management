import React, { useState } from 'react'
import { updateMenu } from '../../libs/counterSlice'
import { useDispatch, useSelector } from 'react-redux'

export function Sidebar() {
  const dispatch = useDispatch()
  const menu = useSelector((state) => state.counter.menu)
  const group = localStorage.getItem('group')
  const department = localStorage.getItem('dep')
  const position = localStorage.getItem('position')
  const nation = localStorage.getItem('nation')

  return (
  //<body id="sb-nav-fixed">
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <a class="sidebar-brand d-flex align-items-center justify-content-center" href="#/dashboard">
        {/*<div class="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-laugh-wink"></i>
          </div>*/}
          <div class="mx-3">HUMAN MANAGEMENT</div>
      </a>
      <hr class="sidebar-divider my-0"/>
      
      <hr class="sidebar-divider"/>
      {group === 'Admin' || department === '15' || position === '1' || position === '2' || position === '5' || position === '33' || position === '32' ?
        <div class="sidebar-heading">
          Dashboard
        </div>
      :null}
      {group === 'Admin' || department === '15' || position === '1' || position === '2' || position === '5' || position === '33' || position === '32' ?
      <li class="nav-item">
        <a class="nav-link collapsed" href="#/dashboard" onClick={()=>dispatch(updateMenu('Dashboard'))}>
          <i class="fa fa-bell" aria-hidden="true" ></i>&nbsp;
          <span>Dashboard</span>
        </a>
      </li>
      :null}
      {group === 'Admin' || department === '15' ?
      <div class="sidebar-heading">
          MasterData
      </div>
      :null}
       {group === 'Admin' || department === '15' ?
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo">
          
          <span>MasterData</span>
        </a>
        {menu === 'Department' || menu === 'Positions'? 
        <div id="collapseTwo" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div class="collapse-inner">
            <a class="collapse-item"href="#/department" onClick={()=>dispatch(updateMenu('Department'))}>Department</a>
            <a class="collapse-item"href="#/sub_department" onClick={()=>dispatch(updateMenu('Department'))}>Sub Department</a>
            <a class="collapse-item"href="#/position" onClick={()=>dispatch(updateMenu('Positions'))}>Positions</a>
          </div>
        </div>
        :
        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div class="collapse-inner">
            <a class="collapse-item"href="#/department" onClick={()=>dispatch(updateMenu('Department'))}>Department</a>
            <a class="collapse-item"href="#/sub_department" onClick={()=>dispatch(updateMenu('Department'))}>Sub Department</a>
            <a class="collapse-item"href="#/position" onClick={()=>dispatch(updateMenu('Positions'))}>Positions</a>
          </div>
        </div>
        }
      </li>
      :null}
      {group === 'Admin' || department === '15' ?
      <div class="sidebar-heading">
          Training
      </div>
      :null}
      {group === 'Admin' || department === '15' ?
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTrain"
                    aria-expanded="true" aria-controls="collapseTrain">
          
          <span>Training</span>
        </a>
        {menu === 'Training' ? 
        <div id="collapseTrain" class="collapse show" aria-labelledby="headingTrain" data-parent="#accordionSidebar">
          <div class="collapse-inner">
            <a class="collapse-item"href="#/training_group" onClick={()=>dispatch(updateMenu('Training'))}>Training Group</a>
            <a class="collapse-item"href="#/training_title" onClick={()=>dispatch(updateMenu('Training'))}>Training Title</a>
            <a class="collapse-item"href="#/training" onClick={()=>dispatch(updateMenu('Training'))}>Training</a>
          </div>
        </div>
        :
        <div id="collapseTrain" class="collapse" aria-labelledby="headingTrain" data-parent="#accordionSidebar">
          <div class="collapse-inner">
            <a class="collapse-item"href="#/training_group" onClick={()=>dispatch(updateMenu('Training'))}>Training Group</a>
            <a class="collapse-item"href="#/training_title" onClick={()=>dispatch(updateMenu('Training'))}>Training Title</a>
            <a class="collapse-item"href="#/training" onClick={()=>dispatch(updateMenu('Training'))}>Training</a>
          </div>
        </div>
        }
      </li>
      :null}
      {group === 'Admin' || department === '15' ?
      <div class="sidebar-heading">
          Examination
      </div>
      :null}
      {group === 'Admin' || department === '15' ?
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseDrug"
                    aria-expanded="true" aria-controls="collapseDrug">
          
          <span> Examination</span>
        </a>
        {menu === 'Examination' ? 
        <div id="collapseDrug" class="collapse show" aria-labelledby="headingDrug" data-parent="#accordionSidebar">
          <div class="collapse-inner">
            <a class="collapse-item"href="#/examination_group" onClick={()=>dispatch(updateMenu('Examination'))}>ประเภทการตรวจ</a>
            <a class="collapse-item"href="#/examination_title" onClick={()=>dispatch(updateMenu('Examination'))}>หัวข้อการตรวจ</a>
            <a class="collapse-item"href="#/examination" onClick={()=>dispatch(updateMenu('Examination'))}>การตรวจสารเสพติด</a>
          </div>
        </div>
        :
        <div id="collapseDrug" class="collapse" aria-labelledby="headingDrug" data-parent="#accordionSidebar">
          <div class="collapse-inner">
            <a class="collapse-item"href="#/examination_group" onClick={()=>dispatch(updateMenu('Examination'))}>ประเภทการตรวจ</a>
            <a class="collapse-item"href="#/examination_title" onClick={()=>dispatch(updateMenu('Examination'))}>หัวข้อการตรวจ</a>
            <a class="collapse-item"href="#/examination" onClick={()=>dispatch(updateMenu('Examination'))}>การตรวจสารเสพติด</a>
          </div>
        </div>
        }
      </li>
      :null}
      {group === 'Admin' || department === '15' ?
      <div class="sidebar-heading">
          การกระทำผิด
      </div>
      :null}
      {group === 'Admin' || department === '15' ?
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseOffence"
                    aria-expanded="true" aria-controls="collapseOffence">
          
          <span> การกระทำผิด</span>
        </a>
        {menu === 'Offence' ? 
        <div id="collapseOffence" class="collapse show" aria-labelledby="headingOffence" data-parent="#accordionSidebar">
          <div class="collapse-inner">
            <a class="collapse-item" href="#/offence_title" onClick={()=>dispatch(updateMenu('Offence'))}>หัวข้อการกระทำผิด</a>
            <a class="collapse-item" href="#/add_offence" onClick={()=>dispatch(updateMenu('Offence'))}>บันทึกการกระทำผิด</a>
          </div>
        </div>
        :
        <div id="collapseOffence" class="collapse" aria-labelledby="headingOffence" data-parent="#accordionSidebar">
          <div class="collapse-inner">
            <a class="collapse-item" href="#/offence_title" onClick={()=>dispatch(updateMenu('Offence'))}>หัวข้อการกระทำผิด</a>
            <a class="collapse-item" href="#/add_offence" onClick={()=>dispatch(updateMenu('Offence'))}>บันทึกการกระทำผิด</a>
          </div>
        </div>
        }
      </li>
      :null}
      <div class="sidebar-heading">
          Human Management
      </div>
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseThree"
                    aria-expanded="true" aria-controls="collapseThree">
          
          <span>Human Resorcement</span>
        </a>
        {group === 'Admin' || department === '15' ?
          menu === 'Employee'? 
          <div id="collapseThree" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
              <nav className="collapse-inner">
              <a class="collapse-item" href="#/employee_info" onClick={()=>dispatch(updateMenu('Employee'))}>Employee Info</a>
                <a class="collapse-item" href="#/employee" onClick={()=>dispatch(updateMenu('Employee'))}>Employee</a>
                <a class="collapse-item" href="#/add_absend" onClick={()=>dispatch(updateMenu('Employee'))}>Add Absend</a>
                <a class="collapse-item" href="#/emp_absend_by_dep" onClick={()=>dispatch(updateMenu('Employee'))}>รายงานการลารายแผนก</a>
                <a class="collapse-item" href="#/admin_dep_employee" onClick={()=>dispatch(updateMenu('Employee'))}>บันทึกการลา admin แผนก</a>
                <a class="collapse-item" href="#/absend_status_check" onClick={()=>dispatch(updateMenu('Employee'))}>ตรวจสอบสถานะการลา</a>
                <a class="collapse-item" href="#/add_absend_office" onClick={()=>dispatch(updateMenu('Employee'))}>บันทึกขอลา</a>
              </nav>
          </div>
          :
          <div id="collapseThree" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
              <nav className="collapse-inner">
              <a class="collapse-item" href="#/employee_info" onClick={()=>dispatch(updateMenu('Employee'))}>Employee Info</a>
                <a class="collapse-item" href="#/employee" onClick={()=>dispatch(updateMenu('Employee'))}>Employee</a>
                <a class="collapse-item" href="#/add_absend" onClick={()=>dispatch(updateMenu('Employee'))}>Add Absend</a>
                <a class="collapse-item" href="#/emp_absend_by_dep" onClick={()=>dispatch(updateMenu('Employee'))}>รายงานการลารายแผนก</a>
                <a class="collapse-item" href="#/admin_dep_employee" onClick={()=>dispatch(updateMenu('Employee'))}>บันทึกการลา admin แผนก</a>
                <a class="collapse-item" href="#/absend_status_check" onClick={()=>dispatch(updateMenu('Employee'))}>ตรวจสอบสถานะการลา</a>
                <a class="collapse-item" href="#/add_absend_office" onClick={()=>dispatch(updateMenu('Employee'))}>บันทึกขอลา</a>
              </nav>
          </div>  
        :
          nation !== '1' ?
            menu === 'Employee'? 
            <div id="collapseThree" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <nav className="collapse-inner">
                  <a class="collapse-item" href="#/employee_info" onClick={()=>dispatch(updateMenu('Employee'))}>Employee Info</a>
                  {position !== '32'?
                    <p>
                      <a class="collapse-item" href="#/admin_dep_employee" onClick={()=>dispatch(updateMenu('Employee'))}>บันทึกการลา admin แผนก</a>
                      <a class="collapse-item" href="#/absend_status_check" onClick={()=>dispatch(updateMenu('Employee'))}>ตรวจสอบสถานะการลา</a>
                      <a class="collapse-item" href="#/emp_absend_by_dep" onClick={()=>dispatch(updateMenu('Employee'))}>รายงานการลารายแผนก</a>
                    </p>
                  :position === '1' || position === '2' || position === '5' || position === '33' || position === '32' ?
                    <a class="collapse-item" href="#/admin_dep_employee" onClick={()=>dispatch(updateMenu('Employee'))}>บันทึกการลา admin แผนก</a>
                  :null} 
                </nav>
            </div>
            :
            <div id="collapseThree" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <nav className="collapse-inner">
                  <a class="collapse-item" href="#/employee_info" onClick={()=>dispatch(updateMenu('Employee'))}>Employee Info</a>
                  {position !== '32'?
                    <p>
                      <a class="collapse-item" href="#/admin_dep_employee" onClick={()=>dispatch(updateMenu('Employee'))}>บันทึกการลา admin แผนก</a>
                      <a class="collapse-item" href="#/absend_status_check" onClick={()=>dispatch(updateMenu('Employee'))}>ตรวจสอบสถานะการลา</a>
                      <a class="collapse-item" href="#/emp_absend_by_dep" onClick={()=>dispatch(updateMenu('Employee'))}>รายงานการลารายแผนก</a>
                    </p>
                  :position === '1' || position === '2' || position === '5' || position === '33' || position === '32' ?
                    <a class="collapse-item" href="#/admin_dep_employee" onClick={()=>dispatch(updateMenu('Employee'))}>บันทึกการลา admin แผนก</a>
                  :null}  
                </nav>
            </div>
          :
            menu === 'Employee'? 
            <div id="collapseThree" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <nav className="collapse-inner">
                  <a class="collapse-item" href="#/employee_info" onClick={()=>dispatch(updateMenu('Employee'))}>Employee Info</a>
                  {position === '1' || position === '2' || position === '5' || position === '33' || position === '32' ?
                  <p>
                      <a class="collapse-item" href="#/add_absend_office" onClick={()=>dispatch(updateMenu('Employee'))}>บันทึกขอลา</a>
                      <a class="collapse-item" href="#/absend_status_check" onClick={()=>dispatch(updateMenu('Employee'))}>ตรวจสอบสถานะการลา</a>
                      <a class="collapse-item" href="#/emp_absend_by_dep" onClick={()=>dispatch(updateMenu('Employee'))}>รายงานการลารายแผนก</a>
                  </p>          
                  :
                  <a class="collapse-item" href="#/add_absend_office" onClick={()=>dispatch(updateMenu('Employee'))}>บันทึกขอลา</a>
                  } 
                </nav>
            </div>
            :
            <div id="collapseThree" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <nav className="collapse-inner">
                  <a class="collapse-item" href="#/employee_info" onClick={()=>dispatch(updateMenu('Employee'))}>Employee Info</a>
                  {position === '1' || position === '2' || position === '5' || position === '33' || position === '32' ?
                    <p>
                      <a class="collapse-item" href="#/add_absend_office" onClick={()=>dispatch(updateMenu('Employee'))}>บันทึกขอลา</a>
                      <a class="collapse-item" href="#/absend_status_check" onClick={()=>dispatch(updateMenu('Employee'))}>ตรวจสอบสถานะการลา</a>
                      <a class="collapse-item" href="#/emp_absend_by_dep" onClick={()=>dispatch(updateMenu('Employee'))}>รายงานการลารายแผนก</a>
                    </p>  
                  :
                  <a class="collapse-item" href="#/add_absend_office" onClick={()=>dispatch(updateMenu('Employee'))}>บันทึกขอลา</a>
                  }  
                </nav>
            </div>
        }
      </li>
    </ul>
   
//</body>
  )
}