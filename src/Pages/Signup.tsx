import React, { HtmlHTMLAttributes, useState } from 'react'
import ReactDOM from 'react-dom';
import SignUp from '../Services/SignUp';
import { Link, useNavigate } from 'react-router-dom';
import { Await } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


const Signup = () => {
    const emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/i;
    const passregex = /^[A-Za-z0-9!@#$%^&*()_]{6,16}$/i;
    const mobregex = /^[0-9]{10}$/i;
    const [err, setErr] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: ""
    });
    const [userRegistration, setUserRegistration] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();

    const checkInput = (name: string, value: string) => {
        if (name === "firstName") { 
            if (value === "") {
                setErr((prevState) => { return { ...prevState, [name]: "This is Required" } })
                return false;
            }
            else if (value.length < 2) {
                setErr((prevState) => { return { ...prevState, "firstName": "First Name should atleast have 2 letters" } })
                return false;
            }
            else if (value.length > 20) {
                setErr((prevState) => { return { ...prevState, "firstName": "First Name is too large" } })
                return false;
            }
            else {
                setErr((prevState) => { return { ...prevState, "firstName": "" } })
                return true;
            }
        }
        else if (name === "lastName") {
            if (value === "") {
                setErr((prevState) => { return { ...prevState, [name]: "This is Required" } })
                return false;
            }
            else if (value.length < 3) {
                setErr((prevState) => { return { ...prevState, "lastName": "Last Name should atleast have 3 3etters" } })
                return false;
            }
            else if (value.length > 20) {
                setErr((prevState) => { return { ...prevState, "lastName": "Last Name is too large" } })
                return false;
            }
            else {
                setErr((prevState) => { return { ...prevState, "lastName": "" } })
                return true;
            }
        }
        else if (name === "email") {
            if (value === "") {
                setErr((prevState) => { return { ...prevState, [name]: "This is Required" } })
                return false;
            }
            else if (!emailregex.test(value)) {
                setErr((prevState) => { return { ...prevState, "email": "Invalid Email" } })
                return false;
            }
            else if (value.length > 30) {
                setErr((prevState) => { return { ...prevState, "email": "Email is too large" } })
                return false;
            }
            else {
                setErr((prevState) => { return { ...prevState, "email": "" } })
                return true;
            }
        }
        else if (name === "mobile") {
            if (value === "") {
                setErr((prevState) => { return { ...prevState, [name]: "This is Required" } })
                return false;
            }
            else if (value.length !== 10) {
                setErr((prevState) => { return { ...prevState, "mobile": "Mobile must be 10 digit" } })
                return false;
            }
            else {
                setErr((prevState) => { return { ...prevState, "mobile": "" } })
                return true;
            }
        }
        else if (name === "password") {
            if (value === "") {
                setErr((prevState) => { return { ...prevState, [name]: "This is Required" } })
                return false;
            }
            else if (value.length < 7) {
                setErr((prevState) => { return { ...prevState, "password": "Password should atleast have 7 characters" } })
                return false;
            }
            else if (value.length > 30) {
                setErr((prevState) => { return { ...prevState, "password": "Password is too large" } })
                return false;
            }
            else {
                setErr((prevState) => { return { ...prevState, "password": "" } })
                return true;
            }
        }
        else if (name === "confirmPassword") {
            if (value === "") {
                setErr((prevState) => { return { ...prevState, [name]: "This is Required" } })
                return false;
            }
            else if (userRegistration.password !== value) {
                setErr((prevState) => { return { ...prevState, "confirmPassword": "Password should be same" } })
                return false;
            }
            else {
                setErr((prevState) => { return { ...prevState, "confirmPassword": "" } })
                return true;
            }
        }
        return true
    }

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        checkInput(name,value);
        setUserRegistration((prevState) => { return { ...prevState, [name]: value } });
    }

    const checkAll = () => {
        let ifCorrect = true;
        ifCorrect = ifCorrect
        checkInput('firstName', userRegistration.firstName);
        checkInput('lastName', userRegistration.lastName);
        checkInput('email', userRegistration.email);
        checkInput('mobile', userRegistration.mobile);
        checkInput('password', userRegistration.password);
        checkInput('confirmPassword', userRegistration.confirmPassword);
        ifCorrect = ifCorrect && checkInput('firstName', userRegistration.firstName);
        ifCorrect = ifCorrect && checkInput('lastName', userRegistration.lastName);
        ifCorrect = ifCorrect && checkInput('email', userRegistration.email);
        ifCorrect = ifCorrect && checkInput('mobile', userRegistration.mobile);
        ifCorrect = ifCorrect && checkInput('password', userRegistration.password);
        ifCorrect = ifCorrect && checkInput('confirmPassword', userRegistration.confirmPassword);
        return ifCorrect;
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!checkAll()) {
            toast.error("Fill values properly");
            return; 
        }
        const data = {
            firstName: userRegistration.firstName,
            lastName: userRegistration.lastName,
            email: userRegistration.email,
            mobile: userRegistration.mobile,
            password: userRegistration.password
        };
        // console.log(data);
        const result = await SignUp(data);
        // console.log(result);
        const success = result.data.messages.success;
        if (success) {
            toast.success('User Registered successfully');
            navigate('/login');
        }
        else {
            toast.error('Email or Mobile No. is already exists');
        }
        // fetch('http://localhost/LoanProject/register', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         firstName: userRegistration.firstName,
        //         lastName: userRegistration.lastName,
        //         email: userRegistration.email,
        //         mobile: userRegistration.mobile,
        //         password: userRegistration.password
        //     }),
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8"
        //     }
        // }).then(response => {
        //     if (response.status === 201) {
        //         alert("New user saved successfully");
        //     }
        // });
    }
    return (
        <div className="regform">
            <section className="container-signup">
                <header id="formhead">Registration Form</header>

                <form name="LoginForm" className="form" id="form" onSubmit={handleSubmit} >
                    <div className="column">
                        <div className="form-data">
                            <label htmlFor={"firstName"}>First Name <em className="err">*</em></label>

                            <input type="text" name="firstName" id="firstName" placeholder="Enter Your First Name" value={userRegistration.firstName} onChange={handleInput} />
                            <p>{err.firstName}</p>


                        </div>

                        <div className="form-data">
                            <label htmlFor="lastName">Last Name <em className="err">*</em></label>

                            <input type="text" name="lastName" id="lastName" placeholder="Enter Your Last Name" value={userRegistration.lastName} onChange={handleInput} />
                            <p>{err.lastName}</p>

                        </div>
                    </div>

                    <div className="form-data">
                        <label htmlFor="email">Email <em className="err">*</em></label>

                        <input type="email" name="email" id="email" placeholder="Enter Your Email Id" value={userRegistration.email} onChange={handleInput} />
                        <p>{err.email}</p>

                    </div>

                    <div className="column">
                        <div className="form-data">
                            <label htmlFor="mobile">Mobile No. <em className="err">*</em></label>

                            <input type="number" name="mobile" id="mobile" placeholder="Enter Your Mobile No." value={userRegistration.mobile} onChange={handleInput} />
                            <p>{err.mobile}</p>


                        </div>


                        <div className="form-data">
                            <label htmlFor="password">Password <em className="err">*</em></label><br />

                            <input type="password" name="password" id="password" placeholder="Enter Your Password" value={userRegistration.password} onChange={handleInput} />
                            <p>{err.password}</p>

                        </div>

                        <div className="form-data">
                            <label htmlFor="confirmPassword">Confirm Password <em className="err">*</em></label><br />
                            <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" value={userRegistration.confirmPassword} onChange={handleInput} />
                            <p>{err.confirmPassword}</p>
                        </div>

                        <div>
                            < button type='submit' name="submit">Submit</button>
                        </div>

                    </div>
                </form>
            </section>

        </div >
    )
}

export default Signup