import React, { useState, useRef } from 'react';
import './index.css';
import Header from '../Header';
import EmailEditor from 'react-email-editor';
import axios from 'axios';
import {BaseUrl} from '../../../API';
import swal from '@sweetalert/with-react'

const UserProfileEdit = () => {
    const emailEditorRef = useRef(null);
const vendordata=JSON.parse(localStorage.getItem('vendor'));

    const exportHtml = () => {
        emailEditorRef.current.editor.exportHtml((data) => {
            const { design, html } = data;
            // console.log('exportHtml', html);
            const htmldata={
                is_custom: true,
                custom_profile:html
            } 

axios.post(`${BaseUrl}/edit-business-profile/${vendordata.user_id}`,htmldata).then(
    res=>{
        console.log('data',res);
        if(res.data.status){
            swal(res.data.msg)
        }else{
            swal(res.data.msg)
        }
    }
)
 });
    };
    
    return (
        <>
           <div className='edit_Container_header'>
           <Header />    
           </div>        
            <EmailEditor
                style={{width:'100%'}}
                    ref={emailEditorRef}
                />
            <button className='edit_btn'  onClick={exportHtml}>Done!</button>
            
        </>
    )
}


export default UserProfileEdit;