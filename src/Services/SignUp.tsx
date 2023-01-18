
import React, { HtmlHTMLAttributes, useState } from "react";
import axios from "axios";


interface response {
  messages: {
    success: string
  }
}

const SignUp = async (data:object) =>{
   console.log('hello');
    console.log(data);
  return axios.post<response>("http://localhost/LoanProject/register",data);
  

}

export default SignUp;