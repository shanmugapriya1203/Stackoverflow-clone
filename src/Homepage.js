import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { config } from './config';
import axios from 'axios'

function Homepage() {

    const [questions, setQuestions] = useState([])
    const [views, setViews] = useState(0)
    const [loading, setloading] = useState(false)

    async function viewCounter(qId) {
        try {

            await axios.put(`${config.api}/question/${qId}/views`)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                setloading(true)
                const data = await axios.get(`${config.api}/question/questions`);
                setloading(false)
                setQuestions(data.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    const userId = window.localStorage.getItem("userId")

    return (
        <div style={{ backgroundColor: "white", color: "black" }}>


            <div className='container'>
                <div className='row'>
                    <div className='col-md-4 mt-4'>
                        <h2>QUESTIONS</h2>
                    </div>
                    <div className='col-md-6'>

                    </div>
                    <div className='col-md-2 mt-4'>
                        <Link to={`/portal/home-page/ask-question/${userId}`} className='btn btn-primary'>Ask Question</Link>
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
                            <div className='row mt-4 mb-3'>
                                <h5>Total Questions : {questions.length}</h5>
                                <div style={{ border: "1px solid gray" }}></div>
                            </div>
                            {
                                questions.map((question, index) => {
                                    return <div className='row mt-2 mb-4'>
                                        <div className='col-lg-2'>
                                            <Link to={`/portal/home-page/comments/view-comments/${question._id}`} className='btn btn-outline-success btn-sm'>View Comments</Link>
                                            <h6 className='btn btn-dark btn-sm mt-3'>Total Votes : {question.votes}</h6>
                                            <h6 className='btn btn-dark btn-sm mt-1'>Views : {question.views}</h6>
                                        </div>
                                        <div className='col-lg-10'>
                                            <Link to={`/portal/home-page/view-question/${question._id}`} onClick={() => { viewCounter(question._id, 1) }} style={{ color: "orangered" }}>{question.subject}</Link>
                                            <div><Link id="tag" to={`/portal/home-page/tags/view-tag/?tag=${question.tag}`} className='btn btn-primary btn-sm mt-5'>{question.tag}</Link></div>
                                        </div>
                                        <div style={{ border: "1px solid gray" }}></div>
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

export default Homepage