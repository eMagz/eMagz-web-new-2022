import React,{useState} from 'react';

import './index.css';
import Navbar from './Header';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SendIcon from '@material-ui/icons/Send';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

 import {Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';





const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
                                      
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        border: '5px solid #4cbfff'
       
      },
     
    
  }));

 

  
const Socialmedia=()=>{

    const classes = useStyles();
    const [showtext, setShowtext] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
   

    const[names,setName]=useState([
      {name:'Debanjan'},
      {name:'Arjun'},
      {name:'Nasim'},
      {name:'Sudipta'},
      {name:'Ayesh'},
      {name:'Debasish'},
      {name:'Raja'},
      {name:'Snehasish'},
      {name:'Ayesh'},
      {name:'Debasish'},
      {name:'Raja'},
      {name:'Snehasish'},
      {name:'Ayesh'},
      {name:'Debasish'},
      {name:'Raja'},
      {name:'Snehasish'},
      {name:'Ayesh'},
      {name:'Debasish'},
      {name:'Raja'},
      {name:'S'},
    ]);
   
const maxNames= names.length;

console.log('name',maxNames);
console.log('w',activeStep)

const handleNext = () => {
  activeStep=== 0 ? setActiveStep(-200*(maxNames-1)): setActiveStep(activeStep+200);  
  //  console.log('s',-100*(maxNames-1))
  setActiveStep(activeStep + 200);
};

const handleBack = () => {
  // console.log('c', activeStep)  
  activeStep=== -200*(maxNames-1)? setActiveStep(0): setActiveStep(activeStep-200);  
  console.log('q',(-200*(maxNames+1))+2200)      
  setActiveStep(activeStep - 200);
};





     const toggle = () => setShowtext(!showtext);

// console.log('nn',toggle);


return(
    <>
      <div   style={{position:'fixed',width:'100%',marginBottom:'30px',zIndex:400}} >
      <Navbar   />
      </div>
    
      <div className='mainbody' >
     
      <div className='mainchatbody' >
      <div className='storybox' >
      <div className='chatbox' >
     <div style={{width:'100%',height:'100px',overflowX:'hidden',marginTop:'10px',scrollBehavior:'smooth',position:'relative',transition:0.5}}   className={classes.root} >
       


{names.map((person=>{
     return(
      <div   style={{transform:`translateX(${activeStep}%)`,transition:'0.5s'}} >
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
      <p className='icontext' >
       {person.name}
      </p>
        </div> 
       
     )
   }))}


  
     <div  style={{position:'absolute',left:0,zIndex:100}}>
            {activeStep===0? null:<IconButton onClick={handleNext} style={{outline:'none'}}  >
                <ChevronLeftIcon  style={{backgroundColor:'white',borderRadius:'50px',marginTop:'3px',outline:'none'}}/>
              </IconButton>}  
                </div>    
              <div style={{right:0,position:'absolute',zIndex:100}} >
                   {activeStep===(-200*(maxNames+1))+2800 ? null:<IconButton style={{outline:'none'}}  onClick={handleBack} >
                        <ChevronRightIcon style={{backgroundColor:'white',borderRadius:'50px',marginTop:'3px',outline:'none'}} />
                      </IconButton>  }   
          </div>
     {/* <div>
   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
   <p className='icontext' >
     Debanjan Goswami
   </p>
     </div> 
     <div>
   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
   <p className='icontext' >
     Debanjan Goswami
   </p>
     </div> 
     <div>
   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
   <p className='icontext' >
     Deb
   </p>
     </div> 
     <div>
   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
   <p className='icontext' >
     Debanjan Goswami
   </p>
     </div> 
     <div>
   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
   <p className='icontext' >
     Debanjan Goswami
   </p>
     </div> 
     <div>
   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
   <p className='icontext' >
     Deb
   </p>
     </div> 
     <div>
   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
   <p className='icontext' >
     Deban
   </p>
     </div> 
     <div>
   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
   <p className='icontext' >
     Debanjan
   </p>
     </div> 
     <div>
   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
   <p className='icontext' >
     D
   </p>
     </div> 
     <div>
   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
   <p className='icontext' >
     Debanjan Gos
   </p>
     </div> 
     <div>
   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
   <p className='icontext' >
     Deban
   </p>
     </div> 
     <div>
   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
   <p className='icontext' >
     Debanjan 
   </p>
     </div> 
     <div>
   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
   <p className='icontext' >
     Debanjan Goswami
   </p>
     </div> 
     <div>
   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
   <p className='icontext' >
     Debanjan Goswami
   </p>
     </div> 
     <div>
   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
   <p className='icontext' >
     Debanjan Goswami
   </p>
     </div> 
     <div>
   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
   <p className='icontext' >
     Debanjan Goswami
   </p>
  </div>  */}
     
  
    </div>
    
    </div>
    <div className='storyblock' >
     <div className='storycard' >
     <div  className='cardnav' >
     <div  style={{marginLeft:'10px',marginTop:'10px'}} >
        <Avatar style={{border: '2px solid #4cbfff'}} />
      </div>
      <div style={{flex:1}} />
      <div>
        <IconButton>
          <MoreHorizIcon/>
        </IconButton>
      </div>
     </div>
     <div className='cardbody' >
       <img className='cardimg'  src='https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg' /> 
     </div>
     <div className='groupicons' >
       <div>
       <IconButton>
         <FavoriteIcon fontSize='large' style={{color:'red'}} />
         </IconButton> 
         <IconButton>
           <ChatBubbleOutlineIcon fontSize='large'/>
         </IconButton>
         <IconButton>
           <SendIcon  fontSize='large'/>
         </IconButton>
       </div>
       <div  style={{flex:1}} />
       <div>
         <IconButton>
           <BookmarkBorderIcon fontSize='large'/>
         </IconButton>
       </div>
     </div>
     <div style={{float:'left',marginLeft:'10px'}} >
       <p className='textcolor'><b>25364 Likes</b></p>
     </div>
     <div className='postname'>
       <p className='persontext'><strong style={{paddingRight:'10px'}} >Debanjan Goswami</strong>Some text here... </p>
      
    
     </div>
     <div  className='messagebox'>
      <div><strong>Shubham</strong></div>
     
     </div>
     <div className='msgfooter' >
       <hr/>
     <div className='textbox' >
      {/* <Form>
        <FormGroup>
        <Input type="email" name="email" style={{border:'none'}}  />
        </FormGroup>
      </Form> */}
      <form>
        <textarea className='textinput' placeholder='Add a comment...' ></textarea>
       
       <IconButton  style={{transform:'translateY(-25px)'}} >
         <SendIcon fontSize='large' />
       </IconButton>
      </form>
     </div>
     </div>
     </div>
   
     <div className='storycard' >
     <div  className='cardnav' >
     <div  style={{marginLeft:'10px',marginTop:'10px'}} >
        <Avatar style={{border: '2px solid #4cbfff'}} />
      </div>
      <div style={{flex:1}} />
      <div>
        <IconButton>
          <MoreHorizIcon/>
        </IconButton>
      </div>
     </div>
     <div className='cardbody' >
       <img className='cardimg'  src='https://static.toiimg.com/thumb/msid-58475411,width-748,height-499,resizemode=4,imgsize-142947/.jpg' /> 
     </div>
     <div className='groupicons' >
       <div>
       <IconButton>
         <FavoriteIcon fontSize='large' style={{color:'red'}} />
         </IconButton> 
         <IconButton>
           <ChatBubbleOutlineIcon fontSize='large'/>
         </IconButton>
         <IconButton>
           <SendIcon  fontSize='large'/>
         </IconButton>
       </div>
       <div  style={{flex:1}} />
       <div>
         <IconButton>
           <BookmarkBorderIcon fontSize='large'/>
         </IconButton>
       </div>
     </div>
     <div style={{float:'left',marginLeft:'10px'}} >
       <p className='textcolor'><b>25364 Likes</b></p>
     </div>
     <div className='postname'>
       <p className='persontext'><strong style={{paddingRight:'10px'}} >Debanjan Goswami</strong>Some text here... </p>
      
    
     </div>
     <div  className='messagebox'>
      <div><strong>Shubham</strong></div>
     
     </div>
     <div className='msgfooter' >
       <hr/>
     <div className='textbox' >
      {/* <Form>
        <FormGroup>
        <Input type="email" name="email" style={{border:'none'}}  />
        </FormGroup>
      </Form> */}
      <form style={{lineHeight:'none'}} >
        <textarea className='textinput' placeholder='Add a comment...' ></textarea>
       
       <IconButton  style={{transform:'translateY(-25px)'}} >
         <SendIcon fontSize='large' />
       </IconButton>
      </form>
     </div>
     </div>
     </div>
     <div className='storycard' >
     <div  className='cardnav' >
     <div  style={{marginLeft:'10px',marginTop:'10px'}} >
        <Avatar style={{border: '2px solid #4cbfff'}} />
      </div>
      <div style={{flex:1}} />
      <div>
        <IconButton>
          <MoreHorizIcon/>
        </IconButton>
      </div>
     </div>
     <div className='cardbody' >
       <img className='cardimg'  src='https://image.shutterstock.com/image-photo/howrah-bridge-historic-cantilever-on-260nw-677901256.jpg' /> 
     </div>
     <div className='groupicons' >
       <div>
       <IconButton>
         <FavoriteIcon fontSize='large' style={{color:'red'}} />
         </IconButton> 
         <IconButton>
           <ChatBubbleOutlineIcon fontSize='large'/>
         </IconButton>
         <IconButton>
           <SendIcon  fontSize='large'/>
         </IconButton>
       </div>
       <div  style={{flex:1}} />
       <div>
         <IconButton>
           <BookmarkBorderIcon fontSize='large'/>
         </IconButton>
       </div>
     </div>
     <div style={{float:'left',marginLeft:'10px'}} >
       <p className='textcolor'><b>25364 Likes</b></p>
     </div>
     <div className='postname'>
       <p className='persontext'><strong style={{paddingRight:'10px'}} >Debanjan Goswami</strong>Some text here... </p>
      
    
     </div>
     <div  className='messagebox'>
      <div><strong>Shubham</strong></div>
     
     </div>
     <div className='msgfooter' >
       <hr/>
     <div className='textbox' >
      {/* <Form>
        <FormGroup>
        <Input type="email" name="email" style={{border:'none'}}  />
        </FormGroup>
      </Form> */}
      <form>
        <textarea className='textinput' placeholder='Add a comment...' ></textarea>
       
       <IconButton  style={{transform:'translateY(-25px)'}} >
         <SendIcon fontSize='large' />
       </IconButton>
      </form>
     </div>
     </div>
     </div>
     <div className='storycard' >
     <div  className='cardnav' >
     <div  style={{marginLeft:'10px',marginTop:'10px'}} >
        <Avatar style={{border: '2px solid #4cbfff'}} />
      </div>
      <div style={{flex:1}} />
      <div>
        <IconButton>
          <MoreHorizIcon/>
        </IconButton>
      </div>
     </div>
     <div className='cardbody' >
       <img className='cardimg'  src='https://static.toiimg.com/photo/72975551.cms' /> 
     </div>
     <div className='groupicons' >
       <div>
       <IconButton>
         <FavoriteIcon fontSize='large' style={{color:'red'}} />
         </IconButton> 
         <IconButton>
           <ChatBubbleOutlineIcon fontSize='large'/>
         </IconButton>
         <IconButton>
           <SendIcon  fontSize='large'/>
         </IconButton>
       </div>
       <div  style={{flex:1}} />
       <div>
         <IconButton>
           <BookmarkBorderIcon fontSize='large'/>
         </IconButton>
       </div>
     </div>
     <div style={{float:'left',marginLeft:'10px'}} >
       <p className='textcolor'><b>25364 Likes</b></p>
     </div>
     <div className='postname'>
       <p className='persontext'><strong style={{paddingRight:'10px'}} >Debanjan Goswami</strong>Some text here... </p>
      
    
     </div>
     <div  className='messagebox'>
      <div><strong>Shubham</strong></div>
     
     </div>
     <div className='msgfooter' >
       <hr/>
     <div className='textbox' >
      {/* <Form>
        <FormGroup>
        <Input type="email" name="email" style={{border:'none'}}  />
        </FormGroup>
      </Form> */}
      <form>
        <textarea className='textinput' placeholder='Add a comment...' ></textarea>
       
       <IconButton  style={{transform:'translateY(-25px)'}} >
         <SendIcon fontSize='large' />
       </IconButton>
      </form>
     </div>
     </div>
     </div>
     <div className='storycard' >
     <div  className='cardnav' >
     <div  style={{marginLeft:'10px',marginTop:'10px'}} >
        <Avatar style={{border: '2px solid #4cbfff'}} />
      </div>
      <div style={{flex:1}} />
      <div>
        <IconButton>
          <MoreHorizIcon/>
        </IconButton>
      </div>
     </div>
     <div className='cardbody' >
       <img className='cardimg'  src='https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg' /> 
     </div>
     <div className='groupicons' >
       <div>
       <IconButton>
         <FavoriteIcon fontSize='large' style={{color:'red'}} />
         </IconButton> 
         <IconButton>
           <ChatBubbleOutlineIcon fontSize='large'/>
         </IconButton>
         <IconButton>
           <SendIcon  fontSize='large'/>
         </IconButton>
       </div>
       <div  style={{flex:1}} />
       <div>
         <IconButton>
           <BookmarkBorderIcon fontSize='large'/>
         </IconButton>
       </div>
     </div>
     <div style={{float:'left',marginLeft:'10px'}} >
       <p className='textcolor'><b>25364 Likes</b></p>
     </div>
     <div className='postname'>
       <p className='persontext'><strong style={{paddingRight:'10px'}} >Debanjan Goswami</strong>Some text here... </p>
      
    
     </div>
     <div  className='messagebox'>
      <div><strong>Shubham</strong></div>
     
     </div>
     <div className='msgfooter' >
       <hr/>
     <div className='textbox' >
      {/* <Form>
        <FormGroup>
        <Input type="email" name="email" style={{border:'none'}}  />
        </FormGroup>
      </Form> */}
      <form>
        <textarea className='textinput' placeholder='Add a comment...' ></textarea>
       
       <IconButton  style={{transform:'translateY(-25px)'}} >
         <SendIcon fontSize='large' />
       </IconButton>
      </form>
     </div>
     </div>
     </div>
    </div>
        </div>  
   
    <div className='profiledetails' >
    
     <div className='mainprofile' >
    
<Avatar  alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large}  />
<div style={{marginLeft:'10px'}} >
<div  style={{fontSize:'1rem',fontWeight:'bold',float:'left',overflow:'hidden',width:'10vw', whiteSpace:'nowrap',display:'flex'}} >Ricky Ritz</div> 
 <div  style={{color:'gray'}}  >
   Debanjan Goswami
 </div>
</div>

     </div>
     <div className='suggestion_box' >
       <div className='suggestion_head' >
     <b>Suggestions for You</b> 
       </div>
       <div  style={{flex:1}}/>
       <div>
       <Button  style={{textDecoration:'none',paddingTop:'0px',color:'black',backgroundColor:'white',border:'none',outline:'none'}}><b>See All</b></Button>
       </div>
     </div>
     <div  className='suggestion_list' >
     <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
     <div  className='followers' >
       Shubham Badola
       <div className='follow' >
         Follows You
       </div>
     </div>
     <div style={{flex:1}} />
     <div>
     <Button color="link">Follow</Button>
     </div>
     </div>
     <div  className='suggestion_list' >
     <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
     <div  className='followers' >
       Shubham Badola
       <div className='follow' >
         Follows You
       </div>
     </div>
     <div style={{flex:1}} />
     <div>
     <Button color="link">Follow</Button>
     </div>
     </div>
     <div  className='suggestion_list' >
     <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
     <div  className='followers' >
       Shubham Badola
       <div className='follow' >
         Follows You
       </div>
     </div>
     <div style={{flex:1}} />
     <div>
     <Button color="link">Follow</Button>
     </div>
     </div>
     <div  className='suggestion_list' >
     <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
     <div  className='followers' >
       Shubham Badola
       <div className='follow' >
         Follows You
       </div>
     </div>
     <div style={{flex:1}} />
     <div>
     <Button color="link">Follow</Button>
     </div>
     </div>
     <div  className='suggestion_list' >
     <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
     <div  className='followers' >
       Shubham Badola
       <div className='follow' >
         Follows You
       </div>
     </div>
     <div style={{flex:1}} />
     <div>
     <Button color="link">Follow</Button>
     </div>
     </div>
     <div  className='suggestion_list' >
     <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
     <div  className='followers' >
       Shubham Badola
       <div className='follow' >
         Follows You
       </div>
     </div>
     <div style={{flex:1}} />
     <div>
     <Button color="link">Follow</Button>
     </div>
     </div>
     <div  className='suggestion_list' >
     <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
     <div  className='followers' >
       Shubham Badola
       <div className='follow' >
         Follows You
       </div>
     </div>
     <div style={{flex:1}} />
     <div>
     <Button color="link">Follow</Button>
     </div>
     </div>
     <div  className='suggestion_list' >
     <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
     <div  className='followers' >
       Shubham Badola
       <div className='follow' >
         Follows You
       </div>
     </div>
     <div style={{flex:1}} />
     <div>
     <Button color="link">Follow</Button>
     </div>
     </div>
     <div  className='suggestion_list' >
     <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
     <div  className='followers' >
       Shubham Badola
       <div className='follow' >
         Follows You
       </div>
     </div>
     <div style={{flex:1}} />
     <div>
     <Button color="link">Follow</Button>
     </div>
     </div>
     <div  className='suggestion_list' >
     <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
     <div  className='followers' >
       Shubham Badola
       <div className='follow' >
         Follows You
       </div>
     </div>
     <div style={{flex:1}} />
     <div>
     <Button color="link">Follow</Button>
     </div>
     </div>
     <div  className='suggestion_list' >
     <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
     <div  className='followers' >
       Shubham Badola
       <div className='follow' >
         Follows You
       </div>
     </div>
     <div style={{flex:1}} />
     <div>
     <Button  color="link">Follow</Button>
     </div>
     </div>
    
    </div>
   
  </div>
 
      </div>
  
    </>
)



}



export default Socialmedia;


















