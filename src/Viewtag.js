import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { config } from './config';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom'

function Viewtag() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [loading, setLoading] = useState(false);

    var tag = searchParams.get("tag")

    const params = useParams();

    const [details, setDetails] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const data = await axios.get(`${config.api}/tags/view-tag/?tag=${tag}`);
                setLoading(false)
                setDetails(data.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [tag])

    return (
        <div style={{ backgroundColor: "rgb(45,44,46)", color: "whitesmoke" }}>
            <div className='container'>

                <div className='row'>
                    <div className='col-md-2 mt-4'>
                        <Link to={"/portal/home-page"} className='btn btn-dark'><i class="fa-solid fa-circle-arrow-left mr-2"></i>Back</Link>
                    </div>
                    <div className='col-md-6'>

                    </div>
                    <div className='col-md-4 mt-4 text-end'>
                        <Link to={`/portal/home-page/ask-question/${window.localStorage.getItem("userId")}`} className='btn btn-info'><i class="fa-solid fa-square-plus mr-2"></i>Add another question</Link>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12 mt-5 mb-4 text-center'>
                        <h3>TAG : {tag}</h3>
                    </div>
                    {
                        loading ? <div class="d-flex justify-content-center" style={{marginTop:"200px"}}>
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                            :
                            <div>
                                {
                                    details.map((detail, index) => {
                                        return <div className='row'>
                                            <div className='col-lg-2 p-3'>
                                                <h6 className='btn btn-warning btn-sm' style={{ color: "black", fontWeight: "bolder", fontFamily: "inherit" }}>QUESTION {index + 1}</h6>
                                            </div>
                                            <div className='col-lg-8'>

                                            </div>
                                            <div className='col-lg-2 p-3'>
                                                <h6 className='btn btn-danger btn-sm' style={{ color: "black", fontWeight: "bolder", fontFamily: "inherit" }}>TOTAL VIEWS : {detail.Question.views} </h6>
                                            </div>
                                            <div className='col-lg-12 p-2 mb-3 card' style={{ color: "black" }}>

                                                <div style={{ padding: "10px" }}><b>Subject :</b> <div>{detail.Question.subject}</div></div>
                                                <div style={{ padding: "10px" }}><b>Details :</b> <div>{detail.Question.details}</div></div>

                                            </div>
                                            <div className='col-lg-2 p-3'>
                                                <h6 className='btn btn-warning btn-sm' style={{ color: "black", fontWeight: "bolder", fontFamily: "inherit" }}>COMMENTS</h6>
                                            </div>
                                            <div className='col-lg-12 p-2 mb-3 card' style={{ color: "black" }}>
                                                {
                                                    detail.Comments.map((com, index) => {
                                                        return <div style={{ padding: "10px" }}><b>Comment {index + 1} :</b> <div>{com}</div></div>
                                                    })
                                                }
                                            </div>
                                            <div style={{ border: "1px solid gray" }} className='mt-4 mb-4'></div>
                                        </div>
                                    })
                                }

                            </div>
                    }
                </div>
            </div>
            <div style={{ height: "450px" }}></div>
        </div>
    )
}

export default Viewtag