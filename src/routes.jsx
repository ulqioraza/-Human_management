import React from "react";
import {
  HashRouter ,
    Routes, // instead of "Switch"
    Route,
} from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import Login from "./pages/login";
import { Department } from "./pages/Department";
import { Position } from "./pages/Position";
import { Add_Edit_Department } from "./pages/add_edit_department";
import { Add_Edit_Position } from "./pages/add_edit_position";
import { Employee } from "./pages/Employee";
import { Add_Edit_Employee } from "./pages/add_edit_employee";
import { Add_Absend } from "./pages/add_absend";
import { Employee_Absend_by_date } from "./pages/report/employee_absend_by_date";
import { Sub_Department } from "./pages/Sub_Department";
import { Add_Edit_Sub_Department } from "./pages/add_edit_sub_department";
import { Admin_Dep_Employeee } from "./pages/admin_dep_employee";
import { Absend_status_check } from "./pages/absend_status_check";
import { Add_Absend_office } from "./pages/add_absend_office";
import { Employee_info } from "./pages/employee_data";
import { Training } from "./pages/Training";
import { Add_Edit_Training } from "./pages/add_edit_training";
import { Training_group } from "./pages/Training_group";
import { Add_Edit_Training_Group } from "./pages/add_edit_training_group";
import { Training_title } from "./pages/Training_title";
import { Add_Edit_Training_Title } from "./pages/add_edit_training_title";
import { Examination_group } from "./pages/Examination_group";
import { Add_Edit_Examination_Group } from "./pages/add_edit_examination_group";
import { Examination_title } from "./pages/Examination_title";
import { Add_Edit_Examination_Title } from "./pages/add_edit_examination_title";
import { Examination } from "./pages/Examination";
import { Add_Edit_Examination } from "./pages/add_edit_examination";
import { Add_Offence } from "./pages/add_offence";
import { Offence_Title } from "./pages/Offence_Title";
import { Add_Edit_Offence_title } from "./pages/add_edit_offence_title";

const Routez = () => (
    <HashRouter basename="/">
      <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/department" element={<Department />} />
        <Route path="/sub_department" element={<Sub_Department />} />
        <Route path="/position" element={<Position />} />
        <Route path="/add_edit_department" element={<Add_Edit_Department />} />
        <Route path="/add_edit_position" element={<Add_Edit_Position />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/add_edit_employee" element={<Add_Edit_Employee />} />
        <Route path="/employee_info" element={<Employee_info />} />
        <Route path="/add_absend" element={<Add_Absend/>}/>
        <Route path="/add_absend_office" element={<Add_Absend_office/>}/>
        <Route path="/emp_absend_by_dep" element={<Employee_Absend_by_date/>}/>
        <Route path="/add_edit_sub_department" element={<Add_Edit_Sub_Department />} />
        <Route path="/admin_dep_employee" element={<Admin_Dep_Employeee />} />
        <Route path="/absend_status_check" element={<Absend_status_check/>}/>
        <Route path="/training" element={<Training />} />
        <Route path="/training_group" element={<Training_group />} />
        <Route path="/add_edit_training" element={<Add_Edit_Training />} />
        <Route path="/add_edit_training_group" element={<Add_Edit_Training_Group />} />
        <Route path="/training_title" element={<Training_title />} />
        <Route path="/add_edit_training_title" element={<Add_Edit_Training_Title />} />
        <Route path="/examination_group" element={<Examination_group />} />
        <Route path="/add_edit_examination_group" element={<Add_Edit_Examination_Group />} />
        <Route path="/examination_title" element={<Examination_title />} />
        <Route path="/add_edit_examination_title" element={<Add_Edit_Examination_Title />} />
        <Route path="/examination" element={<Examination />} />
        <Route path="/add_edit_examination" element={<Add_Edit_Examination />} />
        <Route path="/add_offence" element={<Add_Offence/>}/>
        <Route path="/offence_title" element={<Offence_Title />} />
        <Route path="/add_edit_offence_title" element={<Add_Edit_Offence_title />} />
      </Routes>
    </HashRouter >
);

export default Routez;
