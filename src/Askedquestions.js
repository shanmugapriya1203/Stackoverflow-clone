import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { config } from './config';
import axios from 'axios';

function Askedquestions() {

  const params = useParams();

  const [details, setDetails] = useState([])
  const [loading, setLoading] = useState(false)
  const [dataAvailable , setdataAvailable] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const id = window.localStorage.getItem("userId")
        const data = await axios.get(`${config.api}/question/asked-questions/${id}`);
        setLoading(false)
        setDetails(data.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])

  return (
    <div style={{ backgroundColor: "rgb(45,44,46)", color: "whitesmoke" }}>
      {
        loading ? <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status" style={{marginTop:"300px"}}>
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
        :
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
            <h3>QUESTIONS ASKED BY YOU</h3>
          </div>
          {
            details == 0 ? <div className='p-4 text-center card' style={{color:"red"}}>No Questions asked by User</div>
            :
            <div>
            {
              loading ? <div class="d-flex justify-content-center" style={{ marginTop: "200px" }}>
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
          }
          

        </div>
      </div>
      }
      <div style={{ height: "500px" }}></div>
    </div>
  )
}

export default Askedquestions