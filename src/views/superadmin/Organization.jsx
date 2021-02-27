import React , {useEffect, useState} from 'react'
import axios from 'axios'
import * as yup from 'yup';
// components
import UserCard from './components/UserCard.jsx'
// material
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '50',
      },
    },
  }));

export default function Organization(props) {
    const classes = useStyles();
    // form
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [website, setWebsite] = useState('')
    const [address, setAddress] = useState('')
    const [valid, setValid] = useState(true)
    // org
    const [org, setOrg] = useState({})
    const [orgLoading, setOrgLoading] = useState(true)
    const [usersLoading, setUsersLoading] = useState(true)
    const [users, setSUers] = useState([])
    let schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        phone: yup.string().required(),
        website: yup.string().url().required(),
        address: yup.string().required(),
    })
    function editDetails() {
        let data = {
            name: name,
            email: email,
            phone: phone,
            website: website,
            address: address
        }
        schema
        .isValid(data)
        .then(function (valid) {
            if(valid) {
                setValid(true)
                axios.put(`https://rbacapi.saikiranreddy.com/organizations/${org.id}`, data)
                .then((res)=> {
                    console.log(res)
                })
            } else {
                setValid(false)
            }
        })
        .catch(function(err) {
            console.log(err)
        })
    }
    function addUser() {
        
    }
    useEffect(()=> {
        axios.get(`https://rbacapi.saikiranreddy.com/organizations/${props.match.params.id}`)
        .then((res)=> {
            let response = res.data
            setOrg(response)
            setOrgLoading(false)
            setName(response.name)
            setEmail(response.email)
            setPhone(response.phone)
            setWebsite(response.website)
            setAddress(response.address)
        })
        axios.get(`https://rbacapi.saikiranreddy.com/orgusers?organization=${props.match.params.id}`)
        .then((res)=> {
            setSUers(res.data)
            setUsersLoading(false)
        })
    },[])
    return(
        <div>
            <h1>{org.name}</h1>
            {valid === false &&
            <p style={{color: 'red', paddingLeft: '10px'}}>Form contains errors</p>
            }
            {orgLoading === false && 
            <form className={classes.root} noValidate autoComplete="off">
                <Grid container>
                    <Grid item className="px-2" xs={4} md={6} lg={4} xl={3} >
                        <TextField 
                            className="w-100" 
                            id="outlined-basic" 
                            label="Name" 
                            variant="outlined" 
                            defaultValue={org.name}
                            onKeyUp={(e)=> {setName(e.target.value)}}
                        />
                    </Grid>
                    <Grid item className="px-2" xs={4} md={6} lg={4} xl={3} >
                        <TextField 
                            className="w-100" 
                            id="outlined-basic" 
                            label="Email" 
                            variant="outlined" 
                            defaultValue={org.email}
                            onKeyUp={(e)=> {setEmail(e.target.value)}}
                        />
                    </Grid>
                    <Grid item className="px-2" xs={4} md={6} lg={4} xl={3} >
                        <TextField 
                            className="w-100" 
                            id="outlined-basic" 
                            label="Phone" 
                            variant="outlined" 
                            defaultValue={org.phone}
                            onKeyUp={(e)=> {setPhone(e.target.value)}}
                        />
                    </Grid>
                    <Grid item className="px-2" xs={4} md={6} lg={4} xl={3} >
                        <TextField 
                            className="w-100" 
                            id="outlined-basic" 
                            label="Website" 
                            variant="outlined" 
                            defaultValue={org.website}
                            onKeyUp={(e)=> {setWebsite(e.target.value)}}
                        />
                    </Grid>
                </Grid> 
                <Grid container>
                    <Grid item className="px-2" xs={12} md={8} lg={6} >
                        <TextField 
                            className="w-100" 
                            multiline
                            rows={7} 
                            id="outlined-basic" 
                            label="Address" 
                            variant="outlined" 
                            defaultValue={org.address}
                            onKeyUp={(e)=> {setAddress(e.target.value)}}
                        />
                    </Grid>
                </Grid>
                <Grid className="px-2">
                    <Button onClick={()=> {editDetails()}} variant="outlined" color="primary">
                      Submit
                    </Button>
                </Grid>
            </form>
            }
            <div className="px-2">
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="h4" component="h5">Users</Typography>
                    <Button onClick={()=> {addUser()}} variant="outlined" color="primary" size="small">
                        add user
                    </Button>
                </div>
                {usersLoading === false && 
                    <Grid container>
                        {users.map((user,key)=> (
                            <UserCard user={user} key={key} />
                        ))}
                    </Grid>
                }
            </div>
        </div>
    )
}