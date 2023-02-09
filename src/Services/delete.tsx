import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// export interface UserType{
//     id: string,
//     firstname: string,
//     lastname: string,
//     email: string,
//     mobile: string,
// }

export const userDelete = (id:string) =>{
    // console.log(id);
    // console.log(`http://localhost/loan/PostController/delete/${id}`);
    if(window.confirm('Do you really want to Delete')){
    return axios.get<boolean>(`http://localhost/LoanProject/deleteApi/${id}`)
    }
    toast.error('Deletion cancelled');
    return;
}

// export const lists =async () =>{
//      return axios.get<UserType[]>('http://localhost/LoanProject/userlist')
// }

