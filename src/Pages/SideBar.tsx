import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"

interface pagetype {
  pageName: string
}

const SideBar: React.FC<pagetype> = ({ pageName }) => {

  const logout = () => {
    localStorage.removeItem("session");
    toast.success("logged out successfully");


  }
  console.log(pageName);
  return (
    <div>
      <ul className="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar">

        <li className='special'>
          <Link to='/admin' className='mt-2 mb-4'>Dashboard</Link>
        </li>

        {
          pageName === "admin" && <>
            <li className='special'>
              <Link to='#' >User List</Link>
            </li>
          </>
        }

        <li className="special">
      
          <Link to='#' >Report</Link>
         
        </li>

        
        <li className="special">
        
        <Link to='#' >Administration Tool</Link>
        
        </li>
      </ul></div>

  )
}

export default SideBar
