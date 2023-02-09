import axios from "axios";

import 'react-toastify/dist/ReactToastify.css';
export interface response {
    status  : string,
    error  :string|null,
    messages: {
        success:boolean,
        message:string
    }
}

export const updatestatus = (data:object,id:string) =>{
   
  
    return axios.post<response>(`http://localhost/LoanProject/ApiController/updateStatus/${id}`,data);
    
    
    
}
