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

export const loanDetails = (id:string) =>{
   
  
    return axios.get<response>(`http://localhost/LoanProject/userappdetail/${id}`)
    
    
    
}


