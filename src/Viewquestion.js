import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { config } from './config';
import axios from 'axios';

function Viewquestion() {

    const params = useParams();
    const navigate = useNavigate()
    const [question, setQuestion] = useState([])
    const [vote, setVote] = useState(true)
    const [loading, setloading] = useState(false)
    const [voteLoading , setvoteLoading] = useState(false)
    const [posting,setPosting] = useState(false)

    async function addVote() {

        try {
            setvoteLoading(true)
            await axios.put(`${config.api}/question/${params.qId}/votes`);
            setvoteLoading(false)
            setVote(false)
        } catch (error) {
            console.log("Error");
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                setloading(true)
                const data = await axios.get(`${config.api}/question/view-question/${params.qId}`);
                setloading(false)
                setQuestion(data.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    const formik = useFormik({
        initialValues: {
            Comment: ""
        },
        validate: (values) => {
            let error = {};

            if (!values.Comment) {
                error.Comment = "Add a comment !!";
            }

            return error
        },
        onSubmit: async (values) => {
            try {
                setPosting(true)
                await axios.post(`${config.api}/comments/add-comment/${params.qId}`, values)
                setPosting(false)
                alert("Comment Added Successfully")
                formik.resetForm()
                navigate(`/portal/home-page/comments/view-comments/${params.qId}`)
            } catch (error) {
                console.log(error);
            }
        }
    })

    return (
        <div style={{ backgroundColor: "rgb(45,44,46)" }}>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-2 mt-4'>
                        <Link to={`/portal/home-page/comments/view-comments/${params.qId}`} className='btn btn-dark'><i class="fa-solid fa-circle-arrow-left mr-2"></i>Back</Link>
                    </div>
                </div>
                {
                    loading ? <div class="d-flex justify-content-center" style={{ marginTop: "200px" }}>
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                        :
                        <div>
                            <div class="card mt-5">
                                <div class="card-body">
                                    <p>Subject : {question.subject}</p>
                                    <p>Explanation : {question.details}</p>
                                    {
                                        voteLoading ? <button class="btn btn-primary" type="button" disabled>
                                        <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                        Voting...
                                      </button>
                                            :
                                            <button className={`btn btn-primary btn-sm ${vote ? "active" : "disabled"}`} onClick={addVote}>ADD VOTE<i class="fa-solid fa-circle-up ml-2"></i></button>
                                    }
                                </div>
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className='row'>
                                    <div class="card mt-4 mb-4">
                                        <div class="card-body">
                                            <div class="form-floating ">
                                                <textarea name="Comment" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Comment}
                                                    className={`form-control ${formik.errors.Comment ? 'error-box' : ''} 
                                 ${formik.touched.Comment && !formik.errors.Comment ? 'success-box' : ''}`} placeholder="Add your comment here" id="floatingTextarea2" style={{ height: "400px" }}></textarea>
                                                <label for="floatingTextarea2">Enter your Comment Here...</label>
                                                {
                                                    formik.errors.Comment ? <span style={{ color: "red" }}>{formik.errors.Comment}</span> : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    {
                                        posting ? <div className='col-md-2'>
                                        <button class="btn btn-success" type="button" disabled>
                                            <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                            Posting...
                                        </button>
                                    </div>
                                        :
                                        <div className='col-md-2'>
                                        <input className='btn btn-success' type={"submit"} value="Add Comment" />
                                    </div>
                                    }
                                </div>
                            </form>
                        </div>
                }

                <div style={{ height: "500px" }}></div>
            </div>
        </div>
    )
}

export default Viewquestion