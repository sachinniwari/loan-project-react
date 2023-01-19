import React, { HtmlHTMLAttributes, useState } from "react";
import axios from "axios";




export interface User {
    name: string | null,
    email: string | null,
    mobile: string | null,
    password: string | null,
    role:string|null,
    id: number | null
}

//get userlist with/without filters
const getAllUsers = async (data:object) => {
    if(data){
        let keys = Object.keys(data);
        let values = Object.values(data);
        let query=""
        for(let i in values){
            if(values[i]!=="")
            query+=keys[i]+"="+values[i]+"&";

        }
        query = query.substring(0,query.length-1);       
        return axios.get<User[]>("http://localhost:8080/UserApi/?"+query);   
    }
    

    return axios.get<User[]>("http://localhost:8080/UserApi/");

}



//change role of users and admin 

const changeRole= async (id:string,role:string)=>{
    const data={
        "role":role,

    }
    return axios.put<User[]>(`http://localhost:8080/UserApi/updaterole/${id}`,data);
    

}

//delete user
const deleteUser= async (id:string)=>{
    interface response {
        messages: {
          success: boolean|null,
          message:string|null,
          
        }
      }
      
    
    return axios.delete<response>(`http://localhost:8080/UserApi/delete/${id}`);
    

}






export { getAllUsers,changeRole,deleteUser };