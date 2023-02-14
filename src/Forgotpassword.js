import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { config } from './config'
import axios from "axios"

function Forgotpassword() {

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: ""
        },
        onSubmit: async (values) => {
            await axios.post(`${config.api}/register/forgot-password`, values)
            alert("Email Sent Successfully !!")
            formik.resetForm();
            navigate("/")
        }

    })

    return (
        <div class="container mt-5">
            <div className='row'>
                <div className='col-md-2 mt-4'>
                    <Link to={"/"} className='btn btn-dark'><i class="fa-solid fa-circle-arrow-left mr-2"></i>Back</Link>
                </div>
            </div>

            <div class="row justify-content-center">
                <div class="col-lg">

                    <div class="card o-hidden border-0 shadow-lg my-5" style={{ width: "500px", marginLeft: "250px" }}>


                        <div class="row">

                            <div class="col-lg">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Reset Password!</h1>
                                    </div>
                                    <form onSubmit={formik.handleSubmit} class="user">
                                        <div class="form-group">
                                            <input
                                                name="username"
                                                onChange={formik.handleChange}
                                                value={formik.values.username}
                                                type="email" class="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter Email Address..." />
                                        </div>
                                        <input type="submit" class="btn btn-primary btn-user btn-block" value={"Reset Password"} />
                                        <hr />
                                        <Link to={"/create-account"} class="btn btn-google btn-user btn-block ">
                                            <i class="fa-solid fa-user-plus mr-3"></i> Create Account
                                        </Link>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Forgotpassword