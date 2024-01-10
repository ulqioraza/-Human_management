import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reactLogo from '../assets/human_logo.png';

async function loginUser(credentials) {
  //alert(JSON.stringify(credentials))
  return fetch(window.server + '/api/token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function Login() {
  const history = useNavigate();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState();
  const [output, setOutput] = useState();

  const getOptions = {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' +  localStorage.getItem('accessToken')}
  };

  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +  localStorage.getItem('accessToken')
    },
    body: JSON.stringify(localStorage.getItem('username'))
  }
  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      username,
      password
    });
    if ('access' in response) {
      //alert(JSON.stringify(response))
        localStorage.setItem('accessToken', response['access']);
        localStorage.setItem('username',username)
        localStorage.setItem('department',1)
        if(response['access'] !== null){
           await fetch(window.server + '/hello', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +  response['access']
            },
            body: JSON.stringify(username)})
              .then(res => res.json())
              .then(result => {
                if(result.user[0] !== undefined){
                  localStorage.setItem('group',result.user[0].name)
                  localStorage.setItem('staff',result.user[0].is_staff)
                  localStorage.setItem('user_id',result.user[0].id)
                  localStorage.setItem('nation',result.employee[0].nationality)
                  localStorage.setItem('position',result.employee[0].position)
                  localStorage.setItem('dep',result.employee[0].department)
                  localStorage.setItem('emp_id',result.employee[0].id)
                  localStorage.setItem('emp_code',result.employee[0].employee_id)
                  localStorage.setItem('emp_name',result.employee[0].name)
                  if(result.employee[0].department !== '15'){
                    setTimeout(async ()=>{
                        history('/employee_info')
                      }, 200)
                  }else{
                      setTimeout(async ()=>{
                        history('/dashboard')
                      }, 200)
                  }                      
                }else{
                
                }
              })
              .catch(err => alert(err))
        }
       
    }else {
      console.log("Failed", response.message, "error");
    }
  }

  return (
    <div>
        <div className="container">
          <div className="row justify-content-center">
        
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                  <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-12">
                          <div className="p-5">
                            <div className="text-center">
                            <img src={reactLogo} className="logo react" alt="React logo" width={200} height={200}  />
                              <h1 className="h4 text-gray-900 mb-4"><b>LOG IN HR MANAGEMENT</b></h1>
                              <form onSubmit={handleSubmit}>
                                <div class="col-lg-12 form-group">
                                  <div className="form-group row">
                                      <div className="col-sm-2 ml-3 mb-3 mb-sm-0">
                                      <label class="block mb-2 text-sm font-bold text-gray-700" for="username">Username : </label>
                                      </div>
                                      <div className="col-sm-8">
                                      <input type="text" 
                                        name="username"
                                        className="form-control form-control-user" 
                                        id="exampleInputEmail" 
                                        aria-describedby="emailHelp" 
                                        placeholder="Enter Email Address..."
                                        onChange={e => setUserName(e.target.value)}
                                        autoFocus/>
                                      </div>
                                  </div>
                                  <br/>
                                  <div className="form-group row">
                                      <div className="col-sm-2 ml-3 mb-3 mb-sm-0">
                                          <label>Password : </label>
                                      </div>
                                      <div className="col-sm-8">
                                      <input type="password" 
                                        name="password"
                                        className="form-control form-control-user"  
                                        id="exampleInputPassword" 
                                        placeholder="Password"
                                        onChange={e => setPassword(e.target.value)}/>
                                      </div>
                                  </div>
                                </div>
                                <br/>               
                                <div className="form-group">
                                  
                                </div>
                                <button type="submit" className="btn btn-primary btn-user btn-block">
                                  Login
                                </button>
                                <hr/>                      
                                <a class="btn btn-danger" href="http://192.168.10.248:8080/#/portal-link">PORTAL LINK</a>    
                              </form>                    
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>

        </div>
    </div>
  );
}
