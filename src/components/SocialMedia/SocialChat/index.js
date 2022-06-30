import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import {  Input,  } from 'reactstrap';
import Avatar from '@material-ui/core/Avatar';
 import './index.css';
 import SendIcon from '@material-ui/icons/Send';
 import IconButton from '@material-ui/core/IconButton';
import Header from '../Header';
//  import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '20px'
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    // backgroundColor: '#F5F5F5',
     height: '520px',
    overflowY: 'hidden'
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  smallone: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    margin: '4px 0px 0px 10px'
  },
  smalltwo:{
    width: theme.spacing(3),
    height: theme.spacing(3),
    margin: '4px 10px 0px 0px'
  }
}));

export default function SocialChat() {
  const classes = useStyles();

  return (
      <>
      <Header/>
       <div className={classes.root}>
      <Grid  container spacing={1}>
       
        <Grid  item xs={4}>           
          <Paper  className={classes.paper}>

          

        <div  className='search' >
     
         
       
    
       <Input className='input'  type="email" name="email" id="exampleEmail" placeholder="Search..." />
     <div  style={{transform:'translateX(-30px)'}} >
     <SearchIcon  />
     </div>
       
        
       </div>  
      
      
       <br/> 
       <br/> 
      <div  className='root' >
         <div className='paper' >
           <div  className='list' >
           <div >
             <Avatar>W</Avatar>
             </div>
             <div>
             </div>
           </div>
         </div>
         <div className='paper' >
           <div  className='list' >
           <div >
             <Avatar>W</Avatar>
             </div>
             <div>
             </div>
           </div>
         </div>
         <div className='paper' >
           <div  className='list' >
           <div >
             <Avatar>W</Avatar>
             </div>
             <div>
             </div>
           </div>
         </div>
         <div className='paper' >
           <div  className='list' >
           <div >
             <Avatar>W</Avatar>
             </div>
             <div>
             </div>
           </div>
         </div>
         <div className='paper' >
           <div  className='list' >
           <div >
             <Avatar>W</Avatar>
             </div>
             <div>
             </div>
           </div>
         </div>
         <div className='paper' >
           <div  className='list' >
           <div >
             <Avatar>W</Avatar>
             </div>
             <div>
             </div>
           </div>
         </div>
         <div className='paper' >
           <div  className='list' >
           <div >
             <Avatar>W</Avatar>
             </div>
             <div>
             </div>
           </div>
         </div>
         <div className='paper' >
           <div  className='list' >
           <div >
             <Avatar>W</Avatar>
             </div>
             <div>
             </div>
           </div>
         </div>
         <div className='paper' >
           <div  className='list' >
           <div >
             <Avatar>W</Avatar>
             </div>
             <div>
             </div>
           </div>
         </div>
         <div className='paper' >
           <div  className='list' >
           <div >
             <Avatar>W</Avatar>
             </div>
             <div>
             </div>
           </div>
         </div>
         <div className='paper' >
           <div  className='list' >
           <div >
             <Avatar>W</Avatar>
             </div>
             <div>
             </div>
           </div>
         </div>
      </div>




          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>

            <div  className='mainbox' >
            <div className='chathead' >
           
           <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
           <p  className='username' >Debanjan</p>
       </div>
      <div  className='line' />
       <div className='chatbody' >
                  <div className='usertwo' >
                    <div  >
                    <Avatar  alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.smallone} />
                    </div>
                    
                         <p  className='usertwotext' > Hello there,I am Debanjan,im an engineer from andhra university  </p>
                  </div>
         
                  <div   className='userone' >
                         <p  className='useronetext' > Hello there,I am Debanj
                              an,im an engineer from andhra university 
                              </p> 
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.smalltwo} />     
                  </div>
                   <div className='usertwo' >
                         <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.smallone} />
                         <p  className='usertwotext' > Hello there,I am Debanjan,im an engineer from andhra university  </p>
                   </div>
                   <div className='usertwo' >
                     <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.smallone} />
                         <p  className='usertwotext' > Hello there,I am Debanjan,im an engineer from andhra university </p>
                  </div>
         
                  <div   className='userone' >
                         <p  className='useronetext' > Hello there,I am Debanj
                              an,im an engineer from andhra university 
                                kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk</p> 
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.smalltwo} />     
                  </div>
                  <div   className='userone' >
                         <p  className='useronetext' > Hello there,I am Debanj
                              an,im an engineer from andhra university 
                                kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk</p> 
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.smalltwo} />     
                  </div>
                  <div   className='userone' >
                         <p  className='useronetext' > Hello there,I am Debanj
                              an,im an engineer from andhra university 
                                kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk</p> 
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.smalltwo} />     
                  </div>
          </div>
        
          <div  className='chatfoot' >
          <Input style={{borderRadius:'30px',minHeight:'50px',margin:'5px 0px 0px 6px',border:'none'}} type="text" name="message"  placeholder="Type Text Here..." />
          <IconButton size='large' style={{marginBottom:'4px'}}>
          <SendIcon />
        </IconButton>
             </div>
 
        
         


            </div>

           
            

            
           

          </Paper>
        </Grid>
       
      </Grid>
    </div>
      </>
    
  );
}