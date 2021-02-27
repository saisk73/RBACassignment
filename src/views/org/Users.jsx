import React, {useEffect, useState} from 'react'
import UserCard from '../superadmin/components/UserCard.jsx'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import { blue } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    avatar: {
      backgroundColor: blue[100],
      color: blue[900],
    },
});

export default function Users() {
    const classes = useStyles();
    let [users, setUsers ] = useState([])
    let [loading, setLoading ] = useState(true)
    let [open, setOpen] = useState(false)
    // user
    let [name, setName ] = useState('')
    let [username, setUsername ] = useState('')
    let [password, setPassword ] = useState('')
    let [email, setEmail ] = useState('')
    let [role, setRole ] = useState('')
    function addUser() {
        let orgid = localStorage.getItem('orgid')
        let data = {
            name: name,
            username: username,
            password: password,
            email: email,
            role: role,
            organization: orgid
        }
        axios.post('https://rbacapi.saikiranreddy.com/orgusers', data)
        .then((res)=> {
            console.log(res.data)
        })
    }
    useEffect(()=> {
        let orgid = localStorage.getItem('orgid')
        axios.get(`https://rbacapi.saikiranreddy.com/orgusers?organization=${orgid}`)
        .then((res)=> {
            setUsers(res.data)
            setLoading(false)
        })
    },[])
    return(
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h1>Users</h1>
                <div>
                    <Button onClick={()=> {setOpen(true)}} variant="outlined" color="primary" size="small">
                        add user
                    </Button>
                </div>
            </div>
            <Grid container spacing={2}>
            {loading === false && users.map((user,key)=> 
                <UserCard user={user} key={key} />
            )}
            </Grid>
            {open === true &&
            <Dialog
                fullWidth="sm"
                maxWidth="sm"
                onClose={()=> setOpen(false)} aria-labelledby="simple-dialog-title" 
                open={()=>setOpen(true)}
            >
                <DialogTitle id="simple-dialog-title">Add User</DialogTitle>
                <div className="px-2" style={{width: "90%"}}>
                    <TextField 
                        className="w-100" 
                        id="outlined-basic" 
                        label="Name" 
                        variant="outlined" 
                        onKeyUp={(e)=> {setName(e.target.value)}}
                    />
                </div>
                <div className="px-2 pb-2" style={{width: "90%"}}>
                    <TextField 
                        className="w-100" 
                        id="outlined-basic" 
                        label="Username" 
                        variant="outlined" 
                        onKeyUp={(e)=> {setUsername(e.target.value)}}
                    />
                </div>
                <div className="px-2 pb-2" style={{width: "90%"}}>
                    <TextField 
                        className="w-100" 
                        id="outlined-basic" 
                        type="password"
                        label="Password" 
                        variant="outlined" 
                        onKeyUp={(e)=> {setPassword(e.target.value)}}
                    />
                </div>
                <div className="px-2 pb-2" style={{width: "90%"}}>
                    <TextField 
                        className="w-100" 
                        id="outlined-basic" 
                        label="Email" 
                        variant="outlined" 
                        onKeyUp={(e)=> {setEmail(e.target.value)}}
                    />      
                </div>
                <div className="px-2" style={{width: "90%"}}>
                    <TextField 
                        className="w-100" 
                        id="outlined-basic" 
                        label="Role" 
                        variant="outlined" 
                        onKeyUp={(e)=> {setRole(e.target.value)}}
                    />
                    <Button onClick={()=> {addUser()}} variant="outlined" color="primary" size="small" style={{marginTop: '10px', marginBottom: '10px'}}>
                        add user
                    </Button>
                </div>
            </Dialog>
            }
        </div>
    )
}