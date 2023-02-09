import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export interface response {
    status  : string,
    error  :string|null,
    messages: {
        success:boolean,
        message:string
    }
}

export const update = (data:object,id:string) =>{
   
  
    return axios.post<response>(`http://localhost/LoanProject/ApiController/update/${id}`,data)
    
    
    
}


