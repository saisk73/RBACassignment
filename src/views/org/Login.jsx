import React, { useState } from 'react'
import axios from 'axios'
import auth from '../../auth/orgAuth.jsx'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50',
    },
  },
}));

export default function BasicTextFields(props) {
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  function loginAPI() {
    axios.get(`https://rbacapi.saikiranreddy.com/orgusers?email=${email}`)
    .then((res)=> {
      let data = res.data
      if(res.data.length > 0) {
        if(data[0].password === password && data[0].role === 'admin') {
          localStorage.setItem('orgid', data[0].organization.id)
          auth.login()
          props.history.push("/u");
        }
      }
      else {
        setMessage('Incorrect username or password')
      }
    })
  }
  return (
    <div className="Login">
        <div style={{display: 'flex', justifyContent: 'center', height: '80vh', alignItems: 'center' }}>
            <div style={{width: '40%'}}>
                <h1 className="login__heading">Thanos</h1>
                <div className={classes.root}>
                  <TextField  onKeyUp={(e)=> {setEmail(e.target.value)}} name="email" type="email" id="outlined-basic" label="Email" variant="outlined" style={{width: '100%'}} />
                  <TextField  onKeyUp={(e)=> {setPassword(e.target.value)}} name="email" type="password" id="outlined-basic" label="Password" variant="outlined" style={{width: '100%'}} />
                  <p style={{color: 'red'}}>{message}</p>
                  <Button onClick={()=> {loginAPI(this)}} size="medium" variant="outlined" color="primary">
                    Login
                  </Button>
                </div>
            </div>
        </div>
    </div>
  );
}
