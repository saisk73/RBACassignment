import React, {useState} from 'react'
import axios from 'axios'
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
});


export default function AddOrganization(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [website, setWebsite] = useState('')
    const [address, setAddress] = useState('')
    const [valid, setValid] = useState(true)
    let schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        phone: yup.string().required(),
        website: yup.string().url().required(),
        address: yup.string().required(),
    })
    function addOrg() {
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
                axios.post('https://rbacapi.saikiranreddy.com/organizations', data)
                .then((res)=> {
                    console.log(data)
                    props.history.push('/a/organizations') 
                })
            } else {
                setValid(false)
            }
        })
        .catch(function(err) {
            console.log(err)
        })
    }
    // material
    const classes = useStyles();
    return (
        <div>
            <h1 className="px-2">Add Organization</h1>
            {valid === false &&
            <p style={{color: 'red', paddingLeft: '10px'}}>Form contains errors</p>
            }
            <form className={classes.root} noValidate autoComplete="off">
                <Grid container>
                    <Grid item className="px-2" xs={4} md={6} lg={4} xl={3} >
                        <TextField 
                            className="w-100" 
                            id="outlined-basic" 
                            label="Name" 
                            variant="outlined" 
                            onKeyUp={(e)=> {setName(e.target.value)}}
                        />
                    </Grid>
                    <Grid item className="px-2" xs={4} md={6} lg={4} xl={3} >
                        <TextField 
                            className="w-100" 
                            id="outlined-basic" 
                            label="Email" 
                            variant="outlined" 
                            onKeyUp={(e)=> {setEmail(e.target.value)}}
                        />
                    </Grid>
                    <Grid item className="px-2" xs={4} md={6} lg={4} xl={3} >
                        <TextField 
                            className="w-100" 
                            id="outlined-basic" 
                            label="Phone" 
                            variant="outlined" 
                            onKeyUp={(e)=> {setPhone(e.target.value)}}
                        />
                    </Grid>
                    <Grid item className="px-2" xs={4} md={6} lg={4} xl={3} >
                        <TextField 
                            className="w-100" 
                            id="outlined-basic" 
                            label="Website" 
                            variant="outlined"
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
                            onKeyUp={(e)=> {setAddress(e.target.value)}}
                        />
                    </Grid>
                </Grid>
                <Grid className="px-2">
                    <Button onClick={()=> {addOrg()}} variant="outlined" color="primary">
                      Submit
                    </Button>
                </Grid>
            </form>
        </div>
    )
}