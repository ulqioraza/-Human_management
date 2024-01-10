import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Sidebar } from '../Navigation/Sidebar'
import ReactPaginate from 'react-paginate';
import Moment from 'moment';
import { Topbar } from '../Navigation/Topbar'
import { Link } from 'react-router-dom';
import { fetchApiOffenceTitle, getAllOffenceTitle, getOffenceTitleError, getOffenceTitleStatus, setOffencetitleState } from '../libs/examinationSlice';
import { getToken } from '../libs/departmentSlice';

var firstload = true
export function Offence_Title() {
  const human = "/human_management"
  const menu = useSelector((state) => state.counter.menu)
  const dispatch = useDispatch()
  const offence_title = useSelector(getAllOffenceTitle);
  const offence_title_status = useSelector(getOffenceTitleStatus);
  const offenct_title_error = useSelector(getOffenceTitleError);
  const [search, setSearch] = useState('')
  const [offset, setOffset] = useState();
  const date = Date.now()
  //const [todoTitle, setTodoTitle] = useState('')

  useEffect(() => {
    dispatch(getToken())
        if (offence_title_status === 'idle') {    
            dispatch(fetchApiOffenceTitle(search));
        }
  }, [offence_title_status, dispatch, search]);

  const searchClick = (e) => {
    dispatch(fetchApiOffenceTitle(search));
  };
  
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
                                <li class="breadcrumb-item active">หัวข้อความผิด</li>
                        </ol>
                        <hr/>
                        <div id="content">
                            {/* <!-- Topbar --> */}
                                {/* <!-- End of Topbar --> */}
                            <div className="container-fluid">
                                {/* <!-- Page Heading --> */}
                                <div className="col-lg-12 form-group">
                                    <div class="form-group row">
                                        <label class="col-lg-1 col-form-label"><b>SEARCH : </b></label>
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
                                        <div class="col-lg-2">
                                        {/*<Link class="btn btn-info" to={{
                                                                    pathname: human + "/add_edit_department",
                                                                        id: 0,
                                                                     }} >ADD NEW DEPARTMENT
                                        </Link>*/}  
                                        <Link className='btn btn-info' to="/add_edit_offence_title" state={{id:0}}>เพิ่มหัวข้อความผิด
                                        </Link>
                                        </div>
                                    </div> 
                                </div>
                                {/* <!-- Content Row --> */}
                                <div className="col-lg-12 form-group">
                                    {offence_title_status === 'loading' ?
                                        <h2>Loading...</h2>
                                    :offence_title_status === 'succeeded' ?
                                    <div className="table-responsive"> 
                                        <table className="table table-bordered">
                                            <thead class='thead-dark'>
                                                <tr>
                                                    <th>#</th>
                                                    <th>หัวข้อความผิด</th>
                                                    <th>Action</th>
                                                </tr>  
                                            </thead>
                                            {offence_title.offence_title?.map((pd,index) =>
                                                <tbody>
                                                    <td>
                                                    {offset === 1 ? 
                                                        index+1 :
                                                    offset > 1 ?
                                                        index+((offset-1)*15)+1
                                                    :
                                                        index+1}
                                                    </td>
                                                    <td>{pd.name}</td>
                                                    <td>
                                                    {/*<Link to={{
                                                                    pathname: human + "/add_edit_department",
                                                                        id: pd.id,
                                                                     }} ><i class="fa fa-cog" aria-hidden="true"></i>
                                                    </Link> */}  
                                                    <Link className='btn btn-info' to="/add_edit_offence_title" state={{id:pd.id}}><i class="fa fa-cog" aria-hidden="true"></i>
                                                    </Link>
                                                    </td>
                                                </tbody>
                                            )}
                                        </table>
                                    </div>
                                    :
                                    <p>{offenct_title_error}</p>}
                                </div>
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