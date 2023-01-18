
import React, { HtmlHTMLAttributes, useState } from "react";
import axios from "axios";


interface response {
  messages: {
    success: string
    role:string|null,
    id:number|null
  }
}

const LogIn = async (data:object) =>{
  return axios.post<response>("http://localhost/LoanProject/loginApi",data);
  

}

export default LogIn;