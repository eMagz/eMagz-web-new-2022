
import React from 'react';
import './index.css';
import MaterialTable from 'material-table';
import Header from '../Header';
const HomeWorkTable=()=>{

    
  
  
    return(
      <>
      <Header/>
      <div  className='homework_container' >
     
       
        <div  className='fees_table' >
        <MaterialTable
        title="Home Work Details"
       
        columns={[
         
          { title: 'User Id', field: 'id' },
          { title: 'User Name', field: 'first_name' },
          { title: 'Status', field: 'last_name' },
        ]}
        data={query =>
          new Promise((resolve, reject) => {
            let url = 'https://reqres.in/api/users?'
            url += 'per_page=' + query.pageSize
            url += '&page=' + (query.page + 1)
            fetch(url)
              .then(response => response.json())
              .then(result => {
                resolve({
                  data: result.data,
                  page: result.page - 1,
                  totalCount: result.total,
                })
              })
          })
        }
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Details',
            onClick: (event, rowData) => alert("You saved " + rowData.name)
          },
         
        ]}
        options={{
          actionsColumnIndex: -1,
          search: false
        }}
      />
        </div>
     
      </div>
      </>
    )
      


}



export default HomeWorkTable;









