import React, { useState, useEffect, SyntheticEvent } from 'react'
import axios from 'axios'
import SideBar from './SideBar'
import { DataGrid, GridCellParams, GridColDef, GridRowId, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import FormHook from '../hooks/Formhook';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { changeRole, getAllUsers, User } from '../Services/AdminServices';
import { margin } from '@mui/system';
import { userDelete } from "../Services/delete";
import { update } from "../Services/update";
import { loanDetails } from '../Services/loanDetails';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import LogIn from '../Services/LogIn';
import { updatestatus } from '../Services/UpdateStatus';
interface userType {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    mobile: number,

}
const Admin = () => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isLoanOpen, setIsLoanOpen] = useState(false);
    const [Status, setStatus] = useState("pending");
    const [remark, setRemark] = useState("");
    const [resetValue, setResetValue] = useState();
    const userdelete = async (id: string) => {
        if (await userDelete(id)) {
            list({});
            toast.success('User Deleted');

        }
        else {
            toast.error('Error in Deletion');
        }
    }

    const updateStatus = async (id: string) => {
        const data = {
            status: Status,
            remarks: remark
        }
        await updatestatus(data, id).then(res => toast.success(res.data.messages.success)).catch(err => console.log(err));
    }
    
    const [pageSize, setPageSize] = React.useState<number>(5);

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
            width: 100,
            // editable: true,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 100,
            // editable: true,
        },
        {
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
                            </button> : <h5 style={{ color: 'red' }}>Admin</h5>

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
                            cellValues.row.role === "0" ? <button className='btn btn-outline-warning'
                                onClick={
                                    () => {
                                        getUserDetail(cellValues)
                                    }}
                            >
                                Update
                            </button> : <h5 style={{ color: 'red' }}>Admin</h5>
                        }
                    </>
                );
            }
        },
        {
            field: "detail",
            headerName: 'Loan Details',
            renderCell: (cellValues) => {

                return (
                    <>
                        {
                            cellValues.row.role === "0" ? <button className='btn btn-outline-primary'
                                onClick={
                                    async () => {
                                        await loanDetails(cellValues.row.id).then(res => { getLoanDetail(res.data) }).catch(err => console.log(err));

                                    }}
                            >
                                Detail
                            </button> : <h5 style={{ color: 'red' }}>Admin</h5>
                        }
                    </>
                );
            }
        }




    ];

    const [obj, setObj] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        mobile: ""
    })
    const getUserDetail = (data: GridCellParams) => {


        const datain = {
            id: data.row.id,
            firstName: data.row.firstName,
            lastName: data.row.lastName,
            email: data.row.email,
            mobile: data.row.mobile,


        }
        setObj(datain);
        setIsEditOpen(true);

    }

    const [loan, setLoan] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        gender: "",
        aadhar: "",
        pan: "",
        profession: "",
        annualIncome: "",
        loanAmount: "",
        duration: "",
        hNo: "",
        area: "",
        city: "",
        pincode: "",
        state: "",
        country: "",
        status: "",
        remarks: "",
        userId: "",

    })
    const getLoanDetail = (data: any) => {
        if (data.messages.success == false) {
            toast.error("User has not applied yet");
        }
        data = data.messages.data;

        const loandatain = {
            id: data[0].id,
            firstName: data[0].firstName,
            lastName: data[0].lastName,
            email: data[0].email,
            mobile: data[0].mobile,
            gender: data[0].gender,
            aadhar: data[0].aadhar,
            pan: data[0].pan,
            profession: data[0].profession,
            annualIncome: data[0].annualIncome,
            loanAmount: data[0].loanAmount,
            duration: data[0].duration,
            hNo: data[0].hNo,
            area: data[0].area,
            city: data[0].city,
            pincode: data[0].pincode,
            state: data[0].state,
            country: data[0].country,
            status: data[0].status,
            remarks: data[0].remarks,
            userId: data[0].userId,
        }

        setStatus(loandatain.status);
        setRemark(loandatain.remarks);
        console.log(loandatain);
        setLoan(loandatain);
        setIsLoanOpen(true);
        console.log(isLoanOpen);

    }

    const list = (data: object) => {
        const token = localStorage.getItem("token");
        if (data) {
            let keys = Object.keys(data);
            let values = Object.values(data);
            let query = ""
            for (let i in values) {
                if (values[i] !== "")
                    query += keys[i] + "=" + values[i] + "&";

            }
            query = query.substring(0, query.length - 1);
            if (query.length > 1) {
                return axios.get("http://localhost/LoanProject/userlist?" + query, {
                    headers: {
                        'Authorization': 'Token ' + token
                    }
                }).then((response) => {
                    setusers(response.data)
                })
                    .catch((error) => {
                        alert(error)
                    });
            }
            else {
                axios.get("http://localhost/LoanProject/userlist", {
                    headers: {
                        'Authorization': 'Token ' + token
                    }
                }).then((response) => {
                    setusers(response.data)
                })
                    .catch((error) => {
                        alert(error)
                    });
            }
        }




    }
    const [users, setusers] = useState<userType[]>([]);
    useEffect(() => {
        list({});
    }, [])

    return (
        <>
            <div className='d-flex '>

                <div id='content' className='d-flex w-20'>
                    <div className='sb col-10'>
                        <SideBar pageName='admin' />
                    </div>
                </div>


                <div id="mainsec">


                    <form onSubmit={(evt) => {
                        evt.preventDefault();
                        const data = new FormData(evt.currentTarget);
                        const query = {
                            name: data.get('name'),
                            email: data.get('email'),
                            mobile: data.get('mobile'),
                            role: data.get('role'),
                        }
                        list(query);
                    }}
                        className="form d-flex pt-8" id='filter'>
                        {/* <div className='row'> */}

                        <div className='m-2'>
                            <span className='m-2 form-control strong' style={{ "border": "none" }} >Filters:</span>
                        </div>
                        <div className='m-2'>
                            <input type="text" className='m-2 form-control' placeholder='name' name="name" />
                        </div>

                        <div className='m-2'>
                            <input type="text" className='m-2 form-control' placeholder='email' name="email" />
                        </div>
                        <div className='m-2'>
                            <input type="text" className='m-2 form-control' placeholder='mobile' name="mobile" />
                        </div>
                        <div className='m-2'>

                            <select name="role" className='m-2 form-control'>
                                <option value="1">admin</option>
                                <option value="0">user</option>
                            </select>
                        </div>
                        <div className='m-2'>
                            <input type="submit" value="Apply Filters" className='btn btn-primary mt-2 form-control' />
                        </div>
                        <div className='m-2'>
                            <input type="button" value="Reset" className='btn btn-primary mt-2 form-control' onClick={() => resetValue} />
                        </div>

                        {/* </div> */}

                    </form>


                    <div className='col-12 m-2 p-0'>
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

                    <Modal isOpen={isEditOpen} size='md' toggle={() => setIsEditOpen(!isEditOpen)} >
                        <ModalHeader
                            toggle={() => setIsEditOpen(!isEditOpen)}>
                            Update Details
                        </ModalHeader>
                        <ModalBody>

                            <form onSubmit={async (evt) => {
                                // edit(editId)
                                evt.preventDefault();
                                let data = new FormData(evt.currentTarget);
                                let formData = {

                                    "firstName": data.get("firstName"),
                                    "lastName": data.get("lastName"),
                                    "email": data.get("email"),
                                    "mobile": data.get("mobile"),


                                };
                                console.log(formData);
                                const res = await update(formData, obj.id);


                                if (res.data.messages.success === true) {
                                    setIsEditOpen(false)
                                    list({});
                                    toast.success("Data Updated Successfully")
                                }
                                else {
                                    setIsEditOpen(false)

                                    toast.error("Error Occured");
                                }
                            }}>
                                <Row className='mt-2'>
                                    <Col>First Name
                                    </Col>

                                    <Col><input type="text" name="firstName" className='form-control' defaultValue={obj.firstName} /></Col>

                                </Row>
                                <Row className='mt-2'>
                                    <Col>Last Name
                                    </Col>

                                    <Col><input type="text" name="lastName" className='form-control' defaultValue={obj.lastName} /></Col>

                                </Row>
                                <Row className='mt-2'>
                                    <Col>Email
                                    </Col>
                                    <Col><input type="text"
                                        name="email"
                                        className='form-control' defaultValue={obj.email} /></Col>

                                </Row>
                                <Row className='mt-2'>
                                    <Col>Mobile
                                    </Col>
                                    <Col><input type="text"
                                        name="mobile"
                                        className='form-control'
                                        defaultValue={obj.mobile}
                                    /></Col>

                                </Row>

                                <Row className='mt-4'>
                                    <Col lg={12} className="row">
                                        <div className='d-flex justify-content-end'>
                                            <button onClick={() => setIsEditOpen(false)} className="col-md-3 ms-2 btn btn-success"  >Cancel</button>
                                            <button type='submit' className="col-md-3 ms-2 btn btn-danger">Update</button>

                                        </div>
                                    </Col>
                                </Row>
                            </form>
                        </ModalBody>
                    </Modal>

                    {
                        <>

                            <Modal isOpen={isLoanOpen} size='md' toggle={() => setIsLoanOpen(!isLoanOpen)} >
                                <ModalHeader
                                    toggle={() => setIsLoanOpen(!isLoanOpen)}>
                                    Loan Details
                                </ModalHeader>
                                <ModalBody>

                                    <form onSubmit={async (evt) => {
                                        // edit(editId)
                                        evt.preventDefault();
                                        let data = new FormData(evt.currentTarget);
                                        let formData = {

                                            "firstName": data.get("firstName"),
                                            "lastName": data.get("lastName"),
                                            "email": data.get("email"),
                                            "mobile": data.get("mobile"),
                                            "gender": data.get("gender"),
                                            "aadhar": data.get("aadhar"),
                                            "pan": data.get("pan"),
                                            "profession": data.get("profession"),
                                            "annualIncome": data.get("annualIncome"),
                                            "loanAmount": data.get("loanAmount"),
                                            "duration": data.get("duration"),
                                            "hNo": data.get("hNo"),
                                            "area": data.get("area"),
                                            "city": data.get("city"),
                                            "pincode": data.get("pincode"),
                                            "state": data.get("state"),
                                            "country": data.get("country"),
                                            "userId": data.get("userId"),
                                        };
                                        console.log(formData);
                                        const res = await loanDetails(loan.id);


                                        if (res.data.messages.success === false) {
                                            setIsLoanOpen(false)
                                            list({});
                                            toast.success("Status Updated Successfully")
                                        }
                                        else {
                                            setIsLoanOpen(false)
                                            toast.error("Error Occured");
                                        }
                                    }}>
                                        <Row className='mt-2'>
                                            <Col>First Name
                                            </Col>

                                            <Col><input type="text" name="firstName" className='form-control' defaultValue={loan.firstName} disabled /></Col>

                                        </Row>
                                        <Row className='mt-2'>
                                            <Col>Last Name
                                            </Col>

                                            <Col><input type="text" name="lastName" className='form-control' defaultValue={loan.lastName} disabled /></Col>

                                        </Row>
                                        <Row className='mt-2'>
                                            <Col>Email
                                            </Col>
                                            <Col><input type="text"
                                                name="email"
                                                className='form-control' defaultValue={loan.email} disabled /></Col>

                                        </Row>
                                        <Row className='mt-2'>
                                            <Col>Mobile
                                            </Col>
                                            <Col><input type="text"
                                                name="mobile"
                                                className='form-control' disabled
                                                defaultValue={loan.mobile}
                                            /></Col>
                                        </Row>

                                        <Row className='mt-2'>
                                            <Col>Gender
                                            </Col>
                                            <Col><input type="text"
                                                name="gender"
                                                className='form-control'
                                                defaultValue={loan.gender} disabled
                                            /></Col>
                                        </Row>

                                        <Row className='mt-2'>
                                            <Col>Aadhar
                                            </Col>
                                            <Col><input type="text"
                                                name="aadhar"
                                                className='form-control'
                                                defaultValue={loan.aadhar} disabled
                                            /></Col>
                                        </Row>

                                        <Row className='mt-2'>
                                            <Col>Pan
                                            </Col>
                                            <Col><input type="text"
                                                name="pan"
                                                className='form-control'
                                                defaultValue={loan.pan} disabled
                                            /></Col>
                                        </Row>

                                        <Row className='mt-2'>
                                            <Col>Profession
                                            </Col>
                                            <Col><input type="text"
                                                name="profession"
                                                className='form-control'
                                                defaultValue={loan.profession} disabled
                                            /></Col>
                                        </Row>

                                        <Row className='mt-2'>
                                            <Col>Annual Income
                                            </Col>
                                            <Col><input type="text"
                                                name="annualIncome"
                                                className='form-control'
                                                defaultValue={loan.annualIncome} disabled
                                            /></Col>
                                        </Row>

                                        <Row className='mt-2'>
                                            <Col>Loan Amount
                                            </Col>
                                            <Col><input type="text"
                                                name="loanAmount"
                                                className='form-control'
                                                defaultValue={loan.loanAmount} disabled
                                            /></Col>
                                        </Row>

                                        <Row className='mt-2'>
                                            <Col>Duration
                                            </Col>
                                            <Col><input type="text"
                                                name="loanAmount"
                                                className='form-control'
                                                defaultValue={loan.duration} disabled
                                            /></Col>
                                        </Row>

                                        <Row className='mt-2'>
                                            <Col>H.No.
                                            </Col>
                                            <Col><input type="text"
                                                name="hNo"
                                                className='form-control'
                                                defaultValue={loan.hNo} disabled
                                            /></Col>
                                        </Row>

                                        <Row className='mt-2'>
                                            <Col>Area
                                            </Col>
                                            <Col><input type="text"
                                                name="area"
                                                className='form-control'
                                                defaultValue={loan.area} disabled
                                            /></Col>
                                        </Row>

                                        <Row className='mt-2'>
                                            <Col>City
                                            </Col>
                                            <Col><input type="text"
                                                name="city"
                                                className='form-control'
                                                defaultValue={loan.city} disabled
                                            /></Col>
                                        </Row>

                                        <Row className='mt-2'>
                                            <Col>Pincode
                                            </Col>
                                            <Col><input type="text"
                                                name="pincode"
                                                className='form-control'
                                                defaultValue={loan.pincode} disabled
                                            /></Col>
                                        </Row>
                                        <Row className='mt-2'>
                                            <Col>State
                                            </Col>
                                            <Col><input type="text"
                                                name="state"
                                                className='form-control'
                                                defaultValue={loan.state} disabled
                                            /></Col>
                                        </Row>

                                        <Row className='mt-2'>
                                            <Col>Country
                                            </Col>
                                            <Col><input type="text"
                                                name="country"
                                                className='form-control'
                                                defaultValue={loan.country} disabled
                                            /></Col>
                                        </Row>



                                        <Row className='mt-2'>
                                            <Col>Status
                                            </Col>
                                            <Col><select name="remarks"
                                                className='form-control'
                                                value={Status}
                                                onChange={(evt) => { setStatus(evt.currentTarget.value) }}>
                                                <option value="pending">Pending</option>
                                                <option value="approved">Approved</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                            </Col>
                                        </Row>
                                        {Status !== "pending" &&
                                            <Row className='mt-5'>
                                                <Col> Add Remarks
                                                </Col>
                                                <Col>
                                                    <textarea name="remarks" value={remark} id="" cols={30} rows={4} onChange={(evt) => setRemark(evt.currentTarget.value)}></textarea>
                                                </Col>
                                            </Row>}

                                        <Row className='mt-4'>
                                            <Col lg={12} className="row">
                                                <div className='d-flex justify-content-end'>
                                                    <button onClick={() => setIsLoanOpen(false)} className="col-md-3 ms-2 btn btn-success"  >Cancel</button>
                                                    <button type='submit' className="col-md-3 ms-2 btn btn-danger" onClick={() => updateStatus(loan.id)}>Update</button>

                                                </div>
                                            </Col>
                                        </Row>
                                    </form>
                                </ModalBody>
                            </Modal>

                        </>
                    }




                </div>
            </div>
        </>

    )
}

export default Admin
