import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Sidebar } from '../Navigation/Sidebar'
import ReactPaginate from 'react-paginate';
import Moment from 'moment';
import { Topbar } from '../Navigation/Topbar'
import { Link } from 'react-router-dom';
import { fetchSubDep, getSubDepError, getSubDepState, getSubDepStatus, getToken, selectAllSubDep } from '../libs/sub_departmentSlice';

var firstload = true
export function Sub_Department() {
  const human = "/human_management"
  const menu = useSelector((state) => state.counter.menu)
  const dispatch = useDispatch()
  const sub_dep= useSelector(selectAllSubDep);
  const sub_dep_state = useSelector(getSubDepStatus);
  const error = useSelector(getSubDepError);
  const [search, setSearch] = useState('')
  const [offset, setOffset] = useState();
  const date = Date.now()
  //const [todoTitle, setTodoTitle] = useState('')

  useEffect(() => {
    dispatch(getToken())
    if(!firstload){
        if (sub_dep_state === 'idle') {
            dispatch(fetchSubDep({'search':search,'offset':offset}));
        }
    }
    else{
        firstload = false
    }
  }, [sub_dep_state, dispatch, search, offset]);

  const searchClick = (e) => {
    dispatch(fetchSubDep({'search':search,'offset':offset}));
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
    dispatch(fetchSubDep({'search':search,'offset':selectedPage + 1}));
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
                                <li class="breadcrumb-item active">SUB DEPARTMENT</li>
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
                                        <Link className='btn btn-info' to="/add_edit_sub_department" state={{id:0}}>ADD SUB DEPARTMENT
                                        </Link>
                                        </div>
                                    </div> 
                                </div>
                                {/* <!-- Content Row --> */}
                                <div className="col-lg-12 form-group">
                                    {sub_dep_state === 'loading' ?
                                        <h2>Loading...</h2>
                                    :sub_dep_state === 'succeeded' ?
                                    <div className="table-responsive"> 
                                        <table className="table table-bordered">
                                            <thead class='thead-dark'>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Sub Department</th>
                                                    <th>Action</th>
                                                </tr>  
                                            </thead>
                                            {sub_dep.sub_department?.map((pd,index) =>
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
                                                    <Link className='btn btn-info' to="/add_edit_sub_department" state={{id:pd.id}}><i class="fa fa-cog" aria-hidden="true"></i>
                                                    </Link>
                                                    </td>
                                                </tbody>
                                            )}
                                        </table>
                                    </div>
                                    :
                                    <p>{error}</p>}

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
                                        pageCount={sub_dep.total_page_count}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageClick}
                                        subContainerClassName={"pages pagination"}
                                        initialPage={offset-1}/>          
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