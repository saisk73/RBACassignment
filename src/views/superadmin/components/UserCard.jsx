import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


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

export default function UserCard({user}) {
    const classes = useStyles();
    return(
        <Grid item xs={12} md={6} lg={4} xs={3}>
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  @{user.username}
                </Typography>
                <Typography variant="h5" component="h2">
                  {user.name}
                </Typography>
                <Typography variant="body2" component="p">
                  {user.email}
                </Typography>
                <Typography variant="h6" component="h6">
                  {user.role}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">Edit</Button>
              </CardActions>
            </Card>
        </Grid>
    )
} 