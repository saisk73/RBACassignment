import React, { useState } from 'react'
import auth from '../../auth/auth.jsx'
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
  const [email, setEmail] = useState('admin@thanos.com')
  const [password, setPassword] = useState('admin@123')
  const [message, setMessage] = useState('')
  function loginAPI() {
    if(email === 'admin@thanos.com' && password === 'admin@123') {
      auth.login()
      props.history.push("/a");
    } else {
      setMessage('Incorrect username or password')
    }
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
