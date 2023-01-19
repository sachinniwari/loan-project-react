import React, { useState, useEffect, SyntheticEvent } from 'react'
import axios from 'axios'
import SideBar from './SideBar'
import { DataGrid, GridColDef, GridRowId, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import FormHook from '../hooks/Formhook';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { changeRole, getAllUsers, User } from '../Services/AdminServices';
import { margin } from '@mui/system';
import { userDelete} from "../Services/delete";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import axios from '../Services/UserListAxio'
interface userType {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    mobile: number,

}

const Admin = () => {

    const userdelete = async (id: string) => {
        if (await userDelete(id)) {
            list();
            toast.success('User Deleted');

        }
        else {
            toast.error('Error in Deletion');
        }
    }

    const [pageSize, setPageSize] = React.useState<number>(5);

    const submitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        const data = {
            name: name.value,
            email: email.value,
            role: role,
            mobile: mobile.value,

        }
    }

    const name = FormHook("");
    const email = FormHook("");
    const mobile = FormHook("");
    const [role, setrole] = useState("admin");





    const columns: GridColDef[] = [
        // { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'firstName',
            headerName: 'First Name',
            width: 250,
            // editable: true,
        }, {
            field: 'lastName',
            headerName: 'Last Name',
            width: 250,
            // editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 250,
            // editable: true,
        },
        {
            field: 'mobile',
            headerName: 'Mobile',
            width: 250,
            // editable: true,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 130,
            // editable: true,
        }, {
            field: 'action',
            headerName: 'Action',
            width: 150,
            // editable: true,
            renderCell: (cellValues) => {

                return (
                    <>
                        {
                            cellValues.row.role === "0" ? <button className='btn btn-outline-danger' onClick={() => userdelete(cellValues.row.id)}>
                                Delete
                            </button> : <h5 style={{ color: 'brown' }}>Admin</h5>

                        }
                    </>
                );
            }
        },
        {
            field: "edit",
            headerName: 'Edit',
            renderCell: (cellValues) => {

                return (
                    <>
                        {
                            <button className='btn btn-outline-warning' onClick={() => { console.log(cellValues.row.role) }}>
                                Update
                            </button>
                        }
                    </>
                );
            }
        }




    ];


    const list=()=>{
        axios.get("http://localhost/LoanProject/userlist")
        .then((response) => {
            setusers(response.data)
        })
        .catch((error) => {
            alert(error)
        })
    }
    const [users, setusers] = useState<userType[]>([]);
    useEffect(() => {
       list();
    }, [])

    return (
        <>
            <div className='d-flex flex-row justify-around'>
                <div id='content col-11'>
                    <div className='sb col-12'>
                        <SideBar pageName='admin' />
                    </div>
                </div>

                {/* <div id='filter' className='row d-flex w-100 justify-content-center'>
                    <form onSubmit={submitHandler} className="form">
                        <div className='row'>

                            <div className='w-12'>
                                <span className='mt-3 ms-2 strong d-block' >Filters:</span>
                            </div>
                            <div className='col-md-3'>
                                <input type="text" className='m-2 form-control' placeholder='name' {...name} />
                            </div>

                            <div className='col-md-3'>
                                <input type="text" className='m-2 form-control' placeholder='email' {...email} />
                            </div>
                            <div className='col-md-3'>
                                <input type="text" className='m-2 form-control' placeholder='mobile' {...mobile} />
                            </div>
                            <div className='col-md-1'>

                                <select name="role" className='m-2 form-control' onChange={e => setrole(e.target.value)}>
                                    <option value="admin">admin</option>
                                    <option value="user">user</option>
                                </select>
                            </div>
                            <div className='col-md-3'>
                                <input type="submit" value="Apply Filters" className='btn btn-primary' />
                            </div>

                        </div>

                    </form>


                </div> */}

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
                    <Box sx={{ height: "70vh", width: '100%' }}>
                        <DataGrid
                            rows={users}
                            columns={columns}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            rowsPerPageOptions={[5, 10, 20, 40]}
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
