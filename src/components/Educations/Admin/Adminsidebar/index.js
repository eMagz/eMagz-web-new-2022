import React from 'react';
import './index.css';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from "react-router-dom";




const AdminSideDrawer=(props)=>{
    let admindrawerClasses = 'side-admindrawer';
    if(props.open){
        admindrawerClasses = 'side-admindrawer open';
    }
return(
    <>
      <div className={admindrawerClasses}>
          <div  className='admin_heading' >
          <div style={{margin:'10px 0px 0px 10px'}} >
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </div>
          </div>
          <hr/>
          <div  className='main_list'  >
          <List component="nav" aria-label="main mailbox folders">
          <Link to='/educations/home' >
          <ListItem button> 
          <ListItemText primary="School"/>
        </ListItem>
            </Link>
         {/* <Link  to='/educations/notice-board' >
         <ListItem button>
          <ListItemText primary="Notice Board" />
        </ListItem>
         </Link>  */}
         {/* <Link  to='/educations/home-works'  >
        <ListItem button>
          <ListItemText primary="Home Works" />
        </ListItem>
        </Link> */}
        {/* <ListItem button>
          <ListItemText primary="Class Diary" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Attendance" />
        </ListItem>
        <Link  to='/educations/apply-a-leave'  >
        <ListItem button>
          <ListItemText primary="Apply for Leave" />
        </ListItem>
        </Link>
        <ListItem button>
          <ListItemText primary="Time Table" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Academic Report" />
        </ListItem>
        <Link  to='/educations/fees'  >
        <ListItem button>
          <ListItemText primary="Fees" />
        </ListItem>
        </Link> */}
       {/* <Link  to='/educations/take-a-test'  >
       <ListItem button>
          <ListItemText primary="Take a Test" />
        </ListItem>
       </Link>
       <Link>
       <ListItem button>
          <ListItemText primary="Bus Tracking" />
        </ListItem>
       </Link>
        
        <Link  to='/educations/feedback' >
        <ListItem button>
          <ListItemText primary="Feedback" />
        </ListItem>
        </Link> */}
        
        {/* <ListItem button>
          <ListItemText primary="Contact Us" />
        </ListItem> */}
          </List>
          </div>
         
      </div>
    </>
)


}


export default AdminSideDrawer;


