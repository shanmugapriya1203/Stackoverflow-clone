import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { config } from './config';
import axios from 'axios';

function Askquestion() {
    const params = useParams();

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            subject: "",
            tag: "",
            details: ""
        },
        validate: (values) => {
            let error = {};

            if (!values.subject) {
                error.subject = "Enter the Subject";
            }
            if (!values.details) {
                error.details = "Enter the details";
            }
            if (!values.tag || values.tag == "Select a tag ...") {
                error.tag = "please, Select a tag";
            }

            return error
        },
        onSubmit: async (values) => {
            try {
                setLoading(true)
                await axios.post(`${config.api}/question/create-question/${params.userId}`, values)
                setLoading(false)
                alert("Question Posted Successfully")
                formik.resetForm()
                navigate("/portal/home-page")
            } catch (error) {
                console.log(error)
            }
        }
    })
    console.log(formik.values)
    return (
        <div style={{ backgroundColor: "rgb(45,44,46)" }}>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-2 mt-4'>
                        <Link to={"/portal/home-page"} className='btn btn-dark'><i class="fa-solid fa-circle-arrow-left mr-2"></i>Back</Link>
                    </div>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className='row'>
                        <div class="card mt-4 mb-4">
                            <div class="card-body">
                                <div class="form-floating">

                                    <textarea name="subject" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.subject}
                                        className={`form-control ${formik.errors.subject ? 'error-box' : ''} 
                                 ${formik.touched.subject && !formik.errors.subject ? 'success-box' : ''}`} placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                                    <label for="floatingTextarea">Subject</label>
                                    {
                                        formik.errors.subject ? <span style={{ color: "red" }}>{formik.errors.subject}</span> : null
                                    }
                                </div>
                                <select className={`form-control mt-4 ${formik.errors.tag ? 'error-box' : ''} 
                                 ${formik.touched.tag && !formik.errors.tag ? 'success-box' : ''}`}
                                    name="tag"
                                    value={formik.values.tag}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option>Select a tag ...</option>
                                    <option>JAVASCRIPT</option>
                                    <option>HTML/CSS</option>
                                    <option>REACT JS</option>
                                    <option>NODE JS</option>
                                    <option>PYTHON</option>
                                    <option>MONGO DB</option>
                                </select>
                                {
                                    formik.errors.tag ? <span style={{ color: "red" }}>{formik.errors.tag}</span> : null
                                }
                                <div class="form-floating mt-4">

                                    <textarea name="details" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details}
                                        className={`form-control ${formik.errors.details ? 'error-box' : ''} 
                                 ${formik.touched.details && !formik.errors.details ? 'success-box' : ''}`} placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "400px" }}></textarea>
                                    <label for="floatingTextarea2">Enter your Question Here...</label>
                                    {
                                        formik.errors.details ? <span style={{ color: "red" }}>{formik.errors.details}</span> : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        {
                            loading ? <div className='col-md-2'>
                                <button class="btn btn-success" type="button" disabled>
                                    <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                    Posting...
                                </button>
                            </div>
                                :
                                <div className='col-md-2'>
                                    <input className='btn btn-success' type={"submit"} value="Post Question" />
                                </div>

                        }

                    </div>
                </form>
                <div style={{ height: "130px" }}></div>
            </div>
        </div>
    )
}

export default Askquestion