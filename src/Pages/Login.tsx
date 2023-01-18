import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import LogIn from '../Services/LogIn';
import { Await } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/i;
    const passregex = /^[A-Za-z0-9!@#$%^&*()_]{6,16}$/i;
    const navigate = useNavigate();
    const [err, setErr] = useState({
        email: "",
        password: "",

    });
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    });

    const checkInput = (name: string, value: string) => {
        if (name === "email") {
            if (value === "") {
                setErr((prevState) => { return { ...prevState, [name]: "This is Required" } })
                return false;
            }
            else {
                setErr((prevState) => { return { ...prevState, "email": "" } })
                return true;
            }
        }
        else if (name === "password") {
            if (value === "") {
                setErr((prevState) => { return { ...prevState, [name]: "This is Required" } })
                return false;
            }
            else {
                setErr((prevState) => { return { ...prevState, "password": "" } })
                return true;
            }
        }
        return true;
    }
    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        console.log(name, value);
        setUserLogin((prevState) => { return { ...prevState, [name]: value } });
    }
    const checkAll = () => {
        let ifCorrect = true;
        checkInput('email', userLogin.email);
        checkInput('password', userLogin.password);
        ifCorrect = ifCorrect && checkInput('email', userLogin.email);
        ifCorrect = ifCorrect && checkInput('password', userLogin.password);
        return ifCorrect;
    }
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!checkAll()) {
            toast.error("Fill values properly");
            return;
        }
        const data = {
            email: userLogin.email,
            password: userLogin.password
        };
        // console.log(data);
        const result = await LogIn(data);
        // console.log(result);
        const success = result.data.messages.success;
        if (success) {
            toast.success('Login Successfully');
            console.log(result.data.messages.role);
            const session = {
                id: result.data.messages.id,
                role: result.data.messages.role
            }
            localStorage.setItem("session", JSON.stringify(session));
            if (result.data.messages.role == '1') {
              
                navigate('/admin');
            } else {
                navigate('/user');
            }

        }
        else {
            toast.error('Email or Mobile No. is wrong');
        }
        // fetch('http://localhost/LoanProject/loginApi', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         email: userLogin.email,
        //         password: userLogin.password,
        //     }),
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8"
        //     }
        // }).then(response => {
        //     console.log(response);
        //     if (response.status === 201) {

        //         alert("Login successfully");
        //         navigate("/admin");


        //     }
        // });
    }
    return (
        <div>
            <div className="loginFormDiv">
                <section className="login">
                    <header id="formhead">Login</header>
                    <form action="#" className="loginForm" name="login" id="loginForm" onSubmit={handleSubmit}>
                        <div className="form-data">
                            <label htmlFor="email">Email <em className="err">*</em></label>
                            <input type="text" name="email" id="email" value={userLogin.email} placeholder="Enter Your Email" onChange={handleInput} />
                            <p>{err.email}</p>
                        </div>
                        <div className="form-data">
                            <label htmlFor="password">Password <em className="err">*</em></label>
                            <input type="password" name="password" id="password" value={userLogin.password} placeholder="Enter Your Password" onChange={handleInput} />
                            <p>{err.password}</p>
                        </div>
                        {/* <div>
                <div className="g-recaptcha" data-sitekey="6LdcOskjAAAAABncvzWA6tSdGw1oyUimf_gDVGqV">
                </div>
            </div> */}
                        <div>
                            <button name="login" id="loginbtn">Login</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default Login
