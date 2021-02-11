import React from "react";
//import Card from "./Card";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
  } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";
  
  import 'react-circular-progressbar/dist/styles.css';
const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px"
  },
  root: {
    minWidth: 200,
    minHeight: 150
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function Dashboard(tasks) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const taskInfo = tasks.taskInfo;
  const completed = taskInfo.filter(item=>item.isTaskCompleted===true);
  const percentage = (completed.length/taskInfo.length)*100;
  const tasksToDisplay = taskInfo.slice(0,3).map((item,i)=>{return <li key={`${item.task_name}-${i}`}>{item.task_name}</li>});
  return (
    <Grid
      container
      spacing={4}
      className={classes.gridContainer}
      justify="center"
    >
      <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Tasks Overview
        </Typography>
        <Typography variant="body2" component="p">
          {completed.length} out of {taskInfo.length}
        </Typography>
      </CardContent>
    </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
        Latest Tasks
        </Typography>
        <Typography variant="body2" component="p">
          {tasksToDisplay}
        </Typography>
      </CardContent>
    </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Progress
        </Typography>
        <Typography variant="body2" component="p">
        <CircularProgressbar
                        value={percentage}
                        strokeWidth={50}
                        styles={buildStyles({
                        strokeLinecap: "butt"
                        })}
                        />
        </Typography>
      </CardContent>
    </Card>
      </Grid>
    </Grid>
  );
}
