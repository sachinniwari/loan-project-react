import React, { HtmlHTMLAttributes, useState } from 'react'
import { toast } from 'react-toastify';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import '.././Pages/sidestyle.css'
import { apply } from '../Services/apply';
const User = () => {
  let localdata = localStorage.getItem("session") as string;
  let userid = JSON.parse(localdata).id;
  const [userApplication, setUserApplication] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    aadhar: "",
    pan: "",
    profession: "",
    annualIncome: "",
    loanAmount: "",
    duration: "",
    hNo: "",
    area: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
    userId: userid,
    isApplied:"",
  });


  // const handleSubmit = async (e:React.SyntheticEvent)=>{
  //   e.preventDefault();

  //   const data = {
  //     firstName : userApplication.firstName,
  //     lastName : userApplication.lastName,
  //     email : userApplication.email,
  //     mobile : userApplication.mobile,
  //     gender : userApplication.gender,
  //     aadhar : userApplication.aadhar,
  //     pan : userApplication.pan,
  //     profession : userApplication.profession,
  //     annualIncome : userApplication.annualIncome,
  //     loanAmount : userApplication.loanAmount,
  //     duration : userApplication.duration,
  //     hNo : userApplication.hNo,
  //     area : userApplication.area,
  //     city : userApplication.city,
  //     pincode : userApplication.pincode,
  //     state : userApplication.state,
  //     country : userApplication.country,
  //     userId : userApplication.userId
  //   };

  //   const result = await App(data);

  //   const success = result.data.messages.success;
  //   if(success){
  //     toast.success('Loan Applied Successfully');
  //   }
  //   else{
  //     toast.error('Not Applied');
  //   }
  // }

  return (
    <>
      <form action="" method="post" onSubmit={async (evt) => {
        evt.preventDefault();
        let data = new FormData(evt.currentTarget);
        let formData = {
          "firstName": data.get("firstName"),
          "lastName": data.get("lastName"),
          "email": data.get("email"),
          "mobile": data.get("mobile"),
          "gender": data.get("gender"),
          "aadhar": data.get("aadhar"),
          "pan": data.get("pan"),
          "profession": data.get("profession"),
          "annualIncome": data.get("annualIncome"),
          "loanAmount": data.get("loanAmount"),
          "duration": data.get("duration"),
          "hNo": data.get("hNo"),
          "area": data.get("area"),
          "city": data.get("city"),
          "pincode": data.get("pincode"),
          "state": data.get("state"),
          "country": data.get("country"),
          "userId": userid,
          "isApplied":1
        };
        
        const res = await apply(formData, userApplication.id);
        // const h = res.data.messages.success;
        // console.log(res.data.messages.success = true );
        if (res.data.messages.success === true) {
          toast.success("Loan Applied Successfully");
        }
        else {
          toast.error("Error Occured");
        }
      }
      
      }>
        
        <div className="apply_loan">
          <section className="">
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12">
                  <div className="card card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                    <div className="card-body p-0">
                      <div className="row g-0">
                        <div className="col-lg">
                          <div className="p-5">
                            <h3 className="fw-normal mb-5" style={{ color: "#4835d4" }}>General Infomation</h3>
                            <div className="row">
                              <div className="col-md-6 mb-4 pb-2">

                                <div className="form-outline">
                                  <label className="form-label" htmlFor="form3Examplev2">First
                                    name</label>
                                  <input type="text" id="form3Examplev2"
                                    className="form-control form-control-lg" name='firstName' />
                                </div>
                              </div>
                              <div className="col-md-6 mb-4 pb-2">

                                <div className="form-outline">
                                  <label className="form-label" htmlFor="form3Examplev3">Last name</label>
                                  <input type="text" id="form3Examplev3"
                                    className="form-control form-control-lg" name='lastName' />
                                </div>

                              </div>
                            </div>



                            <div className="mb-4 pb-2">
                              <div className="form-outline">
                                <label className="form-label" htmlFor="form3Examplev4">Email Address</label>
                                <input type="text" id="form3Examplev4"
                                  className="form-control form-control-lg" name='email' />
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-4 pb-2">
                                  <label className="form-label" htmlFor="form3Examplev5">Mobile No. : </label>
                                  <input type="text" id="form3Examplev4"
                                    className="form-control form-control-lg" name='mobile' />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="mb-4 pb-2">
                                  <label className="form-label" htmlFor="form3Examplev5">Gender : </label>
                                  <select className="select form-control form-control-lg" name='gender'>
                                    <option value="male">Male/He</option>
                                    <option value="female">Female/She</option>
                                    <option value="other">Other</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6 mb-4 pb-2 mb-md-0 pb-md-0">
                                <div className="mb-4 pb-2">
                                  <div className="form-outline">
                                    <label className="form-label" htmlFor="form3Examplev5">Aadhar
                                      Number</label>
                                    <input type="text" id="form3Examplev5"
                                      className="form-control form-control-lg" name='aadhar' />
                                  </div>
                                </div>

                              </div>
                              <div className="col-md-6 mb-4 pb-2 mb-md-0 pb-md-0">
                                <div className="mb-4 pb-2">
                                  <div className="form-outline">
                                    <label className="form-label" htmlFor="form3Examplev5">PAN
                                      Number</label>
                                    <input type="text" id="form3Examplev5"
                                      className="form-control form-control-lg" name='pan' />
                                  </div>
                                </div>

                              </div>

                            </div>

                            <h3 className="fw-normal mb-5" style={{ color: "#4835d4" }}>Loan Details</h3>

                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-4 pb-2">
                                  <label className="form-label" htmlFor="form3Examplev5">Profession</label>
                                  <select className="select form-control form-control-lg" name='profession'>
                                    <option value="Salaried">Salaried</option>
                                    <option value="Self Employed">Self Employed</option>
                                    <option value="Other">Other</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-6 mb-4 pb-2 mb-md-0 pb-md-0">
                                <div className="mb-4 pb-2">
                                  <div className="form-outline">
                                    <label className="form-label" htmlFor="form3Examplev5">Annual Income</label>
                                    <input type="text" id="form3Examplev5"
                                      className="form-control form-control-lg" name='annualIncome' />
                                  </div>
                                </div>

                              </div>

                            </div>
                            <div className="row">
                              <div className="col-md-6 mb-4 pb-2 mb-md-0 pb-md-0">
                                <div className="mb-4 pb-2">
                                  <div className="form-outline">
                                    <label className="form-label" htmlFor="form3Examplev5">Loan Amount</label>
                                    <input type="text" id="form3Examplev5"
                                      className="form-control form-control-lg" name='loanAmount' />
                                  </div>
                                </div>

                              </div>
                              <div className="col-md-6 mb-4 pb-2 mb-md-0 pb-md-0">
                                <div className="mb-4 pb-2">
                                  <div className="form-outline">
                                    <label className="form-label" htmlFor="form3Examplev5">Duration (In month)</label>
                                    <input type="text" id="form3Examplev5"
                                      className="form-control form-control-lg" name='duration' />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg bg-black text-white">
                          <div className="p-5">
                            <h3 className="fw-normal mb-5">Contact Details</h3>

                            <div className="mb-4 pb-2">
                              <div className="form-outline form-white">
                                <input type="text" id="form3Examplea2"
                                  className="form-control form-control-lg" name='hNo' />
                                <label className="form-label" htmlFor="form3Examplea2">Flat no. / House No. + Street</label>
                              </div>
                            </div>

                            <div className="mb-4 pb-2">
                              <div className="form-outline form-white">
                                <input type="text" id="form3Examplea3"
                                  className="form-control form-control-lg" name='area' />
                                <label className="form-label" htmlFor="form3Examplea3">Locality / Area </label>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-7 mb-4 pb-2">

                                <div className="form-outline form-white">
                                  <input type="text" id="form3Examplea4"
                                    className="form-control form-control-lg" name='city' />
                                  <label className="form-label" htmlFor="form3Examplea4">City</label>
                                </div>

                              </div>
                              <div className="col-md-5 mb-4 pb-2">

                                <div className="form-outline form-white">
                                  <input type="text" id="form3Examplea5"
                                    className="form-control form-control-lg" name='pincode' />
                                  <label className="form-label" htmlFor="form3Examplea5">Pin Code</label>
                                </div>

                              </div>
                            </div>

                            {/* <div className="mb-4 pb-2">
                              <div className="form-outline form-white">
                                <input type="text" id="form3Examplea6"
                                  className="form-control form-control-lg" />
                                <label className="form-label" htmlFor="form3Examplea6">Country</label>
                              </div>
                            </div> */}

                            <div className="row">
                              <div className="col-md-6 mb-4 pb-3">

                                <div className="form-outline form-white">
                                  <input type="text" id="form3Examplea7"
                                    className="form-control form-control-lg" name='state' />
                                  <label className="form-label" htmlFor="form3Examplea7">State </label>
                                </div>

                              </div>
                              <div className="col-md-6 mb-4 pb-2">

                                <div className="form-outline form-white">
                                  <input type="text" id="form3Examplea8"
                                    className="form-control form-control-lg" name='country' />
                                  <label className="form-label" htmlFor="form3Examplea8">Country</label>
                                </div>

                              </div>
                            </div>


                            <div className="form-check d-flex justify-content-start mb-4 pb-3">
                              <input className="form-check-input me-3" type="checkbox" value=""
                                id="form2Example3c" required />
                              <label className="form-check-label text-white" htmlFor="form2Example3">
                                I do accept the <a href="#!" className="text-white"><u>Terms and
                                  Conditions</u></a> of your
                                site.
                              </label>
                            </div>

                            <button type="submit" className="btn btn-light btn-lg"
                              data-mdb-ripple-color="dark">Register</button>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </form>

      {/* <div className="regform">
        <section className="container">
          <header id="formhead">Registration Form</header>

          <form name="LoginForm" className="form" id="form"  >
            <div className="column">
              <div className="form-data">
                <label htmlFor={"firstName"}>First Name <em className="err">*</em></label>

                <input type="text" name="firstName" id="firstName" placeholder="Enter Your First Name"  />
               


              </div>

              <div className="form-data">
                <label htmlFor="lastName">Last Name <em className="err">*</em></label>

                <input type="text" name="lastName" id="lastName" placeholder="Enter Your Last Name"  />
                

              </div>
            </div>

            <div className="form-data">
              <label htmlFor="email">Email <em className="err">*</em></label>

              <input type="email" name="email" id="email" placeholder="Enter Your Email Id" />
            

            </div>

            <div className="column">
              <div className="form-data">
                <label htmlFor="mobile">Mobile No. <em className="err">*</em></label>

                <input type="number" name="mobile" id="mobile" placeholder="Enter Your Mobile No." />
              


              </div>


              <div className="form-data">
                <label htmlFor="password">Password <em className="err">*</em></label><br />

                <input type="password" name="password" id="password" placeholder="Enter Your Password" />
             

              </div>

              <div className="form-data">
                <label htmlFor="confirmPassword">Confirm Password <em className="err">*</em></label><br />
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" />
                
              </div>

              <div>
                < button type='submit' name="submit">Submit</button>
              </div>

            </div>
          </form>
        </section>

      </div > */}
    </>
  )
}

export default User
