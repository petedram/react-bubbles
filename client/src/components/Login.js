import React, { useState } from "react";
import axios from 'axios';


const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({ username: '', password:''});
  console.log('localstorage', localStorage);
  localStorage.removeItem("token");



  const handleChange = e => {

    setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
    });
    console.log(credentials);
  };

  const login = e => {
    e.preventDefault();
    localStorage.removeItem("token");

    axios
        .post('http://localhost:5000/api/login', credentials )
        .then(res => {
            localStorage.setItem("token", res.data.payload);
            props.history.push("/protected");
            console.log('response',res);
            console.log('localstorage', localStorage);
          })
          .catch(err => {
            localStorage.removeItem("token");
            console.log("invalid login: ", err);
          });
  }

  return (
    <div>
          <form onSubmit={login}>
            <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
            <button>Log in</button>
          </form>
        </div>
      );
};

export default Login;
