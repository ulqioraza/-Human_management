import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Sidebar } from '../Navigation/Sidebar'
import ReactPaginate from 'react-paginate';
import Moment from 'moment';
import { Topbar } from '../Navigation/Topbar'
import { Link } from 'react-router-dom';
import { getToken } from '../libs/departmentSlice';
import { fetchExaminationGroup, getExaminationGroupError, getExaminationGroupStatus, selectAllExaminationGroup } from '../libs/examinationSlice';

export function Examination_group() {
  const human = "/human_management"
  const menu = useSelector((state) => state.counter.menu)
  const dispatch = useDispatch()
  const examination_group = useSelector(selectAllExaminationGroup);
  const exmgStatus = useSelector(getExaminationGroupStatus);
  const exmgError = useSelector(getExaminationGroupError);
  const [search, setSearch] = useState('')
  const [offset, setOffset] = useState();
  const date = Date.now()
  const [todoTitle, setTodoTitle] = useState('')

  var firstload = true
  useEffect(() => {
    dispatch(getToken())
    if(!firstload){
        if (exmgStatus === 'idle') {
        dispatch(fetchExaminationGroup({'search':search,'offset':offset}));
        }
    }
    else{
        firstload = false
    }    
  }, [exmgStatus, dispatch, search]);

  const searchClick = (e) => {
    dispatch(fetchExaminationGroup({'search':search,'offset':offset}));
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
    dispatch(fetchExaminationGroup({'search':search,'offset':selectedPage + 1}));
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
                                <li class="breadcrumb-item active">Examination_group</li>
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
                                                                    pathname: human + "/add_edit_position",
                                                                        id: 0,
                                                                     }} >ADD NEW POSITION
                                        </Link>*/}  
                                        <Link className='btn btn-info' to="/add_edit_examination_group" state={{id:0}}>ADD Examination GROUP
                                        </Link>
                                        </div>
                                    </div> 
                                </div>
                                {/* <!-- Content Row --> */}
                                <div className="col-lg-12 form-group">
                                    {exmgStatus === 'loading' ?
                                        <h2>Loading...</h2>
                                    :exmgStatus === 'succeeded' ?
                                    <div className="table-responsive"> 
                                        <table className="table table-bordered">
                                            <thead class='thead-dark'>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Group Name</th>
                                                    <th>Action</th>
                                                </tr>  
                                            </thead>
                                            {examination_group.examination_group?.map((pd,index) =>
                                                <tbody>
                                                    <td>{pd.id}</td>
                                                    <td>{pd.name}</td>
                                                    <td>
                                                    {/*<Link to={{
                                                                    pathname: human + "/add_edit_position",
                                                                        id: pd.id,
                                                                     }} ><i class="fa fa-cog" aria-hidden="true"></i>
                                                    </Link>*/}   
                                                    <Link className='btn btn-info' to="/add_edit_examination_group" state={{id:pd.id}}><i class="fa fa-cog" aria-hidden="true"></i>
                                                    </Link>
                                                    </td>
                                                </tbody>
                                            )}
                                        </table>
                                    </div>
                                    :
                                    <p>{exmgError}</p>}
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
                                        pageCount={examination_group.total_page_count}
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