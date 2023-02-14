import { useFormik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { config } from './config'
import axios from "axios"

function Createaccount() {

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            password: "",
            ConfirmPassword: ""
        },
        validate: (values) => {
            let error = {};

            if (!values.name) {
                error.name = "Please enter a name";
            }
            if (values.name && (values.name.length <= 2 || values.name.length > 15)) {
                error.name = "Name must be between 3 to 15 characters";
            }
            if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i.test(values.username)) {
                error.username = "Please enter a username";
            }
            if (values.ConfirmPassword !== values.password) {
                error.ConfirmPassword = "Passwords doesn't match"
            }

            return error
        },
        onSubmit: async (values) => {
            delete values.ConfirmPassword;
            await axios.post(`${config.api}/register/create`, values)
            navigate("/portal")
            alert("User Created Successfully")
        }

    })

    return (
        <>
            <div className='container mt-5 text-center'>
                <div className='row'>
                    <h3>StackOverflow Welcomes you !!</h3>
                </div>
                <div className='row'>
                    <div class="container">
                        <div className='row'>
                            <div className='col-md-2 mt-4'>
                                <Link to={"/"} className='btn btn-dark'><i class="fa-solid fa-circle-arrow-left mr-2"></i>Back</Link>
                            </div>
                        </div>

                        <div class="row justify-content-center">

                            <div class="col-lg-6">

                                <div class="card o-hidden border-0 shadow-lg my-5">
                                    <div class="card-body p-0">


                                        <div class="p-5">
                                            <div class="text-center">
                                                <h5 class="h5 text-gray-900 mb-4">Create Your Account Here</h5>
                                            </div>
                                            <form onSubmit={formik.handleSubmit} class="user">
                                                <div class="form-group">
                                                    <input
                                                        name="name"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.name}
                                                        type="text"
                                                        className={`form-control form-control-user ${formik.errors.name ? 'error-box' : ''} 
                                                        ${formik.touched.name && !formik.errors.name ? 'success-box' : ''}`}
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder="Enter Your Name..." />
                                                    {
                                                        formik.errors.name ? <span style={{ color: "red" }}>{formik.errors.name}</span> : null
                                                    }
                                                </div>
                                                <div class="form-group">
                                                    <input
                                                        name="username"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.username}
                                                        type="email"
                                                        className={`form-control form-control-user ${formik.errors.username ? 'error-box' : ''} 
                        ${formik.touched.username && !formik.errors.username ? 'success-box' : ''}`}
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder="Enter Email Address..." />
                                                    {
                                                        formik.errors.username ? <span style={{ color: "red" }}>{formik.errors.username}</span> : null
                                                    }
                                                </div>
                                                <div class="form-group">
                                                    <input
                                                        name="password"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.password}
                                                        type="password" class="form-control form-control-user"
                                                        id="exampleInputPassword" placeholder="Password" />
                                                </div>
                                                <div class="form-group">
                                                    <input
                                                        name="ConfirmPassword"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.ConfirmPassword}
                                                        type="password"
                                                        className={`form-control form-control-user ${formik.errors.ConfirmPassword ? 'error-box' : ''} 
                        ${formik.touched.ConfirmPassword && !formik.errors.ConfirmPassword ? 'success-box' : ''}`}
                                                        id="exampleInputPassword" placeholder="Confirm Password" />
                                                    {
                                                        formik.errors.ConfirmPassword ? <span style={{ color: "red" }}>{formik.errors.ConfirmPassword}</span> : null
                                                    }
                                                </div>
                                                <input type="submit" class="btn btn-success btn-user btn-block" value={"Create"} />
                                                <hr />

                                            </form>
                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Createaccount
