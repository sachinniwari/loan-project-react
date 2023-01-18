import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SideBar from './SideBar'
import { DataGrid, GridColDef, GridRowId, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
// import axios from '../Services/UserListAxio'
interface userType {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    mobile: number,

}
const Admin = () => {

    const columns: GridColDef[] = [
        // { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'firstName',
            headerName: 'First Name',
            width: 300,
            // editable: true,
        }, {
            field: 'lastName',
            headerName: 'Last Name',
            width: 300,
            // editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 300,
            // editable: true,
        },
        {
            field: 'mobile',
            headerName: 'Mobile',
            width: 300,
            // editable: true,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 150,
            // editable: true,
        },



    ];
    const [users, setusers] = useState<userType[]>([]);
    useEffect(() => {
        axios.get("http://localhost/LoanProject/userlist")
            .then((response) => {
                setusers(response.data)
            })
            .catch((error) => {
                alert(error)
            })
    }, [])

    return (
        <>
            <div className='d-flex flex-row justify-around'>
                <div id='content col-11'>
                    <div className='sb col-12'>
                        <SideBar pageName='admin' />
                    </div>
                </div>

                {/* <div className='col-10 m-4 p-5 '>
                <h2 className='text-center m-4'>User List</h2>
                <table className='table table-striped col-12 table-bordered'>
                    <thead>
                        <tr>
                            <th scope="col">S.No.</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile No.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user)=>(
                            <tr key={user.id}>
                                <td scope="row">{user.id}</td>
                                <td scope="row">{user.firstName.charAt(0).toUpperCase()+user.firstName.slice(1)}</td>
                                <td scope="row">{user.lastName.charAt(0).toUpperCase()+user.lastName.slice(1)}</td>
                                <td scope="row">{user.email}</td>
                                <td scope="row">{user.mobile}</td>
                            </tr>

                        ))}
                    </tbody>

                </table>
                
            </div> */}
                <div className='col-10 m-4 p-5'>
                    <Box sx={{ height: "45vh", width: '100%' }}>
                        <DataGrid
                            rows={users}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection

                            disableSelectionOnClick
                            components={{ Toolbar: GridToolbar }}
                        />
                    </Box>
                </div>
            </div>
        </>
    )
}

export default Admin
