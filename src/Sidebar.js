import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { config } from './config'

function Sidebar() {

    const [tags, setTags] = useState([])

    const navigate = useNavigate();
    
    useEffect(()=>{

        async function fetchData(){

            try {
                const data = await axios.get(`${config.api}/tags/all-tags`)
                setTags(data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    },[])

    var collection = tags.map((value)=>{
        return value.tag
    }) 

    var originalTag = collection.filter(function(value, index, self) { 
        return self.indexOf(value) === index;
    });

    return (
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar" style={{ borderRight: "3px solid black", boxShadow: "10px 10px " }}>



            <hr class="sidebar-divider" />
            
            <li class="nav-item">
                <Link to={"/portal/home-page"} class="nav-link collapsed" data-toggle="collapse" data-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i class="fa-solid fa-house"></i>
                    <span>Home</span>
                </Link>
            </li>
            <hr class="sidebar-divider my-0" />
            <div class="sidebar-heading mt-3">
                TAGS
            </div>
            {
                originalTag.map((tag)=>{
                    return <li class="nav-item">
                    <Link to={`/portal/home-page/tags/view-tag/?tag=${tag}`} class="nav-link collapsed" data-toggle="collapse" data-target="#collapseTwo"
                        aria-expanded="true" aria-controls="collapseTwo">
                        {
                            <span className='ml-4'>{tag}</span>
                        }
                    </Link>
                </li>
                })
            }
            <hr class="sidebar-divider my-0" />
            <div class="sidebar-heading mt-3">
                User Interface
            </div>
            <li class="nav-item">
                <Link to={"/portal/asked-questions"} class="nav-link">
                <i class="fa-solid fa-question"></i>
                    <span>Asked Questions</span>
                </Link>
            </li>


        </ul>
    )
}

export default Sidebar