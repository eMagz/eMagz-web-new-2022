import React, {useState, useEffect, useRef} from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import CommentIcon from '@material-ui/icons/Comment';
import FilterListIcon from '@material-ui/icons/FilterList';
import Avatar from '@material-ui/core/Avatar';
import {Input} from "reactstrap"
import {Button} from "@material-ui/core"

const NewChat = () => {
  const [message, setMessage] = useState('')

  const sendMessage = ()=>{

  }
  return (
    <>
      <div className='chat_container' >
        <div className='chat_main_container' >
          <div className='chatLeft1' >
            <div className='chat_listbar'>
              <div  >
                <img src='https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70' style={{ marginTop: '0px' }} className='chat_profile_picture' />
              </div>
              <div style={{ flex: 1 }} />
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div>
                  <IconButton>
                    <DataUsageIcon />
                  </IconButton>
                </div>
                <div>
                  <IconButton>
                    <CommentIcon />
                  </IconButton>
                </div>
                <div>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </div>
              </div>
            </div>

          </div>
          <div style={{ flex: 1 }} />
          <div className='chat_profilebar' >
            <div  >
              <img src='https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70' style={{ marginTop: '0px' }} className='chat_profile_picture' />
            </div>
            <div className='chat_name' >
              Debanjan Goswami
         </div>
            <div style={{ flex: 1 }} />
            <div>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <div className='main_text_area'>
          <div className='text_area'>
            <div className='Susertwo'>
              <div>
                <Avatar alt="Remy Sharp" src='https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70' />
              </div>
              <p className='usertwotext'>Md Riyaz</p>
            </div>
            <div className='userone'>
              <Avatar alt="Remy Sharp" src='https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70' />
              <p className='useronetext' >Hii Debanjan</p>
            </div>
          </div>
          <div className='chatfoot' >
            <form onSubmit = {sendMessage} style={{display: "flex", backgroundColor: "#eadede"}}>
            <Input
              onChange={(e) =>setMessage(e)}
              value={message}
              style={{ borderRadius: '30px', minHeight: '50px', margin: '5px 0px 0px 6px', border: 'none' }}
              placeholder="Type Text Here..." />
              <Button type="submit">Send</Button>
            </form>
          </div>
        </div>
        <div className='chat_search'>
          <div className='chat_search_bar' >
            <FontAwesomeIcon className='search_icon' icon={faSearch} />
            <form>
              <input className='chat_header_input' placeholder='search products...' />
            </form>
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </div>
        </div>
        <div className='main_chat_list'  >
          <div className='list_section'>
            <div className='prof_image_div'>
              <img src='https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70' style={{ marginTop: '0px' }} className='chat_profile_List_picture' />
            </div>
            <div className='maintext_head' >
              <div className='name_text'>
                Debanjan Goswami
                <div className='msg'>
                  jjjjjjjj  jjjjjjjjjjj  jjjjjjjjj  jjjjjjjj jjjjjjjjjjjjjjjjjjjjj
                </div>
              </div>
              <div className='time'>
                2:30
              </div>
            </div>

          </div>
          <div className='list_section'>
            <div className='prof_image_div'>
              <img src='https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70' style={{ marginTop: '0px' }} className='chat_profile_List_picture' />
            </div>
            <div className='maintext_head' >
              <div className='name_text'>
                Debanjan Goswami
                <div className='msg'>
                  jjjjjjjj  jjjjjjjjjjj  jjjjjjjjj  jjjjjjjj jjjjjjjjjjjjjjjjjjjjj
                </div>
              </div>
              <div className='time'>
                2:30
              </div>
            </div>

          </div>

          <div className='list_section'>
            <div className='prof_image_div'>
              <img src='https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70' style={{ marginTop: '0px' }} className='chat_profile_List_picture' />
            </div>
            <div className='maintext_head' >
              <div className='name_text'>
                Debanjan Goswami
                <div className='msg'>
                  jjjjjjjj  jjjjjjjjjjj  jjjjjjjjj  jjjjjjjj jjjjjjjjjjjjjjjjjjjjj
                </div>
              </div>
              <div className='time'>
                2:30
              </div>
            </div>

          </div>

          <div className='list_section'>
            <div className='prof_image_div'>
              <img src='https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70' style={{ marginTop: '0px' }} className='chat_profile_List_picture' />
            </div>
            <div className='maintext_head' >
              <div className='name_text'>
                Debanjan Goswami
                <div className='msg'>
                  jjjjjjjj  jjjjjjjjjjj  jjjjjjjjj  jjjjjjjj jjjjjjjjjjjjjjjjjjjjj
                </div>
              </div>
              <div className='time'>
                2:30
              </div>
            </div>

          </div>

          <div className='list_section'>
            <div className='prof_image_div'>
              <img src='https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70' style={{ marginTop: '0px' }} className='chat_profile_List_picture' />
            </div>
            <div className='maintext_head' >
              <div className='name_text'>
                Debanjan Goswami
                <div className='msg'>
                  jjjjjjjj  jjjjjjjjjjj  jjjjjjjjj  jjjjjjjj jjjjjjjjjjjjjjjjjjjjj
                </div>
              </div>
              <div className='time'>
                2:30
              </div>
            </div>

          </div>

          <div className='list_section'>
            <div className='prof_image_div'>
              <img src='https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70' style={{ marginTop: '0px' }} className='chat_profile_List_picture' />
            </div>
            <div className='maintext_head' >
              <div className='name_text'>
                Debanjan Goswami
                <div className='msg'>
                  jjjjjjjj  jjjjjjjjjjj  jjjjjjjjj  jjjjjjjj jjjjjjjjjjjjjjjjjjjjj
                </div>
              </div>
              <div className='time'>
                2:30
              </div>
            </div>

          </div>

          <div className='list_section'>
            <div className='prof_image_div'>
              <img src='https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70' style={{ marginTop: '0px' }} className='chat_profile_List_picture' />
            </div>
            <div className='maintext_head' >
              <div className='name_text'>
                Debanjan Goswami
                <div className='msg'>
                  jjjjjjjj  jjjjjjjjjjj  jjjjjjjjj  jjjjjjjj jjjjjjjjjjjjjjjjjjjjj
                </div>
              </div>
              <div className='time'>
                2:30
              </div>
            </div>

          </div>

          <div className='list_section'>
            <div className='prof_image_div'>
              <img src='https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70' style={{ marginTop: '0px' }} className='chat_profile_List_picture' />
            </div>
            <div className='maintext_head' >
              <div className='name_text'>
                Debanjan Goswami
                <div className='msg'>
                  jjjjjjjj  jjjjjjjjjjj  jjjjjjjjj  jjjjjjjj jjjjjjjjjjjjjjjjjjjjj
                </div>
              </div>
              <div className='time'>
                2:30
              </div>
            </div>

          </div>

          <div className='list_section'>
            <div className='prof_image_div'>
              <img src='https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70' style={{ marginTop: '0px' }} className='chat_profile_List_picture' />
            </div>
            <div className='maintext_head' >
              <div className='name_text'>
                Debanjan Goswami
                <div className='msg'>
                  jjjjjjjj  jjjjjjjjjjj  jjjjjjjjj  jjjjjjjj jjjjjjjjjjjjjjjjjjjjj
                </div>
              </div>
              <div className='time'>
                2:30
              </div>
            </div>

          </div>

          <div className='list_section'>
            <div className='prof_image_div'>
              <img src='https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70' style={{ marginTop: '0px' }} className='chat_profile_List_picture' />
            </div>
            <div className='maintext_head' >
              <div className='name_text'>
                Debanjan Goswami
                <div className='msg'>
                  jjjjjjjj  jjjjjjjjjjj  jjjjjjjjj  jjjjjjjj jjjjjjjjjjjjjjjjjjjjj
                </div>
              </div>
              <div className='time'>
                2:30
              </div>
            </div>

          </div>
          <div className='list_section'>
            <div className='prof_image_div'>
              <img src='https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70' style={{ marginTop: '0px' }} className='chat_profile_List_picture' />
            </div>
            <div className='maintext_head' >
              <div className='name_text'>
                Debanjan Goswami
                <div className='msg'>
                  jjjjjjjj  jjjjjjjjjjj  jjjjjjjjj  jjjjjjjj jjjjjjjjjjjjjjjjjjjjj
                </div>
              </div>
              <div className='time'>
                2:30
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )


}
export default NewChat;







