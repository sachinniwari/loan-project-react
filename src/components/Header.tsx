import React from 'react'
// import { Link } from 'react-router-dom'
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {
  const location = useLocation()
  let path = location.pathname;
  const logout = () => {
    localStorage.removeItem("session");
    toast.success("logged out successfully");

  }
  return (
    <div>
      <header className="head">
        <img className='logo' src="/images/LoanProLogo.png" alt="logo"height="50px" />
        <nav>
          <ul className="nav__links">
            <li> {(path === "/" || path === "/signup" || path === "/login") && <Link to="/">Home</Link>}</li>
            <li>{(path === "/" || path === "/signup" || path === "/login") && <Link to="/">About</Link>}</li>
            <li>{(path === "/" || path === "/signup" || path === "/login") && <Link to="/">Services</Link>}</li>
          </ul>
        </nav>
        {(path === "/" || path === "/signup") && <Link id="button" className="cta" to="/login">Login</Link>}
        {(path === "/" || path === "/login") && <Link id="button" className="cta" to="/signup">Signup</Link>}
        {(path == "/admin" || path=="/userdash"|| path == "/user") && <Link id="button" onClick={logout} className="cta" to="/login">Logout</Link>}
        {(path=="/userdash") && <Link id='button'className='cta' to='/user'>Apply Loan</Link>}
        {path=="/user"  && <Link id='button'className='cta' to='/userdash'>Dashboard</Link>}
        {(path=="/user" || path=="/userdash")&& <img className='avatar' src='/images/avatar.png' height="60px" />}
        {(path=="/admin")&& <img className='avatar' src='/images/admin.png' height="60px" />}
      </header>
    </div>
  )
}

export default Header
