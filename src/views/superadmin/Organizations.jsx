import axios from 'axios';
import React , {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
// card
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// grid
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';


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

export default function Organizations() {
    const [ orgs, setOrgs ] = useState([])
    const [loading, setLoading ] = useState(true)
    useEffect(() => {
        axios.get('http://139.59.57.230:1337/organizations')
        .then((res)=> {
            setOrgs(res.data)  
            setTimeout(function(){ setLoading(false) }, 500);
        })
    }, []);
    // material
    const classes = useStyles();
    return(
        <div>
            <div style={{display :'flex', justifyContent: 'space-between'}}>
              <div>
                <h1>Organizations</h1>
              </div>
              <div>
                <Link to="/a/organizations/add" style={{textDecoration: "none", margin: 'auto'}}>
                  <Button color="primary" size="small">Add</Button>
                </Link>
              </div>
            </div>
            {loading && 
                <Grid container spacing={3}>
                    {[...Array(4)].map((card, key)=> 
                        <Grid item xs={4} md={6} lg={4} xl={3} key={key}>
                          <Skeleton item xs={4} md={6} lg={4} xl={3} variant="rect" height={200} />
                        </Grid>
                    )}
                </Grid>
            }
            {loading === false && 
            <Grid container spacing={3}>
                {orgs.map((org,key)=> 
                <Grid item xs={4} md={6} lg={4} xl={3} key={key}>
                    <Card className={classes.root}>
                      <CardContent>
                        <Typography variant="h5" component="h2">
                          {org.name}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                          {org.website}
                        </Typography>
                        <Typography variant="body2" component="p">
                            <b>Address: </b>
                          {org.address}
                        </Typography>
                        <Typography variant="body2" component="p">
                            <b>Phone: </b>
                            {org.phone}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Link to={`/a/organizations/${org.id}`} style={{textDecoration: "none"}}>
                            <Button color="primary" size="small">Details</Button>
                        </Link>
                      </CardActions>
                    </Card>
                </Grid>
                )}
            </Grid>
            }
        </div>
    )
}