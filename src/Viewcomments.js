import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { config } from './config';
import axios from 'axios';

function Viewcomments() {

    const params = useParams();
    const [comments, setComments] = useState([])
    const [loading, setloading] = useState(false)

    useEffect(() => {
        async function fetchData() {

            try {
                setloading(true)
                const data = await axios.get(`${config.api}/comments/view-comments/${params.qId}`)
                setloading(false)
                setComments(data.data)
            } catch (error) {
                console.log("Error");
            }
        }
        fetchData();
    }, [])

    return (
        <div style={{ backgroundColor: "rgb(45,44,46)", color: "whitesmoke" }}>
            <div className='container'>

                <div className='row'>
                    <div className='col-md-2 mt-4'>
                        <Link to={"/portal/home-page"} className='btn btn-dark'><i class="fa-solid fa-circle-arrow-left mr-2"></i>Back</Link>
                    </div>
                    <div className='col-md-8'>

                    </div>
                    <div className='col-md-2 mt-4 text-end'>
                        <Link to={`/portal/home-page/view-question/${params.qId}`} className='btn btn-info'><i class="fa-solid fa-square-plus mr-2"></i>Add Comment</Link>
                    </div>
                </div>
                {
                    loading ? <div class="d-flex justify-content-center" style={{ marginTop: "200px" }}>
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                        :
                        <div className='row'>
                            <div className='col-md-4 mt-5 mb-4'>
                                <h3>COMMENTS</h3>
                            </div>

                            {
                                comments.map((com, index) => {
                                    return <div>
                                        <div className='row'>
                                            <div className='col-lg-2 p-3'>
                                                <h6 className='btn btn-warning btn-sm' style={{ color: "black", fontWeight: "bolder", fontFamily: "inherit" }}>Comment {index + 1} :</h6>
                                            </div>
                                            <div className='col-lg-12 p-2 card' style={{ color: "black" }}>{com.Comment}</div>
                                        </div>
                                        <div style={{ border: "1px solid gray" }} className='mt-4 mb-4'></div>
                                    </div>
                                })
                            }

                        </div>

                }
            </div>
            <div style={{ height: "500px" }}></div>
        </div>
    )
}

export default Viewcomments