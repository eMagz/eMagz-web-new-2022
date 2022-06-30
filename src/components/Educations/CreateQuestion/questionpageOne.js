
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './questionpage.css'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';






const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
       
        width: 200,
      },
    formControl: {
     
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));












const QuestionPageOne=()=>{



    const classes = useStyles();

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };



return(
    <>
    <div className='questionpage_container' >
        <div  className='questionpage_card' >
            <div style={{display:'flex',marginLeft:'20px'}} >Select time </div>
        <div  className='question_section1' >
        <div>
         <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="From"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
         </div>
         <div>
<form className={classes.container} noValidate>
      <TextField
        id="date"
        label="To"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
         </div>
        </div>
        
         
<div className='question_section2' >

<div>
<FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Classes</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
</div>
<div>
<FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Section</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
</div>

</div>

 <div className='question_section3' >
     <div>
     <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Subject</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl> 
     </div>
     <div>
     <TextField
          id="standard-number"
          label="Total Questions"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
     </div>
     </div>       
     <div  className='qsbtn' >
        <Button variant="contained" color="primary">
        Add Questions
      </Button>
        </div>
        </div>
       
    </div>
    </>
)



}


export default QuestionPageOne;









